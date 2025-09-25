import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConTypeCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TyCon t1, TyCon t2) ->
    let nameDiff = nameCmp t1.ident t2.ident in
    if eqi nameDiff 0 then cmpType t1.data t2.data
    else nameDiff
```
</ToggleWrapper>
</DocBlock>

