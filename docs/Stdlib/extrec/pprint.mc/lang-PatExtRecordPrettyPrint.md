import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PatExtRecordPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getPatStringCode" kind="sem">

```mc
sem getPatStringCode : Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Pat -> ({count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool}, String)
```



<ToggleWrapper text="Code..">
```mc
sem getPatStringCode indent env =
  | PatExtRecord {ident = ident, bindings = bindings} ->
    match pprintTypeName env ident with (env, ident) in
    if mapIsEmpty bindings then (env, join ["{", ident, " of nothing}"])
    else match record2tuple bindings with Some pats then
      match mapAccumL (lam env. lam e. getPatStringCode indent env e) env pats
      with (env, tuplePats) in
      let merged =
        match tuplePats with [e]
        then concat e ","
        else strJoin ", " tuplePats in
      (env, join ["(", merged, ")"])
    else match
      mapMapAccum
        (lam env. lam k. lam v.
           match getPatStringCode indent env v with (env,str) in
           (env,join [pprintLabelString k, " = ", str]))
         env bindings
    with (env,bindMap) in
    (env,join ["{", ident, " of ", strJoin ", " (mapValues bindMap), "}"])
```
</ToggleWrapper>
</DocBlock>

