import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversionTuple  
  

  
  
  
## Semantics  
  

          <DocBlock title="convertDataInner" kind="sem">

```mc
sem convertDataInner : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem convertDataInner info env t =
  | (OTyTuple {tys = []}, TyRecord {fields = fields}) |
    (TyRecord {fields = fields}, OTyTuple {tys = []}) ->
    if eqi (mapSize fields) 0 then
      (0, semi_ t (OTmTuple { values = [] }))
    else errorSingle [info] "Cannot convert unit"
  | (OTyTuple {tys = tys}, TyCon {ident = ident}) ->
    match mapLookup ident env.constrs
    with Some (TyRecord {fields = fields}) then
      convertTuple info env true t fields tys
    else errorSingle [info] "Cannot convert from OCaml tuple"
  | (TyCon {ident = ident}, OTyTuple {tys = tys}) ->
    match mapLookup ident env.constrs
    with Some (TyRecord {fields = fields}) then
      convertTuple info env false t fields tys
    else errorSingle [info] "Cannot convert to OCaml tuple"
```
</ToggleWrapper>
</DocBlock>

