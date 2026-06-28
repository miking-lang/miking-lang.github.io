import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclUtest t ->
    let test = typeCheckExpr env t.test in
    let expected = typeCheckExpr env t.expected in
    let tusing = optionMap (typeCheckExpr env) t.tusing in
    let tonfail = optionMap (typeCheckExpr env) t.tonfail in
    (switch (tusing, tonfail)
     case (Some tu, Some to) then
       unify env [infoTm tu]
         (tyarrows_ [tyTm test, tyTm expected, tybool_]) (tyTm tu);
       unify env [infoTm to]
         (tyarrows_ [tyTm test, tyTm expected, tystr_]) (tyTm to)
     case (Some tu, None _) then
       unify env [infoTm tu]
         (tyarrows_ [tyTm test, tyTm expected, tybool_]) (tyTm tu)
     case (None _, Some to) then
       unify env [infoTm to]
         (tyarrows_ [tyTm test, tyTm expected, tystr_]) (tyTm to)
     case (None _, None _) then
       unify env [infoTm test, infoTm expected] (tyTm test) (tyTm expected)
     end);
    ( env
    , DeclUtest
      {t with test = test
      , expected = expected
      , tusing = tusing
      , tonfail = tonfail
      }
    )
```
</ToggleWrapper>
</DocBlock>

