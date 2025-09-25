import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IsEmpty  
  

  
  
  
## Types  
  

          <DocBlock title="Bounds" kind="type">

```mc
type Bounds : Map Type (Map Name (Set Name))
```



<ToggleWrapper text="Code..">
```mc
type Bounds = Map Type (Map Name (Set Name))
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Open" kind="syn">

```mc
syn Open
```



<ToggleWrapper text="Code..">
```mc
syn Open a =
  | LOpen a
  | ROpen a
  | Neither ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="compareBounds" kind="sem">

```mc
sem compareBounds : IsEmpty_Bounds -> IsEmpty_Bounds -> IsEmpty_Open Bool
```

<Description>{`Compare two assignments of meta variables to upper bound  
constructor sets.  If either assignment is strictly more open  
than the other, this is indicated with a payload of true.  
If either one is more open on the set of overlapping keys,  
this is indicated with a payload of false.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compareBounds m1 =
  | m2 ->
    let dataMoreOpen = lam d1. lam d2.
      mapAllWithKey
        (lam t. lam ks1.
          mapFindApplyOrElse
            (lam ks2. setSubset ks2 ks1) (lam. false) t d2)
        d1
    in

    let combine = lam e1. lam e2.
      switch (e1, e2)
      case (Neither _ | LOpen _, LOpen _) then Some (LOpen ())
      case (Neither _ | ROpen _, ROpen _) then Some (ROpen ())
      case _ then None ()
      end
    in

    if mapIsEmpty m1 then LOpen true else
      if mapIsEmpty m2 then ROpen true else

        let middle =
          mapFoldlOption
            (lam acc. lam ty. lam d1.
              match mapLookup ty m2 with Some d2 then
                if dataMoreOpen d1 d2 then combine acc (LOpen ()) else
                  if dataMoreOpen d2 d1 then combine acc (ROpen ()) else
                    None ()
              else
                Some acc)
            (Neither ())
            m1
        in

        switch middle
        case Some (LOpen ()) then
          LOpen (mapAllWithKey (lam ty. lam. mapMem ty m2) m1)
        case Some (ROpen ()) then
          ROpen (mapAllWithKey (lam ty. lam. mapMem ty m1) m2)
        case Some (Neither ()) then
          LOpen false
        case None () then
          Neither ()
        end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="boundsCompatible" kind="sem">

```mc
sem boundsCompatible : IsEmpty_Bounds -> IsEmpty_Bounds -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem boundsCompatible b1 =
  | b2 ->
    mapAll (mapAll (lam x. x)) (mapIntersectWith (mapIntersectWith setEq) b1 b2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normpatIsEmpty" kind="sem">

```mc
sem normpatIsEmpty : TCEnv -> (Ast_Type, NormPat_NormPat) -> [IsEmpty_Bounds]
```

<Description>{`Perform an emptiness check for the given pattern and type.  
Returns a list of mappings from meta variables of Data kind to  
upper bound constructor sets, where each element represents a way  
of closing the types that makes the pattern empty. If the list is  
empty, then the pattern is not empty.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem normpatIsEmpty env =
  | (ty, np) ->
    foldl
      (lam ms. lam p.
        joinMap (lam m1.
          (joinMap (lam m2.
            if boundsCompatible m1 m2 then [mapUnionWith mapUnion m1 m2]
            else [])
             ms))
          (npatIsEmpty env (ty, p)))
      [mapEmpty cmpType]
      np
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npatIsEmpty" kind="sem">

```mc
sem npatIsEmpty : TCEnv -> (Ast_Type, NormPat_NPat) -> [IsEmpty_Bounds]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem npatIsEmpty env =
  | (ty, SNPat p) -> snpatIsEmpty env (unwrapType ty, p)
  | (ty, NPatNot cons) ->
    switch getTypeArgs ty
    case (TyCon t, _) then
      let cons =
        setFold
          (lam ks. lam k.
            match k with ConCon k then setInsert k ks else ks)
          (setEmpty nameCmp) cons
      in
      switch unwrapType t.data
      case (TyVar _ | TyData _) & dty then
        match getKind env dty with Data {types = types} then
          match mapLookup t.ident types with Some ks then
            match ks.upper with Some upper then
              if and (setSubset ks.lower cons) (setSubset upper cons)
              then [mapEmpty cmpType] else []
            else []
          else error "Invalid data in npatIsEmpty!"
        else []
      case TyMetaVar _ & dty then
        if setIsEmpty cons then [] else
          let mkBounds = lam.
            mapFromSeq cmpType [(dty, mapFromSeq nameCmp [(t.ident, cons)])]
          in
          match getKind env dty with Data {types = types} then
            match mapLookup t.ident types with Some ks then
              if setSubset ks.lower cons then [mkBounds ()] else []
            else error "Invalid data in npatIsEmpty!"
          else [mkBounds ()]
      case _ then []
      end
    case (TyBool _, _) then
      if forAll (lam b. setMem (BoolCon b) cons) [true, false] then
        [mapEmpty cmpType]
      else []
    case _ then []
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatIsEmpty" kind="sem">

```mc
sem snpatIsEmpty : TCEnv -> (Ast_Type, NormPat_SNPat) -> [IsEmpty_Bounds]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem snpatIsEmpty env =
  | _ -> []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchesPossible" kind="sem">

```mc
sem matchesPossible : TCEnv -> Either [(Level, IsEmpty_Bounds)] (Map Name NormPat_NormPat)
```

<Description>{`Perform an analysis on the matches performed so far in the  
program execution.  Returns \`Right m\` if there is an assignment  
\`m\` from variable names to patterns through which this program  
point could be reached.  Returns \`Left ms\` if this program point  
can be made unreachable by closing some variables' types as  
indicated by the alternatives in \`ms\`.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchesPossible =
  | env ->
    recursive let work = lam f. lam a. lam bs.
      match bs with [b] ++ bs then
        match f a b with a & ![] then work f a bs
        else Right b
      else Left a
    in
    work
      (lam acc. lam m.
        let bs =
          mapFoldWithKey
            (lam acc. lam n. lam p.
              match mapLookup n env.varEnv with Some ty then
                match mapLookup n env.matchVars with Some lvl then
                  let ty = inst (infoTy ty) env.currentLvl ty in
                  concat acc (map (lam x. (lvl, x)) (normpatIsEmpty env (ty, p)))
                else error "Unknown variable in matchesPossible!"
              else error "Unknown variable in matchesPossible!")
            [] m
        in
        joinMap (lam x.
          (joinMap (lam y.
            if boundsCompatible x.1 y.1 then
              [(mini x.0 y.0, mapUnionWith mapUnion x.1 y.1)]
            else [])
             acc))
          bs)
      [(1000000000, mapEmpty cmpType)]
      env.matches
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeBounds" kind="sem">

```mc
sem mergeBounds : [(Level, IsEmpty_Bounds)] -> Option IsEmpty_Bounds
```

<Description>{`Take a \(non\-empty\) sequence of closing assignments and attempt to  
merge them into a single most open one by iterating compareBounds.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mergeBounds =
  | ms ->
    let getBounds = lam l. lam r. lam strict.
      if strict then l else mapUnionWith (lam x. lam. x) l r
    in
    let merge = lam acc. lam m.
      if gti m.0 acc.0 then (m.0, [m.1]) else
        if gti acc.0 m.0 then acc else
          (m.0,
           foldlK
             (lam acc2. lam a. lam recur.
               match acc2 with (len, bs, x) in
               let newlen = addi 1 len in
               switch compareBounds x a
               case LOpen strict then recur (newlen, bs, getBounds x a strict)
               case ROpen strict then
                 join [bs, [getBounds a x strict], (splitAt acc.1 newlen).1]
               case Neither _ then recur (newlen, snoc bs a, x)
               end)
             (0, [], m.1) acc.1 (lam x. snoc x.1 x.2))
    in
    match foldl merge (0, []) ms with (_, [m]) then Some m
    else None ()
```
</ToggleWrapper>
</DocBlock>

