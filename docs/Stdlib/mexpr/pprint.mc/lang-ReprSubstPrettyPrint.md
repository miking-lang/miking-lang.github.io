import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ReprSubstPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="typePrecedence" kind="sem">

```mc
sem typePrecedence : Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem typePrecedence =
  | TySubst _ -> 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : all a. Int -> PprintEnv -> Ast_Type -> (a, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode indent env =
  | TySubst x ->
    match pprintConName env x.subst with (env, subst) in
    match printTypeParen indent 2 env x.arg with (env, arg) in
    (env, join ["!", subst, " ", arg])
```
</ToggleWrapper>
</DocBlock>

