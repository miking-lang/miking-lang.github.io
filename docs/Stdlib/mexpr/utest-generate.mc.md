import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# utest-generate.mc  
  

NOTE\(vipa, 2025\-02\-17\): If you want the functionality provided by  
this file, consider looking at \`generate\-utest.mc\` instead. We want  
to move to using that file and the loader approach rather than this  
file, which should be replaced somewhere down the line.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/stdlib.mc"} style={S.link}>stdlib.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/builtin.mc"} style={S.link}>mexpr/builtin.mc</a>, <a href={"/docs/Stdlib/mexpr/cmp.mc"} style={S.link}>mexpr/cmp.mc</a>, <a href={"/docs/Stdlib/mexpr/duplicate-code-elimination.mc"} style={S.link}>mexpr/duplicate-code-elimination.mc</a>, <a href={"/docs/Stdlib/mexpr/eval.mc"} style={S.link}>mexpr/eval.mc</a>, <a href={"/docs/Stdlib/mexpr/utils.mc"} style={S.link}>mexpr/utils.mc</a>, <a href={"/docs/Stdlib/mexpr/load-runtime.mc"} style={S.link}>mexpr/load-runtime.mc</a>  
  
## Languages  
  

          <DocBlock title="UtestBase" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-UtestBase">

```mc
lang UtestBase
```

<Description>{`The base fragment for the utest generation. This defines the utest  
environment as well as basic functions used in the generation of utest code.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang UtestBase =
  UnknownTypeCmp + BoolTypeCmp + IntTypeCmp + FloatTypeCmp + CharTypeCmp +
  FunTypeCmp + RecordTypeCmp + VariantTypeCmp + ConTypeCmp + VarTypeCmp +
  AppTypeCmp + AllTypeCmp + SeqTypeAst + TensorTypeAst + TypeCheck +
  DataKindAst

  -- NOTE(larshum, 2022-12-26): We customize the comparison of types such that
  -- all sequence and tensor types are considered equal. This is because we
  -- reuse the polymorphic functions for printing and equality for all sequence
  -- and tensor types.
  sem cmpTypeH =
  | (TySeq _, TySeq _) -> 0
  | (TyTensor _, TyTensor _) -> 0

  type UtestEnv = {
    -- Maps a type to the identifier of its pretty-print or equality function,
    -- respectively.
    pprint : Map Type Name,
    eq : Map Type Name,

    -- Set containing the types for which we have defined a pretty-print or
    -- equality function, respectively.
    pprintDef : Set Type,
    eqDef : Set Type,

    -- Maps the identifier of a variant type to an inner map, which in turn
    -- maps constructor names to their types.
    variants : Map Name (Map Name Type)
  }

  sem utestEnvEmpty : () -> UtestEnv
  sem utestEnvEmpty =
  | _ ->
    let baseTypes = [_boolTy, _intTy, _charTy, _floatTy] in
    { eq = mapEmpty cmpType, eqDef = setOfSeq cmpType baseTypes
    , pprint = mapEmpty cmpType, pprintDef = setOfSeq cmpType baseTypes
    , variants = mapEmpty nameCmp }

  sem lookupVariant : Name -> UtestEnv -> Info -> Map Name Type
  sem lookupVariant id env =
  | info ->
    match mapLookup id env.variants with Some constrs then constrs
    else errorSingle [info] "Unknown constructor type"

  -- Performs an unwrapping of all alias types.
  sem unwrapAlias : Type -> Type
  sem unwrapAlias =
  | ty -> smap_Type_Type unwrapAlias (unwrapType ty)

  -- Produces a sequence of the direct "child" types of a given type.
  sem shallowInnerTypes : UtestEnv -> Type -> [Type]
  sem shallowInnerTypes env =
  | ty ->
    let types = shallowInnerTypesH env ty in
    map unwrapAlias types

  sem shallowInnerTypesH : UtestEnv -> Type -> [Type]
  sem shallowInnerTypesH env =
  | TySeq {ty = elemTy} | TyTensor {ty = elemTy} -> [elemTy]
  | TyRecord {fields = fields} -> mapValues fields
  | (TyApp _ | TyCon _) & ty ->
    match collectTypeArguments [] ty with (id, tyArgs) in
    -- NOTE(larshum, 2022-12-29): Built-in types are handled differently, as
    -- they do not have any defined constructors.
    if any (nameEq id) _builtinTypes then tyArgs
    else
      let constrs = lookupVariant id env (infoTy ty) in
      let constrArgTypes = mapMapWithKey (specializeConstructorArgument tyArgs) constrs in
      mapValues constrArgTypes
  | _ -> []

  -- Generates an expression of type 'ty -> String' which we can use to
  -- pretty-print a value of type 'ty'.
  sem getPrettyPrintExpr : Info -> UtestEnv -> Type -> (UtestEnv, Expr)
  sem getPrettyPrintExpr info env =
  | ty -> getPrettyPrintExprH info env (unwrapAlias ty)

  sem getPrettyPrintExprH : Info -> UtestEnv -> Type -> (UtestEnv, Expr)
  sem getPrettyPrintExprH info env =
  | (TySeq {ty = elemTy} | TyTensor {ty = elemTy}) & ty ->
    match prettyPrintId info env ty with (env, pprintId) in
    match getPrettyPrintExprH info env elemTy with (env, ppElem) in
    (env, _apps (_var pprintId (_pprintTy ty)) [ppElem])
  | ty ->
    match
      match mapLookup ty env.pprint with Some pprintId then (env, pprintId)
      else
        match prettyPrintId info env ty with (env, pprintId) in
        let innerTypes = shallowInnerTypes env ty in
        match mapAccumL (getPrettyPrintExprH info) env innerTypes with (env, _) in
        (env, pprintId)
    with (env, pprintId) in
    (env, _var pprintId (_pprintTy ty))

  -- Generates an expression of type 'ty -> ty -> bool' which we can use to
  -- determine equality of values of type 'ty'.
  sem getEqualityExpr : Info -> UtestEnv -> Type -> (UtestEnv, Expr)
  sem getEqualityExpr info env =
  | ty -> getEqualityExprH info env (unwrapAlias ty)

  sem getEqualityExprH : Info -> UtestEnv -> Type -> (UtestEnv, Expr)
  sem getEqualityExprH info env =
  | (TySeq {ty = elemTy} | TyTensor {ty = elemTy}) & ty ->
    match equalityId info env ty with (env, eqId) in
    match getEqualityExprH info env elemTy with (env, elemEq) in
    (env, _apps (_var eqId (_eqTy ty)) [elemEq])
  | ty ->
    match
      match mapLookup ty env.eq with Some eqId then (env, eqId)
      else
        match equalityId info env ty with (env, eqId) in
        let innerTypes = shallowInnerTypes env ty in
        match mapAccumL (getEqualityExprH info) env innerTypes with (env, _) in
        (env, eqId)
    with (env, eqId) in
    (env, _var eqId (_eqTy ty))

  -- Generates an identifier for the pretty-print or equality function for a
  -- given type, respectively. We use this before generating the bodies of the
  -- functions to avoid infinite recursion when handling recursive ADTs.
  sem prettyPrintId : Info -> UtestEnv -> Type -> (UtestEnv, Name)
  sem equalityId : Info -> UtestEnv -> Type -> (UtestEnv, Name)

  -- Generates a body for the pretty-print or equality functions of a given
  -- type. These functions must be used after their corresponding functions
  -- above, so that an ID has already been generated for the tpye.
  sem generatePrettyPrintBody : Info -> UtestEnv -> Type -> (Name, Expr)
  sem generateEqualityBody : Info -> UtestEnv -> Type -> (Name, Expr)

  sem collectTypeArguments : [Type] -> Type -> (Name, [Type])
  sem collectTypeArguments args =
  | TyApp {lhs = lhs, rhs = rhs} ->
    collectTypeArguments (cons rhs args) lhs
  | TyCon {ident = ident} -> (ident, args)
  | ty -> errorSingle [infoTy ty] "Unexpected shape of type application"

  -- Specializes the argument type of a constructor given the type of the
  -- applied arguments.
  sem specializeConstructorArgument : [Type] -> Name -> Type -> Type
  sem specializeConstructorArgument tyArgs key =
  | constructorType ->
    specializeConstructorArgumentH (mapEmpty nameCmp) (tyArgs, constructorType)

  sem specializeConstructorArgumentH : Map Name Type -> ([Type], Type) -> Type
  sem specializeConstructorArgumentH subMap =
  | ([], TyArrow {from = argTy, info = info}) -> substituteVars info subMap argTy
  | (tyArgs, TyAll {kind = Data _, ty = ty}) ->
    specializeConstructorArgumentH subMap (tyArgs, ty)
  | ([tyArg] ++ tyArgs, TyAll {ident = ident, ty = ty, kind = !Data _}) ->
    specializeConstructorArgumentH
      (mapInsert ident tyArg subMap) (tyArgs, ty)
  | (_, ty) -> errorSingle [infoTy ty] "Invalid constructor application"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UtestRuntime" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-UtestRuntime">

