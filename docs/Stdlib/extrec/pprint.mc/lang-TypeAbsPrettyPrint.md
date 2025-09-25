import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeAbsPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : all a. Int -> PprintEnv -> Ast_Type -> (a, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode indent env =
  | TyAbs t ->
    match pprintVarName env t.ident with (env, ident) in
    match getTypeStringCode indent env t.body with (env, body) in
    (env, join ["Lam ", ident, ". ", body])
```
</ToggleWrapper>
</DocBlock>

