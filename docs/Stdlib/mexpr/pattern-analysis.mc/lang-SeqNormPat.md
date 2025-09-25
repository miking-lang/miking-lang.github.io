import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqNormPat  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SNPat" kind="syn">

```mc
syn SNPat
```



<ToggleWrapper text="Code..">
```mc
syn SNPat =
  | NPatSeqTot [NPat]
  | NPatSeqEdge { prefix : [NPat], disallowed : Set Int, postfix : [NPat] }
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
  | (NPatSeqTot a, NPatSeqTot b) ->
    seqCmp npatCmp a b
  | (NPatSeqEdge a, NPatSeqEdge b) ->
    let preRes = seqCmp npatCmp a.prefix b.prefix in
    if eqi 0 preRes then
      let midRes = setCmp a.disallowed b.disallowed in
      if eqi 0 midRes then seqCmp npatCmp a.postfix b.postfix
      else midRes
    else preRes
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
  | NPatSeqTot pats ->
    cons (SNPat (NPatSeqEdge { prefix = []
                             , disallowed = setOfSeq subi [length pats]
                             , postfix = [] }))
      (seqComplement (lam x. SNPat (NPatSeqTot x)) pats)
  | NPatSeqEdge { prefix = pre, disallowed = dis, postfix = post } ->
    match (length pre, length post) with (preLen, postLen) in
    let complementedProduct =
      seqComplement
        (lam pats.
          match splitAt pats preLen with (pre, post) in
          SNPat (NPatSeqEdge { prefix = pre
                             , disallowed = dis
                             , postfix = post }))
        (concat pre post)
    in
    let shortTotPats =
      create (addi preLen postLen)
        (lam n. SNPat (NPatSeqTot (make n (wildpat ()))))
    in
    let disTotPats =
      map (lam n. SNPat (NPatSeqTot (make n (wildpat ())))) (setToSeq dis)
    in
    join [complementedProduct, shortTotPats, disTotPats]
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
  | (NPatSeqTot pats1, NPatSeqTot pats2) ->
    match eqi (length pats1) (length pats2) with false
    then []
    else
      map (lam x. SNPat (NPatSeqTot x))
        (seqMapM (lam x. x)
           (zipWith (lam p1. lam p2. npatIntersect (p1, p2)) pats1 pats2))
  | (NPatSeqEdge { prefix = pre1, disallowed = dis1, postfix = post1},
     NPatSeqEdge { prefix = pre2, disallowed = dis2, postfix = post2}) ->
    let prePreLen = mini (length pre1) (length pre2) in
    match splitAt pre1 prePreLen with (prePre1, prePost1) in
    match splitAt pre2 prePreLen with (prePre2, prePost2) in
    match (length post1, length post2) with (postLen1, postLen2) in
    let postPostLen = mini postLen1 postLen2 in
    match splitAt post1 (subi postLen1 postPostLen) with (postPre1, postPost1) in
    match splitAt post2 (subi postLen2 postPostLen) with (postPre2, postPost2) in

    let prePre =
      seqMapM (lam x. x)
        (zipWith (lam p1. lam p2. npatIntersect (p1, p2)) prePre1 prePre2)
    in
    let postPost =
      seqMapM (lam x. x)
        (zipWith (lam p1. lam p2. npatIntersect (p1, p2)) postPost1 postPost2)
    in
    let prePost = concat prePost1 prePost2 in
    let postPre = concat postPre1 postPre2 in
    let dis =
      mapFilterWithKey (lam i. lam.
        geqi i (addi
                  (addi prePreLen (length prePost))
                  (addi (length postPre) postPostLen)))
        (setUnion dis1 dis2) in

    let simple =
      seqLiftA2 (lam pre. lam post.
        (SNPat (NPatSeqEdge { prefix = concat pre prePost
                            , disallowed = dis
                            , postfix = concat postPre post })))
        prePre postPost
    in

    let overlap =
      if eqSign
           (subi (length prePost1) (length prePost2))
           (subi (length postPre1) (length postPre2))
      then []
      else
        let k = subi (length prePost) (length postPre) in
        let m = maxi (length prePost) (length postPre) in
        let mids =
          join
            (create (absi k) (lam i.
              if setMem (foldl addi 0 [ prePreLen, m, i, postPostLen ]) dis
              then []
              else
                seqMapM (lam x. x)
                  (zipWith (lam p1. lam p2. npatIntersect (p1, p2))
                     (concat prePost (make (addi (maxi 0 (negi k)) i) (wildpat ())))
                     (concat (make (addi (maxi 0 k) i) (wildpat ())) postPre))))
        in
        seqLiftA3 (lam prePre. lam mid. lam postPost.
          SNPat (NPatSeqTot (join [prePre, mid, postPost])))
          prePre mids postPost
    in
    concat simple overlap

  | (NPatSeqEdge { prefix = pre, disallowed = dis, postfix = post },
     NPatSeqTot pats)
  | (NPatSeqTot pats,
     NPatSeqEdge { prefix = pre, disallowed = dis, postfix = post }) ->
    match (length pre, length post, length pats) with (preLen, postLen, patLen) in
    if setMem patLen dis then [] else
      if gti (addi preLen postLen) patLen then []
      else
        map (lam x. SNPat (NPatSeqTot x))
          (seqMapM (lam x. x)
             (zipWith (lam p1. lam p2. npatIntersect (p1, p2))
                (join [pre, make (subi (subi patLen preLen) postLen) (wildpat ()), post])
                pats))
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
  | NPatSeqTot pats -> pseqtot_ (map npatToPat pats)
  | NPatSeqEdge {prefix = pre, disallowed = dis, postfix = post} ->
    let edgepat = pseqedgew_ (map npatToPat pre) (map npatToPat post) in
    if setIsEmpty dis then edgepat else
      pand_ edgepat
        (pnot_ (foldl1 por_ (map (lam n. pseqtot_ (make n pvarw_)) (setToSeq dis))))
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
  | PatSeqTot { pats = ps } ->
    map (lam x. SNPat (NPatSeqTot x))
      (seqMapM (lam x. x) (map patToNormpat ps))
  | PatSeqEdge { prefix = pre, postfix = post } ->
    let pre  = seqMapM (lam x. x) (map patToNormpat pre)  in
    let post = seqMapM (lam x. x) (map patToNormpat post) in
    seqLiftA2 (lam pre. lam post.
      (SNPat (NPatSeqEdge { prefix = pre
                          , disallowed = setEmpty subi
                          , postfix = post })))
      pre post
```
</ToggleWrapper>
</DocBlock>

