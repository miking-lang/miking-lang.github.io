import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SymLookup  
  

  
  
  
## Types  
  

          <DocBlock title="LookupParams" kind="type">

```mc
type LookupParams : { kind: String, info: [Info], allowFree: Bool }
```



<ToggleWrapper text="Code..">
```mc
type LookupParams = {kind : String, info : [Info], allowFree : Bool}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="symLookupError" kind="sem">

```mc
sem symLookupError : all a. all n. Map String n -> SymLookup_LookupParams -> Name -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symLookupError env lkup =| ident ->
    let identStr = nameGetStr ident in
    let f = lam acc : (Int, [String]). lam name. lam.
      if leqi (absi (subi (length identStr) (length name))) acc.0 then
        -- NOTE(vipa, 2025-01-14): We only compute the edit distance
        -- if it's even possible for it to be at least as good as the
        -- current best (length difference is a lower bound, and much
        -- faster to compute)
        let dist = levenshteinDistance identStr name in
        if lti dist acc.0 then (dist, [name]) else
        if eqi dist acc.0 then (acc.0, snoc acc.1 name)
        else acc
      else acc in
    let pprintVar = lam str.
      (pprintVarName pprintEnvEmpty (nameNoSym str)).1 in
    let oxfordList = lam strs. switch strs
      case [x] then x
      case [a, b] then join [a, " or ", b]
      case prev ++ [x] then strJoin ", " (snoc prev (concat "or " x))
      case [] then ""
      end in
    let suggestion = switch mapFoldWithKey f (symSuggestionMaxDistance, []) env
      case (_, []) then ""
      case (_, names) then join ["\n(did you mean ", oxfordList (map pprintVar names), "?)"]
      end in
    errorSingle lkup.info
      (join ["Unknown ", lkup.kind, " in symbolize: ", nameGetStr ident, suggestion])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getSymbol" kind="sem">

```mc
sem getSymbol : SymLookup_LookupParams -> Map String Name -> Name -> Name
```

<Description>{`Get a symbol from the environment, or give an error if it is not there.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getSymbol lkup env =| ident ->
    if nameHasSym ident then ident
    else
      optionGetOrElse
        (lam. if lkup.allowFree then ident
              else symLookupError env lkup ident)
        (mapLookup (nameGetStr ident) env)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setSymbol" kind="sem">

```mc
sem setSymbol : Map String Name -> Name -> (Map String Name, Name)
```

<Description>{`Insert a new symbol mapping into the environment, overriding if it exists.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem setSymbol env =| ident ->
    if nameHasSym ident then (env, ident)
    else
      let ident = nameSetNewSym ident in
      (mapInsert (nameGetStr ident) ident env, ident)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getSymbolWith" kind="sem">

```mc
sem getSymbolWith : all a. all b. {absent: () -> b, hasSym: () -> b, present: a -> b} -> Map String a -> Name -> b
```

<Description>{`The general case, where we may have a richer return value than simply name or env.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getSymbolWith cases env =| ident ->
    if nameHasSym ident then cases.hasSym ()
    else
      optionMapOrElse cases.absent cases.present
        (mapLookup (nameGetStr ident) env)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setSymbolWith" kind="sem">

```mc
sem setSymbolWith : all a. (Name -> a) -> Map String a -> Name -> (Map String a, Name)
```

<Description>{`The general case, where we may have a richer element type than simply name.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem setSymbolWith newElem env =| ident ->
    if nameHasSym ident then (env, ident)
    else
      let ident = nameSetNewSym ident in
      (mapInsert (nameGetStr ident) (newElem ident) env, ident)
```
</ToggleWrapper>
</DocBlock>

