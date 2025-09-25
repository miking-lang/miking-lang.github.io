import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# name-info.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>mexpr/info.mc</a>  
  
## Types  
  

          <DocBlock title="NameInfo" kind="type">

```mc
type NameInfo : (Name, Info)
```



<ToggleWrapper text="Code..">
```mc
type NameInfo = (Name, Info)
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_eqn" kind="let">

```mc
let _eqn n1 n2 : Name -> Name -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _eqn = lam n1. lam n2.
  if and (nameHasSym n1) (nameHasSym n2) then
    nameEqSym n1 n2
  else
    error "Name without symbol."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameInfoCmp" kind="let">

```mc
let nameInfoCmp v1 v2 : NameInfo -> NameInfo -> Int
```



<ToggleWrapper text="Code..">
```mc
let nameInfoCmp = lam v1 : NameInfo. lam v2 : NameInfo.
  nameCmp v1.0 v2.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameInfoEq" kind="let">

```mc
let nameInfoEq l1 l2 : NameInfo -> NameInfo -> Bool
```



<ToggleWrapper text="Code..">
```mc
let nameInfoEq = lam l1 : NameInfo. lam l2 : NameInfo.
  _eqn l1.0 l2.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameInfoGetStr" kind="let">

```mc
let nameInfoGetStr ni : NameInfo -> String
```



<ToggleWrapper text="Code..">
```mc
let nameInfoGetStr = lam ni : NameInfo.
  nameGetStr ni.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameInfoGetName" kind="let">

```mc
let nameInfoGetName ni : NameInfo -> Name
```



<ToggleWrapper text="Code..">
```mc
let nameInfoGetName = lam ni : NameInfo.
  ni.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameInfoGetInfo" kind="let">

```mc
let nameInfoGetInfo ni : NameInfo -> Info
```



<ToggleWrapper text="Code..">
```mc
let nameInfoGetInfo = lam ni : NameInfo.
  ni.1
```
</ToggleWrapper>
</DocBlock>

