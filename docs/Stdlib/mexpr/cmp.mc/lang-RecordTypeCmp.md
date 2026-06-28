import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordTypeCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TyRecord t1, TyRecord t2) -> mapCmp cmpType t1.fields t2.fields
```
</ToggleWrapper>
</DocBlock>

