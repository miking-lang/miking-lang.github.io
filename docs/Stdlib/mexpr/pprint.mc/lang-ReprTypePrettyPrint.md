import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ReprTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="typePrecedence" kind="sem">

```mc
sem typePrecedence : Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem typePrecedence =
  | TyRepr _ -> 1
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
  | TyRepr x ->
    let repr = switch deref (botRepr x.repr)
      case BotRepr repr then join [int2string repr.scope, ", ", int2string (sym2hash repr.sym)]
      case UninitRepr _ then "uninit"
      case _ then "impossible"
      end in
    match printTypeParen indent 2 env x.arg with (env, arg) in
    (env, join ["Repr[", repr, "] ", arg])
```
</ToggleWrapper>
</DocBlock>

