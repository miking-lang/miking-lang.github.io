import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Ast  
  

Shared fragment

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Decl" kind="syn">

```mc
syn Decl
```



<ToggleWrapper text="Code..">
```mc
syn Decl =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Kind" kind="syn">

```mc
syn Kind
```



<ToggleWrapper text="Code..">
```mc
syn Kind =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Pat" kind="syn">

```mc
syn Pat
```



<ToggleWrapper text="Code..">
```mc
syn Pat =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm: Expr -> Info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm: Expr -> Type
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfo" kind="sem">

```mc
sem withInfo : Info -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withInfo: Info -> Expr -> Expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType: Type -> Expr -> Expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoPat" kind="sem">

```mc
sem infoPat : Ast_Pat -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoPat: Pat -> Info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyPat" kind="sem">

```mc
sem tyPat : Ast_Pat -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyPat: Pat -> Type
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfoPat" kind="sem">

```mc
sem withInfoPat : Info -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem withInfoPat: Info -> Pat -> Pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withTypePat" kind="sem">

```mc
sem withTypePat : Ast_Type -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem withTypePat: Type -> Pat -> Pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoDecl" kind="sem">

```mc
sem infoDecl : Ast_Decl -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoDecl: Decl -> Info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declWithInfo" kind="sem">

```mc
sem declWithInfo : Info -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
sem declWithInfo: Info -> Decl -> Decl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTy" kind="sem">

```mc
sem infoTy : Ast_Type -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTy: Type -> Info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyWithInfo" kind="sem">

```mc
sem tyWithInfo : Info -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyWithInfo: Info -> Type -> Type
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_Expr" kind="sem">

```mc
sem smapAccumL_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Expr f acc =
  | p -> (acc, p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Expr_Expr" kind="sem">

```mc
sem smap_Expr_Expr : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Expr_Expr f =
  | p ->
    let res = smapAccumL_Expr_Expr (lam. lam a. ((), f a)) () p in
    res.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Expr_Expr" kind="sem">

```mc
sem sfold_Expr_Expr : all acc. (acc -> Ast_Expr -> acc) -> acc -> Ast_Expr -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Expr_Expr f acc =
  | p ->
    let res = smapAccumL_Expr_Expr (lam acc. lam a. (f acc a, a)) acc p in
    res.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumLPre_Expr_Expr" kind="sem">

```mc
sem mapAccumLPre_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccumLPre_Expr_Expr f acc =
  | expr ->
    match f acc expr with (acc,expr) in
    smapAccumL_Expr_Expr (mapAccumLPre_Expr_Expr f) acc expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumLPost_Expr_Expr" kind="sem">

```mc
sem mapAccumLPost_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccumLPost_Expr_Expr f acc =
  | expr ->
    match smapAccumL_Expr_Expr (mapAccumLPost_Expr_Expr f) acc expr with (acc,expr) in
    f acc expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapPre_Expr_Expr" kind="sem">

```mc
sem mapPre_Expr_Expr : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapPre_Expr_Expr f =
  | expr ->
    let expr = f expr in
    smap_Expr_Expr (mapPre_Expr_Expr f) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapPost_Expr_Expr" kind="sem">

```mc
sem mapPost_Expr_Expr : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapPost_Expr_Expr f =
  | expr -> f (smap_Expr_Expr (mapPost_Expr_Expr f) expr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldPre_Expr_Expr" kind="sem">

```mc
sem foldPre_Expr_Expr : all acc. (acc -> Ast_Expr -> acc) -> acc -> Ast_Expr -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem foldPre_Expr_Expr f acc =
  | expr ->
    let acc = f acc expr in
    sfold_Expr_Expr (foldPre_Expr_Expr f) acc expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldPost_Expr_Expr" kind="sem">

```mc
sem foldPost_Expr_Expr : all acc. (acc -> Ast_Expr -> acc) -> acc -> Ast_Expr -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem foldPost_Expr_Expr f acc =
  | expr ->
    f (sfold_Expr_Expr (foldPost_Expr_Expr f) acc expr) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_Type" kind="sem">

```mc
sem smapAccumL_Expr_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```

<Description>{`NOTE\(vipa, 2021\-05\-28\): This function \*does not\* touch the \`ty\`  
field. It only covers nodes in the AST, so to speak, not  
annotations thereof.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Type f acc =
  | p -> (acc, p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Expr_Type" kind="sem">

```mc
sem smap_Expr_Type : (Ast_Type -> Ast_Type) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Expr_Type f =
  | p ->
    let res = smapAccumL_Expr_Type (lam. lam a. ((), f a)) () p in
    res.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Expr_Type" kind="sem">

