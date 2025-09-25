import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# server-options.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/global/format.mc"} style={S.link}>../global/format.mc</a>  
  
## Types  
  

          <DocBlock title="ServerOptions" kind="type">

```mc
type ServerOptions : { fmt: Format, folder: String, firstFile: String, noOpen: Bool, link: String }
```



<ToggleWrapper text="Code..">
```mc
type ServerOptions = use Formats in {
    fmt: Format,
    folder: String,
    firstFile: String,
    noOpen: Bool,
    link: String
}
```
</ToggleWrapper>
</DocBlock>

