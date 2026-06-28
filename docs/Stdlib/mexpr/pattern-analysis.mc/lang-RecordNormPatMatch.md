import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordNormPatMatch  
  

  
  
  
## Semantics  
  

          <DocBlock title="matchSNPat" kind="sem">

```mc
sem matchSNPat : (Ast_Expr, NormPat_SNPat) -> Option (Map Name NormPat_NormPat)
```



<ToggleWrapper text="Code..">
```mc
sem matchSNPat =
  | (TmRecord {bindings = bs}, NPatRecord pbs) ->
    mapFoldlOption
      (lam acc. lam. lam m. optionMap (mapUnionWith normpatIntersect acc) m)
      (mapEmpty nameCmp)
      (mapIntersectWith (lam e. lam p. matchNPat (e, p)) bs pbs)
```
</ToggleWrapper>
</DocBlock>

