import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UnifyUncurriedMixed  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyBase" kind="sem">

```mc
sem unifyBase : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> u
```



<ToggleWrapper text="Code..">
```mc
sem unifyBase u env =
  | (TyArrow a, b & TyUncurriedArrow _) ->
    unifyBase u env (TyUncurriedArrow {positional = [a.from], ret = a.to, info = a.info}, b)
  | (a & TyUncurriedArrow _, TyArrow b) ->
    unifyBase u env (a, TyUncurriedArrow {positional = [b.from], ret = b.to, info = b.info})
```
</ToggleWrapper>
</DocBlock>

