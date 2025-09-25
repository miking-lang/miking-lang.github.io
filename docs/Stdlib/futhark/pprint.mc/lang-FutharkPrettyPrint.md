import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="printFutProg" kind="sem">

```mc
sem printFutProg : FutharkAst_FutProg -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem printFutProg =
  | FProg {decls = decls} ->
    let env = pprintEnvEmpty in
    match mapAccumL pprintDecl env decls with (_, decls) in
    strJoin "\n" decls
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintDecl" kind="sem">

```mc
sem pprintDecl : PprintEnv -> FutharkAst_FutDecl -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintDecl env =
  | FDeclFun {ident = ident, entry = entry, typeParams = typeParams,
              params = params, ret = ret, body = body} ->
    let pprintParam = lam env. lam param : (Name, FutType).
      match param with (ident, ty) in
      match futPprintEnvGetStr env ident with (env, ident) in
      match pprintType 0 env ty with (env, ty) in
      let ty = if eqString ty "" then "" else concat " : " ty in
      (env, join ["(", ident, ty, ")"])
    in
    let entryStr = if entry then "entry" else "let" in
    let bodyIndent = pprintIncr 0 in
    match mapAccumL pprintTypeParam env typeParams with (env, typeParams) in
    match futPprintEnvGetStr env ident with (env, ident) in
    match mapAccumL pprintParam env params with (env, params) in
    match pprintType 0 env ret with (env, ret) in
    let ret = if eqString ret "" then "" else concat " : " ret in
    match pprintExpr bodyIndent env body with (env, body) in
    (env, join [entryStr, " ", ident,
                join (map (cons ' ') typeParams),
                join (map (cons ' ') params), ret, " =",
                pprintNewline bodyIndent, body])
  | FDeclConst {ident = ident, ty = ty, val = val} ->
    let valIndent = pprintIncr 0 in
    match futPprintEnvGetStr env ident with (env, ident) in
    match pprintType 0 env ty with (env, ty) in
    match pprintExpr valIndent env val with (env, val) in
      (env, join ["let ", ident, " : ", ty, " =",
                  pprintNewline valIndent, val])
  | FDeclType { ident = ident, typeParams = typeParams, ty = ty } ->
    match mapAccumL pprintTypeParam env typeParams with (env, typeParams) in
    match futPprintEnvGetStr env ident with (env, ident) in
    match pprintType 0 env ty with (env, ty) in
    let typarams =
      if null typeParams then ""
      else cons ' ' (strJoin " " typeParams)
    in
    (env, join ["type ", ident, typarams, " = ", ty])
  | FDeclModuleAlias { ident = ident, moduleId = moduleId } ->
    match futPprintEnvGetStr env ident with (env, ident) in
    (env, join ["module ", ident, " = ", moduleId])
```
</ToggleWrapper>
</DocBlock>

