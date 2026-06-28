import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ReprDeclTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclRepr x ->
    let pat = resolveType x.info env false x.pat in
    let repr = resolveType x.info env false x.repr in
    ( { env with reptypes =
        { env.reptypes with reprEnv = mapInsert x.ident {vars = x.vars, pat = pat, repr = repr} env.reptypes.reprEnv
        }
      }
    , DeclRepr {x with pat = pat, repr = repr}
    )
```
</ToggleWrapper>
</DocBlock>

