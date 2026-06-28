import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MetaVarTypeUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyBase" kind="sem">

```mc
sem unifyBase : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> u
```



<ToggleWrapper text="Code..">
```mc
sem unifyBase u env =
  | (TyMetaVar _ & ty1, ty2) -> u.unify env ty1 ty2
  | (!TyMetaVar _ & ty1, TyMetaVar _ & ty2) ->
    unifyBase u {env with wrappedLhs = env.wrappedRhs, wrappedRhs = env.wrappedLhs} (ty2, ty1)
```
</ToggleWrapper>
</DocBlock>

