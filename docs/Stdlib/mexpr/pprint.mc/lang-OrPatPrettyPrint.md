import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OrPatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="patPrecedence" kind="sem">

```mc
sem patPrecedence : Ast_Pat -> Int
```



<ToggleWrapper text="Code..">
```mc
sem patPrecedence =
  | PatOr _ -> 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getPatStringCode" kind="sem">

```mc
sem getPatStringCode : Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Pat -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getPatStringCode (indent : Int) (env : PprintEnv) =
  | PatOr {lpat = l, rpat = r} ->
    match printPatParen indent 0 env l with (env, l2) in
    match printPatParen indent 0 env r with (env, r2) in
    (env, join [l2, " | ", r2])
```
</ToggleWrapper>
</DocBlock>

