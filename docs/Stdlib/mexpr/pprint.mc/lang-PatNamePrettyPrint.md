import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PatNamePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="_pprint_patname" kind="sem">

```mc
sem _pprint_patname : PprintEnv -> PatName -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem _pprint_patname (env : PprintEnv) =
  | PName name ->
    pprintVarName env name
  | PWildcard () -> (env, "_")
```
</ToggleWrapper>
</DocBlock>

