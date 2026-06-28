import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntNormPatMatch  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToSimpleCon" kind="sem">

```mc
sem exprToSimpleCon : Ast_Expr -> Option NormPat_SimpleCon
```



<ToggleWrapper text="Code..">
```mc
sem exprToSimpleCon =
  | TmConst { val = CInt i } -> Some (IntCon i.val)
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
  | (TmConst {val = CInt i}, NPatInt j) ->
    if eqi i.val j then Some (mapEmpty nameCmp)
    else None ()
```
</ToggleWrapper>
</DocBlock>

