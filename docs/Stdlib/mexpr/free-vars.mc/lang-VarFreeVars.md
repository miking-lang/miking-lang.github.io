import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarFreeVars  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeVarsExpr" kind="sem">

```mc
sem freeVarsExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeVarsExpr acc =
  | TmVar r -> setInsert r.ident acc
```
</ToggleWrapper>
</DocBlock>

