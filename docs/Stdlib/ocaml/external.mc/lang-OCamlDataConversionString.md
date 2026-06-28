import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversionString  
  

  
  
  
## Semantics  
  

          <DocBlock title="convertDataInner" kind="sem">

```mc
sem convertDataInner : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem convertDataInner info env t =
  | (OTyString _, TySeq {ty = TyChar _} & ty2) ->
    let op = OTmVarExt { ident = intrinsicOpSeq "Helpers.of_utf8" } in
    let t =
      TmApp {
        lhs = op,
        rhs = t,
        ty = ty2,
        info = info
      }
    in
    (_seqtostringcost, t)
  | (TySeq {ty = TyChar _}, OTyString _) ->
    let op = OTmVarExt { ident = intrinsicOpSeq "Helpers.to_utf8" } in
    let t =
      TmApp {
        lhs = op,
        rhs = t,
        ty = TyUnknown { info = info },
        info = info
      }
    in
    (_seqtostringcost, t)
```
</ToggleWrapper>
</DocBlock>

