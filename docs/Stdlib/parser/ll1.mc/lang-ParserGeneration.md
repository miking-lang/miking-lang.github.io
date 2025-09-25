import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ParserGeneration  
  

  
  
  
## Semantics  
  

          <DocBlock title="genParsingTable" kind="sem">

```mc
sem genParsingTable : all prodLabel. all state. ParserConcrete_Grammar prodLabel state -> Either (GenError prodLabel state) (ParserConcrete_Table prodLabel state)
```

<Description>{`NOTE\(vipa, 2022\-03\-02\): The type signature is a bit weird here,  
because \`ParserGenerated\` will add the \`NtSym\` constructor to  
\`SpecSymbol\`, even though that's not a valid input for this  
function.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem genParsingTable =
  | grammar ->
    match grammar with {productions = productions, start = startNt} in

    let emptySymSet = {eps = false, syms = mapEmpty compareSpecSymbol} in
    let eqSymSet = lam s1: SymSet state prodLabel. lam s2: SymSet state prodLabel.
      match (s1, s2) with ({eps = e1, syms = s1}, {eps = e2, syms = s2}) then
        and
          (eqBool e1 e2)
          (eqSeq (lam a. lam b. eqSpecSymbol a.0 b.0)
            (mapBindings s1)
            (mapBindings s2))
      else dprintLn (s1, s2);  never in

    let eqFirstSet = lam s1. lam s2.
      eqSeq
        (lam a. lam b. if nameEq a.0 b.0 then eqSymSet a.1 b.1 else false)
        (mapBindings s1)
        (mapBindings s2) in

    let eqFollowSymSet = lam s1. lam s2.
      eqSeq (lam a. lam b. eqSpecSymbol a.0 b.0)
        (mapBindings s1)
        (mapBindings s2) in

    let eqFollowSet = lam s1. lam s2.
      eqSeq
        (lam a. lam b. if nameEq a.0 b.0 then eqFollowSymSet a.1 b.1 else false)
        (mapBindings s1)
        (mapBindings s2) in

    let addProdToFirst : Map Name (SymSet state prodLabel) -> Production prodLabel state -> SymSet state prodLabel -> SymSet state prodLabel =
      lam prev. lam prod. lam symset.
        recursive let work = lam symset: SymSet state prodLabel. lam rhs.
          match rhs with [] then {symset with eps = true}
          else match rhs with [(TokSpec _ | LitSpec _) & t] ++ _ then
            {symset with syms = mapInsert t () symset.syms}
          else match rhs with [NtSpec nt] ++ rhs then
            let otherSymset = match mapLookup nt prev
              with Some s then s
              else emptySymSet in
            let symset = {symset with syms = mapUnion symset.syms otherSymset.syms} in
            if otherSymset.eps then work symset rhs else symset
          else never
        in work symset prod.rhs in

    let groupedProds : Map Name [Production prodLabel state] =
      foldl
        (lam acc. lam prod: Production prodLabel state. mapInsert prod.nt (snoc (optionGetOr [] (mapLookup prod.nt acc)) prod) acc)
        (mapEmpty nameCmp)
        productions in

    let addNtToFirstSet = lam prev. lam nt. lam symset.
      let prods = mapFindExn nt groupedProds in
      foldl (lam symset. lam prod. addProdToFirst prev prod symset) symset prods in

    -- let dprintFirstSet = lam firstSet.
    --   let _ = printLn "" in
    --   let _ = dprint (mapBindings (mapMap (lam symset. {symset with syms = mapBindings symset.syms}) firstSet)) in
    --   let _ = printLn "" in
    --   firstSet in

    -- let dprintFollowSet = lam followSet.
    --   let _ = printLn "" in
    --   let _ = dprint (mapBindings (mapMap mapBindings followSet)) in
    --   let _ = printLn "" in
    --   followSet in

    let firstSet : Map Name (SymSet state prodLabel) =
      _iterateUntilFixpoint eqFirstSet
        (lam prev. mapMapWithKey (addNtToFirstSet prev) prev)
        (mapMap (lam. emptySymSet) groupedProds) in

    -- let _ = print "\n\nFirsts:" in
    -- let _ = dprintFirstSet firstSet in

    let firstOfRhs : [SpecSymbol Token TokenRepr state prodLabel] -> SymSet state prodLabel =
      recursive let work = lam symset: SymSet state prodLabel. lam rhs.
        -- NOTE(vipa, 2021-06-18): This will be called post generation
        -- as well, so it needs to handle NtSym, even thought it'll
        -- not be relevant when generating the table
        match rhs with [] then {symset with eps = true}
        else match rhs with [(TokSpec _ | LitSpec _) & t] ++ _ then
          {symset with syms = mapInsert t () symset.syms}
        else match rhs with [NtSpec nt | NtSym {nt = nt}] ++ rhs then
          let otherSymset = match mapLookup nt firstSet
            with Some s then s
            else emptySymSet in
          let symset = {symset with syms = mapUnion symset.syms otherSymset.syms} in
          if otherSymset.eps then work symset rhs else symset
        else never
      in work emptySymSet in

    let addProdToFollow : Production prodLabel state -> Map Name (Map (SpecSymbol Token TokenRepr state prodLabel) ()) -> Map Name (Map (SpecSymbol Token TokenRepr state prodLabel) ()) = lam prod. lam follow.
      match prod with {nt = prodNt, rhs = rhs} then
        recursive let work = lam follow. lam rhs.
          match rhs with [] then follow
          else match rhs with [NtSpec nt] ++ rhs then
            let ntFollow = match mapLookup nt follow
              with Some s then s
              else mapEmpty compareSpecSymbol in
            let otherSymset = firstOfRhs rhs in
            let ntFollow = mapUnion ntFollow otherSymset.syms in
            let ntFollow = if otherSymset.eps
              then mapUnion ntFollow (mapFindExn prodNt follow)
              else ntFollow in
            work (mapInsert nt ntFollow follow) rhs
          else match rhs with [_] ++ rhs then
            work follow rhs
          else never
        in work follow rhs
      else never in

    let followSet : Map Name (Map (SpecSymbol Token TokenRepr state prodLabel) ()) =
      _iterateUntilFixpoint eqFollowSet
        (lam prev. foldl (lam prev. lam prod. addProdToFollow prod prev) prev productions)
        (mapInsert startNt (mapInsert (TokSpec (EOFRepr ())) () (mapEmpty compareSpecSymbol))
          (mapMap (lam. mapEmpty compareSpecSymbol) groupedProds)) in

    -- let _ = print "\n\nFollows:" in
    -- let _ = dprintFollowSet followSet in

    -- The first \\`Symbol\\` should be \\`ParserBase.Symbol\\`, the second should be \\`ParserGenerated.Symbol\\`
    let emptyTableTarget = ref (mapEmpty compareSpecSymbol) in
    let table : Map Name (Ref (Map (SpecSymbol Token TokenRepr state prodLabel) {syms : [SpecSymbol Token TokenRepr state prodLabel], label: prodLabel, action: Action Token state})) =
      mapMap (lam. ref (mapEmpty compareSpecSymbol)) groupedProds in

    let specSymToGenSym = lam sym.
      match sym with NtSpec nt
      then NtSym {nt = nt, table = optionGetOr emptyTableTarget (mapLookup nt table)}
      else sym
    in

    let hasLl1Error = ref false in
    let ll1Errors = mapMap (lam. ref (mapEmpty compareSpecSymbol)) groupedProds in

    let addProdToTable = lam prod: Production prodLabel state.
      let tableRef = mapFindExn prod.nt table in
      let prev = deref tableRef in
      let firstSymset = firstOfRhs prod.rhs in
      let symset = if firstSymset.eps
        then mapUnion firstSymset.syms (mapFindExn prod.nt followSet)
        else firstSymset.syms in
      let newProd = {action = prod.action, label = prod.label, syms = map specSymToGenSym prod.rhs} in
      let tableAdditions = mapMap (lam. newProd) symset in
      for_ (mapBindings tableAdditions)
        (lam binding: (SpecSymbol Token TokenRepr state prodLabel, TableProd prodLabel state).
          match binding with (sym, {label = label}) then
            match mapLookup sym prev with Some prevProd then
              let prevProd: TableProd prodLabel state = prevProd in
              modref hasLl1Error true;
              let errRef = mapFindExn prod.nt ll1Errors in
              let errTab = deref errRef in
              let errList = match mapLookup sym errTab
                with Some prods then snoc prods label
                else [prevProd.label, label] in
              modref errRef (mapInsert sym errList errTab)
            else ()
          else never);
      modref tableRef (mapUnion prev tableAdditions)
    in

    iter addProdToTable productions;

    let addLitToLits = lam lits. lam sym.
      match sym with LitSpec {lit = lit}
        then mapInsert lit () lits
        else lits in
    let lits = foldl
      (lam acc. lam prod: Production prodLabel state. foldl addLitToLits acc prod.rhs)
      (mapEmpty cmpString)
      productions in

    -- let dprintTablePair = lam nt. lam actions.
    --   dprintLn (nt, mapBindings (deref actions))
    -- in
    -- printLn "\n\nParse table:";
    -- mapMapWithKey dprintTablePair table;

    if deref hasLl1Error
      then Left (mapFromSeq nameCmp (filter (lam binding: (Unknown, Unknown). not (null (mapBindings binding.1))) (mapBindings (mapMap deref ll1Errors))))
      else Right {start = {nt = startNt, table = optionGetOr emptyTableTarget (mapLookup startNt table)}, firstOfRhs = firstOfRhs, lits = lits}
```
</ToggleWrapper>
</DocBlock>

