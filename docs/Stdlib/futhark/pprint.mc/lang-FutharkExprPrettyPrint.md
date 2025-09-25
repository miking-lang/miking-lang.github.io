import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkExprPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : FutharkExprAst_FutExpr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | FEVar _ -> true
  | FEVarExt _ -> true
  | FESizeCoercion _ -> true
  | FEProj _ -> false
  | FERecord _ -> true
  | FERecordUpdate _ -> true
  | FEArray _ -> true
  | FEArrayAccess _ -> false
  | FEArrayUpdate _ -> false
  | FEArraySlice _ -> false
  | FEConst _ -> true
  | FELam _ -> false
  | FEApp _ -> false
  | FELet _ -> false
  | FEIf _ -> false
  | FEForEach _ -> false
  | FEMatch _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintParen" kind="sem">

```mc
sem pprintParen : Int -> PprintEnv -> FutharkExprAst_FutExpr -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintParen indent env =
  | expr ->
    let i = if isAtomic expr then indent else addi 1 indent in
    match pprintExpr i env expr with (env, str) in
    if isAtomic expr then (env, str)
    else (env, join ["(", str, ")"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintArgs" kind="sem">

```mc
sem pprintArgs : Int -> PprintEnv -> [FutharkExprAst_FutExpr] -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintArgs indent env =
  | exprs ->
    match mapAccumL (pprintParen indent) env exprs with (env, args) in
    (env, strJoin (pprintNewline indent) args)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintExpr" kind="sem">

```mc
sem pprintExpr : Int -> PprintEnv -> FutharkExprAst_FutExpr -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintExpr indent env =
  | FEVar {ident = ident} -> futPprintEnvGetStr env ident
  | FEVarExt {ident = ident} -> (env, ident)
  | FESizeCoercion {e = e, ty = ty} ->
    match pprintExpr indent env e with (env, e) in
    match pprintType indent env ty with (env, ty) in
    (env, join [e, " :> ", ty])
  | FESizeEquality _ ->
    -- NOTE(larshum, 2021-11-30): These expressions are processed and
    -- eliminated from the AST at an earlier point. As they have no effect on
    -- the evaluation of the program, they are replaced by empty tuples.
    (env, join ["()"])
  | FEProj {target = target, label = label} ->
    match pprintParen indent env target with (env, target) in
    match futPprintLabelString env label with (env, str) in
    (env, join [target, ".", str])
  | FERecord {fields = fields} ->
    let pprintField = lam env. lam k. lam v.
      match futPprintLabelString env k with (env, str) in
      match pprintExpr indent env v with (env, expr) in
      (env, join [str, " = ", expr])
    in
    match mapMapAccum pprintField env fields with (env, fields) in
    (env, join ["{", strJoin "," (mapValues fields), "}"])
  | FERecordUpdate {rec = rec, key = key, value = value} ->
    match pprintParen indent env rec with (env, rec) in
    match futPprintLabelString env key with (env, key) in
    match pprintExpr indent env value with (env, value) in
    (env, join [rec, " with ", key, " = ", value])
  | FEArray {tms = tms} ->
    match mapAccumL (pprintExpr indent) env tms with (env, tms) in
    (env, join ["[", strJoin "," tms, "]"])
  | (FEArrayAccess {array = FEArrayAccess _, index = _}) & t ->
    recursive let indicesAndTarget = lam indices. lam e.
      match e with FEArrayAccess t then
        indicesAndTarget (cons t.index indices) t.array
      else (indices, e)
    in
    match indicesAndTarget [] t with (indices, arrayTarget) in
    match pprintExpr indent env arrayTarget with (env, array) in
    match mapAccumL (pprintExpr indent) env indices with (env, indices) in
    (env, join [array, "[", strJoin "," indices, "]"])
  | FEArrayAccess {array = array, index = index} ->
    match pprintExpr indent env array with (env, array) in
    match pprintExpr indent env index with (env, index) in
    (env, join [array, "[", index, "]"])
  | FEArrayUpdate {array = array, index = index, value = value} ->
    match pprintExpr indent env array with (env, array) in
    match pprintExpr indent env index with (env, index) in
    match pprintExpr indent env value with (env, value) in
    (env, join [array, " with [", index, "] = ", value])
  | FEArraySlice {array = array, startIdx = startIdx, endIdx = endIdx} ->
    match pprintExpr indent env array with (env, array) in
    match pprintExpr indent env startIdx with (env, startIdx) in
    match pprintExpr indent env endIdx with (env, endIdx) in
    (env, join [array, "[", startIdx, ":", endIdx, "]"])
  | FEConst {val = val} -> (env, pprintConst val)
  | FELam {ident = ident, body = body} ->
    let aindent = pprintIncr indent in
    match futPprintEnvGetStr env ident with (env, ident) in
    match pprintExpr aindent env body with (env, body) in
    (env, join ["\\", ident, " ->",
                pprintNewline aindent, body])
  | FEApp t ->
    recursive let appseq = lam t.
      match t with FEApp {lhs = lhs, rhs = rhs} then
        snoc (appseq lhs) rhs
      else [t]
    in
    let apps = appseq (FEApp t) in
    match pprintParen indent env (head apps) with (env, fun) in
    let aindent = pprintIncr indent in
    match pprintArgs aindent env (tail apps) with (env, args) in
    (env, join [fun, pprintNewline aindent, args])
  | FELet {ident = ident, tyBody = tyBody, body = body, inexpr = inexpr} ->
    let aindent = pprintIncr indent in
    match pprintExpr aindent env body with (env, body) in
    match pprintExpr indent env inexpr with (env, inexpr) in
    match futPprintEnvGetStr env ident with (env, ident) in
    (env, join ["let ", ident, " =", pprintNewline aindent, body, " in",
                pprintNewline indent, inexpr])
  | FEIf {cond = cond, thn = thn, els = els} ->
    let aindent = pprintIncr indent in
    match pprintExpr indent env cond with (env, cond) in
    match pprintExpr aindent env thn with (env, thn) in
    match pprintExpr aindent env els with (env, els) in
    (env, join ["if ", cond, " then", pprintNewline aindent, thn,
                pprintNewline indent, "else", pprintNewline aindent,
                els])
  | FEForEach {param = param, loopVar = loopVar, seq = seq, body = body} ->
    let aindent = pprintIncr indent in
    match pprintPat indent env param.0 with (env, paramPat) in
    match pprintExpr indent env param.1 with (env, paramExpr) in
    match futPprintEnvGetStr env loopVar with (env, loopVar) in
    match pprintExpr indent env seq with (env, seq) in
    match pprintExpr aindent env body with (env, body) in
    (env, join ["loop ", paramPat, " = ", paramExpr,
                " for ", loopVar, " in ", seq, " do",
                pprintNewline aindent, body])
  | FEMatch {target = target, cases = cases} ->
    let aindent = pprintIncr indent in
    let pprintCase = lam env : PprintEnv. lam matchCase : (FutPat, FutExpr).
      match pprintPat indent env matchCase.0 with (env, pat) in
      match pprintExpr aindent env matchCase.1 with (env, expr) in
      (env, join ["case ", pat, " ->", pprintNewline aindent, expr])
    in
    match pprintExpr indent env target with (env, target) in
    match mapAccumL pprintCase env cases with (env, cases) in
    (env, join ["match ", target, pprintNewline indent,
                strJoin (pprintNewline indent) cases])
```
</ToggleWrapper>
</DocBlock>

