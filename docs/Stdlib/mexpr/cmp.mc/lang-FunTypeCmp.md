import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FunTypeCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TyArrow t1, TyArrow t2) ->
    let fromDiff = cmpType t1.from t2.from in
    if eqi fromDiff 0 then cmpType t1.to t2.to
    else fromDiff
```
</ToggleWrapper>
</DocBlock>

