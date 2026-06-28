import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprDemoteBase  
  

  
  
  
## Semantics  
  

          <DocBlock title="_insertExprInfo" kind="sem">

```mc
sem _insertExprInfo : Info -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem _insertExprInfo (info : Info) =
  | expr ->
    let expr =
      match infoTm expr with NoInfo () then withInfo info expr
      else expr in
    smap_Expr_Expr (_insertExprInfo info) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="demoteParallel" kind="sem">

```mc
sem demoteParallel : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem demoteParallel =
  | t -> smap_Expr_Expr demoteParallel t
```
</ToggleWrapper>
</DocBlock>

