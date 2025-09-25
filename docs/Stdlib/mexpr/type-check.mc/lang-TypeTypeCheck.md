import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclType t ->
    let tyIdent = resolveType t.info env false t.tyIdent in
    -- NOTE(aathn, 2023-05-08): Aliases are treated as the underlying
    -- type and do not need to be scope checked.
    let newLvl =
      match tyIdent with !TyVariant _ then addi 1 env.currentLvl else 0 in
    let newTyConEnv = mapInsert t.ident (newLvl, t.params, tyIdent) env.tyConEnv in
    ( {env with currentLvl = addi 1 env.currentLvl, tyConEnv = newTyConEnv}
    , DeclType {t with tyIdent = tyIdent}
    )
```
</ToggleWrapper>
</DocBlock>

