import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UncurriedPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="typePrecedence" kind="sem">

```mc
sem typePrecedence : Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem typePrecedence =
  | TyUncurriedArrow _ -> 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode indent env =
  | TyUncurriedArrow x ->
    match mapAccumL (getTypeStringCode indent) env x.positional with (env, positional) in
    match printTypeParen indent 1 env x.ret with (env, ret) in
    (env, join ["(", strJoin ", " positional, ") => ", ret])
```
</ToggleWrapper>
</DocBlock>

