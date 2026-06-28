import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PrecedenceTableSHDeclAst  
  

  
  
  
## Types  
  

          <DocBlock title="PrecedenceTableSHDeclRecord" kind="type">

```mc
type PrecedenceTableSHDeclRecord : { info: Info, levels: [{ noeq: Option Info, operators: [{ i: Info, v: Name }] }], exceptions: [{ lefts: [{ i: Info, v: Name }], rights: [{ i: Info, v: Name }] }] }
```



<ToggleWrapper text="Code..">
```mc
type PrecedenceTableSHDeclRecord =
    {info: Info, levels: [{noeq: Option Info, operators: [{i: Info, v: Name}]}], exceptions: [{lefts: [{i: Info, v: Name}], rights: [{i: Info, v: Name}]}]}
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
  | PrecedenceTableSHDecl PrecedenceTableSHDeclRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_SHDecl_info" kind="sem">

```mc
sem get_SHDecl_info : SelfhostBaseAst_SHDecl -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHDecl_info =
  | PrecedenceTableSHDecl target ->
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
  | PrecedenceTableSHDecl target ->
    PrecedenceTableSHDecl
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

