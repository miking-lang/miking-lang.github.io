import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpExprH" kind="sem">

```mc
sem cmpExprH : (Ast_Expr, Ast_Expr) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpExprH =
  | (TmVar l, TmVar r) ->
    nameCmp l.ident r.ident
```
</ToggleWrapper>
</DocBlock>

