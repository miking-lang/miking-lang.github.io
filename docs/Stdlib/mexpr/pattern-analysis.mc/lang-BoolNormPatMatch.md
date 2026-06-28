import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BoolNormPatMatch  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToSimpleCon" kind="sem">

```mc
sem exprToSimpleCon : Ast_Expr -> Option NormPat_SimpleCon
```



<ToggleWrapper text="Code..">
```mc
sem exprToSimpleCon =
  | TmConst { val = CBool i } -> Some (BoolCon i.val)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchSNPat" kind="sem">

```mc
sem matchSNPat : (Ast_Expr, NormPat_SNPat) -> Option (Map Name NormPat_NormPat)
```



<ToggleWrapper text="Code..">
```mc
sem matchSNPat =
  | (TmConst {val = CBool i}, NPatBool j) ->
    if eqi (if i.val then 1 else 0) (if j then 1 else 0)
    then Some (mapEmpty nameCmp)
    else None ()
```
</ToggleWrapper>
</DocBlock>

