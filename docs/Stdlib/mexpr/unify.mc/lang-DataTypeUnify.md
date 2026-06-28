import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypeUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyBase" kind="sem">

```mc
sem unifyBase : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> u
```



<ToggleWrapper text="Code..">
```mc
sem unifyBase u env =
  | (TyData t1 & ty1, TyData t2 & ty2) ->
    if mapEq setEq (computeData t1) (computeData t2) then u.empty
    else
      u.err (Types (ty1, ty2))
```
</ToggleWrapper>
</DocBlock>

