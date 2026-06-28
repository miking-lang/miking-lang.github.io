import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShallowNot  
  

  
  
  
## Semantics  
  

          <DocBlock title="decompose" kind="sem">

```mc
sem decompose : Name -> (ShallowBase_SPat, Ast_Pat) -> (ShallowBase_PatUpdate, Option Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem decompose name =
  | (shallow, PatNot {subpat = PatNot x}) ->
    decompose name (shallow, x.subpat)
  | (shallow, PatNot {subpat = PatOr x}) ->
    decompose name (shallow, pand_ (pnot_ x.lpat) (pnot_ x.rpat))
  | (shallow, PatNot {subpat = PatAnd x}) ->
    decompose name (shallow, por_ (pnot_ x.lpat) (pnot_ x.rpat))
  | (shallow, pat & PatNot x) ->
    -- NOTE(vipa, 2022-05-20): A normal nested pattern can be
    -- decomposed into a large and-pattern, e.g., \\`[1, a]\\` is the same
    -- as \\`[_, _] & [1, _] & [_, a]\\`.

    -- Note also that intersecting with \\`shallow\\` does one of two things:
    -- * Produces the empty pattern, e.g., \\`[] & [_, _] = !_\\`
    -- * Leaves each sub-pattern unchanged, e.g., \\`[_, _] & [1, _] = [1, _]\\`

    -- \\`decompose _ (s, p)\\` returns two "patterns":
    -- * \\`s & p\\` as a conjunction of the sub-patterns, e.g., \\`[1, _] &
    --   [_, a]\\`. Note that \\`s\\` has disappeared, as has \\`[_, _]\\`.
    -- * \\`!s & p\\` as an \\`Option Pat\\`, where \\`None\\` means the empty pattern.

    -- Following the same example (i.e., \\`![1, a]\\`), we want to compute two
    -- patterns:

    -- Positive "pattern":
    -- \\`shallow & ![1, a]\\`
    -- = \\`shallow & (![_, _] | [!1, _] | [_, !a])\\`
    -- = \\`(shallow & ![_, _]) | (shallow & [_, _] & ([!1, _] | [_, !a]))\\`
    -- If the first thing is non-empty and \\`shallow\\` isn't \\`_\\` we don't need
    -- to examine any further values, since neither \\`shallow\\` nor \\`![_, _]\\`
    -- have any sub-patterns.
    -- Otherwise we just need to return \\`[!1, _] | [_, !a]\\`.

    -- Negative pattern:
    -- Some \\`p'\\` such that \\`!shallow & p' = !shallow & ![1, a]\\`, and
    -- if \\`!shallow & ![1, a] = empty\\` then \\`p' = empty\\`.
    -- If \\`!shallow & [1, a]\\` is empty then \\`[1, a]\\` is a subset of \\`shallow\\`,
    -- whereby \\`!shallow\\` is a subset of \\`![1, a]\\`, thus their intersection is
    -- just \\`!shallow\\`. In this case the simplest pattern to return is \\`_\\`.
    -- Otherwise we merely return \\`![1, a]\\` unchanged, to ensure that the
    -- pattern doesn't grow, which could happen if we used the return from
    -- the recursive call to \\`decompose\\`.

    -- We can obtain the positive shallow pattern through \\`collectShallows\\`:
    let subShallow = setChoose (collectShallows x.subpat) in
    -- The nested ones come through \\`decompose\\`:
    match decompose name (shallow, x.subpat) with (subPass, subFail) in
    -- Discard bound names
    let subPass : [Map Name Pat] = map (lam x. x.0) subPass in
    -- We now have three pieces of information:
    -- \\`subShallow\\` is the positive shallow pattern, e.g., \\`[_, _]\\`
    -- \\`subPass\\` corresponds to the positive subpatterns, e.g.,
    --   \\`[1, _] | [_, a]\\`
    --   Note that \\`shallow\\` isn't present, since it by definition
    --   only has wildcards for sub-expressions.
    -- \\`subFail\\` is \\`None ()\\` iff \\`!shallow & [1, a]\\` is empty

    let negSubPatterns =
      match (shallow, optionMap (lam xshallow. shallowMinusIsEmpty (shallow, xshallow)) subShallow)
        with (!SPatWild _, Some false) then [(_empty (), _empty ())]
      else

      -- Helpers
      -- \\`&\\` two sets of matches on sub-expressions
      let andDecomposed : Map Name Pat -> Map Name Pat -> Map Name Pat = mapUnionWith pand_ in
      -- \\`!\\` a set of matches on sub-expressions. This turns \\`p1 & p2 & ...\\` to \\`!p1 | !p2 | ...\\`
      let notDecomposed : Map Name Pat -> [Map Name Pat] = lam dec.
        map (lam dec. _singleton dec.0 (pnot_ dec.1)) (mapBindings dec) in

      -- Note that \\`subPass\\` is a list (representing \\`|\\`s) of \\`Map\\`s (representing \\`&\\`s)
      -- We want to negate this and turn it into disjunctive normal form again.
      -- \\`map notDecomposed\\` gives a
      --   list (\\`&\\`) of lists (\\`|\\`) of \\`Map\\`s (\\`&\\`).
      -- \\`seqMapM\\` instead of \\`map\\` flips the order of the outer lists, i.e.,
      --   list (\\`|\\`) of lists (\\`&\\`) of \\`Map\\`s (\\`&\\`)
      let negSubPatterns : [[Map Name Pat]] = seqMapM notDecomposed subPass in
      -- Finally, and-ing the second level together (via \\`map\\`) gives us
      -- disjunctive normal form.
      map (lam pats. (foldl andDecomposed (_empty ()) pats, _empty ())) negSubPatterns
    in

    let failPat =
      match shallow with SPatWild _ then None () else
      if optionIsSome subFail then Some pat else Some pvarw_ in

    (negSubPatterns, failPat)
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
  | PatNot _ -> setEmpty nameCmp
```
</ToggleWrapper>
</DocBlock>

