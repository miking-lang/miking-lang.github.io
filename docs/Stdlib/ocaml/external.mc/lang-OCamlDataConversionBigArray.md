import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversionBigArray  
  

  
  
  
## Semantics  
  

          <DocBlock title="convertDataInner" kind="sem">

```mc
sem convertDataInner : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem convertDataInner info env t =
  | (OTyBigarrayGenarray
      {ty = TyInt _, elty = OTyBigarrayIntElt _, layout = OTyBigarrayClayout _}
    ,OTyBigarrayGenarray
      {ty = TyInt _, elty = OTyBigarrayIntElt _, layout = OTyBigarrayClayout _})
  | (OTyBigarrayGenarray {
      ty = TyFloat _,
      elty = OTyBigarrayFloat64Elt _,
      layout = OTyBigarrayClayout _
    }
    ,OTyBigarrayGenarray {
      ty = TyFloat _,
      elty = OTyBigarrayFloat64Elt _,
      layout = OTyBigarrayClayout _
    })
  ->
    (0, t)
  | (OTyBigarrayArray {
        rank = rank1,
        ty = TyInt _, elty = OTyBigarrayIntElt _, layout = OTyBigarrayClayout _
      }
    ,OTyBigarrayArray {
        rank = rank2,
        ty = TyInt _, elty = OTyBigarrayIntElt _, layout = OTyBigarrayClayout _
      })
  | (OTyBigarrayArray {
        rank = rank1,
        ty = TyFloat _,
        elty = OTyBigarrayFloat64Elt _,
        layout = OTyBigarrayClayout _
      }
    ,OTyBigarrayArray {
        rank = rank2,
        ty = TyFloat _,
        elty = OTyBigarrayFloat64Elt _,
        layout = OTyBigarrayClayout _
      })
  ->
    if eqi rank1 rank2 then (0, t)
    else errorSingle [info] "Bigarray rank mismatch"
  | (TyTensor {ty = elty1} & ty1
    ,OTyBigarrayGenarray
      {ty = elty2, elty = elty3, layout = OTyBigarrayClayout _})
  ->
    match (elty1, elty2, elty3) with
      (TyInt _, TyInt _, OTyBigarrayIntElt _) |
      (TyFloat _, TyFloat _, OTyBigarrayFloat64Elt _)
    then
      let lhs =
        OTmVarExt
          { ident = intrinsicOpTensor "Helpers.to_genarray_clayout" }
      in
      let t =
        TmApp {
          lhs = lhs,
          rhs = t,
          ty = ty1,
          info = info
        }
      in
      (_tensorToGenarrayCost, t)
    else
      errorSingle [info] "Cannot convert to bigarray"
  | (TyTensor {ty = elty1} & ty1
    ,OTyBigarrayArray {
        rank = rank,
        ty = elty2, elty = elty3, layout = OTyBigarrayClayout _
      })
   ->
    match (elty1, elty2, elty3) with
      (TyInt _, TyInt _, OTyBigarrayIntElt _) |
      (TyFloat _, TyFloat _, OTyBigarrayFloat64Elt _)
    then
      let lhs =
        let op =
          if eqi rank 1 then
            "Helpers.to_array1_clayout"
          else if eqi rank 2 then
            "Helpers.to_array2_clayout"
          else
            errorSingle [info] "Cannot convert bigarray"
        in
        OTmVarExt { ident = intrinsicOpTensor op }
      in
      let t =
        TmApp {
          lhs = lhs,
          rhs = t,
          ty = ty1,
          info = info
        }
      in
      (_tensorToGenarrayCost, t)
    else
      errorSingle [info] "Cannot convert to bigarray"
  | (OTyBigarrayGenarray
      {ty = elty1, elty = elty3, layout = OTyBigarrayClayout _}
    ,TyTensor {ty = elty2} & ty2)
  ->
    let op =
      switch (elty1, elty2, elty3)
      case (TyInt _, TyInt _, OTyBigarrayIntElt _) then
        "Helpers.of_genarray_clayout"
      case (TyFloat _, TyFloat _, OTyBigarrayFloat64Elt _) then
        "Helpers.of_genarray_clayout"
      case (_, _, _) then errorSingle [info] "Cannot convert bigarray"
      end
    in
    let lhs = OTmVarExt { ident = intrinsicOpTensor op } in
    let t =
      TmApp {
        lhs = lhs,
        rhs = t,
        ty = ty2,
        info = info
      }
    in
    (_tensorToGenarrayCost, t)
  | (OTyBigarrayArray {
      rank = rank,
      ty = elty1, elty = elty3, layout = OTyBigarrayClayout _
     }
    ,TyTensor {ty = elty2} & ty2)
  ->
    let op =
      switch (elty1, elty2, elty3, rank)
      case (TyInt _, TyInt _, OTyBigarrayIntElt _, 1) then
        "Helpers.of_array1_clayout"
      case (TyFloat _, TyFloat _, OTyBigarrayFloat64Elt _, 1) then
        "Helpers.of_array1_clayout"
      case (TyInt _, TyInt _, OTyBigarrayIntElt _, 2) then
        "Helpers.of_array2_clayout"
      case (TyFloat _, TyFloat _, OTyBigarrayFloat64Elt _, 2) then
        "Helpers.of_array2_clayout"
      case (_, _, _, _) then errorSingle [info] "Cannot convert bigarray"
      end
    in
    let lhs = OTmVarExt { ident = intrinsicOpTensor op } in
    let t =
      TmApp {
        lhs = lhs,
        rhs = t,
        ty = ty2,
        info = info
      }
    in
    (_tensorToGenarrayCost, t)
```
</ToggleWrapper>
</DocBlock>

