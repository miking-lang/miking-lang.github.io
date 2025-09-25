import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestBase  
  

The base fragment for the utest generation. This defines the utest  
environment as well as basic functions used in the generation of utest code.

  
  
  
## Types  
  

          <DocBlock title="UtestEnv" kind="type">

```mc
type UtestEnv : { pprint: Map Type Name, eq: Map Type Name, pprintDef: Set Type, eqDef: Set Type, variants: Map Name (Map Name Type) }
```



<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```

<Description>{`NOTE\(larshum, 2022\-12\-26\): We customize the comparison of types such that  
all sequence and tensor types are considered equal. This is because we  
reuse the polymorphic functions for printing and equality for all sequence  
and tensor types.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TySeq _, TySeq _) -> 0
  | (TyTensor _, TyTensor _) -> 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestEnvEmpty" kind="sem">

```mc
sem utestEnvEmpty : () -> UtestBase_UtestEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem utestEnvEmpty =
  | _ ->
    let baseTypes = [_boolTy, _intTy, _charTy, _floatTy] in
    { eq = mapEmpty cmpType, eqDef = setOfSeq cmpType baseTypes
    , pprint = mapEmpty cmpType, pprintDef = setOfSeq cmpType baseTypes
    , variants = mapEmpty nameCmp }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lookupVariant" kind="sem">

```mc
sem lookupVariant : Name -> UtestBase_UtestEnv -> Info -> Map Name Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lookupVariant id env =
  | info ->
    match mapLookup id env.variants with Some constrs then constrs
    else errorSingle [info] "Unknown constructor type"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unwrapAlias" kind="sem">

```mc
sem unwrapAlias : Ast_Type -> Ast_Type
```

<Description>{`Performs an unwrapping of all alias types.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unwrapAlias =
  | ty -> smap_Type_Type unwrapAlias (unwrapType ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowInnerTypes" kind="sem">

```mc
sem shallowInnerTypes : UtestBase_UtestEnv -> Ast_Type -> [Ast_Type]
```

<Description>{`Produces a sequence of the direct "child" types of a given type.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem shallowInnerTypes env =
  | ty ->
    let types = shallowInnerTypesH env ty in
    map unwrapAlias types
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowInnerTypesH" kind="sem">

```mc
sem shallowInnerTypesH : UtestBase_UtestEnv -> Ast_Type -> [Ast_Type]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getPrettyPrintExpr" kind="sem">

```mc
sem getPrettyPrintExpr : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, Ast_Expr)
```

<Description>{`Generates an expression of type 'ty \-\> String' which we can use to  
pretty\-print a value of type 'ty'.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getPrettyPrintExpr info env =
  | ty -> getPrettyPrintExprH info env (unwrapAlias ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getPrettyPrintExprH" kind="sem">

```mc
sem getPrettyPrintExprH : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getEqualityExpr" kind="sem">

```mc
sem getEqualityExpr : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, Ast_Expr)
```

<Description>{`Generates an expression of type 'ty \-\> ty \-\> bool' which we can use to  
determine equality of values of type 'ty'.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getEqualityExpr info env =
  | ty -> getEqualityExprH info env (unwrapAlias ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getEqualityExprH" kind="sem">

```mc
sem getEqualityExprH : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prettyPrintId" kind="sem">

```mc
sem prettyPrintId : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, Name)
```

<Description>{`Generates an identifier for the pretty\-print or equality function for a  
given type, respectively. We use this before generating the bodies of the  
functions to avoid infinite recursion when handling recursive ADTs.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem prettyPrintId : Info -> UtestEnv -> Type -> (UtestEnv, Name)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="equalityId" kind="sem">

```mc
sem equalityId : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, Name)
```



<ToggleWrapper text="Code..">
```mc
sem equalityId : Info -> UtestEnv -> Type -> (UtestEnv, Name)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generatePrettyPrintBody" kind="sem">

```mc
sem generatePrettyPrintBody : Info -> UtestBase_UtestEnv -> Ast_Type -> (Name, Ast_Expr)
```

<Description>{`Generates a body for the pretty\-print or equality functions of a given  
type. These functions must be used after their corresponding functions  
above, so that an ID has already been generated for the tpye.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generatePrettyPrintBody : Info -> UtestEnv -> Type -> (Name, Expr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateEqualityBody" kind="sem">

```mc
sem generateEqualityBody : Info -> UtestBase_UtestEnv -> Ast_Type -> (Name, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem generateEqualityBody : Info -> UtestEnv -> Type -> (Name, Expr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectTypeArguments" kind="sem">

```mc
sem collectTypeArguments : [Ast_Type] -> Ast_Type -> (Name, [Ast_Type])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectTypeArguments args =
  | TyApp {lhs = lhs, rhs = rhs} ->
    collectTypeArguments (cons rhs args) lhs
  | TyCon {ident = ident} -> (ident, args)
  | ty -> errorSingle [infoTy ty] "Unexpected shape of type application"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="specializeConstructorArgument" kind="sem">

```mc
sem specializeConstructorArgument : [Ast_Type] -> Name -> Ast_Type -> Ast_Type
```

<Description>{`Specializes the argument type of a constructor given the type of the  
applied arguments.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem specializeConstructorArgument tyArgs key =
  | constructorType ->
    specializeConstructorArgumentH (mapEmpty nameCmp) (tyArgs, constructorType)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="specializeConstructorArgumentH" kind="sem">

```mc
sem specializeConstructorArgumentH : Map Name Ast_Type -> ([Ast_Type], Ast_Type) -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem specializeConstructorArgumentH subMap =
  | ([], TyArrow {from = argTy, info = info}) -> substituteVars info subMap argTy
  | (tyArgs, TyAll {kind = Data _, ty = ty}) ->
    specializeConstructorArgumentH subMap (tyArgs, ty)
  | ([tyArg] ++ tyArgs, TyAll {ident = ident, ty = ty, kind = !Data _}) ->
    specializeConstructorArgumentH
      (mapInsert ident tyArg subMap) (tyArgs, ty)
  | (_, ty) -> errorSingle [infoTy ty] "Invalid constructor application"
```
</ToggleWrapper>
</DocBlock>

