import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkPatternGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="generatePattern" kind="sem">

```mc
sem generatePattern : FutharkGenerateEnv -> Ast_Type -> Ast_Pat -> FutharkPatAst_FutPat
```



<ToggleWrapper text="Code..">
```mc
sem generatePattern (env : FutharkGenerateEnv) (targetTy : Type) =
  | PatNamed t ->
    FPNamed {ident = t.ident, ty = generateType env t.ty, info = t.info}
  | PatInt t ->
    FPInt {val = t.val, ty = generateType env t.ty, info = t.info}
  | PatBool t ->
    FPBool {val = t.val, ty = generateType env t.ty, info = t.info}
  | PatChar t ->
    FPInt {val = char2int t.val, ty = generateType env t.ty, info = t.info}
  | PatRecord t ->
    let mergeBindings = lam bindings : Map SID Pat. lam fields : Map SID Type.
      mapMapWithKey
        (lam k. lam ty : Type.
          match mapLookup k bindings with Some pat then
            generatePattern env ty pat
          else futPvarw_ ())
        fields
    in
    match unwrapType targetTy with TyRecord {fields = fields} then
      FPRecord {bindings = mergeBindings t.bindings fields,
                ty = generateType env t.ty, info = t.info}
    else
      let tyStr = use MExprPrettyPrint in type2str targetTy in
      errorSingle [t.info] (join ["Term of non-record type '", tyStr,
                                  "' cannot be matched with record pattern"])
  | p ->
    errorSingle [infoPat p] "Pattern is not supported by Futhark backend"
```
</ToggleWrapper>
</DocBlock>

