import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ReprSubstCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TySubst l, TySubst r) ->
    let res = nameCmp l.subst r.subst in
    if neqi 0 res then res else
    cmpType l.arg r.arg
```
</ToggleWrapper>
</DocBlock>

