import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShallowBase  
  

  
  
  
## Types  
  

          <DocBlock title="BranchInfo" kind="type">

```mc
type BranchInfo : (Map Name Pat, Map Name Name)
```

<Description>{`Names that still need to be examined. A \`Map Name Pat\`  
essentially represents a match on each \`Name\` with the  
corresponding \`Pat\`. The \`Map Name Name\` is a mapping from  
pattern names to names introduced by previous patterns.`}</Description>


<ToggleWrapper text="Code..">
```mc
type BranchInfo = (Map Name Pat, Map Name Name)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LiveBranch" kind="type">

```mc
type LiveBranch
```



<ToggleWrapper text="Code..">
```mc
type LiveBranch res =
    -- The possible ways to continue matching to reach this branch.
    -- Essentially, this is one big "or"; the pattern is in something
    -- like disjunctive normal form.
    { alts : [BranchInfo]
    -- Given a mapping from names in the pattern to the name of the
    -- matched value, construct an expression that executes the
    -- branch, currently through a function call to an earlier
    -- \\`let\\`-expression.
    , branchFunc : Map Name Name -> res
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PatUpdate" kind="type">

```mc
type PatUpdate : [BranchInfo]
```

<Description>{`A pair of new names to examine, along with the names that were  
bound.`}</Description>


<ToggleWrapper text="Code..">
```mc
type PatUpdate = [BranchInfo]
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SPat" kind="syn">

```mc
syn SPat
```



<ToggleWrapper text="Code..">
```mc
syn SPat =
  | SPatWild ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="decompose" kind="sem">

```mc
sem decompose : Name -> (ShallowBase_SPat, Ast_Pat) -> (ShallowBase_PatUpdate, Option Ast_Pat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem decompose name =
  | (_, PatNamed {ident = PName patName}) ->
    ([(_empty (), _singleton patName name)], None ())
  | (_, PatNamed {ident = PWildcard _}) ->
    ([(_empty (), _empty ())], None ())
  | (shallow, pat) ->
    match shallow with SPatWild _
    then ([(_singleton name pat, _empty ())], None ())
    else defaultDecomposition pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowMinusIsEmpty" kind="sem">

```mc
sem shallowMinusIsEmpty : (ShallowBase_SPat, ShallowBase_SPat) -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem shallowMinusIsEmpty =
  | x -> if shallowIsInfallible x.1 then true else eqi 0 (shallowCmp x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowIsInfallible" kind="sem">

```mc
sem shallowIsInfallible : ShallowBase_SPat -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem shallowIsInfallible =
  | SPatWild _ -> true
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectShallows" kind="sem">

```mc
sem collectShallows : Ast_Pat -> Set ShallowBase_SPat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectShallows =
  | shallow -> sfold_Pat_Pat (lam acc. lam p. setUnion acc (collectShallows p)) (_sempty ()) shallow
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkMatch" kind="sem">

```mc
sem mkMatch : Name -> Ast_Expr -> Ast_Expr -> ShallowBase_SPat -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mkMatch scrutinee t e =
  | SPatWild _ -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="processSPats" kind="sem">

```mc
sem processSPats : Set ShallowBase_SPat -> ShallowBase_SPat -> [ShallowBase_SPat]
```

<Description>{`The singular SPat is just there to choose the implementation,  
its contents should be ignored; it's also present in the set.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem processSPats spats = | _ -> setToSeq spats
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowCmp" kind="sem">

```mc
sem shallowCmp : (ShallowBase_SPat, ShallowBase_SPat) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem shallowCmp =
  | (l, r) -> subi (constructorTag l) (constructorTag r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultDecomposition" kind="sem">

```mc
sem defaultDecomposition : Ast_Pat -> (ShallowBase_PatUpdate, Option Ast_Pat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem defaultDecomposition =
  | pat -> ([], Some pat)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_ssingleton" kind="sem">

```mc
sem _ssingleton : ShallowBase_SPat -> Set ShallowBase_SPat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _ssingleton =
  | p -> setInsert p (_sempty ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_sempty" kind="sem">

```mc
sem _sempty : () -> Set ShallowBase_SPat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _sempty = | _ -> setEmpty (lam l. lam r. shallowCmp (l, r))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_processSPats" kind="sem">

```mc
sem _processSPats : Set ShallowBase_SPat -> [ShallowBase_SPat]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _processSPats = | spats -> processSPats spats (setChooseExn spats)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decomposeNorm" kind="sem">

```mc
sem decomposeNorm : Name -> (ShallowBase_SPat, Ast_Pat) -> (ShallowBase_PatUpdate, Option Ast_Pat)
```

<Description>{`Discharge patterns that do not care about the shallow pattern, e.g.,  
named patterns, wildcards, and \`&\` and \`|\` patterns.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem decomposeNorm name = | x ->
    match decompose name x with (update, neg) in
    let andBranchInfo : BranchInfo -> BranchInfo -> BranchInfo = lam l. lam r.
      (mapUnionWith pand_ l.0 r.0, mapUnion l.1 r.1) in
    let normalize : BranchInfo -> PatUpdate = lam binfo.
      match binfo with (decomposed, names) in
      let decomposed : [(Name, Pat)] =
        mapBindings decomposed in
      let decomposed : [[BranchInfo]] =
        -- NOTE(vipa, 2022-05-23): SPatWild () is infallible, thus we
        -- can safely discard the pattern for the \\`else\\` branch
        seqMapM (lam dec. (decompose dec.0 (SPatWild (), dec.1)).0) decomposed in
      -- NOTE(vipa, 2022-05-23): Each inner list now contains the
      -- things that should be \\`and\\`ed together, thanks to mapM
      map (foldl andBranchInfo (_empty (), names)) decomposed
    in
    (join (map normalize update), neg)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectAllShallows" kind="sem">

```mc
sem collectAllShallows : all res. [ShallowBase_LiveBranch res] -> Map Name (Set ShallowBase_SPat)
```

<Description>{`Find the shallow patterns that can make progress, grouped by  
the \`Name\` they examine.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectAllShallows =
  | branches ->
    let for = lam xs. lam f. map f xs in
    let flatFor = lam xs. lam f. join (map f xs) in
    let mergeMaps = foldl (mapUnionWith setUnion) (_empty ()) in
    mergeMaps
      (flatFor branches
        (lam branch.
          (for branch.alts
            (lam info. mapMap collectShallows info.0))))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateBranch" kind="sem">

```mc
sem updateBranch : all res. Name -> ShallowBase_SPat -> ShallowBase_LiveBranch res -> (Option (ShallowBase_LiveBranch res), Option (ShallowBase_LiveBranch res))
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem updateBranch scrutinee spat = | branch ->
    let work : ([BranchInfo], [BranchInfo]) -> BranchInfo -> ([BranchInfo], [BranchInfo])
      = lam acc. lam info.
        match acc with (passes, fails) in
        match info with (pats, names) in
        match mapLookup scrutinee pats with Some pat then
          let pats = mapRemove scrutinee pats in
          match decomposeNorm scrutinee (spat, pat) with (passUpdate, failPat) in
          let applyUpdate = lam update.
            (mapUnionWith pand_ pats update.0, mapUnion names update.1) in
          let newPasses = map applyUpdate passUpdate in
          let newFails = optionMapOr []
            (lam p.
              match decompose scrutinee (SPatWild (), p) with (failUpdate, _) in
              map applyUpdate failUpdate)
            failPat in
          (concat passes newPasses, concat fails newFails)
        else (snoc passes info, snoc fails info)
    in
    match foldl work ([], []) branch.alts with (passes, fails) in
    ( if null passes then None () else Some {branch with alts = passes}
    , if null fails then None () else Some {branch with alts = fails}
    )
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lower" kind="sem">

```mc
sem lower : all res. Name -> [(Ast_Pat, Map Name Name -> res)] -> res -> (Name -> ShallowBase_SPat -> res -> res -> res) -> res
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lower scrutinee branches default = | mkMatch ->
    let mkBranch = lam pair. match pair with (pat, branchFunc) in
      { branchFunc = branchFunc, alts = (decompose scrutinee (SPatWild (), pat)).0 } in
    let branches = filter (lam b. not (null b.alts)) (map mkBranch branches) in

    recursive let work : Name -> [SPat] -> [LiveBranch res] -> res
      = lam scrutinee. lam spats. lam branches.
        -- NOTE(vipa, 2022-08-12): Check the liveness of the branches
        switch branches
        case [] then default
        case [h] ++ _ then
          match find (lam alt. mapIsEmpty alt.0) h.alts
            -- First branch is satisfied
            with Some (_, bindings) then h.branchFunc bindings
          else

          match spats with [spat] ++ spats then
            match unzip (map (updateBranch scrutinee spat) branches) with (passes, fails) in
            let passRes = work scrutinee [] (mapOption identity passes) in
            let failRes = work scrutinee spats (mapOption identity fails) in
            mkMatch scrutinee spat passRes failRes
          else

          -- NOTE(vipa, 2022-08-12): The current scrutinee has no more info,
          -- but we're not done, find a new scrutinee
          match mapChooseExn (collectAllShallows branches) with (scrutinee, spats) in
          work scrutinee (_processSPats spats) branches
        end
    in work (nameNoSym "") [] branches
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectNames" kind="sem">

```mc
sem collectNames : Ast_Pat -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectNames =
  | PatNamed {ident = PName n} -> setInsert n (setEmpty nameCmp)
  | p -> sfold_Pat_Pat (lam acc. lam p. setUnion acc (collectNames p)) (setEmpty nameCmp) p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lowerToExpr" kind="sem">

```mc
sem lowerToExpr : Name -> [(Ast_Pat, Ast_Expr)] -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lowerToExpr scrutinee branches = | fallthrough ->
    -- TODO(vipa, 2022-08-12): Deduplicate the branches, put them in let-expressions before
    match
      mapAccumL
        (lam acc. lam branch. match branch with (pat, expr) in
          let names = setToSeq (collectNames pat) in
          let fName = nameSym "matchBody" in
          let acc = snoc acc (nulet_ fName (nulams_ names (ulam_ "" expr))) in
          let inconsistentError = lam info. lam name.
            errorSingle [info] (join ["Inconsistent pattern; '", nameGetStr name, "' is not always bound."]) in
          let callF = lam nameMap.
            let lookup = lam n. mapLookupOrElse (lam. inconsistentError (infoPat pat) n) n nameMap in
            app_
              (appSeq_
                (nvar_ fName)
                (map
                  (lam n. nvar_ (lookup n)) names))
              unit_ in
          (acc, (pat, callF)))
        []
        branches
    with (lets, branches) in
    let lowered =
      lower
        scrutinee
        branches
        fallthrough
        (lam name. lam spat. lam t. lam e. mkMatch name t e spat) in
    bindall_ lets lowered
```
</ToggleWrapper>
</DocBlock>

