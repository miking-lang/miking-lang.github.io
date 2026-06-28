import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpVarTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmOpVar x ->
    match mapLookup x.ident env.varEnv with Some ty then
      switch mapLookup x.ident env.reptypes.opNamesInScope
      case Some (Some (rName, label)) then
        -- NOTE(vipa, 2023-06-16): "Desugar" the variable to an access
        -- of the record it was changed into
        let tmp = nameSym "tmp" in
        let newTm = TmMatch
          { target = TmOpVar {ident = rName, ty = tyunknown_, frozen = false, info = x.info, scaling = x.scaling}
          , pat = PatRecord
            { info = x.info
            , ty = tyunknown_
            , bindings = mapInsert label (PatNamed {ident = PName tmp, info = x.info, ty = tyunknown_})
              (mapEmpty cmpSID)
            }
            -- TODO(vipa, 2023-06-16): I believe this handles frozen
            -- variables correctly, but it should probably be checked
            -- more closely
          , thn = TmVar {ident = tmp, ty = tyunknown_, frozen = x.frozen, info = x.info}
          , els = TmNever {info = x.info, ty = tyunknown_}
          , ty = tyunknown_
          , info = x.info
          } in
        typeCheckExpr env newTm
      case Some _ then
        let ty = if x.frozen then ty else inst x.info env.currentLvl ty in
        let ty = substituteNewReprs env ty in
        TmOpVar {x with ty = ty}
      case None _ then
        let msg = join [
          "* Encountered scaled application of a non-operation: ",
          nameGetStr x.ident, "\n",
          "* When type checking the expression\n"
        ] in
        errorSingle [x.info] msg
      end
    else
      let msg = join [
        "* Encountered an unbound variable: ",
        nameGetStr x.ident, "\n",
        "* When type checking the expression\n"
      ] in
      errorSingle [x.info] msg
```
</ToggleWrapper>
</DocBlock>

