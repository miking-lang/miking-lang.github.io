import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShallowSeq  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SPat" kind="syn">

```mc
syn SPat
```



<ToggleWrapper text="Code..">
```mc
syn SPat =
  | SPatSeqTot {elements : [Name], slices : Ref (Map (Int, Int) Name), ty : Type, info : Info}
  -- NOTE(vipa, 2022-05-26): The translation strategy used matches
  -- sequence patterns longest first, i.e., if the compared pattern
  -- requires something longer than minLength then the compared
  -- pattern is dead.
  | SPatSeqGE {minLength : Int, prefix : Ref [Name], postfix : Ref [Name], slices : Ref (Map (Int, Int) Name), ty : Type, info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="decompose" kind="sem">

```mc
sem decompose : Name -> (ShallowBase_SPat, Ast_Pat) -> (ShallowBase_PatUpdate, Option Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem decompose name =
  | (SPatSeqTot tot, pat & PatSeqTot x) ->
    if neqi (length tot.elements) (length x.pats) then defaultDecomposition pat else
    ([(mapFromSeq nameCmp (zip tot.elements x.pats), _empty ())], None ())
  | (SPatSeqTot tot, pat & PatSeqEdge x) ->
    if lti (length tot.elements) (addi (length x.prefix) (length x.postfix))
    then ([], None ())
    else
      -- TODO(vipa, 2022-05-24): I need to make a name for the middle
      -- thing if it's present
      let pres = zip tot.elements x.prefix in
      let posts = zip (reverse tot.elements) (reverse x.postfix) in
      let mid = match x.middle with PName name
        then mapInsert name (_getSliceName (length x.prefix, length x.postfix) tot.slices) (_empty ())
        else _empty () in
      ([(mapFromSeq nameCmp (concat pres posts), mid)], Some pat)
  | (SPatSeqGE shallow, pat & PatSeqEdge x) ->
    let deepLength = addi (length x.prefix) (length x.postfix) in
    let survivesMatch = leqi deepLength shallow.minLength in
    let survivesFail = lti deepLength shallow.minLength in
    let success =
      if survivesMatch then
        let extendUsing
          : ([Name] -> [Name] -> [Name]) -> Ref [Name] -> Int -> ()
          = lam f. lam names. lam count.
            let nLen = length (deref names) in
            if lti nLen count then
              modref names (f (deref names) (create (subi count nLen) (lam. nameSym "elem")))
            else () in
        extendUsing concat shallow.prefix (length x.prefix);
        extendUsing (lam old. lam new. concat new old) shallow.postfix (length x.postfix);
        let pres = zip (deref shallow.prefix) x.prefix in
        let posts = zip (reverse (deref shallow.postfix)) (reverse x.postfix) in
        let mid = match x.middle with PName name
          then mapInsert name (_getSliceName (length x.prefix, length x.postfix) shallow.slices) (_empty ())
          else _empty () in
        [(mapFromSeq nameCmp (concat pres posts), mid)]
      else []
    in
    let fail =
      if survivesFail
      then Some pat
      else None ()
    in (success, fail)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowMinusIsEmpty" kind="sem">

```mc
sem shallowMinusIsEmpty : (ShallowBase_SPat, ShallowBase_SPat) -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem shallowMinusIsEmpty =
  | (SPatSeqTot es, SPatSeqGE x) -> leqi x.minLength (length es.elements)
  | (SPatSeqGE _, SPatSeqTot _) -> false
  | (SPatSeqGE x1, SPatSeqGE x2) -> geqi x1.minLength x2.minLength
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="processSPats" kind="sem">

```mc
sem processSPats : Set ShallowBase_SPat -> ShallowBase_SPat -> [ShallowBase_SPat]
```



<ToggleWrapper text="Code..">
```mc
sem processSPats spats =
  | SPatSeqTot {ty = ty, info = info} | SPatSeqGE {ty = ty, info = info} ->
    let getTotLen = lam acc. lam v.
      match v with SPatSeqTot es then setInsert (length es.elements) acc else acc in
    let totLens = setFold getTotLen (setEmpty subi) spats in
    recursive let getNextEmpty = lam i.
      if setMem i totLens then getNextEmpty (addi i 1) else i in
    let getGELen = lam acc. lam v.
      match v with SPatSeqGE x then setInsert (getNextEmpty x.minLength) acc else acc in
    let geLens = setFold getGELen (setEmpty subi) spats in
    let mkTot = lam count.
      SPatSeqTot {elements = create count (lam. nameSym "e"), slices = ref _emptySlices, ty = ty, info = info} in
    let mkGe = lam count.
      SPatSeqGE {minLength = count, prefix = ref [], postfix = ref [], slices = ref _emptySlices, ty = ty, info = info} in
    let spats = concat
      (map mkTot (setToSeq totLens))
      (map mkGe (setToSeq geLens)) in
    let getLen = lam v.
      switch v
      case SPatSeqTot x then length x.elements
      case SPatSeqGE x then x.minLength
      end in
    -- NOTE(vipa, 2022-08-17): Reverse sort, i.e., we check longer
    -- patterns first
    sort (lam l. lam r. subi (getLen r) (getLen l)) spats
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectShallows" kind="sem">

```mc
sem collectShallows : Ast_Pat -> Set ShallowBase_SPat
```



<ToggleWrapper text="Code..">
```mc
sem collectShallows =
  | PatSeqTot x -> _ssingleton (SPatSeqTot
    { elements = map (lam. nameSym "elem") x.pats
    , slices = ref _emptySlices
    , ty = x.ty
    , info = x.info
    })
  | PatSeqEdge x -> _ssingleton (SPatSeqGE
    { minLength = addi (length x.prefix) (length x.postfix)
    , prefix = ref [], postfix = ref []
    , slices = ref _emptySlices
    , ty = x.ty
    , info = x.info
    })
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectNames" kind="sem">

```mc
sem collectNames : Ast_Pat -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem collectNames =
  | pat & PatSeqEdge x ->
    let here = match x.middle with PName name
      then setInsert name (setEmpty nameCmp)
      else setEmpty nameCmp in
    sfold_Pat_Pat (lam acc. lam p. setUnion acc (collectNames p)) here pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkMatch" kind="sem">

```mc
sem mkMatch : Name -> Ast_Expr -> Ast_Expr -> ShallowBase_SPat -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem mkMatch scrutinee t e =
  | SPatSeqTot x ->
    let for = lam s. lam f. map f s in
    let slices = for (mapBindings (deref x.slices))
      (lam pair. match pair with (pair, name) in
        let expr = switch pair
          case (0, 0) then nvar_ scrutinee
          case (n, 0) then
            tupleproj_ 1
              (withType
                (tytuple_ [x.ty, x.ty])
                (splitat_ (nvar_ scrutinee) (int_ n)))
          case (0, n) then
            tupleproj_ 0
              (withType
                (tytuple_ [x.ty, x.ty])
                (splitat_ (nvar_ scrutinee) (int_ (subi (length x.elements) n))))
          case (n, m) then
            subsequence_ (nvar_ scrutinee) (int_ n) (int_ (subi (length x.elements) (addi n m)))
          end
        in nulet_ name expr) in
    match_ (nvar_ scrutinee)
      (withInfoPat x.info (withTypePat x.ty (pseqtot_ (map npvar_ x.elements))))
      (bindall_ slices t)
      e
  | SPatSeqGE x ->
    let letFrom_ = lam n. lam i. nulet_ n (get_ (nvar_ scrutinee) i) in
    let pres = mapi
      (lam i. lam n. letFrom_ n (int_ i))
      (deref x.prefix) in
    let lenName = nameSym "len" in
    let posts = mapi
      (lam i. lam n. letFrom_ n (subi_ (nvar_ lenName) (int_ (addi i 1))))
      (reverse (deref x.postfix)) in
    let needLen = ref (not (null posts)) in
    let for = lam s. lam f. map f s in
    let slices = for (mapBindings (deref x.slices))
      (lam pair. match pair with (pair, name) in
        let expr = switch pair
          case (0, 0) then nvar_ scrutinee
          case (n, 0) then
            tupleproj_ 1
              (withType
                (tytuple_ [x.ty, x.ty])
                (splitat_ (nvar_ scrutinee) (int_ n)))
          case (0, n) then
            modref needLen true;
            tupleproj_ 0
              (withType
                (tytuple_ [x.ty, x.ty])
                (splitat_ (nvar_ scrutinee) (subi_ (nvar_ lenName) (int_ n))))
          case (n, m) then
            modref needLen true;
            subsequence_ (nvar_ scrutinee) (int_ n) (subi_ (nvar_ lenName) (int_ (addi n m)))
          end
        in nulet_ name expr) in
    let len = if deref needLen then [nulet_ lenName (length_ (nvar_ scrutinee))] else [] in
    match_ (nvar_ scrutinee) (withInfoPat x.info (withTypePat x.ty (pseqedgew_ (make x.minLength pvarw_) [])))
      (bindall_ (join [pres, len, slices, posts]) t)
      e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowIsInfallible" kind="sem">

```mc
sem shallowIsInfallible : ShallowBase_SPat -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem shallowIsInfallible =
  | SPatSeqGE x -> eqi x.minLength 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowCmp" kind="sem">

```mc
sem shallowCmp : (ShallowBase_SPat, ShallowBase_SPat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem shallowCmp =
  | (SPatSeqTot l, SPatSeqTot r) -> subi (length l.elements) (length r.elements)
  | (SPatSeqGE l, SPatSeqGE r) -> subi l.minLength r.minLength
```
</ToggleWrapper>
</DocBlock>

