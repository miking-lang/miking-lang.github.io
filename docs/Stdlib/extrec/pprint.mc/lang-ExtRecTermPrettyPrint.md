import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtRecTermPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmExtRecord  _ -> true
  | TmExtExtend _ | TmExtExtend _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclRecType t ->
    match pprintTypeName env t.ident with (env, name) in
    match mapAccumL pprintEnvGetStr env t.params with (env, paramsStr) in
    (env, join ["rectype ", name, " ", strJoin " " paramsStr])
  | DeclRecField t ->
    let ty =  typeToString env t.tyIdent in
    (env, join ["recfield ", t.label, " : ", ty])
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
  | TmExtRecord {bindings = bindings, ident = ident} ->
    let innerIndent = pprintIncr (pprintIncr indent) in
      match
        mapMapAccum
          (lam env. lam k. lam v.
             match pprintCode innerIndent env v with (env, str) in
             (env,
              join [k, " = ", str]))
           env bindings
      with (env, bindMap) in
      let binds = mapValues bindMap in
      let merged =
        strJoin ", " binds
      in
      (env,join ["{", nameGetStr ident, " of ", merged, "}"])
  | TmExtExtend {bindings = bindings, e = e} ->
    match pprintCode indent env e with (env, eStr) in
    let innerIndent = pprintIncr (pprintIncr indent) in
      match
        mapMapAccum
          (lam env. lam k. lam v.
             match pprintCode innerIndent env v with (env, str) in
             (env,
              join [k, " = ", str]))
           env bindings
      with (env, bindMap) in
      let binds = mapValues bindMap in
      let merged =
        strJoin ", " binds
      in
      (env, join [
        "{extend ",
        eStr,
        " with ",
        merged,
        "}"
      ])
```
</ToggleWrapper>
</DocBlock>

