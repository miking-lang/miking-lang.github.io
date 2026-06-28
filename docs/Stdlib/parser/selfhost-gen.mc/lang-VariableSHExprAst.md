import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VariableSHExprAst  
  

  
  
  
## Types  
  

          <DocBlock title="VariableSHExprRecord" kind="type">

```mc
type VariableSHExprRecord : { info: Info, name: { i: Info, v: Name } }
```



<ToggleWrapper text="Code..">
```mc
type VariableSHExprRecord =
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
  | VariableSHExpr VariableSHExprRecord
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
  | VariableSHExpr target ->
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
  | VariableSHExpr target ->
    VariableSHExpr
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

