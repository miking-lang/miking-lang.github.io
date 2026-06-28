import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NormPatImpl  
  

  
  
  
## Semantics  
  

          <DocBlock title="normpatComplement" kind="sem">

```mc
sem normpatComplement : NormPat_NormPat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem normpatComplement =
  | [] -> [wildpat ()]
  | np ->
    foldl1 normpatIntersect (map npatComplement np)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normpatIntersect" kind="sem">

```mc
sem normpatIntersect : NormPat_NormPat -> NormPat_NormPat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem normpatIntersect np1 =
  | np2 ->
    join
      (seqLiftA2 (lam x. lam y. npatIntersect (x, y))
         np1 np2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normpatToPat" kind="sem">

```mc
sem normpatToPat : NormPat_NormPat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem normpatToPat =
  | [] -> pnot_ pvarw_
  | np ->
    foldl1 por_ (map npatToPat np)
```
</ToggleWrapper>
</DocBlock>

