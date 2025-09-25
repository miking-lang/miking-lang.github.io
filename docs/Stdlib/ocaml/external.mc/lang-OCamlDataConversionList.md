import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversionList  
  

  
  
  
## Semantics  
  

          <DocBlock title="convertDataInner" kind="sem">

```mc
sem convertDataInner : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem convertDataInner info env t =
  | (OTyList {ty = ty1}, TySeq {ty = ty2}) ->
    let op = OTmVarExt { ident = intrinsicOpSeq "Helpers.of_list" } in
    let mapop = OTmVarExt { ident = "List.map" } in
    convertContainer op _listToSeqCost _approxsize mapop info env t (ty1, ty2)
  | (TySeq {ty = ty1}, OTyList {ty = ty2}) ->
    let op = OTmVarExt { ident = intrinsicOpSeq "Helpers.to_list" } in
    let mapop = OTmVarExt { ident = intrinsicOpSeq "map" } in
    convertContainer op _listToSeqCost _approxsize mapop info env t (ty1, ty2)
```
</ToggleWrapper>
</DocBlock>

