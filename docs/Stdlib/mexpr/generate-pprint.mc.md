import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# generate-pprint.mc  
  

Generate code required to print an arbitrary \(monomorphic,  
non\-function\) value based on its structure

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/type-check.mc"} style={S.link}>type-check.mc</a>, <a href={"/docs/Stdlib/mlang/loader.mc"} style={S.link}>mlang/loader.mc</a>  
  
## Languages  
  

          <DocBlock title="GeneratePprint" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprint">

```mc
lang GeneratePprint
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprint = Ast + PrettyPrint
  type GPprintEnv =
    { conFunctions : Map Name Name  -- For TyCons
    , varFunctions : Map Name Name  -- For TyVars
    , newFunctions : [(Name, Expr)]  -- To be defined

    , tcEnv : TCEnv -- Current typechecking environment

    , int2string : Name
    , bool2string : Name
    , seq2string : Name
    , escapeString : Name
    , escapeChar : Name
    }

  sem getPprintFunction : GPprintEnv -> Type -> (GPprintEnv, Expr)
  sem getPprintFunction env = | ty -> _getPprintFunction env (unwrapType ty)

  sem _getPprintFunction : GPprintEnv -> Type -> (GPprintEnv, Expr)
  sem _getPprintFunction env = | ty ->
    errorSingle [infoTy ty] (concat "Missing case for _getPprintFunction " (type2str ty))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintInt" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintInt">

```mc
lang GeneratePprintInt
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintInt = GeneratePprint + IntTypeAst
  sem _getPprintFunction env =
  | TyInt _ -> (env, nvar_ env.int2string)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintFloat" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintFloat">

```mc
lang GeneratePprintFloat
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintFloat = GeneratePprint + FloatTypeAst + FloatStringConversionAst
  sem _getPprintFunction env =
  | TyFloat _ -> (env, uconst_ (CFloat2string ()))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintBool" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintBool">

```mc
lang GeneratePprintBool
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintBool = GeneratePprint + BoolTypeAst
  sem _getPprintFunction env =
  | TyBool _ -> (env, nvar_ env.bool2string)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintSeq" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintSeq">

```mc
lang GeneratePprintSeq
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintSeq = GeneratePprint + SeqTypeAst
  sem _getPprintFunction env =
  | TySeq x ->
    match getPprintFunction env x.ty with (env, elemF) in
    (env, app_ (nvar_ env.seq2string) elemF)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintString" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintString">

```mc
lang GeneratePprintString
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintString = GeneratePprint + SeqTypeAst + CharTypeAst
  sem _getPprintFunction env =
  | ty & TySeq {ty = TyChar _} ->
    let n = nameSym "x" in
    (env, nlam_ n ty (cons_ (char_ '"') (snoc_ (app_ (nvar_ env.escapeString) (nvar_ n)) (char_ '"'))))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintChar" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintChar">

```mc
lang GeneratePprintChar
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintChar = GeneratePprint + CharTypeAst
  sem _getPprintFunction env =
  | ty & TyChar _ ->
    let n = nameSym "c" in
    (env, nlam_ n ty (seq_ [char_ '\'', app_ (nvar_ env.escapeChar) (nvar_ n), char_ '\'']))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintRecord" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintRecord">

```mc
lang GeneratePprintRecord
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintRecord = GeneratePprint + RecordTypeAst + MExprIdentifierPrettyPrint
  sem _getPprintFunction env =
  | ty & TyRecord x ->
    if mapIsEmpty x.fields then (env, ulam_ "" (str_ "()")) else

    let recName = nameSym "r" in
    let rec = withType ty (nvar_ recName) in

    let genTupElem = lam i. lam ty. lam env.
      match getPprintFunction env ty with (env, printF) in
      (env, app_ printF (tupleproj_ i rec)) in
    let genRecElem = lam acc. lam label. lam ty. snoc acc (lam env.
      match getPprintFunction env ty with (env, printF) in
      let prefix = concat (pprintLabelString label) " = " in
      let label = sidToString label in
      (env, concat_ (str_ prefix) (app_ printF (recordproj_ label rec)))) in
    match
      match record2tuple x.fields with Some tys
      then (true, mapi genTupElem tys)
      else (false, mapFoldWithKey genRecElem [] x.fields)
    with (isTuple, elems) in
    match mapAccumL (lam env. lam f. f env) env elems with (env, rest ++ [last]) in

    let withComma = lam here. lam rest.
      concat_ here (concat_ (str_ ", ") rest) in
    let body = snoc_
      (cons_
        (char_ (if isTuple then '(' else '{'))
        (foldr withComma last rest))
      (char_ (if isTuple then ')' else '}')) in
    (env, nlam_ recName ty body)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintApp" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintApp">

