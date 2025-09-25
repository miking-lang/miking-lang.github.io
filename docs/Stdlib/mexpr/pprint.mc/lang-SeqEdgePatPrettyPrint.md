import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="patPrecedence" kind="sem">

```mc
sem patPrecedence : Ast_Pat -> Int
```



<ToggleWrapper text="Code..">
```mc
sem patPrecedence =
  | PatSeqEdge _ -> 0
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
  | PatSeqEdge {prefix = pre, middle = patname, postfix = post} ->
    let make_patseqstr = lam f. lam env. lam pats.
      if null pats then (env, "") else
        match _pprint_patseq getPatStringCode indent env pats with (env, pats) in
        (env, f pats)
    in
    match make_patseqstr (lam str. concat str " ++ ") env pre with (env, pre) in
    match make_patseqstr (concat " ++ ") env post with (env, post) in
    match _pprint_patname env patname with (env, pname) in
    (env, join [pre, pname, post])
```
</ToggleWrapper>
</DocBlock>

