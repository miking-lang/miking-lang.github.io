import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConNormPatMatch  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToSimpleCon" kind="sem">

```mc
sem exprToSimpleCon : Ast_Expr -> Option NormPat_SimpleCon
```



<ToggleWrapper text="Code..">
```mc
sem exprToSimpleCon =
  | TmConApp { ident = cident } -> Some (ConCon cident)
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
  | (TmConApp {ident = cident, body = b}, NPatCon {ident = pident, subpat = p}) ->
    if nameEq cident pident
    then matchNPat (b, p)
    else None ()
```
</ToggleWrapper>
</DocBlock>