```mc
lang GeneratePprintApp
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintApp = GeneratePprint + AppTypeAst
  sem _getPprintFunction env =
  | TyApp x ->
    match getPprintFunction env x.lhs with (env, lhs) in
    match getPprintFunction env x.rhs with (env, rhs) in
    (env, app_ lhs rhs)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintCon" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintCon">

```mc
lang GeneratePprintCon
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintCon = GeneratePprint + ConTypeAst + Generalize + UnifyPure
  sem _getPprintFunction env =
  | ty & TyCon x ->
    -- TODO(vipa, 2025-01-27): Invalidate old pprint functions if
    -- we've introduced constructors to pre-existing types
    match mapLookup x.ident env.conFunctions with Some n then (env, nvar_ n) else

    let fname = nameSym (concat "pprint" (nameGetStr x.ident)) in
    let env = {env with conFunctions = mapInsert x.ident fname env.conFunctions} in

    -- TODO(vipa, 2025-01-27): We cannot see locally defined types
    -- here, which might be an issue
    let params = match mapLookup x.ident env.tcEnv.tyConEnv with Some (_, params, _)
      then params
      else errorSingle [x.info] (concat "Typecheck environment does not contain information about type " (nameGetStr x.ident)) in
    let paramFNames = foldl (lam acc. lam n. mapInsert n (nameSetNewSym n) acc) (mapEmpty nameCmp) params in

    let constructors = mapIntersectWith
      (lam. lam pair. pair.1)
      (mapLookupOr (setEmpty nameCmp) x.ident env.tcEnv.conDeps)
      env.tcEnv.conEnv in

    let fullType = tyapps_ ty (map ntyvar_ (mapKeys paramFNames)) in
    let prevVarFunctions = env.varFunctions in
    let env = {env with varFunctions = mapUnion env.varFunctions paramFNames} in

    let targetName = nameSym "_target" in
    let addMatch = lam acc. lam c. lam t.
      match acc with (env, tm) in
      match inst (infoTy t) 0 t with TyArrow {from = from, to = to} in
      let uni = emptyUnification () in
      match unifyPure uni to fullType with Some uni then
        let from = pureApplyUniToType uni from in
        match getPprintFunction env from with (env, subf) in
        let sub = nameSym "x" in
        let tm = match_ (nvar_ targetName) (npcon_ c (npvar_ sub))
          (cons_ (char_ '(') (snoc_ (concat_ (str_ (pprintConString (nameGetStr c))) (cons_ (char_ ' ') (app_ subf (nvar_ sub)))) (char_ ')')))
          tm in
        (env, tm)
      else error "Unification should always be possible here" in
    match mapFoldWithKey addMatch (env, str_ (join ["<missing case for ", nameGetStr x.ident, ">"])) constructors with (env, matchChain) in
    let matchChain = nulam_ targetName matchChain in
    let body = foldr (lam pname. lam body. nulam_ (mapFindExn pname paramFNames) body) matchChain params in

    let env = {env with varFunctions = prevVarFunctions, newFunctions = snoc env.newFunctions (fname, body)} in
    (env, nvar_ fname)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintVar" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintVar">

```mc
lang GeneratePprintVar
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintVar = GeneratePprint + VarTypeAst
  -- NOTE(vipa, 2025-01-27): This function will print a constant
  -- \\`<poly (name-of-type-var)>\\` when it encounters a polymorphic
  -- value of unknown type. We could error instead, or somehow ask
  -- surrounding code to be rewritten to carry an extra pprint
  -- function for the polymorphic type.
  sem _getPprintFunction env =
  | TyVar x ->
    match mapLookup x.ident env.varFunctions with Some fname
    then (env, nvar_ fname)
    else (env, ulam_ "" (str_ (join ["<poly (", nameGetStr x.ident, ")>"])))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintTensor" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintTensor">

```mc
lang GeneratePprintTensor
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintTensor = GeneratePprint + TensorTypeAst
  sem _getPprintFunction env =
  | TyTensor x ->
    (env, ulam_ "" (str_ "<tensor>"))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintMissingCase" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintMissingCase">

```mc
lang GeneratePprintMissingCase
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintMissingCase = GeneratePprint
  sem _getPprintFunction env =
  | !TyUnknown _ -> (env, ulam_ "" (str_ "<missing case>"))
  | TyUnknown _ -> (env, ulam_ "" (str_ "<tyunknown>"))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprGeneratePprint" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-MExprGeneratePprint">

```mc
lang MExprGeneratePprint
```



<ToggleWrapper text="Code..">
```mc
lang MExprGeneratePprint
  = GeneratePprintRecord
  + GeneratePprintBool
  + GeneratePprintInt
  + GeneratePprintFloat
  + GeneratePprintSeq
  + GeneratePprintString
  + GeneratePprintChar
  + GeneratePprintApp
  + GeneratePprintCon
  + GeneratePprintVar
  + GeneratePprintTensor
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePprintLoader" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-GeneratePprintLoader">

