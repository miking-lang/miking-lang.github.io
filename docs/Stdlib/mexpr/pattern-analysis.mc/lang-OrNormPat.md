import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OrNormPat  
  

  
  
  
## Semantics  
  

          <DocBlock title="patToNormpat" kind="sem">

```mc
sem patToNormpat : Ast_Pat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem patToNormpat =
  | PatOr {lpat = l, rpat = r} ->
    concat (patToNormpat l) (patToNormpat r)
```
</ToggleWrapper>
</DocBlock>

