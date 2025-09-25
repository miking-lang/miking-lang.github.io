import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# generate-eq.mc  
  

Generate code required to compare two arbitrary \(monomorphic,  
non\-function\) values based on their structure

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mexpr/type-check.mc"} style={S.link}>type-check.mc</a>, <a href={"/docs/Stdlib/mlang/loader.mc"} style={S.link}>mlang/loader.mc</a>  
  
## Languages  
  

          <DocBlock title="GenerateEq" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEq">

```mc
lang GenerateEq
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEq = Ast
  type GEqEnv =
    { conFunctions : Map Name Name  -- For TyCons
    , varFunctions : Map Name Name  -- For TyVars
    , newFunctions : [(Name, Expr)]  -- To be defined

    , tcEnv : TCEnv -- Current typechecking environment

    , eqSeq : Name
    , eqBool : Name
    }

  sem getEqFunction : GEqEnv -> Type -> (GEqEnv, Expr)
  sem getEqFunction env = | ty -> _getEqFunction env (unwrapType ty)

  sem _getEqFunction : GEqEnv -> Type -> (GEqEnv, Expr)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqInt" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqInt">

```mc
lang GenerateEqInt
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqInt = GenerateEq + IntTypeAst + CmpIntAst
  sem _getEqFunction env =
  | TyInt _ -> (env, uconst_ (CEqi ()))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqFloat" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqFloat">

```mc
lang GenerateEqFloat
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqFloat = GenerateEq + FloatTypeAst + CmpFloatAst
  sem _getEqFunction env =
  | TyFloat _ -> (env, uconst_ (CEqf ()))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqBool" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqBool">

```mc
lang GenerateEqBool
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqBool = GenerateEq + BoolTypeAst
  sem _getEqFunction env =
  | TyBool _ -> (env, nvar_ env.eqBool)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqSeq" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqSeq">

```mc
lang GenerateEqSeq
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqSeq = GenerateEq + SeqTypeAst
  sem _getEqFunction env =
  | TySeq x ->
    match getEqFunction env x.ty with (env, elemF) in
    (env, app_ (nvar_ env.eqSeq) elemF)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqChar" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqChar">

```mc
lang GenerateEqChar
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqChar = GenerateEq + CharTypeAst + CmpCharAst
  sem _getEqFunction env =
  | TyChar _ ->
    (env, uconst_ (CEqc ()))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqRecord" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqRecord">

```mc
lang GenerateEqRecord
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqRecord = GenerateEq + RecordTypeAst
  sem _getEqFunction env =
  | ty & TyRecord x ->
    if mapIsEmpty x.fields then (env, ulam_ "" (ulam_ "" true_)) else

    let lName = nameSym "l" in
    let l = withType ty (nvar_ lName) in
    let rName = nameSym "r" in
    let r = withType ty (nvar_ rName) in

    let genRecElem = lam acc. lam label. lam ty. snoc acc (lam env.
      match getEqFunction env ty with (env, eqF) in
      let label = sidToString label in
      (env, appf2_ eqF (recordproj_ label l) (recordproj_ label r))) in
    let elems = mapFoldWithKey genRecElem [] x.fields in
    match mapAccumL (lam env. lam f. f env) env elems with (env, [first] ++ elems) in

    let f = lam acc. lam elem. if_ elem acc false_ in
    (env, nlam_ lName ty (nlam_ rName ty (foldl f first elems)))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqApp" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqApp">

```mc
lang GenerateEqApp
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqApp = GenerateEq + AppTypeAst
  sem _getEqFunction env =
  | TyApp x ->
    match getEqFunction env x.lhs with (env, lhs) in
    match getEqFunction env x.rhs with (env, rhs) in
    (env, app_ lhs rhs)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqCon" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqCon">

