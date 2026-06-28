import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkTypeGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateType" kind="sem">

```mc
sem generateType : FutharkGenerateEnv -> Ast_Type -> FutharkTypeAst_FutType
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateType env =
  | TyInt t -> FTyInt {info = t.info, sz = I64 ()}
  | TyFloat t -> FTyFloat {info = t.info, sz = F64 ()}
  | TyBool t -> FTyBool {info = t.info}
  | TyChar t -> FTyInt {info = t.info, sz = I64 ()}
  | TySeq t ->
    -- NOTE(larshum, 2021-12-01): We generate an identifier for the size type
    -- of every array type. These identifiers are extracted at a later stage to
    -- declare the size type parameters.
    let dimId = nameSym "n" in
    FTyArray {elem = generateType env t.ty, dim = Some (NamedDim dimId), info = t.info}
  | TyRecord t ->
    FTyRecord {fields = mapMap (generateType env) t.fields, info = t.info}
  | TyArrow t ->
    FTyArrow {from = generateType env t.from, to = generateType env t.to,
              info = t.info}
  | TyVar t ->
    FTyIdent {ident = t.ident, info = t.info}
  | TyAll t ->
    FTyAll {ident = t.ident, ty = generateType env t.ty, info = t.info}
  | TyAlias t ->
    generateType env t.content
  | TyUnknown t ->
    errorSingle [t.info] "Unknown types are not supported by the Futhark backend"
  | TyVariant t ->
    errorSingle [t.info] "Variant types are not supported by the Futhark backend"
  | t ->
    let tyStr = use MExprPrettyPrint in type2str t in
    errorSingle [infoTy t]
      (join ["Terms of type '", tyStr, "' are not supported by the Futhark backend"])
```
</ToggleWrapper>
</DocBlock>

