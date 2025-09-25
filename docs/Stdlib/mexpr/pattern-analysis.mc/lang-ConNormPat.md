import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConNormPat  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SimpleCon" kind="syn">

```mc
syn SimpleCon
```



<ToggleWrapper text="Code..">
```mc
syn SimpleCon =
  | ConCon Name
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SNPat" kind="syn">

```mc
syn SNPat
```



<ToggleWrapper text="Code..">
```mc
syn SNPat =
  | NPatCon { ident : Name, subpat : NPat }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="simpleConCmpH" kind="sem">

```mc
sem simpleConCmpH : (NormPat_SimpleCon, NormPat_SimpleCon) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem simpleConCmpH =
  | (ConCon a, ConCon b) -> nameCmp a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="simpleConComplement" kind="sem">

```mc
sem simpleConComplement : NormPat_SimpleCon -> NormPat_SNPat
```



<ToggleWrapper text="Code..">
```mc
sem simpleConComplement =
  | ConCon a ->
    NPatCon { ident = a, subpat = wildpat () }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="simpleConToPat" kind="sem">

```mc
sem simpleConToPat : NormPat_SimpleCon -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem simpleConToPat =
  | ConCon a -> npcon_ a pvarw_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatCmp" kind="sem">

```mc
sem snpatCmp : (NormPat_SNPat, NormPat_SNPat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem snpatCmp =
  | (NPatCon a, NPatCon b) ->
    let nameRes = nameCmp a.ident b.ident in
    if eqi 0 nameRes then npatCmp a.subpat b.subpat
    else nameRes
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatToSimpleCon" kind="sem">

```mc
sem snpatToSimpleCon : NormPat_SNPat -> Option NormPat_SimpleCon
```



<ToggleWrapper text="Code..">
```mc
sem snpatToSimpleCon =
  | NPatCon a -> Some (ConCon a.ident)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatComplement" kind="sem">

```mc
sem snpatComplement : NormPat_SNPat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem snpatComplement =
  | NPatCon {ident = c, subpat = p} ->
    cons
      (notpatSimple (ConCon c))
      (map
         (lam p. SNPat (NPatCon {ident = c, subpat = p}))
         (npatComplement p))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatIntersect" kind="sem">

```mc
sem snpatIntersect : (NormPat_SNPat, NormPat_SNPat) -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem snpatIntersect =
  | (NPatCon {ident = c1, subpat = p1},
     NPatCon {ident = c2, subpat = p2}) ->
    if nameEq c1 c2 then
      map
        (lam p. SNPat (NPatCon {ident = c1, subpat = p}))
        (npatIntersect (p1, p2))
    else
      []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatToPat" kind="sem">

```mc
sem snpatToPat : NormPat_SNPat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem snpatToPat =
  | NPatCon {ident = c, subpat = p} ->
    npcon_ c (npatToPat p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patToNormpat" kind="sem">

```mc
sem patToNormpat : Ast_Pat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem patToNormpat =
  | PatCon {ident = c, subpat = p} ->
    map
      (lam p. SNPat (NPatCon {ident = c, subpat = p}))
      (patToNormpat p)
```
</ToggleWrapper>
</DocBlock>

