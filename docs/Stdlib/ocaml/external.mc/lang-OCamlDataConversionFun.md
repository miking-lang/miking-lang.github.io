import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversionFun  
  

  
  
  
## Semantics  
  

          <DocBlock title="convertDataInner" kind="sem">

```mc
sem convertDataInner : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem convertDataInner info env t =
  | (TyArrow {from = ty11, to = ty12}, TyArrow {from = ty21, to = ty22}) ->
     let ident = nameSym "x" in
      let arg =
        TmVar { ident = ident, ty = ty21, info = info, frozen = false }
      in
      match (
        match ty11 with OTyLabel {label = label, ty = ty11} then
          match convertData info env arg (ty21, ty11) with (cost1, arg) in
          (cost1, OTmLabel { label = label, arg = arg })
        else
        match ty21 with OTyLabel {ty = ty21} then
          convertData info env arg (ty21, ty11)
        else
          match convertData info env arg (ty21, ty11) with (cost1, arg) in
          (cost1, arg)
      ) with (cost1, arg) in
      let body =
        TmApp {
          lhs = t,
          rhs = arg,
          ty = TyUnknown { info = info },
          info = info
         }
      in
      let label =
        match ty21 with OTyLabel {label = label} then Some label else None ()
      in
      match convertData info env body (ty12, ty22) with (cost2, body) in
      let t = OTmLam { label = label, ident = ident, body = body } in
      (addi cost1 cost2, t)
```
</ToggleWrapper>
</DocBlock>

