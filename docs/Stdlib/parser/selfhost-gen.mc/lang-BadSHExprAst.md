import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BadSHExprAst  
  

  
  
  
## Types  
  

          <DocBlock title="BadSHExprRecord" kind="type">

```mc
type BadSHExprRecord : { info: Info }
```



<ToggleWrapper text="Code..">
```mc
type BadSHExprRecord =
    {info: Info}
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
  | BadSHExpr BadSHExprRecord
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
  | BadSHExpr target ->
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
  | BadSHExpr target ->
    BadSHExpr
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

