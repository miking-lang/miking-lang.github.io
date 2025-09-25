import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# externals.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>  
  
## Types  
  

          <DocBlock title="ExtInfo" kind="type">

```mc
type ExtInfo : { ident: String, header: String }
```



<ToggleWrapper text="Code..">
```mc
type ExtInfo = { ident: String, header: String }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExtMap" kind="type">

```mc
type ExtMap : Map String ExtInfo
```



<ToggleWrapper text="Code..">
```mc
type ExtMap = Map String ExtInfo
```
</ToggleWrapper>
</DocBlock>

