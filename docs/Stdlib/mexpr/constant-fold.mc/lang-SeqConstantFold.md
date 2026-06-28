import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqConstantFold  
  

  
  
  
## Semantics  
  

          <DocBlock title="isConstant" kind="sem">

```mc
sem isConstant : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isConstant =
  | TmSeq r -> forAll isConstant r.tms
```
</ToggleWrapper>
</DocBlock>

