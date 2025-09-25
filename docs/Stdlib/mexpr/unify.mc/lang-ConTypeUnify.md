import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConTypeUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyBase" kind="sem">

```mc
sem unifyBase : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> u
```



<ToggleWrapper text="Code..">
```mc
sem unifyBase u env =
  | (TyCon t1 & ty1, TyCon t2 & ty2) ->
    if nameEq t1.ident t2.ident then
      unifyTypes u env (t1.data, t2.data)
    else
      u.err (Types (ty1, ty2))
```
</ToggleWrapper>
</DocBlock>

