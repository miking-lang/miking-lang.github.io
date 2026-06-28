import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypeCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TyData l, TyData r) ->
    mapCmp setCmp (computeData l) (computeData r)
```
</ToggleWrapper>
</DocBlock>

