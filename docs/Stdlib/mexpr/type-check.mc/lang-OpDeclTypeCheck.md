import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpDeclTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclOp x ->
    let lvl = env.currentLvl in
    let tyAnnot = resolveType x.info env false x.tyAnnot in
    let tyAnnot = substituteNewReprs env tyAnnot in
    ( _insertVar x.ident tyAnnot
      { env with reptypes =
        { env.reptypes with opNamesInScope = mapInsert x.ident (None ()) env.reptypes.opNamesInScope
        }
      }
    , DeclOp {x with tyAnnot = tyAnnot}
    )
```
</ToggleWrapper>
</DocBlock>

