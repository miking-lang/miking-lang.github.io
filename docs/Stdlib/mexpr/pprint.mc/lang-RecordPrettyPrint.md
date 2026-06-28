import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmRecord _ -> true
  | TmRecordUpdate _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env: PprintEnv) =
  | TmRecord {bindings = bindings} ->
    if mapIsEmpty bindings then (env,"{}")
    else match record2tuple bindings with Some tms then
      match mapAccumL (lam env. lam e. pprintCode indent env e) env tms
      with (env,tupleExprs) in
      let merged = match tupleExprs with [e] then
                     concat e ","
                   else strJoin ", " tupleExprs in
      (env, join ["(", merged, ")"])
    else
      let innerIndent = pprintIncr (pprintIncr indent) in
      match
        mapMapAccum
          (lam env. lam k. lam v.
             match pprintCode innerIndent env v with (env, str) in
             if lti (addi (lengthSID k) (length str)) env.optSingleLineLimit then
               (env, join [pprintLabelString k, " = ", str])
             else
               (env, join [pprintLabelString k, " =", pprintNewline innerIndent, str]))
           env bindings
      with (env, bindMap) in
      let binds = mapValues bindMap in
      let merged =
        if lti (foldl addi 0 (map length binds)) env.optSingleLineLimit then
          strJoin ", " binds
        else
          strJoin (concat "," (pprintNewline (pprintIncr indent))) binds
      in
      (env,join ["{ ", merged, " }"])

  | TmRecordUpdate t ->
    let i = pprintIncr indent in
    let ii = pprintIncr i in
    let chain =
      if env.optCompactRecordUpdate then
        recursive let accumUpdates = lam keyacc. lam valacc. lam recExpr.
          match recExpr with TmRecordUpdate t2 then
            accumUpdates (cons t2.key keyacc) (cons t2.value valacc) t2.rec
          else
            (recExpr, keyacc, valacc)
        in
        accumUpdates [t.key] [t.value] t.rec
      else
        (t.rec, [t.key], [t.value])
    in
    match chain with (crec, ckeys, cvalues) in
    match pprintCode i env crec with (env,rec) in
      match mapAccumL (pprintCode ii) env cvalues with (env, values) in
        let strBindings = zipWith (lam k. lam v.
          if lti (addi (lengthSID k) (length v)) env.optSingleLineLimit then
            join [pprintLabelString k, " = ", v]
          else
            join [pprintLabelString k, " =", pprintNewline ii, v]
        ) ckeys values in
        if lti (foldl addi (length rec) (map length strBindings)) env.optSingleLineLimit then
          (env, join ["{ ", rec, " with ", strJoin ", " strBindings, " }"])
        else
          (env,join ["{ ", rec, pprintNewline i,
                     "with", pprintNewline i,
                     strJoin (cons ',' (pprintNewline ii)) strBindings,
                     " }"])
```
</ToggleWrapper>
</DocBlock>

