import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkSizeType  
  

A size parameter represents the size of one dimension of an array. As an  
array may be multi\-dimensional, we distinguish the size parameters using a  
dimension index.

  
  
  
## Types  
  

          <DocBlock title="SizeParam" kind="type">

```mc
type SizeParam : { id: Name, dim: Int }
```



<ToggleWrapper text="Code..">
```mc
type SizeParam = {
    id : Name,
    dim : Int
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SizeParamMap" kind="type">

```mc
type SizeParamMap : { sizeToIndex: Map SizeParam Int, indexToIdent: Map Int Name }
```



<ToggleWrapper text="Code..">
```mc
type SizeParamMap = {
    sizeToIndex : Map SizeParam Int,
    indexToIdent : Map Int Name
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SizeParameterizeEnv" kind="type">

```mc
type SizeParameterizeEnv : { paramMap: Map Name FutType, typeParams: Map Name FutTypeParam, retType: FutType, equalSizes: UnionFind }
```



<ToggleWrapper text="Code..">
```mc
type SizeParameterizeEnv = {
    paramMap : Map Name FutType,
    typeParams : Map Name FutTypeParam,
    retType : FutType,
    equalSizes : UnionFind
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LengthParameterizeEnv" kind="type">

```mc
type LengthParameterizeEnv : { paramMap: Map Name Name, replaceMap: Map Name Name }
```



<ToggleWrapper text="Code..">
```mc
type LengthParameterizeEnv = {
    paramMap : Map Name Name,
    replaceMap : Map Name Name
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cmpSizeParam" kind="sem">

```mc
sem cmpSizeParam : FutharkSizeType_SizeParam -> FutharkSizeType_SizeParam -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpSizeParam l =
  | r ->
    let c = nameCmp l.id r.id in
    if eqi c 0 then subi l.dim r.dim else c
```
</ToggleWrapper>
</DocBlock>

