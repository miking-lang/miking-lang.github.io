import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataPatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="patPrecedence" kind="sem">

```mc
sem patPrecedence : Ast_Pat -> Int
```



<ToggleWrapper text="Code..">
```mc
sem patPrecedence =
  | PatCon _ -> 2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getPatStringCode" kind="sem">

```mc
sem getPatStringCode : all a. Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Pat -> (a, String)
```



<ToggleWrapper text="Code..">
```mc
sem getPatStringCode (indent : Int) (env: PprintEnv) =
  | PatCon t ->
    match pprintConName env t.ident with (env,str) in
    match printPatParen indent 3 env t.subpat with (env,subpat) in
    (env, join [str, " ", subpat])
```
</ToggleWrapper>
</DocBlock>

