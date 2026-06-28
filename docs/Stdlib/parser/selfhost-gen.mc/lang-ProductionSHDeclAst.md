import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ProductionSHDeclAst  
  

  
  
  
## Types  
  

          <DocBlock title="ProductionSHDeclRecord" kind="type">

```mc
type ProductionSHDeclRecord : { nt: { i: Info, v: Name }, info: Info, kinf: Option Info, name: { i: Info, v: Name }, assoc: Option { i: Info, v: String }, kpref: Option Info, kprod: Option Info, regex: SHRegex, kpostf: Option Info }
```



<ToggleWrapper text="Code..">
```mc
type ProductionSHDeclRecord =
    {nt: {i: Info, v: Name}, info: Info, kinf: Option Info, name: {i: Info, v: Name}, assoc: Option {i: Info, v: String}, kpref: Option Info, kprod: Option Info, regex: SHRegex, kpostf: Option Info}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SHDecl" kind="syn">

```mc
syn SHDecl
```



<ToggleWrapper text="Code..">
```mc
syn SHDecl =
  | ProductionSHDecl ProductionSHDeclRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_SHDecl_SHRegex" kind="sem">

```mc
sem smapAccumL_SHDecl_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)) -> a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHDecl_SHRegex f acc =
  | ProductionSHDecl x ->
    match
      match
        let regex = x.regex in
        f acc regex
      with
        (acc, regex)
      in
      (acc, { x with regex = regex })
    with
      (acc, x)
    in
    (acc, ProductionSHDecl
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHDecl_info" kind="sem">

```mc
sem get_SHDecl_info : SelfhostBaseAst_SHDecl -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHDecl_info =
  | ProductionSHDecl target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHDecl_info" kind="sem">

```mc
sem set_SHDecl_info : Info -> SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl
```



<ToggleWrapper text="Code..">
```mc
sem set_SHDecl_info val =
  | ProductionSHDecl target ->
    ProductionSHDecl
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

