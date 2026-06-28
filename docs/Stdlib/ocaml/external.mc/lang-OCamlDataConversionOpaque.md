import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversionOpaque  
  

  
  
  
## Semantics  
  

          <DocBlock title="convertDataInner" kind="sem">

```mc
sem convertDataInner : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem convertDataInner info env t =
  | (TyUnknown _ | TyVar _, !(TyAll _)) | (!(TyAll _), TyUnknown _ | TyVar _)
  | (TyCon {ident = _}, !(TyAll _)) | (!(TyAll _), TyCon {ident = _})
  | (TyApp {lhs = TyCon _}, !(TyAll _)) | (!(TyAll _), TyApp {lhs = TyCon _})
  -> (0, t)
  | (TyAll {ty = ty1}, TyAll {ty = ty2})
  | (TyAll {ty = ty1}, ty2)
  | (ty1, TyAll {ty = ty2})
  -> convertData info env t (ty1, ty2)
```
</ToggleWrapper>
</DocBlock>

