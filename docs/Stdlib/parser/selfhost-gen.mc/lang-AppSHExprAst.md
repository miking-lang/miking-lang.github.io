import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppSHExprAst  
  

  
  
  
## Types  
  

          <DocBlock title="AppSHExprRecord" kind="type">

```mc
type AppSHExprRecord : { info: Info, left: SHExpr, right: SHExpr }
```



<ToggleWrapper text="Code..">
```mc
type AppSHExprRecord =
    {info: Info, left: SHExpr, right: SHExpr}
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
  | AppSHExpr AppSHExprRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_SHExpr_SHExpr" kind="sem">

```mc
sem smapAccumL_SHExpr_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)) -> a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHExpr_SHExpr f acc =
  | AppSHExpr x ->
    match
      match
        let left = x.left in
        f acc left
      with
        (acc, left)
      in
      match
          let right = x.right in
          f acc right
        with
          (acc, right)
        in
        (acc, { x with left = left, right = right })
    with
      (acc, x)
    in
    (acc, AppSHExpr
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHExpr_info" kind="sem">

```mc
sem get_SHExpr_info : SelfhostBaseAst_SHExpr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHExpr_info =
  | AppSHExpr target ->
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
  | AppSHExpr target ->
    AppSHExpr
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

