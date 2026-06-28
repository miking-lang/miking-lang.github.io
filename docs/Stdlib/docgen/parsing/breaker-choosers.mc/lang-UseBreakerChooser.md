import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UseBreakerChooser  
  

Use is by far the simplest language, as it contains no nested blocks  
and always breaks on "in".  
No choose implementation is even needed.

  
  
  
## Semantics  
  

          <DocBlock title="absorbIt" kind="sem">

```mc
sem absorbIt : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`We just want to absorb the "in" breaker.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem absorbIt =
        | (StateUse {}, "in") -> true
```
</ToggleWrapper>
</DocBlock>