```mc
lang UtestRuntime
```

<Description>{`The language fragment for handling the utest runtime. This includes  
handling the caching of the loaded AST, as well as functions for  
accessing identifiers defined in the runtime file.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang UtestRuntime = MExprLoadRuntime + MExprFindSym

  sem loadUtestRuntime : () -> Expr
  sem loadUtestRuntime =
  | _ ->
    match deref _utestRuntimeCode with Some ast then ast
    else
      let ast = loadRuntime _utestRuntimeLoc in
      modref _utestRuntimeCode (Some ast);
      ast

  sem findRuntimeIds : () -> [Name]
  sem findRuntimeIds =
  | _ ->
    match deref _utestRuntimeIds with Some ids then ids
    else
      let rt = loadUtestRuntime () in
      match optionMapM identity (findNamesOfStrings _utestRuntimeExpected rt)
      with Some ids then
        modref _utestRuntimeIds (Some ids);
        ids
      else error "Missing required identifiers in utest runtime file"

  sem utestRunnerName : () -> Name
  sem utestRunnerName =
  | _ -> get (findRuntimeIds ()) 0

  sem utestDefaultOnFailName : () -> Name
  sem utestDefaultOnFailName =
  | _ -> get (findRuntimeIds ()) 1

  sem utestExitOnFailureName : () -> Name
  sem utestExitOnFailureName =
  | _ -> get (findRuntimeIds ()) 2

  sem defaultPrettyPrintName : () -> Name
  sem defaultPrettyPrintName =
  | _ -> get (findRuntimeIds ()) 3

  sem ppBoolName : () -> Name
  sem ppBoolName =
  | _ -> get (findRuntimeIds ()) 4

  sem ppIntName : () -> Name
  sem ppIntName =
  | _ -> get (findRuntimeIds ()) 5

  sem ppFloatName : () -> Name
  sem ppFloatName =
  | _ -> get (findRuntimeIds ()) 6

  sem ppCharName : () -> Name
  sem ppCharName =
  | _ -> get (findRuntimeIds ()) 7

  sem ppSeqName : () -> Name
  sem ppSeqName =
  | _ -> get (findRuntimeIds ()) 8

  sem eqBoolName : () -> Name
  sem eqBoolName =
  | _ -> get (findRuntimeIds ()) 9

  sem eqIntName : () -> Name
  sem eqIntName =
  | _ -> get (findRuntimeIds ()) 10

  sem eqFloatName : () -> Name
  sem eqFloatName =
  | _ -> get (findRuntimeIds ()) 11

  sem eqCharName : () -> Name
  sem eqCharName =
  | _ -> get (findRuntimeIds ()) 12

  sem eqSeqName : () -> Name
  sem eqSeqName =
  | _ -> get (findRuntimeIds ()) 13

  sem joinName : () -> Name
  sem joinName =
  | _ -> get (findRuntimeIds ()) 14
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GeneratePrettyPrintBase" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-GeneratePrettyPrintBase">

```mc
lang GeneratePrettyPrintBase
```



<ToggleWrapper text="Code..">
```mc
lang GeneratePrettyPrintBase = UtestBase + UtestRuntime + MExprAst
  sem prettyPrintId : Info -> UtestEnv -> Type -> (UtestEnv, Name)
  sem prettyPrintId info env =
  | ty ->
    let id = prettyPrintIdH info env ty in
    ({env with pprint = mapInsert ty id env.pprint}, id)

  sem prettyPrintIdH : Info -> UtestEnv -> Type -> Name
  sem prettyPrintIdH info env =
  | ty -> defaultPrettyPrintName ()

  sem generatePrettyPrintBody : Info -> UtestEnv -> Type -> (Name, Expr)
  sem generatePrettyPrintBody info env =
  | ty ->
    match mapLookup ty env.pprint with Some id then
      (id, generatePrettyPrintBodyH info env ty)
    else
      errorSingle [info]
        (concat "Cannot generate pretty-print function for type " (type2str ty))

  sem generatePrettyPrintBodyH : Info -> UtestEnv -> Type -> Expr
  sem generatePrettyPrintBodyH info env =
  | ty -> _unit
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BoolPrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-BoolPrettyPrint">

```mc
lang BoolPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang BoolPrettyPrint = GeneratePrettyPrintBase + UtestRuntime
  sem prettyPrintIdH info env =
  | TyBool _ -> ppBoolName ()
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IntPrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-IntPrettyPrint">

```mc
lang IntPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang IntPrettyPrint = GeneratePrettyPrintBase + UtestRuntime
  sem prettyPrintIdH info env =
  | TyInt _ -> ppIntName ()
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatPrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-FloatPrettyPrint">

```mc
lang FloatPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang FloatPrettyPrint = GeneratePrettyPrintBase + UtestRuntime
  sem prettyPrintIdH info env =
  | TyFloat _ -> ppFloatName ()
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CharPrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-CharPrettyPrint">

```mc
lang CharPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang CharPrettyPrint = GeneratePrettyPrintBase + UtestRuntime
  sem prettyPrintIdH info env =
  | TyChar _ -> ppCharName ()
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqPrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-SeqPrettyPrint">

```mc
lang SeqPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang SeqPrettyPrint = GeneratePrettyPrintBase + UtestRuntime
  sem prettyPrintIdH info env =
  | TySeq _ -> _ppSeqName

  sem generatePrettyPrintBodyH info env =
  | TySeq t ->
    let ppElem = nameSym "ppElem" in
    let target = nameSym "s" in
    let elemTy = _varTy _ppSeqTyVarName in
    let ty = TySeq {t with ty = elemTy} in
    let ppSeq = _var (ppSeqName ()) (_pprintTy (_seqTy elemTy)) in
    _lam ppElem (_pprintTy elemTy) (_lam target ty
      (_apps ppSeq [_var ppElem (_pprintTy elemTy), _var target ty]))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TensorPrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-TensorPrettyPrint">

```mc
lang TensorPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang TensorPrettyPrint = GeneratePrettyPrintBase + UtestRuntime
  sem prettyPrintIdH info env =
  | TyTensor _ -> _ppTensorName

  sem generatePrettyPrintBodyH info env =
  | TyTensor t ->
    let ppElem = nameSym "ppElem" in
    let target = nameSym "t" in
    let elemTy = _varTy _ppTensorTyVarName in
    let ty = TyTensor {t with ty = elemTy} in
    let tensorPp = _const (CTensorToString ()) (_pprintTy (_tensorTy elemTy)) in
    _lam ppElem (_pprintTy elemTy) (_lam target ty
      (_apps tensorPp [_var ppElem (_pprintTy elemTy), _var target ty]))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecordPrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-RecordPrettyPrint">

```mc
lang RecordPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang RecordPrettyPrint = GeneratePrettyPrintBase + UtestRuntime
  sem prettyPrintIdH info env =
  | TyRecord _ & ty ->
    match mapLookup ty env.pprint with Some id then id
    else newRecordPprintName ()

  sem generatePrettyPrintBodyH info env =
  | TyRecord {fields = fields} & ty ->
    recursive let intersperseComma : [Expr] -> [Expr] = lam strExprs.
      match strExprs with [] | [_] then
        strExprs
      else match strExprs with [expr] ++ strExprs then
        concat [expr, _stringLit ", "] (intersperseComma strExprs)
      else never
    in
    let recordId = nameSym "r" in
    let record = _var recordId ty in
    let printSeq =
      match record2tuple fields with Some types then
        let printTupleField = lam count. lam fieldTy.
          match getPrettyPrintExpr info env fieldTy with (_, ppExpr) in
          let key = stringToSid (int2string count) in
          (addi count 1, _apps ppExpr [_recordproj key fieldTy record])
        in
        match mapAccumL printTupleField 0 types with (_, strs) in
        join [[_stringLit "("], intersperseComma strs, [_stringLit ")"]]
      else
        let printRecordField = lam fields. lam sid. lam fieldTy.
          match getPrettyPrintExpr info env fieldTy with (_, ppExpr) in
          let str =
            _apps _concat
              [ _stringLit (concat (sidToString sid) " = ")
              , _apps ppExpr [_recordproj sid fieldTy record] ]
          in
          snoc fields str
        in
        let strs = mapFoldWithKey printRecordField [] fields in
        join [[_stringLit "{"], intersperseComma strs, [_stringLit "}"]]
    in
    let pprint =
      _apps
        (_var (joinName ()) (_tyarrows [_seqTy _stringTy, _stringTy]))
        [seq_ printSeq]
    in
    _lam recordId ty pprint
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VariantPrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-VariantPrettyPrint">

```mc
lang VariantPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang VariantPrettyPrint = GeneratePrettyPrintBase + UtestRuntime
  sem prettyPrintIdH info env =
  | (TyApp _ | TyCon _) & ty ->
    match mapLookup ty env.pprint with Some id then id
    else
      match collectTypeArguments [] ty with (id, argTypes) in
      nameSym (concat (concat "pp" (nameGetStr id)) (strJoin "" (map type2str argTypes)))

  sem generatePrettyPrintBodyH info env =
  | (TyApp _ | TyCon _) & ty ->
    match collectTypeArguments [] ty with (id, tyArgs) in
    if nameEq id (mapFindExn "Symbol" builtinTypeNames) then
      generateSymbolPrettyPrint env ty
    else if nameEq id (mapFindExn "Ref" builtinTypeNames) then
      generateReferencePrettyPrint env ty
    else if nameEq id (mapFindExn "BootParseTree" builtinTypeNames) then
      generateBootParseTreePrettyPrint env ty
    else defaultVariantPrettyPrint info env id tyArgs ty

  sem generateSymbolPrettyPrint : UtestEnv -> Type -> Expr
  sem generateSymbolPrettyPrint env =
  | ty ->
    let target = nameSym "s" in
    let ppInt = _var (ppIntName ()) (_pprintTy _intTy) in
    let symHash =
      _apps (_const (CSym2hash ()) (_tyarrows [ty, _intTy]))
        [_var target ty] in
    _lam target ty
      (_apps _concat
        [ _stringLit "sym ("
        , _apps _concat [_apps ppInt [symHash], _stringLit ")"] ])

  sem generateReferencePrettyPrint : UtestEnv -> Type -> Expr
  sem generateReferencePrettyPrint env =
  | ty -> _lam (nameNoSym "") ty (_stringLit "<ref>")

  sem generateBootParseTreePrettyPrint : UtestEnv -> Type -> Expr
  sem generateBootParseTreePrettyPrint env =
  | ty -> _lam (nameNoSym "") ty (_stringLit "<boot parse tree>")

  sem defaultVariantPrettyPrint : Info -> UtestEnv -> Name -> [Type] -> Type -> Expr
  sem defaultVariantPrettyPrint info env id tyArgs =
  | ty ->
    let constrs = lookupVariant id env info in
    let constrArgTypes = mapMapWithKey (specializeConstructorArgument tyArgs) constrs in
    let target = nameSym "a" in
    let constrPprint = lam acc. lam constrId. lam constrArgTy.
      match getPrettyPrintExpr info env constrArgTy with (_, ppExpr) in
      let innerId = nameSym "x" in
      let thn =
        _apps _concat
          [ _stringLit (concat (nameGetStr constrId) " ")
          , _apps ppExpr [_var innerId constrArgTy] ]
      in
      _match (_var target ty)
        (_patCon constrId (_patVar innerId constrArgTy) ty)
        thn acc _stringTy
    in
    let body = mapFoldWithKey constrPprint (_never _stringTy) constrArgTypes in
    _lam target ty body
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprGeneratePrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-MExprGeneratePrettyPrint">

```mc
lang MExprGeneratePrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang MExprGeneratePrettyPrint =
  BoolPrettyPrint + IntPrettyPrint + FloatPrettyPrint + CharPrettyPrint +
  SeqPrettyPrint + TensorPrettyPrint + RecordPrettyPrint + VariantPrettyPrint
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenerateEqualityBase" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-GenerateEqualityBase">

```mc
lang GenerateEqualityBase
```



<ToggleWrapper text="Code..">
```mc
lang GenerateEqualityBase = UtestBase + MExprAst + PrettyPrint
  sem equalityId : Info -> UtestEnv -> Type -> (UtestEnv, Name)
  sem equalityId info env =
  | ty ->
    let id = equalityIdH info env ty in
    ({env with eq = mapInsert ty id env.eq}, id)

  sem equalityIdH : Info -> UtestEnv -> Type -> Name
  sem equalityIdH info env =
  | ty ->
    let msg = join [
      "A custom equality function is required for type ", type2str ty, ".\n"
    ] in
    errorSingle [info] msg

  sem generateEqualityBody : Info -> UtestEnv -> Type -> (Name, Expr)
  sem generateEqualityBody info env =
  | ty ->
    match mapLookup ty env.eq with Some id then
      (id, generateEqualityBodyH info env ty)
    else
      errorSingle [infoTy ty]
        (concat "Cannot generate equality function for type " (type2str ty))

  sem generateEqualityBodyH : Info -> UtestEnv -> Type -> Expr
  sem generateEqualityBodyH info env =
  | ty ->
    errorSingle [infoTy ty]
      (concat "Cannot generate equality function for type " (type2str ty))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BoolEquality" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-BoolEquality">

```mc
lang BoolEquality
```



<ToggleWrapper text="Code..">
```mc
lang BoolEquality = GenerateEqualityBase + UtestRuntime
  sem equalityIdH info env =
  | TyBool _ -> eqBoolName ()

  sem generateEqualityBodyH info env =
  | TyBool _ -> _unit
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IntEquality" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-IntEquality">

```mc
lang IntEquality
```



<ToggleWrapper text="Code..">
```mc
lang IntEquality = GenerateEqualityBase + UtestRuntime
  sem equalityIdH info env =
  | TyInt _ -> eqIntName ()

  sem generateEqualityBodyH info env =
  | TyInt _ -> _unit
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatEquality" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-FloatEquality">

```mc
lang FloatEquality
```



<ToggleWrapper text="Code..">
```mc
lang FloatEquality = GenerateEqualityBase + UtestRuntime
  sem equalityIdH info env =
  | TyFloat _ -> eqFloatName ()

  sem generateEqualityBodyH info env =
  | TyFloat _ -> _unit
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CharEquality" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-CharEquality">

```mc
lang CharEquality
```



<ToggleWrapper text="Code..">
```mc
lang CharEquality = GenerateEqualityBase + UtestRuntime
  sem equalityIdH info env =
  | TyChar _ -> eqCharName ()

  sem generateEqualityBodyH info env =
  | TyChar _ -> _unit
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqEquality" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-SeqEquality">

```mc
lang SeqEquality
```



<ToggleWrapper text="Code..">
```mc
lang SeqEquality = GenerateEqualityBase + UtestRuntime
  sem equalityIdH info env =
  | TySeq _ -> _eqSeqName

  sem generateEqualityBodyH info env =
  | TySeq t ->
    let eqElem = nameSym "eqElem" in
    let larg = nameSym "l" in
    let rarg = nameSym "r" in
    let elemTy = _varTy _eqSeqTyVarName in
    let ty = TySeq {t with ty = elemTy} in
    let eqSeq = _var (eqSeqName ()) (_eqTy (_seqTy elemTy)) in
    _lam eqElem (_eqTy elemTy) (_lam larg ty (_lam rarg ty
      (_apps eqSeq [_var eqElem (_eqTy elemTy), _var larg ty, _var rarg ty])))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TensorEquality" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-TensorEquality">

```mc
lang TensorEquality
```



<ToggleWrapper text="Code..">
```mc
lang TensorEquality = GenerateEqualityBase + UtestRuntime
  sem equalityIdH info env =
  | TyTensor _ -> _eqTensorName

  sem generateEqualityBodyH info env =
  | TyTensor t ->
    let eqElem = nameSym "eqElem" in
    let larg = nameSym "l" in
    let rarg = nameSym "r" in
    let elemTy = _varTy _eqTensorTyVarName in
    let ty = TyTensor {t with ty = elemTy} in
    let tensorEq = _const (CTensorEq ()) (_eqTy (_tensorTy elemTy)) in
    _lam eqElem (_eqTy elemTy) (_lam larg ty (_lam rarg ty
      (_apps tensorEq [_var eqElem (_eqTy elemTy), _var larg ty, _var rarg ty])))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecordEquality" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-RecordEquality">

```mc
lang RecordEquality
```



<ToggleWrapper text="Code..">
```mc
lang RecordEquality = GenerateEqualityBase + UtestRuntime
  sem equalityIdH info env =
  | TyRecord _ & ty ->
    match mapLookup ty env.eq with Some id then id
    else newRecordEqualityName ()

  sem generateEqualityBodyH info env =
  | TyRecord {fields = fields} & ty ->
    let larg = nameSym "l" in
    let rarg = nameSym "r" in
    let fieldEqual = lam acc. lam fieldSid. lam fieldTy.
      match getEqualityExpr info env fieldTy with (_, eqExpr) in
      let l = _recordproj fieldSid fieldTy (_var larg ty) in
      let r = _recordproj fieldSid fieldTy (_var rarg ty) in
      let cond = _apps eqExpr [l, r] in
      let truePat = PatBool {val = true, ty = _boolTy, info = _utestInfo} in
      _match cond truePat acc _false _boolTy
    in
    let body = mapFoldWithKey fieldEqual _true fields in
    _lam larg ty (_lam rarg ty body)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VariantEquality" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-VariantEquality">

```mc
lang VariantEquality
```



<ToggleWrapper text="Code..">
```mc
lang VariantEquality = GenerateEqualityBase + UtestRuntime
  sem equalityIdH info env =
  | (TyApp _ | TyCon _) & ty ->
    match mapLookup ty env.eq with Some id then id
    else
      match collectTypeArguments [] ty with (id, argTypes) in
      nameSym (concat (concat "eq" (nameGetStr id)) (strJoin "" (map type2str argTypes)))

  sem generateEqualityBodyH info env =
  | (TyCon _ | TyApp _) & ty ->
    match collectTypeArguments [] ty with (id, tyArgs) in
    if nameEq id (mapFindExn "Symbol" builtinTypeNames) then
      generateSymbolEquality info env ty
    else if nameEq id (mapFindExn "Ref" builtinTypeNames) then
      generateReferenceEquality info env ty
    else if nameEq id (mapFindExn "BootParseTree" builtinTypeNames) then
      generateBootParseTreeEquality info env ty
    else defaultVariantEq info env id tyArgs ty

  sem generateSymbolEquality : Info -> UtestEnv -> Type -> Expr
  sem generateSymbolEquality info env =
  | ty ->
    let larg = nameSym "l" in
    let rarg = nameSym "r" in
    let eqsym = _const (CEqsym ()) (_tyarrows [ty, ty, _boolTy]) in
    _lam larg ty (_lam rarg ty (_apps eqsym [_var larg ty, _var rarg ty]))

  sem generateReferenceEquality : Info -> UtestEnv -> Type -> Expr
  sem generateReferenceEquality info env =
  | ty ->
    errorSingle [info]
      "A custom equality function must be provided for reference types.\n"

  sem generateBootParseTreeEquality : Info -> UtestEnv -> Type -> Expr
  sem generateBootParseTreeEquality info env =
  | ty -> errorSingle [info] "Cannot generate equality for boot parse trees"

  sem defaultVariantEq : Info -> UtestEnv -> Name -> [Type] -> Type -> Expr
  sem defaultVariantEq info env id tyArgs =
  | ty ->
    let constrs = lookupVariant id env info in
    let constrArgTypes = mapMapWithKey (specializeConstructorArgument tyArgs) constrs in
    let larg = nameSym "l" in
    let rarg = nameSym "r" in
    let lid = nameSym "lhs" in
    let rid = nameSym "rhs" in
    let constrEq = lam acc. lam constrId. lam constrArgTy.
      match getEqualityExpr info env constrArgTy with (_, argEq) in
      let target = _tuple [_var larg ty, _var rarg ty] (_tupleTy [ty, ty]) in
      let conPat = lam id. lam argTy. _patCon constrId (_patVar id argTy) ty in
      let pat =
        _patTuple [conPat lid constrArgTy, conPat rid constrArgTy]
          (_tupleTy [ty, ty]) in
      let thn = _apps argEq [_var lid constrArgTy, _var rid constrArgTy] in
      _match target pat thn acc _boolTy
    in
    let body = mapFoldWithKey constrEq _false constrArgTypes in
    _lam larg ty (_lam rarg ty body)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprGenerateEquality" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-MExprGenerateEquality">

```mc
lang MExprGenerateEquality
```



<ToggleWrapper text="Code..">
```mc
lang MExprGenerateEquality =
  BoolEquality + IntEquality + FloatEquality + CharEquality + SeqEquality +
  TensorEquality + RecordEquality + VariantEquality
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprUtestGenerate" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-MExprUtestGenerate">

```mc
lang MExprUtestGenerate
```

<Description>{`The main utest generation language fragment. Here, we define functions for  
replacing utest expressions with references to the utest runtime, as well as  
the insertion of recursive bindings for pretty\-print and equality functions  
into the original AST.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang MExprUtestGenerate =
  UtestRuntime + MExprGeneratePrettyPrint + MExprGenerateEquality +
  MExprEliminateDuplicateCode

  -- Generates a recursive let-expression containing pretty-print binding
  -- definitions for each subtype required to support pretty-printing all
  -- types in the provided sequence. If the user provided a custom on-fail
  -- printing function, we do not generate any bindings.
  sem generatePrettyPrintBindings : Info -> UtestEnv -> [Type] -> Option Expr -> (UtestEnv, Option Decl)
  sem generatePrettyPrintBindings info env types =
  | Some _ -> (env, None ())
  | None _ ->
    let types = map unwrapAlias types in
    match mapAccumL (generatePrettyPrintBindingsH info) env types with (env, binds) in
    ( env
    , Some (DeclRecLets {bindings = join binds, info = _utestInfo})
    )

  sem generatePrettyPrintBindingsH : Info -> UtestEnv -> Type
                                  -> (UtestEnv, [DeclLetRecord])
  sem generatePrettyPrintBindingsH info env =
  | (TySeq {ty = elemTy} | TyTensor {ty = elemTy}) & ty ->
    if setMem ty env.pprintDef then
      generatePrettyPrintBindingsH info env elemTy
    else
      match generatePrettyPrintBody info env ty with (id, body) in
      match generatePrettyPrintBindingsH info env elemTy with (env, binds) in
      let varId =
        match ty with TySeq _ then _ppSeqTyVarName
        else _ppTensorTyVarName
      in
      let ty =
        let elemTy = _varTy varId in
        switch ty
        case TySeq t then TySeq {t with ty = elemTy}
        case TyTensor t then TyTensor {t with ty = elemTy}
        end
      in
      let ppTy = _tyalls [varId] (_pprintTy ty) in
      (env, cons (_recbind id ppTy body) binds)
  | ty ->
    if setMem ty env.pprintDef then (env, [])
    else
      let env = {env with pprintDef = setInsert ty env.pprintDef} in
      let innerTys = shallowInnerTypes env ty in
      match mapAccumL (generatePrettyPrintBindingsH info) env innerTys with (env, binds) in
      match generatePrettyPrintBody info env ty with (id, body) in
      if nameEq id (defaultPrettyPrintName ()) then (env, join binds)
      else (env, cons (_recbind id (_pprintTy ty) body) (join binds))

  -- Conditionally generates a recursive let-expression containing equality
  -- binding definitions for all subtypes required to support an equality
  -- operation on the provided type. If a user has provided a custom equality
  -- function (i.e., the tusing field is Some), we do not generate any
  -- bindings.
  sem generateEqualityBindings : Info -> UtestEnv -> Type -> Option Expr
                              -> (UtestEnv, Option Decl)
  sem generateEqualityBindings info env ty =
  | Some _ -> (env, None ())
  | None _ ->
    let ty = unwrapAlias ty in
    match generateEqualityBindingsH info env ty with (env, binds) in
    ( env
    , Some (DeclRecLets {bindings = binds, info = _utestInfo})
    )

  sem generateEqualityBindingsH : Info -> UtestEnv -> Type
                               -> (UtestEnv, [DeclLetRecord])
  sem generateEqualityBindingsH info env =
  | (TySeq {ty = elemTy} | TyTensor {ty = elemTy}) & ty ->
    if setMem ty env.eqDef then
      generateEqualityBindingsH info env elemTy
    else
      match generateEqualityBody info env ty with (id, body) in
      match generateEqualityBindingsH info env elemTy with (env, binds) in
      let varId =
        match ty with TySeq _ then _eqSeqTyVarName
        else _eqTensorTyVarName
      in
      let ty =
        let elemTy = _varTy varId in
        switch ty
        case TySeq t then TySeq {t with ty = elemTy}
        case TyTensor t then TyTensor {t with ty = elemTy}
        end
      in
      let eqTy = _tyalls [varId] (_eqTy ty) in
      (env, cons (_recbind id eqTy body) binds)
  | ty ->
    if setMem ty env.eqDef then (env, [])
    else
      let env = {env with eqDef = setInsert ty env.eqDef} in
      let innerTys = shallowInnerTypes env ty in
      match mapAccumL (generateEqualityBindingsH info) env innerTys with (env, binds) in
      match generateEqualityBody info env ty with (id, body) in
      (env, cons (_recbind id (_eqTy ty) body) (join binds))

  -- Replaces all TmUtest expressions found in the provided AST, with support
  -- for nested utests.
  sem replaceUtests : UtestEnv -> Expr -> (UtestEnv, Expr)
  sem replaceUtests env =
  | TmDecl (x & {decl = DeclUtest t}) ->
    let info = _stringLit (info2str t.info) in
    let usingStr =
      _stringLit
        (match t.tusing with Some eqfn then
          concat "    Using: " (expr2str eqfn)
        else "")
    in
    let lty = tyTm t.test in
    let rty = tyTm t.expected in
    match
      match t.tonfail with Some ppfn then
        (env, ppfn)
      else
        match getPrettyPrintExpr t.info env lty with (env, lpp) in
        match getPrettyPrintExpr t.info env rty with (env, rpp) in
        let utestDefaultOnFailExpr =
          let ty =
            _tyarrows [
              _tyarrows [lty, _stringTy], _tyarrows [rty, _stringTy], lty, rty,
              _stringTy ]
          in
          _var (utestDefaultOnFailName ()) ty
        in
        (env, _apps utestDefaultOnFailExpr [lpp, rpp])
    with (env, ppfn) in
    match
      match t.tusing with Some eqfn then (env, eqfn)
      else
        -- NOTE(larshum, 2022-12-26): Both arguments to the utest must have the
        -- same type if no equality function was provided.
        getEqualityExpr t.info env lty
    with (env, eqfn) in
    let utestRunnerType =
      let infoTy = _stringTy in
      let usingStrTy = _stringTy in
      let ppTy = _tyarrows [lty, rty, _stringTy] in
      let eqTy = _tyarrows [lty, rty, _boolTy] in
      tyarrows_ [infoTy, usingStrTy, ppTy, eqTy, lty, rty, _unitTy]
    in
    let utestRunner = TmVar {
      ident = utestRunnerName (), ty = utestRunnerType,
      info = _utestInfo, frozen = false
    } in

    -- Insert definitions of equality and pretty-print functions that have not
    -- yet been declared.
    match generatePrettyPrintBindings t.info env [lty, rty] t.tonfail with (env, ppBinds) in
    match generateEqualityBindings t.info env lty t.tusing with (env, eqBinds) in

    match replaceUtests env t.test with (_, test) in
    match replaceUtests env t.expected with (_, expected) in
    match replaceUtests env x.inexpr with (env, next) in
    let testExpr =
      _apps utestRunner [info, usingStr, ppfn, eqfn, test, expected]
    in
    (env, bindall_ (filterOption [eqBinds, ppBinds]) (semi_ testExpr next))
  | TmDecl (x & {decl = DeclType t}) ->
    let env =
      match t.tyIdent with TyVariant _ then
        {env with variants = mapInsert t.ident (mapEmpty nameCmp) env.variants}
      else env
    in
    match replaceUtests env x.inexpr with (env, inexpr) in
    (env, TmDecl {x with inexpr = inexpr})
  | TmDecl (x & {decl = DeclConDef t}) ->
    recursive let extractVariantType = lam ty.
      match ty with TyAll {ty = innerTy} then extractVariantType innerTy
      else match ty with TyArrow {to = to} then extractVariantType to
      else match ty with TyApp {lhs = lhs} then extractVariantType lhs
      else match ty with TyCon {ident = ident} then ident
      else errorSingle [t.info] "Invalid constructor definition"
    in
    let ident = extractVariantType t.tyIdent in
    let constrs = lookupVariant ident env t.info in
    let constrs = mapInsert t.ident t.tyIdent constrs in
    let env = {env with variants = mapInsert ident constrs env.variants} in
    match replaceUtests env x.inexpr with (env, inexpr) in
    (env, TmDecl {x with inexpr = inexpr})
  | TmDecl (x & {decl = DeclLet t}) ->
    match replaceUtests env t.body with (_, body) in
    match replaceUtests env x.inexpr with (env, inexpr) in
    (env, TmDecl {x with decl = DeclLet {t with body = body}, inexpr = inexpr})
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let replaceBinding = lam env. lam bind.
      match replaceUtests env bind.body with (env, body) in
      (env, {bind with body = body})
    in
    match mapAccumL replaceBinding env t.bindings with (_, bindings) in
    match replaceUtests env x.inexpr with (env, inexpr) in
    (env, TmDecl {x with decl = DeclRecLets {t with bindings = bindings}, inexpr = inexpr})
  | t -> smapAccumL_Expr_Expr replaceUtests env t

  -- Inserts utest runtime code at the tail of the program. In case any test
  -- failed, this code ensures that the program exits with return code 1. The
  -- insertion is performed such that the final in-expression is always
  -- evaluated, regardless of whether tests failed or not.
  sem insertUtestTail : Expr -> Expr
  sem insertUtestTail =
  | TmDecl x ->
    let inexpr = insertUtestTail x.inexpr in
    TmDecl {x with inexpr = inexpr, ty = tyTm inexpr}
  | t ->
    let exitOnFailure =
      _var (utestExitOnFailureName ()) (_tyarrows [tyTm t, tyTm t]) in
    _apps exitOnFailure [t]


  sem stripUtests : Expr -> Expr
  sem stripUtests =
  | TmDecl (x & {decl = DeclUtest _}) -> stripUtests x.inexpr
  | t -> smap_Expr_Expr stripUtests t

  sem generateUtest : Bool -> Expr -> Expr
  sem generateUtest testsEnabled =
  | ast ->
    if testsEnabled then
      match replaceUtests (utestEnvEmpty ()) ast with (env, ast) in
      let ast = insertUtestTail ast in
      let ast = mergeWithHeader ast (loadUtestRuntime ()) in
      eliminateDuplicateCode ast
    else stripUtests ast
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/mexpr/utest-generate.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang =
  MExprUtestGenerate + MExprEval + MExprEq + MExprTypeCheck + MExprPrettyPrint
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_utestRuntimeLoc" kind="let">

```mc
let _utestRuntimeLoc  : String
```



<ToggleWrapper text="Code..">
```mc
let _utestRuntimeLoc = "/mexpr/utest-runtime.mc"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_utestRuntimeExpected" kind="let">

```mc
let _utestRuntimeExpected  : [String]
```



<ToggleWrapper text="Code..">
```mc
let _utestRuntimeExpected = [
  "utestRunner", "utestDefaultOnFail", "utestExitOnFailure", "defaultPprint",
  "ppBool", "ppInt", "ppFloat", "ppChar", "ppSeq", "eqBool", "eqInt",
  "eqFloat", "eqChar", "eqSeq", "join"
]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_utestRuntimeCode" kind="let">

```mc
let _utestRuntimeCode  : Ref (Option Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
let _utestRuntimeCode = ref (None ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_utestRuntimeIds" kind="let">

```mc
let _utestRuntimeIds  : Ref (Option [Name])
```



<ToggleWrapper text="Code..">
```mc
let _utestRuntimeIds = ref (None ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_pprintId" kind="let">

```mc
let _pprintId  : Ref Int
```



<ToggleWrapper text="Code..">
```mc
let _pprintId = ref 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eqId" kind="let">

```mc
let _eqId  : Ref Int
```



<ToggleWrapper text="Code..">
```mc
let _eqId = ref 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="newRecordPprintName" kind="let">

```mc
let newRecordPprintName _ : all a. a -> Name
```



<ToggleWrapper text="Code..">
```mc
let newRecordPprintName = lam.
  modref _pprintId (addi (deref _pprintId) 1);
  let idx = deref _pprintId in
  nameSym (concat "ppRecord" (int2string idx))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="newRecordEqualityName" kind="let">

```mc
let newRecordEqualityName _ : all a. a -> Name
```



<ToggleWrapper text="Code..">
```mc
let newRecordEqualityName = lam.
  modref _eqId (addi (deref _eqId) 1);
  let idx = deref _eqId in
  nameSym (concat "eqRecord" (int2string idx))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_ppSeqName" kind="let">

```mc
let _ppSeqName  : Name
```



<ToggleWrapper text="Code..">
```mc
let _ppSeqName = nameSym "ppSeq"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_ppSeqTyVarName" kind="let">

```mc
let _ppSeqTyVarName  : Name
```



<ToggleWrapper text="Code..">
```mc
let _ppSeqTyVarName = nameSym "a"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eqSeqName" kind="let">

```mc
let _eqSeqName  : Name
```



<ToggleWrapper text="Code..">
```mc
let _eqSeqName = nameSym "eqSeq"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eqSeqTyVarName" kind="let">

```mc
let _eqSeqTyVarName  : Name
```



<ToggleWrapper text="Code..">
```mc
let _eqSeqTyVarName = nameSym "a"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_ppTensorName" kind="let">

```mc
let _ppTensorName  : Name
```



<ToggleWrapper text="Code..">
```mc
let _ppTensorName = nameSym "ppTensor"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_ppTensorTyVarName" kind="let">

```mc
let _ppTensorTyVarName  : Name
```



<ToggleWrapper text="Code..">
```mc
let _ppTensorTyVarName = nameSym "a"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eqTensorName" kind="let">

```mc
let _eqTensorName  : Name
```



<ToggleWrapper text="Code..">
```mc
let _eqTensorName = nameSym "eqTensor"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eqTensorTyVarName" kind="let">

```mc
let _eqTensorTyVarName  : Name
```



<ToggleWrapper text="Code..">
```mc
let _eqTensorTyVarName = nameSym "a"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_builtinTypes" kind="let">

```mc
let _builtinTypes  : [Name]
```



<ToggleWrapper text="Code..">
```mc
let _builtinTypes = map (lam x. x.1) builtinTypes
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_utestInfo" kind="let">

```mc
let _utestInfo  : Info
```



<ToggleWrapper text="Code..">
```mc
let _utestInfo =
  let pos = initPos "utest-generated" in
  makeInfo pos pos
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_boolTy" kind="let">

```mc
let _boolTy  : Ast_Type
```

<Description>{`AST builder functions defined specifically for the utest generation. These  
include an info\-field to signify the origin of the generated code, and they  
require concrete type information.  
NOTE\(larshum, 2022\-12\-30\): Should these be merged with the AST\-builder  
functions?`}</Description>


<ToggleWrapper text="Code..">
```mc
let _boolTy = use MExprAst in TyBool {info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_intTy" kind="let">

```mc
let _intTy  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _intTy = use MExprAst in TyInt {info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_charTy" kind="let">

```mc
let _charTy  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _charTy = use MExprAst in TyChar {info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_floatTy" kind="let">

```mc
let _floatTy  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _floatTy = use MExprAst in TyFloat {info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_seqTy" kind="let">

```mc
let _seqTy ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _seqTy = lam ty.
  use MExprAst in
  TySeq {ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_stringTy" kind="let">

```mc
let _stringTy  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _stringTy = _seqTy _charTy
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorTy" kind="let">

```mc
let _tensorTy ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _tensorTy = lam ty.
  use MExprAst in
  TyTensor {ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_conTy" kind="let">

```mc
let _conTy id d : Name -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _conTy = lam id. lam d.
  use MExprAst in
  TyCon {ident = id, data = d, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_varTy" kind="let">

```mc
let _varTy id : Name -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _varTy = lam id.
  use MExprAst in
  TyVar {ident = id, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_recordTy" kind="let">

```mc
let _recordTy fields : [(String, Ast_Type)] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _recordTy = lam fields.
  use MExprAst in
  let fields = map (lam f. match f with (s, ty) in (stringToSid s, ty)) fields in
  TyRecord {fields = mapFromSeq cmpSID fields, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tupleTy" kind="let">

```mc
let _tupleTy types : [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _tupleTy = lam types.
  _recordTy (mapi (lam i. lam ty. (int2string i, ty)) types)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_unitTy" kind="let">

```mc
let _unitTy  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _unitTy = _recordTy []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tyarrows" kind="let">

```mc
let _tyarrows tys : [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _tyarrows = lam tys.
  use MExprAst in
  foldr1
    (lam ty. lam acc. TyArrow {from = ty, to = acc, info = _utestInfo})
    tys
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tyalls" kind="let">

```mc
let _tyalls vars ty : [Name] -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _tyalls = lam vars. lam ty.
  use MExprAst in
  if null vars then error "" else
  foldr
    (lam tyvar. lam acc.
      TyAll {ident = tyvar, kind = Poly (), ty = acc,
             info = _utestInfo})
    ty vars
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_pprintTy" kind="let">

```mc
let _pprintTy ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let _pprintTy = lam ty.
  use MExprAst in
  match ty with TySeq {ty = elemTy} | TyTensor {ty = elemTy} then
    _tyarrows [_tyarrows [elemTy, _stringTy], ty, _stringTy]
  else _tyarrows [ty, _stringTy]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_patVar" kind="let">

```mc
let _patVar id ty : Name -> Ast_Type -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let _patVar = lam id. lam ty.
  use MExprAst in
  PatNamed {ident = PName id, ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_patBool" kind="let">

```mc
let _patBool b : Bool -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let _patBool = lam b.
  use MExprAst in
  PatBool {val = b, ty = _boolTy, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_patRecord" kind="let">

```mc
let _patRecord bindings ty : [(String, Ast_Pat)] -> Ast_Type -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let _patRecord = lam bindings. lam ty.
  use MExprAst in
  let bindings = map (lam b. match b with (s, p) in (stringToSid s, p)) bindings in
  PatRecord {bindings = mapFromSeq cmpSID bindings, ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_patTuple" kind="let">

```mc
let _patTuple args ty : [Ast_Pat] -> Ast_Type -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let _patTuple = lam args. lam ty.
  let binds = mapi (lam i. lam arg. (int2string i, arg)) args in
  _patRecord binds ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_patCon" kind="let">

```mc
let _patCon id subpat ty : Name -> Ast_Pat -> Ast_Type -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let _patCon = lam id. lam subpat. lam ty.
  use MExprAst in
  PatCon {ident = id, subpat = subpat, ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_bool" kind="let">

```mc
let _bool b : Bool -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _bool = lam b.
  use MExprAst in
  TmConst {val = CBool {val = b}, ty = _boolTy, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_true" kind="let">

```mc
let _true  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _true = _bool true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_false" kind="let">

```mc
let _false  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _false = _bool false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_var" kind="let">

```mc
let _var id ty : Name -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _var = lam id. lam ty.
  use MExprAst in
  TmVar {ident = id, ty = ty, info = _utestInfo, frozen = false}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_lam" kind="let">

```mc
let _lam id ty body : Name -> Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _lam = lam id. lam ty. lam body.
  use MExprAst in
  TmLam {ident = id, tyAnnot = ty, tyParam = ty, body = body,
         ty = _tyarrows [ty, tyTm body], info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_seq" kind="let">

```mc
let _seq tms ty : [Ast_Expr] -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _seq = lam tms. lam ty.
  use MExprAst in
  TmSeq {tms = tms,  ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_stringLit" kind="let">

```mc
let _stringLit s : String -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _stringLit = lam s.
  use MExprAst in
  let char2tm = lam c.
    TmConst {val = CChar {val = c}, ty = _charTy, info = _utestInfo}
  in
  _seq (map char2tm s) _stringTy
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_record" kind="let">

```mc
let _record binds ty : [(String, Ast_Expr)] -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _record = lam binds. lam ty.
  use MExprAst in
  let binds = map (lam b. match b with (s, e) in (stringToSid s, e)) binds in
  TmRecord {bindings = mapFromSeq cmpSID binds, ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tuple" kind="let">

```mc
let _tuple exprs ty : [Ast_Expr] -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _tuple = lam exprs. lam ty.
  let exprs = mapi (lam i. lam e. (int2string i, e)) exprs in
  _record exprs ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_match" kind="let">

```mc
let _match target pat thn els ty : Ast_Expr -> Ast_Pat -> Ast_Expr -> Ast_Expr -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _match = lam target. lam pat. lam thn. lam els. lam ty.
  use MExprAst in
  TmMatch {
    target = target, pat = pat, thn = thn, els = els,
    ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_never" kind="let">

```mc
let _never ty : Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _never = lam ty.
  use MExprAst in
  TmNever {ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_recordproj" kind="let">

```mc
let _recordproj key fieldTy r : SID -> Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _recordproj = lam key. lam fieldTy. lam r.
  use MExprAst in
  let fieldId = nameSym "x" in
  _match r
    (_patRecord [(sidToString key, _patVar fieldId fieldTy)] (tyTm r))
    (_var fieldId fieldTy) (_never fieldTy) fieldTy
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_unit" kind="let">

```mc
let _unit  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _unit = _record [] _unitTy
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_recbind" kind="let">

```mc
let _recbind id ty body : all a. all a1. all a2. a -> a1 -> a2 -> {body: a2, info: Info, ident: a, tyBody: a1, tyAnnot: a1}
```



<ToggleWrapper text="Code..">
```mc
let _recbind = lam id. lam ty. lam body.
  use MExprAst in
  {ident = id, tyAnnot = ty, tyBody = ty, body = body, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_apps" kind="let">

```mc
let _apps fun args : Ast_Expr -> [Ast_Expr] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _apps = lam fun. lam args.
  use MExprAst in
  foldl
    (lam acc. lam arg.
      match tyTm acc with TyArrow {to = to} then
        TmApp {lhs = acc, rhs = arg, ty = to, info = _utestInfo}
      else error "Invalid type of utest application")
    fun args
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_const" kind="let">

```mc
let _const c ty : ConstAst_Const -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _const = lam c. lam ty.
  use MExprAst in
  TmConst {val = c, ty = ty, info = _utestInfo}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_concat" kind="let">

```mc
let _concat  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _concat =
  use MExprAst in
  _const (CConcat ()) (_tyarrows [_stringTy, _stringTy, _stringTy])
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

use TestLang in

let emptyEnv = utestEnvEmpty () in

let maybeBind_ = lam binds. lam tm.
  match binds with Some bind
  then bind_ bind tm
  else tm in

let eval = lam env. lam e.
  let e = mergeWithHeader e (loadUtestRuntime ()) in
  eval (evalCtxEmpty ()) e
in

let evalEquality : UtestEnv -> Type -> Expr -> Expr -> Expr =
  lam env. lam ty. lam l. lam r.
  match getEqualityExpr (NoInfo ()) env ty with (env, expr) in
  match generateEqualityBindings (NoInfo ()) env ty (None ()) with (env, binds) in
  eval env (maybeBind_ binds (appf2_ expr l r))
in

let evalPrettyPrint : UtestEnv -> Type -> Expr -> Expr =
  lam env. lam ty. lam t.
  match getPrettyPrintExpr (NoInfo ()) env ty with (env, expr) in
  match generatePrettyPrintBindings (NoInfo ()) env [ty] (None ()) with (env, binds) in
  eval env (maybeBind_ binds (app_ expr t))
in

let i1 = const_ tyint_ (CInt {val = 1}) in
let i2 = const_ tyint_ (CInt {val = 2}) in
utest evalPrettyPrint emptyEnv tyint_ i1 with str_ "1" using eqExpr in
utest evalPrettyPrint emptyEnv tyint_ i2 with str_ "2" using eqExpr in
utest evalEquality emptyEnv tyint_ i1 i2 with false_ using eqExpr in
utest evalEquality emptyEnv tyint_ i2 i2 with true_ using eqExpr in

let c1 = const_ tychar_ (CChar {val = 'a'}) in
let c2 = const_ tychar_ (CChar {val = 'b'}) in
utest evalPrettyPrint emptyEnv tychar_ c1 with str_ "'a'" using eqExpr in
utest evalPrettyPrint emptyEnv tychar_ c2 with str_ "'b'" using eqExpr in
utest evalEquality emptyEnv tychar_ c1 c2 with false_ using eqExpr in
utest evalEquality emptyEnv tychar_ c1 c1 with true_ using eqExpr in

let bt = const_ tybool_ (CBool {val = true}) in
let bf = const_ tybool_ (CBool {val = false}) in
utest evalPrettyPrint emptyEnv tybool_ bt with str_ "true" using eqExpr in
utest evalPrettyPrint emptyEnv tybool_ bf with str_ "false" using eqExpr in
utest evalEquality emptyEnv tybool_ bt bf with false_ using eqExpr in
utest evalEquality emptyEnv tybool_ bf bf with true_ using eqExpr in

let f1 = const_ tyfloat_ (CFloat {val = 2.5}) in
let f2 = const_ tyfloat_ (CFloat {val = 2.6}) in
utest evalPrettyPrint emptyEnv tyfloat_ f1 with str_ "2.5" using eqExpr in
utest evalPrettyPrint emptyEnv tyfloat_ f2 with str_ "2.6" using eqExpr in
utest evalEquality emptyEnv tyfloat_ f1 f2 with false_ using eqExpr in
utest evalEquality emptyEnv tyfloat_ f1 f1 with true_ using eqExpr in

let ty = tyseq_ tyint_ in
let s1 = TmSeq {tms = [i1, i2], ty = ty, info = NoInfo ()} in
let s2 = TmSeq {tms = [i1, i2, i1], ty = ty, info = NoInfo ()} in
let s3 = TmSeq {tms = [], ty = ty, info = NoInfo ()} in
utest evalPrettyPrint emptyEnv ty s1 with str_ "[1,2]" using eqExpr in
utest evalPrettyPrint emptyEnv ty s2 with str_ "[1,2,1]" using eqExpr in
utest evalPrettyPrint emptyEnv ty s3 with str_ "[]" using eqExpr in
utest evalEquality emptyEnv ty s3 s3 with true_ using eqExpr in
utest evalEquality emptyEnv ty s1 s2 with false_ using eqExpr in
utest evalEquality emptyEnv ty s2 s1 with false_ using eqExpr in
utest evalEquality emptyEnv ty s1 s1 with true_ using eqExpr in

let t1 = tensorCreate_ tyint_ (TmSeq {tms = [i1], ty = ty, info = NoInfo ()})
  (lam_ "" (tyseq_ tyint_) i1) in
let t2 = tensorCreate_ tyint_ (TmSeq {tms = [i2], ty = ty, info = NoInfo ()})
  (lam_ "" (tyseq_ tyint_) i1) in
let ty = tytensor_ tyint_ in
utest evalPrettyPrint emptyEnv ty t1 with str_ "[1]" using eqExpr in
utest evalPrettyPrint emptyEnv ty t2 with str_ "[1, 1]" using eqExpr in
utest evalEquality emptyEnv ty t1 t1 with true_ using eqExpr in
utest evalEquality emptyEnv ty t1 t2 with false_ using eqExpr in
utest evalEquality emptyEnv ty t2 t1 with false_ using eqExpr in
utest evalEquality emptyEnv ty t2 t2 with true_ using eqExpr in

let ty = tytuple_ [tyint_, tyfloat_, tybool_, tychar_] in
let r1 = tuple_ ty [i1, f1, bf, c1] in
let r2 = tuple_ ty [i1, f1, bt, c1] in
utest evalPrettyPrint emptyEnv ty r1 with str_ "(1, 2.5, false, 'a')" using eqExpr in
utest evalPrettyPrint emptyEnv ty r2 with str_ "(1, 2.5, true, 'a')" using eqExpr in
utest evalEquality emptyEnv ty r1 r1 with true_ using eqExpr in
utest evalEquality emptyEnv ty r1 r2 with false_ using eqExpr in
utest evalEquality emptyEnv ty r2 r1 with false_ using eqExpr in
utest evalEquality emptyEnv ty r2 r2 with true_ using eqExpr in

let ty = tytuple_ [] in
let r = tuple_ ty [] in
utest evalPrettyPrint emptyEnv ty r with str_ "{}" using eqExpr in
utest evalEquality emptyEnv ty r r with true_ using eqExpr in

let r1 = urecord_ [("a", i1), ("b", f1), ("c", bf), ("d", c1)] in
let r2 = urecord_ [("a", i1), ("b", f1), ("c", bf), ("d", c2)] in
let ty = tyrecord_ [("a", tyint_), ("b", tyfloat_), ("c", tybool_), ("d", tychar_)] in
utest evalPrettyPrint emptyEnv ty r1 with str_ "{a = 1, b = 2.5, c = false, d = 'a'}"
using eqExpr in
utest evalPrettyPrint emptyEnv ty r2 with str_ "{a = 1, b = 2.5, c = false, d = 'b'}"
using eqExpr in
utest evalEquality emptyEnv ty r1 r1 with true_ using eqExpr in
utest evalEquality emptyEnv ty r1 r2 with false_ using eqExpr in
utest evalEquality emptyEnv ty r2 r1 with false_ using eqExpr in
utest evalEquality emptyEnv ty r2 r2 with true_ using eqExpr in

let treeId = nameSym "Tree" in
let leafId = nameSym "Leaf" in
let emptyLeafId = nameSym "EmptyLeaf" in
let branchId = nameSym "Branch" in
let treeTy = tyapp_ (ntycon_ treeId) (tyvar_ "a") in
let constrs = mapFromSeq nameCmp
  [ (leafId, tyall_ "a" (tyarrow_ (tyvar_ "a") treeTy))
  , (emptyLeafId, tyall_ "a" (tyarrow_ tyunit_ treeTy))
  , (branchId, tyall_ "a" (tyarrow_ (tytuple_ [treeTy, treeTy]) treeTy))
  ] in
let env = {emptyEnv with variants = mapFromSeq nameCmp [(treeId, constrs)]} in
let c1 = nconapp_ leafId i1 in
let c2 = nconapp_ leafId i2 in
let c3 = nconapp_ emptyLeafId unit_ in
let c4 = nconapp_ branchId (utuple_ [c1, c3]) in
let c5 = nconapp_ branchId (utuple_ [c3, c1]) in
let ty = tyapp_ (ntycon_ treeId) tyint_ in
utest evalPrettyPrint env ty c1 with str_ "Leaf 1" using eqExpr in
utest evalPrettyPrint env ty c2 with str_ "Leaf 2" using eqExpr in
utest evalPrettyPrint env ty c3 with str_ "EmptyLeaf {}" using eqExpr in
utest evalPrettyPrint env ty c4 with str_ "Branch (Leaf 1, EmptyLeaf {})" using eqExpr in
utest evalPrettyPrint env ty c5 with str_ "Branch (EmptyLeaf {}, Leaf 1)" using eqExpr in
utest evalEquality env ty c1 c1 with true_ using eqExpr in
utest evalEquality env ty c1 c2 with false_ using eqExpr in
utest evalEquality env ty c3 c3 with true_ using eqExpr in
utest evalEquality env ty c1 c3 with false_ using eqExpr in
utest evalEquality env ty c1 c4 with false_ using eqExpr in
utest evalEquality env ty c4 c5 with false_ using eqExpr in
utest evalEquality env ty c4 c4 with true_ using eqExpr in
utest evalEquality env ty c5 c5 with true_ using eqExpr in

let symTy = ntycon_ (mapFindExn "Symbol" builtinTypeNames) in
let s = gensym_ unit_ in
utest evalEquality env symTy s s with false_ using eqExpr in
utest match expr2str (evalPrettyPrint env symTy s) with "\"sym (" ++ _ ++ ")\"" then true else false
with true in

let refTy = tyapp_ (ntycon_ (mapFindExn "Ref" builtinTypeNames)) tyint_ in
let r = ref_ (int_ 0) in
utest evalPrettyPrint env refTy r with str_ "<ref>" using eqExpr in

()
```
</ToggleWrapper>
</DocBlock>

