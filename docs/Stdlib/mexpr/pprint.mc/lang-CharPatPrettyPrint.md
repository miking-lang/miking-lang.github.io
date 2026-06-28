import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharPatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getPatStringCode" kind="sem">

```mc
sem getPatStringCode : Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Pat -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getPatStringCode (indent : Int) (env: PprintEnv) =
  | PatChar t -> (env, join ["\'", escapeChar t.val, "\'"])
```
</ToggleWrapper>
</DocBlock>

