import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppTypeUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyBase" kind="sem">

```mc
sem unifyBase : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> u
```



<ToggleWrapper text="Code..">
```mc
sem unifyBase u env =
  | (TyApp t1, TyApp t2) ->
    u.combine
      (unifyTypes u env (t1.lhs, t2.lhs))
      (unifyTypes u env (t1.rhs, t2.rhs))
```
</ToggleWrapper>
</DocBlock>

