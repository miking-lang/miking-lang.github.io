import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MonomorphizeInstantiate  
  

  
  
  
## Semantics  
  

          <DocBlock title="findTypeInstantiation" kind="sem">

```mc
sem findTypeInstantiation : Ast_Type -> Ast_Type -> Monomorphize_Instantiation
```

<Description>{`Given a polymorphic type and a corresponding monomorphic type, we find the  
type instantiation this corresponds to.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findTypeInstantiation polyType =
  | monoType ->
    let polyType = inspectType polyType in
    let inst = inferInstantiation (emptyInstantiation ()) (polyType, monoType) in
    -- NOTE(larshum, 2023-08-03): If any resulting type contains a TyUnknown,
    -- we can replace it by any time. For consistency, we always use the unit
    -- type.
    mapMapWithKey (lam. lam ty. replaceUnknownWithUnit ty) inst
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constructTypeInstantiation" kind="sem">

```mc
sem constructTypeInstantiation : [Name] -> [Ast_Type] -> Monomorphize_Instantiation
```

<Description>{`Given the type parameter identifiers and the monomorphic types they are  
mapped to, we construct an instantiation.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constructTypeInstantiation paramIds =
  | paramTypes ->
    let inst = mapFromSeq nameCmp (zip paramIds paramTypes) in
    mapMapWithKey (lam. lam ty. replaceUnknownWithUnit ty) inst
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="replaceUnknownWithUnit" kind="sem">

```mc
sem replaceUnknownWithUnit : Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem replaceUnknownWithUnit =
  | TyUnknown {info = info} -> TyRecord {fields = mapEmpty cmpSID, info = info}
  | ty -> smap_Type_Type replaceUnknownWithUnit ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inferInstantiation" kind="sem">

```mc
sem inferInstantiation : Monomorphize_Instantiation -> (Ast_Type, Ast_Type) -> Monomorphize_Instantiation
```

<Description>{`Infers the instantiation of type variables represented by a monomorphic  
types and its corresponding polymorphic type.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inferInstantiation inst =
  | (lty, rty) ->
    inferInstantiationH inst (inspectType lty, inspectType rty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inferInstantiationH" kind="sem">

```mc
sem inferInstantiationH : Monomorphize_Instantiation -> (Ast_Type, Ast_Type) -> Monomorphize_Instantiation
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inferInstantiationH inst =
  | (TyVar {ident = ident}, monoType) ->
    mapInsert ident monoType inst
  | (TyArrow l, TyArrow r) ->
    let inst = inferInstantiation inst (l.from, r.from) in
    inferInstantiation inst (l.to, r.to)
  | (TySeq l, TySeq r) ->
    inferInstantiation inst (l.ty, r.ty)
  | (TyTensor l, TyTensor r) ->
    inferInstantiation inst (l.ty, r.ty)
  | (TyRecord l, TyRecord r) ->
    let mergefn = lam lhs. lam rhs.
      match (lhs, rhs) with (Some lty, Some rty) then
        Some (lty, rty)
      else
        monoError [l.info, r.info] "Record type field mismatch"
    in
    let f = lam inst. lam. lam tyPair.
      inferInstantiation inst tyPair
    in
    mapFoldWithKey f inst (mapMerge mergefn l.fields r.fields)
  | (TyApp l, TyApp r) ->
    let inst = inferInstantiation inst (l.lhs, r.lhs) in
    inferInstantiation inst (l.rhs, r.rhs)
  | (TyAlias l, TyAlias r) ->
    inferInstantiation inst (l.display, r.display)
  | (lty, rty) ->
    -- NOTE(larshum, 2023-08-03): In other cases, we accept the type and ignore
    -- its contents if both types have the same constructor tag.
    if eqi (constructorTag lty) (constructorTag rty) then inst
    else
      monoError [infoTy lty, infoTy rty] "Unsupported polymorphic type instantiation"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instantiatePolymorphicExpr" kind="sem">

```mc
sem instantiatePolymorphicExpr : Monomorphize_Instantiation -> Ast_Expr -> Ast_Expr
```

<Description>{`Applies an instantiation on a provided expression, producing a  
monomorphized expression over those variables.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem instantiatePolymorphicExpr inst =
  | t ->
    let t = smap_Expr_Expr (instantiatePolymorphicExpr inst) t in
    let t = smap_Expr_Type (instantiatePolymorphicType inst) t in
    let t = smap_Expr_TypeLabel (instantiatePolymorphicType inst) t in
    let t = smap_Expr_Pat (instantiatePolymorphicPat inst) t in
    withType (instantiatePolymorphicType inst (tyTm t)) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instantiatePolymorphicPat" kind="sem">

```mc
sem instantiatePolymorphicPat : Monomorphize_Instantiation -> Ast_Pat -> Ast_Pat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem instantiatePolymorphicPat inst =
  | p ->
    let p = smap_Pat_Pat (instantiatePolymorphicPat inst) p in
    withTypePat (instantiatePolymorphicType inst (tyPat p)) p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instantiatePolymorphicType" kind="sem">

```mc
sem instantiatePolymorphicType : Monomorphize_Instantiation -> Ast_Type -> Ast_Type
```

<Description>{`Applies an instantiation to a provided polymorphic type to produce a  
monomorphized type with respect to the instantiated variables.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem instantiatePolymorphicType inst =
  | TyVar t ->
    match mapLookup t.ident inst with Some ty then ty
    else TyVar t
  | TyAll t -> instantiatePolymorphicType inst t.ty
  | ty -> smap_Type_Type (instantiatePolymorphicType inst) ty
```
</ToggleWrapper>
</DocBlock>

