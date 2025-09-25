import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SubstituteNewReprs  
  

  
  
  
## Semantics  
  

          <DocBlock title="substituteNewReprs" kind="sem">

```mc
sem substituteNewReprs : TCEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem substituteNewReprs env =
  | TyRepr x -> TyRepr
    { x with repr = newRepr env
    , arg = substituteNewReprs env x.arg
    }
  | ty -> smap_Type_Type (substituteNewReprs env) ty
```
</ToggleWrapper>
</DocBlock>

