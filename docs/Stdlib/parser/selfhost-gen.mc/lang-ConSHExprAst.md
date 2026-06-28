import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConSHExprAst  
  

  
  
  
## Types  
  

          <DocBlock title="ConSHExprRecord" kind="type">

```mc
type ConSHExprRecord : { info: Info, name: { i: Info, v: Name } }
```



<ToggleWrapper text="Code..">
```mc
type ConSHExprRecord =
    {info: Info, name: {i: Info, v: Name}}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SHExpr" kind="syn">

```mc
syn SHExpr
```



<ToggleWrapper text="Code..">
```mc
syn SHExpr =
  | ConSHExpr ConSHExprRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_SHExpr_info" kind="sem">

```mc
sem get_SHExpr_info : SelfhostBaseAst_SHExpr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHExpr_info =
  | ConSHExpr target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHExpr_info" kind="sem">

```mc
sem set_SHExpr_info : Info -> SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr
```



<ToggleWrapper text="Code..">
```mc
sem set_SHExpr_info val =
  | ConSHExpr target ->
    ConSHExpr
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

