import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversionArray  
  

  
  
  
## Semantics  
  

          <DocBlock title="convertDataInner" kind="sem">

```mc
sem convertDataInner : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem convertDataInner info env t =
  | (TySeq {ty = ty1}, OTyArray {ty = ty2}) ->
    let op = OTmVarExt { ident = intrinsicOpSeq "Helpers.to_array_copy" } in
    let mapop = OTmVarExt { ident = intrinsicOpSeq "map" } in
    convertContainer op _arrayToSeqCost _approxsize mapop info env t (ty1, ty2)
  | (OTyArray {ty = ty1}, TySeq {ty = ty2}) ->
    let op = OTmVarExt { ident = intrinsicOpSeq "Helpers.of_array_copy" } in
    let mapop = OTmVarExt { ident = "Array.map" } in
    convertContainer op _arrayToSeqCost _approxsize mapop info env t (ty1, ty2)
```
</ToggleWrapper>
</DocBlock>

