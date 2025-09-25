import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataKindAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Kind" kind="syn">

```mc
syn Kind
```



<ToggleWrapper text="Code..">
```mc
syn Kind =
  | Data { types : Map Name { lower : Set Name, upper : Option (Set Name) } }
```
</ToggleWrapper>
</DocBlock>

