import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkTypeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="FutArrayDim" kind="syn">

```mc
syn FutArrayDim
```



<ToggleWrapper text="Code..">
```mc
syn FutArrayDim =
  | NamedDim Name
  | AbsDim Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FutType" kind="syn">

```mc
syn FutType
```



<ToggleWrapper text="Code..">
```mc
syn FutType =
  | FTyUnknown { info : Info }
  | FTyInt { info : Info, sz : FutIntSize }
  | FTyFloat { info : Info, sz : FutFloatSize }
  | FTyBool { info : Info }
  | FTyIdent { ident : Name, info : Info }
  | FTyArray { elem : FutType, dim : Option FutArrayDim, info : Info }
  | FTyRecord { fields : Map SID FutType, info : Info }
  | FTyProj { target : FutType, label : SID, info : Info }
  | FTyArrow { from : FutType, to : FutType, info : Info }
  | FTyAll { ident : Name, ty : FutType, info : Info }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoFutTy" kind="sem">

```mc
sem infoFutTy : FutharkTypeAst_FutType -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoFutTy =
  | FTyUnknown t -> t.info
  | FTyInt t -> t.info
  | FTyFloat t -> t.info
  | FTyBool t -> t.info
  | FTyIdent t -> t.info
  | FTyArray t -> t.info
  | FTyRecord t -> t.info
  | FTyProj t -> t.info
  | FTyArrow t -> t.info
  | FTyAll t -> t.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfoFutTy" kind="sem">

```mc
sem withInfoFutTy : Info -> FutharkTypeAst_FutType -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
sem withInfoFutTy (info : Info) =
  | FTyUnknown t -> FTyUnknown {t with info = info}
  | FTyInt t -> FTyInt {t with info = info}
  | FTyFloat t -> FTyFloat {t with info = info}
  | FTyBool t -> FTyBool {t with info = info}
  | FTyIdent t -> FTyIdent {t with info = info}
  | FTyArray t -> FTyArray {t with info = info}
  | FTyRecord t -> FTyRecord {t with info = info}
  | FTyProj t -> FTyProj {t with info = info}
  | FTyArrow t -> FTyArrow {t with info = info}
  | FTyAll t -> FTyAll {t with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_FType_FType" kind="sem">

```mc
sem smapAccumL_FType_FType : all a. (a -> FutharkTypeAst_FutType -> (a, FutharkTypeAst_FutType)) -> a -> FutharkTypeAst_FutType -> (a, FutharkTypeAst_FutType)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_FType_FType f acc =
  | FTyArray t ->
    match f acc t.elem with (acc, elem) in
    (acc, FTyArray {t with elem = elem})
  | FTyRecord t ->
    match mapMapAccum (lam acc. lam. lam e. f acc e) acc t.fields with (acc, fields) in
    (acc, FTyRecord {t with fields = fields})
  | FTyProj t ->
    match f acc t.target with (acc, target) in
    (acc, FTyProj {t with target = target})
  | FTyArrow t ->
    match f acc t.from with (acc, from) in
    match f acc t.to with (acc, to) in
    (acc, FTyArrow {{t with from = from} with to = to})
  | FTyAll t ->
    match f acc t.ty with (acc, ty) in
    (acc, FTyAll {t with ty = ty})
  | t -> (acc, t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_FType_FType" kind="sem">

```mc
sem smap_FType_FType : (FutharkTypeAst_FutType -> FutharkTypeAst_FutType) -> FutharkTypeAst_FutType -> FutharkTypeAst_FutType
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_FType_FType f =
  | t ->
    let res : ((), FutType) = smapAccumL_FType_FType (lam. lam a. ((), f a)) () t in
    res.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_FType_FType" kind="sem">

```mc
sem sfold_FType_FType : all a. (a -> FutharkTypeAst_FutType -> a) -> a -> FutharkTypeAst_FutType -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_FType_FType f acc =
  | t ->
    let res : (a, FutType) = smapAccumL_FType_FType (lam acc. lam a. (f acc a, a)) acc t in
    res.0
```
</ToggleWrapper>
</DocBlock>

