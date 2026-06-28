import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PropagateDeclType  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateExpectedType" kind="sem">

```mc
sem propagateExpectedType : all a. Map Name Ast_Type -> (a, Ast_Expr) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem propagateExpectedType tyEnv =
  | (ty, TmDecl x) -> TmDecl {x with inexpr = propagateExpectedType tyEnv (ty, x.inexpr)}
```
</ToggleWrapper>
</DocBlock>

