import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedPatTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotPat" kind="sem">

```mc
sem typeAnnotPat : TypeEnv -> Ast_Type -> Ast_Pat -> (TypeEnv, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotPat (env : TypeEnv) (expectedTy : Type) =
  | PatNamed t ->
    let env =
      match t.ident with PName n then
        {env with varEnv = mapInsert n expectedTy env.varEnv}
      else env in
    (env, PatNamed {t with ty = expectedTy})
```
</ToggleWrapper>
</DocBlock>