```mc
lang GenerateEqCon
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqCon = GenerateEq + ConTypeAst + Generalize + UnifyPure
  sem _getEqFunction env =
  | ty & TyCon x ->
    -- TODO(vipa, 2025-01-27): Invalidate old eq functions if
    -- we've introduced constructors to pre-existing types
    match mapLookup x.ident env.conFunctions with Some n then (env, nvar_ n) else

    let fname = nameSym (concat "eq" (nameGetStr x.ident)) in
    let env = {env with conFunctions = mapInsert x.ident fname env.conFunctions} in

    -- TODO(vipa, 2025-01-27): We cannot see locally defined types
    -- here, which might be an issue
    let params = match mapLookup x.ident env.tcEnv.tyConEnv with Some (_, params, _)
      then params
      else errorSingle [x.info] (concat "Typecheck environment does not contain information about type " (nameGetStr x.ident)) in
    let paramFNames = foldl (lam acc. lam n. mapInsert n (nameSetNewSym n) acc) (mapEmpty nameCmp) params in
    let fullType = tyapps_ ty (map ntyvar_ (mapKeys paramFNames)) in
    let prevVarFunctions = env.varFunctions in
    let env = {env with varFunctions = mapUnion env.varFunctions paramFNames} in

    let constructors = mapIntersectWith
      (lam. lam pair. pair.1)
      (mapLookupOr (setEmpty nameCmp) x.ident env.tcEnv.conDeps)
      env.tcEnv.conEnv in

    let lName = nameSym "l" in
    let rName = nameSym "r" in
    let addMatch = lam acc. lam c. lam t.
      match acc with (env, tm) in
      match inst (infoTy t) 0 t with TyArrow {from = from, to = to} in
      let uni = emptyUnification () in
      match unifyPure uni to fullType with Some uni then
        match getEqFunction env t with (env, subf) in
        let subl = nameSym "subl" in
        let subr = nameSym "subr" in
        let tm = match_ (nvar_ lName) (npcon_ c (npvar_ subl))
          (match_ (nvar_ rName) (npcon_ c (npvar_ subr))
            (appf2_ subf (nvar_ subl) (nvar_ subr))
            false_)
          tm in
        (env, tm)
      else error "Unification should always be possible here" in
    match mapFoldWithKey addMatch (env, never_) constructors with (env, matchChain) in
    let matchChain = nulam_ lName (nulam_ rName matchChain) in
    let body = foldr (lam pname. lam body. nulam_ (mapFindExn pname paramFNames) body) matchChain params in

    let env = {env with varFunctions = prevVarFunctions, newFunctions = snoc env.newFunctions (fname, body)} in
    (env, nvar_ fname)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqVar" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqVar">

```mc
lang GenerateEqVar
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqVar = GenerateEq + VarTypeAst
  -- NOTE(vipa, 2025-01-27): This function will error when it
  -- encounters a polymorphic value of unknown type. We could
  -- arbitrarily say "equal" or "not equal", but that seems error
  -- prone, or we could somehow ask surrounding code to be rewritten
  -- to carry an extra eq function for the polymorphic type.
  sem _getEqFunction env =
  | TyVar x ->
    match mapLookup x.ident env.varFunctions with Some fname
    then (env, nvar_ fname)
    else errorSingle [x.info] (join ["I don't know how to compare values of the polymorphic type ", nameGetStr x.ident])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprGenerateEq" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-MExprGenerateEq">

```mc
lang MExprGenerateEq
```



<ToggleWrapper text="Code..">
```mc
lang MExprGenerateEq
  = GenerateEqRecord
  + GenerateEqBool
  + GenerateEqInt
  + GenerateEqFloat
  + GenerateEqSeq
  + GenerateEqChar
  + GenerateEqApp
  + GenerateEqCon
  + GenerateEqVar
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqLoader" kind="lang" link="/docs/Stdlib/mexpr/generate-eq.mc/lang-GenerateEqLoader">

```mc
lang GenerateEqLoader
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqLoader = MCoreLoader + GenerateEq
  syn Hook =
  | EqHook
    { baseEnv : GEqEnv
    , functions : Ref (Map Name Name)  -- Names for TyCon related Eq functions
    }

  sem enableEqGeneration : Loader -> Loader
  sem enableEqGeneration = | loader ->
    if hasHook (lam x. match x with EqHook _ then true else false) loader then loader else

    match includeFileExn "." "stdlib::seq.mc" loader with (seqEnv, loader) in
    match includeFileExn "." "stdlib::bool.mc" loader with (boolEnv, loader) in

    let baseEnv =
      { conFunctions = mapEmpty nameCmp
      , varFunctions = mapEmpty nameCmp
      , newFunctions = []
      , tcEnv = typcheckEnvEmpty
      , eqSeq = _getVarExn "eqSeq" seqEnv
      , eqBool = _getVarExn "eqBool" boolEnv
      } in

    let hook = EqHook
      { baseEnv = baseEnv
      , functions = ref (mapEmpty nameCmp)
      } in
    addHook loader hook

  sem _eqFunctionsFor : [Type] -> Loader -> Hook -> Option (Loader, [Expr])
  sem _eqFunctionsFor tys loader =
  | _ -> None ()
  | EqHook hook ->
    match mapAccumL getEqFunction {hook.baseEnv with conFunctions = deref hook.functions, tcEnv = _getTCEnv loader} tys
      with (env, printFs) in

    modref hook.functions env.conFunctions;
    let loader = if null env.newFunctions
      then loader
      else _addDeclExn loader (nureclets_ env.newFunctions) in
    Some (loader, printFs)

  sem eqFunctionsFor : [Type] -> Loader -> (Loader, [Expr])
  sem eqFunctionsFor tys = | loader ->
    withHookState (_eqFunctionsFor tys) loader
end
```
</ToggleWrapper>
</DocBlock>

