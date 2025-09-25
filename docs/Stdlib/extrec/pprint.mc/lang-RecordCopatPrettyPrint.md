import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordCopatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getCopatStringCode" kind="sem">

```mc
sem getCopatStringCode : all a. all a1. a -> a1 -> CopatAst_Copat -> (a1, String)
```



<ToggleWrapper text="Code..">
```mc
sem getCopatStringCode indent env =
  | RecordCopat c ->
    (env, join ["{ ", strJoin ", " c.fields, " }"])
```
</ToggleWrapper>
</DocBlock>

