import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TyQualifiedNameBootParser  
  

  
  
  
## Semantics  
  

          <DocBlock title="matchType" kind="sem">

```mc
sem matchType : BootParseTree -> Int -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem matchType t =
  | 216 ->
    let plusLen = glistlen t 0 in
    let minusLen = glistlen t 1 in

    let parsePairs = lam offset. lam len. map
      (lam i. (gname t (addi i offset), gname t (addi (addi i offset) 1)))
      (range 0 len 2) in

    TyQualifiedName {pos = eqi (gint t 0) 1,
                     info = ginfo t 0,
                     lhs = gname t 0,
                     rhs = gname t 1,
                     plus = parsePairs 2 plusLen,
                     minus = parsePairs (addi 2 plusLen) minusLen}
```
</ToggleWrapper>
</DocBlock>

