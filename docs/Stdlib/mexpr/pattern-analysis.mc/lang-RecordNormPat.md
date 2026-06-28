import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordNormPat  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SNPat" kind="syn">

```mc
syn SNPat
```



<ToggleWrapper text="Code..">
```mc
syn SNPat =
  | NPatRecord (Map SID NPat)
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="snpatCmp" kind="sem">

```mc
sem snpatCmp : (NormPat_SNPat, NormPat_SNPat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem snpatCmp =
  | (NPatRecord a, NPatRecord b) ->
    mapCmp npatCmp a b
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
  | NPatRecord pats ->
    match unzip (mapBindings pats) with (labels, pats) in
    seqComplement
      (lam pats.
        SNPat (NPatRecord (mapFromSeq cmpSID (zip labels pats))))
      pats
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
  | (NPatRecord pats1, NPatRecord pats2) ->
    let merged =
      mapMerge
        (lam p1. lam p2.
          switch (p1, p2)
          case (None (), None ()) then None ()
          case (Some p, None ()) | (None (), Some p) then Some [p]
          case (Some p1, Some p2) then Some (npatIntersect (p1, p2))
          end)
        pats1 pats2
    in
    let bindings =
      seqMapM (lam kv. map (lam v. (kv.0, v)) kv.1) (mapBindings merged) in
    map (lam bs. SNPat (NPatRecord (mapFromSeq cmpSID bs))) bindings
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
  | NPatRecord pats ->
    PatRecord {
      bindings = mapMap npatToPat pats,
      info = NoInfo (),
      ty = tyunknown_
    }
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
  | PatRecord { bindings = bs } | PatExtRecord {bindings = bs} ->
    let nested = mapMap (lam p. patToNormpat p) bs in
    let bindings =
      seqMapM (lam kv. map (lam v. (kv.0, v)) kv.1) (mapBindings nested) in
    map (lam bs. SNPat (NPatRecord (mapFromSeq cmpSID bs))) bindings
```
</ToggleWrapper>
</DocBlock>

