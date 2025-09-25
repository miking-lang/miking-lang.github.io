import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OldDPrintViaPprint  
  

  
  
  
## Semantics  
  

          <DocBlock title="findPprintDefinitions" kind="sem">

```mc
sem findPprintDefinitions : GeneratePprint_GPprintEnv -> Ast_Expr -> GeneratePprint_GPprintEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findPprintDefinitions env = | tm ->
    match tm with TmDecl {decl = decl, inexpr = expr} then
      let env = switch decl
        case DeclLet (x & {info = Info {filename = filename}}) then
          _findPprintDefinitions env x.ident (nameGetStr x.ident, filename)
        case DeclType x then
          let tcEnv = env.tcEnv in
          let tyConEnv =
            mapInsert x.ident (env.tcEnv.currentLvl, x.params, x.tyIdent) env.tcEnv.tyConEnv in
          {env with tcEnv = {env.tcEnv with tyConEnv = tyConEnv}}
        case DeclConDef x then
          match inspectType x.tyIdent with TyArrow {to = to} in
          match getTypeArgs to with (TyCon target, _) in
          -- NOTE(vipa, 2025-04-08): The level isn't used here, so we
          -- just insert a dummy value
          let conEnv = mapInsert x.ident (env.tcEnv.currentLvl, x.tyIdent) env.tcEnv.conEnv in
          let conDeps = mapInsertWith setUnion target.ident (setSingleton nameCmp x.ident) env.tcEnv.conDeps in
          {env with tcEnv = {env.tcEnv with conEnv = conEnv, conDeps = conDeps}}
        case _ then env
        end in
      findPprintDefinitions env expr
    else env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_findPprintDefinitions" kind="sem">

```mc
sem _findPprintDefinitions : GeneratePprint_GPprintEnv -> Name -> (String, String) -> GeneratePprint_GPprintEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _findPprintDefinitions env ident =
  | ("int2string", _ ++ "/string.mc") -> {env with int2string = ident}
  | ("bool2string", _ ++ "/bool.mc") -> {env with bool2string = ident}
  | ("seq2string", _ ++ "/string.mc") -> {env with seq2string = ident}
  | ("escapeString", _ ++ "/string.mc") -> {env with escapeString = ident}
  | ("escapeChar", _ ++ "/char.mc") -> {env with escapeChar = ident}
  | (n, path) -> env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dprintToPprint" kind="sem">

```mc
sem dprintToPprint : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem dprintToPprint = | tm ->
    let env =
      { conFunctions = mapEmpty nameCmp
      , varFunctions = mapEmpty nameCmp
      , newFunctions = []
      , tcEnv = typcheckEnvDefault
      , int2string = nameNoSym "int2string"
      , bool2string = nameNoSym "bool2string"
      , seq2string = nameNoSym "seq2string"
      , escapeString = nameNoSym "escapeString"
      , escapeChar = nameNoSym "escapeChar"
      } in
    let env = findPprintDefinitions env tm in
    _dprintToPprint env tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_dprintToPprint" kind="sem">

```mc
sem _dprintToPprint : GeneratePprint_GPprintEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _dprintToPprint env =
  | TmConst {val = CDPrint _, ty = ty} ->
    match unwrapType ty with TyArrow {from = from} in
    match getPprintFunction env from with (env, fn) in
    -- NOTE(vipa, 2025-04-08): We intentionally insert all generated
    -- functions right here, which might duplicate code and such,
    -- becasue it is significantly easier than finding a good location
    -- to insert it
    bind_ (nureclets_ env.newFunctions) (ulam_ "x" (semi_ (print_ (app_ fn (var_ "x"))) (flushStdout_ unit_)))
  | tm -> smap_Expr_Expr (_dprintToPprint env) tm
```
</ToggleWrapper>
</DocBlock>

