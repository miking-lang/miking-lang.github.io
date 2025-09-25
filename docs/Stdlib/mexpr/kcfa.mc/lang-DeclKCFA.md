import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprName" kind="sem">

```mc
sem exprName : Ast_Expr -> Name
```



<ToggleWrapper text="Code..">
```mc
sem exprName =
  | TmDecl x -> exprName x.inexpr
```
</ToggleWrapper>
</DocBlock>

