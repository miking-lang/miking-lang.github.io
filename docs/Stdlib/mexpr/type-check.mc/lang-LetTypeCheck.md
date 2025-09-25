import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclLet t ->
    let newLvl = addi 1 env.currentLvl in
    let tyAnnot = resolveType t.info env false t.tyAnnot in
    let tyAnnot = substituteNewReprs env tyAnnot in
    let tyBody = substituteUnknown t.info {env with currentLvl = newLvl} (Poly ()) tyAnnot in
    match
      if nonExpansive true t.body then
        match stripTyAll tyBody with (vars, stripped) in
        let newTyVarEnv =
          foldr (lam v. mapInsert v.0 (newLvl, v.1)) env.tyVarEnv vars in
        let newEnv = {env with currentLvl = newLvl, tyVarEnv = newTyVarEnv} in
        let body = typeCheckExpr newEnv (propagateTyAnnot (t.body, tyAnnot)) in
        -- Unify the annotated type with the inferred one and generalize
        unify newEnv [infoTy t.tyAnnot, infoTm body] stripped (tyTm body);
        (if env.disableRecordPolymorphism then
           disableRecordGeneralize env.currentLvl tyBody else ());
        match gen env.currentLvl (mapEmpty nameCmp) tyBody with (tyBody, _) in
        (body, tyBody)
      else
        let body = typeCheckExpr {env with currentLvl = newLvl} t.body in
        unify env [infoTy t.tyAnnot, infoTm body] tyBody (tyTm body);
        -- TODO(aathn, 2023-05-07): Relax value restriction
        weakenMetaVars env.currentLvl tyBody;
        (body, tyBody)
    with (body, tyBody) in
    ( _insertVar t.ident tyBody env
    , DeclLet
      {t with body = body
      , tyAnnot = tyAnnot
      , tyBody = tyBody
      }
    )
```
</ToggleWrapper>
</DocBlock>

