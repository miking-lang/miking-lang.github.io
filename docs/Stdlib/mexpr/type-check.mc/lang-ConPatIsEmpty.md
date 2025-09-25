import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConPatIsEmpty  
  

  
  
  
## Semantics  
  

          <DocBlock title="snpatIsEmpty" kind="sem">

```mc
sem snpatIsEmpty : TCEnv -> (Ast_Type, NormPat_SNPat) -> [IsEmpty_Bounds]
```



<ToggleWrapper text="Code..">
```mc
sem snpatIsEmpty env =
  | (ty, NPatCon {ident = c, subpat = p}) ->
    match mapLookup c env.conEnv with Some (_, tycon) then
      match inst (infoTy ty) env.currentLvl tycon with TyArrow {from = from, to = to} then
        unify env [infoTy ty] ty to;
        npatIsEmpty env (from, p)
      else
        error "Invalid constructor type in snpatIsEmpty!"
    else
      error "Unknown constructor in snpatIsEmpty!"
```
</ToggleWrapper>
</DocBlock>

