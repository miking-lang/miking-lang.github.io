import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordPatIsEmpty  
  

  
  
  
## Semantics  
  

          <DocBlock title="snpatIsEmpty" kind="sem">

```mc
sem snpatIsEmpty : TCEnv -> (Ast_Type, NormPat_SNPat) -> [IsEmpty_Bounds]
```



<ToggleWrapper text="Code..">
```mc
sem snpatIsEmpty env =
  | (TyRecord { fields = fields }, NPatRecord pats) ->
    mapFoldWithKey (lam o1. lam. lam o2. concat o1 o2) []
      (mapIntersectWith (lam ty. lam p. npatIsEmpty env (ty, p)) fields pats)
  | (TyMetaVar r, NPatRecord pats) ->
    match deref r.contents with Unbound r then
      match r.kind with Record { fields = fields } then
        snpatIsEmpty env ( TyRecord {info = NoInfo (), fields = fields}
                         , NPatRecord pats )
      else []
    else error "Encountered non-unwrapped TyMetaVar in snpatIsEmpty!"
```
</ToggleWrapper>
</DocBlock>

