import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PolyKindPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getKindStringCode" kind="sem">

```mc
sem getKindStringCode : Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Kind -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getKindStringCode (indent : Int) (env : PprintEnv) =
  | Poly () -> (env, "Poly")
```
</ToggleWrapper>
</DocBlock>

