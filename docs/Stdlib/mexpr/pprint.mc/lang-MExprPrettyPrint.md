import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="mexprToString" kind="sem">

```mc
sem mexprToString : Ast_Expr -> String
```



<ToggleWrapper text="Code..">
```mc
sem mexprToString =
  | expr -> exprToStringKeywords mexprKeywords expr
```
</ToggleWrapper>
</DocBlock>

