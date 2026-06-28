import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# InnerDeclTypeSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDeclType" kind="sem">

```mc
sem symbolizeDeclType : SymEnv -> NameEnv -> Ast_Decl -> (NameEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDeclType env langEnv =
  | DeclType t ->
    match setSymbol langEnv.tyConEnv t.ident with (tyConEnv, ident) in

    -- Symbolize parameters
    let env = updateEnv env langEnv in
    match mapAccumL setSymbol env.currentEnv.tyVarEnv t.params with (tyVarEnv, params) in

    -- Symbolize type annotation
    let tyAnnot = symbolizeType (symbolizeUpdateTyVarEnv env tyVarEnv) t.tyIdent in

    let decl = DeclType {t with ident = ident,
                                tyIdent = tyAnnot,
                                params = params} in

    let langEnv = {langEnv with tyConEnv = tyConEnv} in

    (langEnv, decl)
```
</ToggleWrapper>
</DocBlock>

