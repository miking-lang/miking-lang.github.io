import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprMonomorphize  
  

  
  
  
## Semantics  
  

          <DocBlock title="monomorphize" kind="sem">

```mc
sem monomorphize : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem monomorphize =
  | ast ->
    let env = collectInstantiations ast in
    applyMonomorphization env ast
```
</ToggleWrapper>
</DocBlock>

