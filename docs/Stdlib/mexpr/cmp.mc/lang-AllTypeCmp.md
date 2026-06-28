import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllTypeCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TyAll t1, TyAll t2) ->
    let identDiff = nameCmp t1.ident t2.ident in
    if eqi identDiff 0 then
      let kindDiff = cmpKind (t1.kind, t2.kind) in
      if eqi kindDiff 0 then
        cmpType t1.ty t2.ty
      else kindDiff
    else identDiff
```
</ToggleWrapper>
</DocBlock>

