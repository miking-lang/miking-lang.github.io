import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ReprTypeCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TyRepr l, TyRepr r) ->
    let lRep = deref (botRepr l.repr) in
    let rRep = deref (botRepr r.repr) in
    let res = subi (constructorTag lRep) (constructorTag rRep) in
    if neqi res 0 then res else
    let res = switch (lRep, rRep)
      case (UninitRepr _, UninitRepr _) then 0
      case (BotRepr l, BotRepr r) then subi (sym2hash l.sym) (sym2hash r.sym)
      end in
    if neqi res 0 then res else
    cmpType l.arg r.arg
```
</ToggleWrapper>
</DocBlock>