```mc
sem sfold_Expr_Type : all acc. (acc -> Ast_Type -> acc) -> acc -> Ast_Expr -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Expr_Type f acc =
  | p ->
    let res = smapAccumL_Expr_Type (lam acc. lam a. (f acc a, a)) acc p in
    res.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_TypeLabel" kind="sem">

```mc
sem smapAccumL_Expr_TypeLabel : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```

<Description>{`NOTE\(aathn, 2022\-11\-15\): This function covers the compiler\-added annotations  
which are not touched by smapAccumL\_Expr\_Type.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_TypeLabel f acc =
  | p ->
    match f acc (tyTm p) with (acc, ty) in
    (acc, withType ty p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Expr_TypeLabel" kind="sem">

```mc
sem smap_Expr_TypeLabel : (Ast_Type -> Ast_Type) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Expr_TypeLabel f =
  | p ->
    let res = smapAccumL_Expr_TypeLabel (lam. lam a. ((), f a)) () p in
    res.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Expr_TypeLabel" kind="sem">

```mc
sem sfold_Expr_TypeLabel : all acc. (acc -> Ast_Type -> acc) -> acc -> Ast_Expr -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Expr_TypeLabel f acc =
  | p ->
    let res = smapAccumL_Expr_TypeLabel (lam acc. lam a. (f acc a, a)) acc p in
    res.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_Pat" kind="sem">

```mc
sem smapAccumL_Expr_Pat : all acc. (acc -> Ast_Pat -> (acc, Ast_Pat)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Pat f acc =
  | p -> (acc, p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Expr_Pat" kind="sem">

```mc
sem smap_Expr_Pat : (Ast_Pat -> Ast_Pat) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Expr_Pat f =
  | p ->
    match smapAccumL_Expr_Pat (lam. lam a. ((), f a)) () p with (_, p) in
    p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Expr_Pat" kind="sem">

```mc
sem sfold_Expr_Pat : all acc. (acc -> Ast_Pat -> acc) -> acc -> Ast_Expr -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Expr_Pat f acc =
  | p ->
    match smapAccumL_Expr_Pat (lam acc. lam a. (f acc a, a)) acc p
    with (acc, _) in acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Expr" kind="sem">

```mc
sem smapAccumL_Decl_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Expr f acc = | d -> (acc, d)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Decl_Expr" kind="sem">

```mc
sem smap_Decl_Expr : (Ast_Expr -> Ast_Expr) -> Ast_Decl -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Decl_Expr f = | d -> (smapAccumL_Decl_Expr (lam. lam a. ((), f a)) () d).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Decl_Expr" kind="sem">

```mc
sem sfold_Decl_Expr : all acc. (acc -> Ast_Expr -> acc) -> acc -> Ast_Decl -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Decl_Expr f acc = | d -> (smapAccumL_Decl_Expr (lam acc. lam a. (f acc a, a)) acc d).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Type" kind="sem">

```mc
sem smapAccumL_Decl_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Type f acc = | d -> (acc, d)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Decl_Type" kind="sem">

```mc
sem smap_Decl_Type : (Ast_Type -> Ast_Type) -> Ast_Decl -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Decl_Type f = | d -> (smapAccumL_Decl_Type (lam. lam a. ((), f a)) () d).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Decl_Type" kind="sem">

```mc
sem sfold_Decl_Type : all acc. (acc -> Ast_Type -> acc) -> acc -> Ast_Decl -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Decl_Type f acc = | d -> (smapAccumL_Decl_Type (lam acc. lam a. (f acc a, a)) acc d).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_TypeLabel" kind="sem">

```mc
sem smapAccumL_Decl_TypeLabel : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_TypeLabel f acc = | d -> (acc, d)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Decl_TypeLabel" kind="sem">

```mc
sem smap_Decl_TypeLabel : (Ast_Type -> Ast_Type) -> Ast_Decl -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Decl_TypeLabel f =
  | p ->
    let res = smapAccumL_Decl_TypeLabel (lam. lam a. ((), f a)) () p in
    res.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Decl_TypeLabel" kind="sem">

```mc
sem sfold_Decl_TypeLabel : all acc. (acc -> Ast_Type -> acc) -> acc -> Ast_Decl -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Decl_TypeLabel f acc =
  | p ->
    let res = smapAccumL_Decl_TypeLabel (lam acc. lam a. (f acc a, a)) acc p in
    res.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Decl" kind="sem">

```mc
sem smapAccumL_Decl_Decl : all acc. (acc -> Ast_Decl -> (acc, Ast_Decl)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Decl f acc = | d -> (acc, d)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Pat" kind="sem">

```mc
sem smapAccumL_Decl_Pat : all acc. (acc -> Ast_Pat -> (acc, Ast_Pat)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Pat f acc = | d -> (acc, d)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Decl_Decl" kind="sem">

```mc
sem smap_Decl_Decl : (Ast_Decl -> Ast_Decl) -> Ast_Decl -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Decl_Decl f = | d -> (smapAccumL_Decl_Decl (lam. lam a. ((), f a)) () d).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Decl_Decl" kind="sem">

```mc
sem sfold_Decl_Decl : all acc. (acc -> Ast_Decl -> acc) -> acc -> Ast_Decl -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Decl_Decl f acc = | d -> (smapAccumL_Decl_Decl (lam acc. lam a. (f acc a, a)) acc d).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Decl_Pat" kind="sem">

```mc
sem smap_Decl_Pat : (Ast_Pat -> Ast_Pat) -> Ast_Decl -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Decl_Pat f = | d -> (smapAccumL_Decl_Pat (lam. lam a. ((), f a)) () d).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Decl_Pat" kind="sem">

```mc
sem sfold_Decl_Pat : all acc. (acc -> Ast_Pat -> acc) -> acc -> Ast_Decl -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Decl_Pat f acc = | d -> (smapAccumL_Decl_Pat (lam acc. lam a. (f acc a, a)) acc d).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Type_Type" kind="sem">

```mc
sem smapAccumL_Type_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Type -> (acc, Ast_Type)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Type_Type f acc =
  | p -> (acc, p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Type_Type" kind="sem">

```mc
sem smap_Type_Type : (Ast_Type -> Ast_Type) -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Type_Type f =
  | p ->
    let res = smapAccumL_Type_Type (lam. lam a. ((), f a)) () p in
    res.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Type_Type" kind="sem">

```mc
sem sfold_Type_Type : all acc. (acc -> Ast_Type -> acc) -> acc -> Ast_Type -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Type_Type f acc =
  | p ->
    let res = smapAccumL_Type_Type (lam acc. lam a. (f acc a, a)) acc p in
    res.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rappAccumL_Type_Type" kind="sem">

```mc
sem rappAccumL_Type_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Type -> (acc, Ast_Type)
```

<Description>{`Resolving application \-\- apply an accumulating function through links and aliasesNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem rappAccumL_Type_Type f acc = | ty -> (acc, ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rapp_Type_Type" kind="sem">

```mc
sem rapp_Type_Type : (Ast_Type -> Ast_Type) -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem rapp_Type_Type f = | ty ->
    let res  = rappAccumL_Type_Type (lam. lam t. ((), f t)) () ty in
    res.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inspectType" kind="sem">

```mc
sem inspectType : Ast_Type -> Ast_Type
```

<Description>{`Strip all\-quantifiers and aliases to inspect the structure of the typeNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inspectType = | ty -> rapp_Type_Type inspectType ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unwrapType" kind="sem">

```mc
sem unwrapType : Ast_Type -> Ast_Type
```

<Description>{`Unwrap links and aliases to expose the underlying typeNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unwrapType = | ty -> rapp_Type_Type unwrapType ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Kind_Type" kind="sem">

```mc
sem smapAccumL_Kind_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Kind -> (acc, Ast_Kind)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Kind_Type f acc =
  | s -> (acc, s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Kind_Type" kind="sem">

```mc
sem smap_Kind_Type : (Ast_Type -> Ast_Type) -> Ast_Kind -> Ast_Kind
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Kind_Type (f : Type -> Type) =
  | s ->
    match smapAccumL_Kind_Type (lam. lam x. ((), f x)) () s with (_, s) in s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Kind_Type" kind="sem">

```mc
sem sfold_Kind_Type : all acc. (acc -> Ast_Type -> acc) -> acc -> Ast_Kind -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Kind_Type (f : acc -> Type -> acc) (acc : acc) =
  | s ->
    match smapAccumL_Kind_Type (lam a. lam x. (f a x, x)) acc s with (a, _) in a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Pat_Pat" kind="sem">

```mc
sem smapAccumL_Pat_Pat : all acc. (acc -> Ast_Pat -> (acc, Ast_Pat)) -> acc -> Ast_Pat -> (acc, Ast_Pat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Pat_Pat f acc =
  | p -> (acc, p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Pat_Pat" kind="sem">

```mc
sem smap_Pat_Pat : (Ast_Pat -> Ast_Pat) -> Ast_Pat -> Ast_Pat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Pat_Pat f =
  | p ->
    let res = smapAccumL_Pat_Pat (lam. lam a. ((), f a)) () p in
    res.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Pat_Pat" kind="sem">

```mc
sem sfold_Pat_Pat : all acc. (acc -> Ast_Pat -> acc) -> acc -> Ast_Pat -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Pat_Pat f acc =
  | p ->
    let res = smapAccumL_Pat_Pat (lam acc. lam a. (f acc a, a)) acc p in
    res.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Pat_Expr" kind="sem">

```mc
sem smapAccumL_Pat_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Pat -> (acc, Ast_Pat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Pat_Expr f acc =
  | p -> (acc, p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Pat_Expr" kind="sem">

```mc
sem smap_Pat_Expr : (Ast_Expr -> Ast_Expr) -> Ast_Pat -> Ast_Pat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Pat_Expr f =
  | p ->
    match smapAccumL_Pat_Expr (lam. lam a. ((), f a)) () p with (_, p) in
    p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Pat_Expr" kind="sem">

```mc
sem sfold_Pat_Expr : all acc. (acc -> Ast_Expr -> acc) -> acc -> Ast_Pat -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Pat_Expr f acc =
  | p ->
    match smapAccumL_Pat_Expr (lam acc. lam a. (f acc a, a)) acc p
    with (acc, _) in acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Pat_Type" kind="sem">

```mc
sem smapAccumL_Pat_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Pat -> (acc, Ast_Pat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Pat_Type f acc =
  | p -> (acc, p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Pat_Type" kind="sem">

```mc
sem smap_Pat_Type : (Ast_Type -> Ast_Type) -> Ast_Pat -> Ast_Pat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Pat_Type f =
  | p ->
    match smapAccumL_Pat_Type (lam. lam a. ((), f a)) () p with (_, p) in
    p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Pat_Type" kind="sem">

```mc
sem sfold_Pat_Type : all acc. (acc -> Ast_Type -> acc) -> acc -> Ast_Pat -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Pat_Type f acc =
  | p ->
    match smapAccumL_Pat_Type (lam acc. lam a. (f acc a, a)) acc p
    with (acc, _) in acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countExprNodes" kind="sem">

```mc
sem countExprNodes : Int -> Ast_Expr -> Int
```



<ToggleWrapper text="Code..">
```mc
sem countExprNodes count = | t ->
    let count = addi count 1 in
    let count = sfold_Expr_Expr countExprNodes count t in
    let count = sfold_Expr_Type countTypeNodes count t in
    let count = sfold_Expr_TypeLabel countTypeNodes count t in
    let count = sfold_Expr_Pat countPatNodes count t in
    count
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countTypeNodes" kind="sem">

```mc
sem countTypeNodes : Int -> Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem countTypeNodes count = | t ->
    let count = addi count 1 in
    let count = sfold_Type_Type countTypeNodes count t in
    count
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countPatNodes" kind="sem">

```mc
sem countPatNodes : Int -> Ast_Pat -> Int
```



<ToggleWrapper text="Code..">
```mc
sem countPatNodes count = | t ->
    let count = addi count 1 in
    let count = sfold_Pat_Pat countPatNodes count t in
    let count = sfold_Pat_Expr countExprNodes count t in
    let count = sfold_Pat_Type countTypeNodes count t in
    count
```
</ToggleWrapper>
</DocBlock>

