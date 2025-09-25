import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesExpr" kind="sem">

```mc
sem freeNamesExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesExpr free =
  | TmVar x -> setInsert x.ident free
```
</ToggleWrapper>
</DocBlock>

