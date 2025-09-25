import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NPatImpl  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="NPat" kind="syn">

```mc
syn NPat
```



<ToggleWrapper text="Code..">
```mc
syn NPat =
  | SNPat SNPat
  | NPatNot (Set SimpleCon)
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="npatCmpH" kind="sem">

```mc
sem npatCmpH : (NormPat_NPat, NormPat_NPat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem npatCmpH =
  | (SNPat a, SNPat b) ->
    snpatCmp (a, b)
  | (NPatNot a, NPatNot b) ->
    setCmp a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npatComplement" kind="sem">

```mc
sem npatComplement : NormPat_NPat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem npatComplement =
  | SNPat snp    -> snpatComplement snp
  | NPatNot cons ->
    setFold (lam ks. lam k. snoc ks (SNPat (simpleConComplement k)))
      [] cons
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npatIntersect" kind="sem">

```mc
sem npatIntersect : (NormPat_NPat, NormPat_NPat) -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem npatIntersect =
  | (SNPat a, SNPat b) ->
    snpatIntersect (a, b)
  | (NPatNot cons, SNPat sp & pat)
  | (SNPat sp & pat, NPatNot cons) ->
    if optionMapOr false (lam x. setMem x cons) (snpatToSimpleCon sp)
    then []
    else [pat]
  | (NPatNot cons1, NPatNot cons2) ->
    [NPatNot (setUnion cons1 cons2)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npatToPat" kind="sem">

```mc
sem npatToPat : NormPat_NPat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem npatToPat =
  | SNPat a -> snpatToPat a
  | NPatNot cons ->
    if setIsEmpty cons then
      pvarw_
    else
      pnot_ (foldl1 por_ (map simpleConToPat (setToSeq cons)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="seqComplement" kind="sem">

```mc
sem seqComplement : ([NormPat_NPat] -> NormPat_NPat) -> [NormPat_NPat] -> NormPat_NormPat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem seqComplement constr =
  | seq ->
    let nested : [[[NPat]]] =
      create (length seq)
        (lam target.
          mapi (lam i. lam p.
            if lti i target then
              [p]
            else
              if eqi i target then npatComplement p
              else [wildpat ()]) seq)
    in
    let distributed : [[NPat]] =
      joinMap (seqMapM (lam x. x)) nested in
    map constr distributed
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wildpat" kind="sem">

```mc
sem wildpat : () -> NormPat_NPat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem wildpat =
  | () -> NPatNot (setEmpty simpleConCmp)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="notpatSimple" kind="sem">

```mc
sem notpatSimple : NormPat_SimpleCon -> NormPat_NPat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem notpatSimple =
  | c -> NPatNot (setOfSeq simpleConCmp [c])
```
</ToggleWrapper>
</DocBlock>

