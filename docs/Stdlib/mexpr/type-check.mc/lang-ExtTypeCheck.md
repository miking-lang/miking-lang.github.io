import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclExt t ->
    -- TODO(vipa, 2023-06-15): Error if a RepType shows up in an external definition?
    let tyIdent = resolveType t.info env true t.tyIdent in
    ( {env with varEnv = mapInsert t.ident tyIdent env.varEnv}
    , DeclExt {t with tyIdent = tyIdent}
    )
```
</ToggleWrapper>
</DocBlock>

