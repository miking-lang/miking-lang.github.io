import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NotPatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getPatStringCode" kind="sem">

```mc
sem getPatStringCode : all a. Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Pat -> (a, String)
```



<ToggleWrapper text="Code..">
```mc
sem getPatStringCode (indent : Int) (env : PprintEnv) =
  | PatNot {subpat = p} ->
    match printPatParen indent 2 env p with (env, p2) in
    (env, join ["!", p2])
```
</ToggleWrapper>
</DocBlock>

