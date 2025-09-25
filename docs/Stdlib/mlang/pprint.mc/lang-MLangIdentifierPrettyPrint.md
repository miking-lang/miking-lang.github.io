import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangIdentifierPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintLangName" kind="sem">

```mc
sem pprintLangName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintLangName (env: PprintEnv) =
  | name ->
    match pprintEnvGetStr env name with (env,str) in
    let s = pprintLangString str in
    (env, s)
```
</ToggleWrapper>
</DocBlock>