```mc
lang GeneratePprintLoader
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePprintLoader = MCoreLoader + GeneratePprint
  syn Hook =
  | PprintHook
    { baseEnv : GPprintEnv
    , functions : Ref (Map Name Name)  -- Names for TyCon related pprint functions
    }

  sem enablePprintGeneration : Loader -> Loader
  sem enablePprintGeneration = | loader ->
    if hasHook (lam x. match x with PprintHook _ then true else false) loader then loader else

    match includeFileExn "." "stdlib::string.mc" loader with (stringEnv, loader) in
    match includeFileExn "." "stdlib::bool.mc" loader with (boolEnv, loader) in
    match includeFileExn "." "stdlib::char.mc" loader with (charEnv, loader) in

    let baseEnv =
      { conFunctions = mapEmpty nameCmp
      , varFunctions = mapEmpty nameCmp
      , newFunctions = []
      , tcEnv = typcheckEnvEmpty
      , int2string = _getVarExn "int2string" stringEnv
      , bool2string = _getVarExn "bool2string" boolEnv
      , seq2string = _getVarExn "seq2string" stringEnv
      , escapeString = _getVarExn "escapeString" stringEnv
      , escapeChar = _getVarExn "escapeChar" charEnv
      } in

    let hook = PprintHook
      { baseEnv = baseEnv
      , functions = ref (mapEmpty nameCmp)
      } in
    addHook loader hook

  sem _registerCustomPprintFunction : Name -> Expr -> Loader -> Hook -> Option (Loader, ())
  sem _registerCustomPprintFunction tyConName f loader =
  | _ -> None ()
  | PprintHook hook ->
    let pprintName = nameSym (concat "pprint" (nameGetStr tyConName)) in
    let loader = _addDeclExn loader (nulet_ pprintName f) in
    Some (loader, modref hook.functions (mapInsert tyConName pprintName (deref hook.functions)))

  sem registerCustomPprintFunction : Name -> Expr -> Loader -> Loader
  sem registerCustomPprintFunction tyConName f = | loader ->
    (withHookState (_registerCustomPprintFunction tyConName f) loader).0

  sem _pprintFunctionsFor : [Type] -> Loader -> Hook -> Option (Loader, [Expr])
  sem _pprintFunctionsFor tys loader =
  | _ -> None ()
  | PprintHook hook ->
    match mapAccumL getPprintFunction {hook.baseEnv with conFunctions = deref hook.functions, tcEnv = _getTCEnv loader} tys
      with (env, printFs) in

    modref hook.functions env.conFunctions;
    let loader = if null env.newFunctions
      then loader
      else _addDeclExn loader (nureclets_ env.newFunctions) in
    Some (loader, printFs)

  sem pprintFunctionsFor : [Type] -> Loader -> (Loader, [Expr])
  sem pprintFunctionsFor tys = | loader ->
    withHookState (_pprintFunctionsFor tys) loader
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DPrintViaPprintLoader" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-DPrintViaPprintLoader">

```mc
lang DPrintViaPprintLoader
```



<ToggleWrapper text="Code..">
```mc
lang DPrintViaPprintLoader = GeneratePprintLoader + IOAst
  syn Hook =
  | DPrintViaPprintHook ()

  sem enableDPrintViaPprint : Loader -> Loader
  sem enableDPrintViaPprint = | loader ->
    if hasHook (lam x. match x with DPrintViaPprintHook _ then true else false) loader then loader else

    let loader = enablePprintGeneration loader in
    let loader = addHook loader (DPrintViaPprintHook ()) in
    loader

  sem _postTypecheck loader decl = | DPrintViaPprintHook _ ->
    recursive let work = lam loader. lam tm.
      match tm with TmConst {val = CDPrint _, ty = ty} then
        match unwrapType ty with TyArrow {from = from} in
        match pprintFunctionsFor [from] loader with (loader, [pprint]) in
        let x = nameSym "x" in
        let pprint = nulam_ x (semi_
          (printError_ (app_ pprint (nvar_ x)))
          (flushStderr_ unit_)) in
        (loader, pprint)
      else smapAccumL_Expr_Expr work loader tm
    in smapAccumL_Decl_Expr work loader decl
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OldDPrintViaPprint" kind="lang" link="/docs/Stdlib/mexpr/generate-pprint.mc/lang-OldDPrintViaPprint">

```mc
lang OldDPrintViaPprint
```



<ToggleWrapper text="Code..">
```mc
lang OldDPrintViaPprint = GeneratePprint + AppTypeUtils
  sem findPprintDefinitions : GPprintEnv -> Expr -> GPprintEnv
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
  sem _findPprintDefinitions : GPprintEnv -> Name -> (String, String) -> GPprintEnv
  sem _findPprintDefinitions env ident =
  | ("int2string", _ ++ "/string.mc") -> {env with int2string = ident}
  | ("bool2string", _ ++ "/bool.mc") -> {env with bool2string = ident}
  | ("seq2string", _ ++ "/string.mc") -> {env with seq2string = ident}
  | ("escapeString", _ ++ "/string.mc") -> {env with escapeString = ident}
  | ("escapeChar", _ ++ "/char.mc") -> {env with escapeChar = ident}
  | (n, path) -> env

  sem dprintToPprint : Expr -> Expr
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

  sem _dprintToPprint : GPprintEnv -> Expr -> Expr
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
end
```
</ToggleWrapper>
</DocBlock>

