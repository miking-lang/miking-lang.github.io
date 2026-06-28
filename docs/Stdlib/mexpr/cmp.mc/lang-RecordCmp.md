import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpExprH" kind="sem">

```mc
sem cmpExprH : (Ast_Expr, Ast_Expr) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpExprH =
  | (TmRecord l, TmRecord r) -> mapCmp cmpExpr l.bindings r.bindings
  | (TmRecordUpdate l, TmRecordUpdate r) ->
    let recDiff = cmpExpr l.rec r.rec in
    if eqi recDiff 0 then
      let keyDiff = cmpSID l.key r.key in
      if eqi keyDiff 0 then cmpExpr l.value r.value
      else keyDiff
    else recDiff
```
</ToggleWrapper>
</DocBlock>

