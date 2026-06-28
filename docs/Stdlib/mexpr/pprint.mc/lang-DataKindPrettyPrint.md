import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataKindPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getKindStringCode" kind="sem">

```mc
sem getKindStringCode : Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Kind -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getKindStringCode (indent : Int) (env : PprintEnv) =
  | Data r ->
    let cons2str = lam env. lam cons.
      if setIsEmpty cons then (env, None ())
      else
        match mapAccumL pprintConName env (setToSeq cons)
        with (env, kstr) in
        (env, Some (strJoin " " kstr))
    in
    match
      mapFoldWithKey
        (lam acc. lam t. lam ks.
          match pprintTypeName acc.0 t with (env, tstr) in
          match cons2str env ks.lower with (env, lower) in
          match
            match ks.upper with Some u then cons2str env u
            else (env, None ())
          with (env, upper) in
          let prefix =
            if optionIsSome upper then "< " else
              if optionMapOr false setIsEmpty ks.upper then "| " else
                "> "
          in
          let consstr =
            optionCombine (lam x. lam y. Some (join [x, " | ", y])) upper lower
          in
          (env, snoc acc.1 (join [ tstr, "["
                                 , prefix
                                 , optionGetOr "" consstr
                                 , "]"])))
        (env, [])
        r.types
    with (env, consstr) in
    (env, join ["{", strJoin ", " consstr, "}"])
```
</ToggleWrapper>
</DocBlock>

