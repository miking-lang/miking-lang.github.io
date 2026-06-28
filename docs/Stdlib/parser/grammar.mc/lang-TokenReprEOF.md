import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TokenReprEOF  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="TokenRepr" kind="syn">

```mc
syn TokenRepr
```



<ToggleWrapper text="Code..">
```mc
syn TokenRepr =
  | EOFRepr ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tokReprToStr" kind="sem">

```mc
sem tokReprToStr : TokenReprBase_TokenRepr -> String
```



<ToggleWrapper text="Code..">
```mc
sem tokReprToStr =
  | EOFRepr _ -> "<EOF>"
```
</ToggleWrapper>
</DocBlock>

