import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MCorePathResolution  
  

Use MCore\-style path resolution, e.g., using libraries set in  
MCORE\_LIBS

  
  
  
## Semantics  
  

          <DocBlock title="includeFileTypeExn" kind="sem">

```mc
sem includeFileTypeExn : MCoreLoader_FileType -> String -> String -> MCoreLoader_Loader -> ({env: SymEnv, path: String}, MCoreLoader_Loader)
```



<ToggleWrapper text="Code..">
```mc
sem includeFileTypeExn ftype dir path = | loader ->
    let resolved = stdlibResolveFileOr (lam x. error x) dir path in
    match _loadFile resolved (ftype, loader) with (env, loader) in
    ({path = resolved, env = env}, loader)
```
</ToggleWrapper>
</DocBlock>

