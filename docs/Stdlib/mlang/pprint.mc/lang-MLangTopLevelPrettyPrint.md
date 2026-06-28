import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangTopLevelPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="mlang2str" kind="sem">

```mc
sem mlang2str : MLangTopLevel_MLangProgram -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mlang2str =
  | prog -> match pprintMLangProgram 0 pprintEnvEmpty prog with (_, s) in s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintMLangProgram" kind="sem">

```mc
sem pprintMLangProgram : Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> MLangTopLevel_MLangProgram -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintMLangProgram (indent : Int) (env : PprintEnv) =
  | {decls = decls, expr = expr} ->
    match mapAccumL (pprintDeclCode indent) env decls with (env, declStrs) in
    match pprintCode indent env expr with (env, exprStr) in
    (env, strJoin (pprintNewline indent) (concat declStrs ["mexpr", exprStr]))
```
</ToggleWrapper>
</DocBlock>

