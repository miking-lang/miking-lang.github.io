import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SourceCodeWordKinds  
  

\#\# SourceCodeWordKinds  
  
Visual categories used by the colorizer.

  
  
  
## Syntaxes  
  

          <DocBlock title="SourceCodeWordKind" kind="syn">

```mc
syn SourceCodeWordKind
```



<ToggleWrapper text="Code..">
```mc
syn SourceCodeWordKind =
    | CodeKeyword {}
    | CodeName {}
    | CodeDefault {}
    | CodeType {}
    | CodeNumber {}
```
</ToggleWrapper>
</DocBlock>

