import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstConstantFold  
  

  
  
  
## Semantics  
  

          <DocBlock title="isConstant" kind="sem">

```mc
sem isConstant : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isConstant =
  | TmConst _ -> true
```
</ToggleWrapper>
</DocBlock>

