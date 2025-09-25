import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LL1Parser  
  

  
  
  
## Semantics  
  

          <DocBlock title="_dedupSymbolList" kind="sem">

```mc
sem _dedupSymbolList : all state. all prodLabel. [SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel] -> [SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel]
```

<Description>{`\[SpecSymbol\] \-\> \[SpecSymbol\]No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _dedupSymbolList =
  | x ->
    recursive
      let work = lam seen. lam retained. lam rest.
        match rest with [] then retained else
        match rest with [sym] ++ rest then
          match mapLookup sym seen with Some _
          then work seen retained rest
          else work (mapInsert sym () seen) (snoc retained sym) rest
        else never
    in work (mapEmpty compareSpecSymbol) [] x

  /-
    : ([SpecSymbol] -> SymSet)
    -> Option (Name, ParsedSymbol, [FullStackItem prodLabel])
    -> Option (SpecSymbol, ParsedSymbol, [FullStackItem prodLabel])
    -> ParseError prodLabel
  -/
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_mkLL1Error" kind="sem">

```mc
sem _mkLL1Error : all prodLabel. all state. ([SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel] -> ParserBase_SymSet state prodLabel) -> Option (Name, ParsedSymbol TokenParser_Token, [ParserConcrete_FullStackItem prodLabel state]) -> Option (SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel, ParsedSymbol TokenParser_Token, [ParserConcrete_FullStackItem prodLabel state]) -> ParseError TokenParser_Token TokenReprBase_TokenRepr state prodLabel
```

<Description>{`: \(\[SpecSymbol\] \-\> SymSet\)
   \-\> Option \(Name, ParsedSymbol, \[FullStackItem prodLabel\]\)
   \-\> Option \(SpecSymbol, ParsedSymbol, \[FullStackItem prodLabel\]\)
   \-\> ParseError prodLabel
 No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _mkLL1Error firstOfRhs openInfo =
  | workInfo ->
    match openInfo with Some (nt, token, stack) then
      UnexpectedFirst
        { nt = nt
        , stack = _sanitizeStack stack
        , found = token
        , expected =
          let here: SymSet state prodLabel = firstOfRhs [NtSpec nt] in
          let res = mapKeys here.syms in
          let res = if here.eps
            then concat res (_expectedFromStack firstOfRhs stack)
            else res
          in _dedupSymbolList res
        }
     else match workInfo with Some (expected, token, stack) then
       UnexpectedToken
         { stack = _sanitizeStack stack
         , found = token
         , expected = expected
         }
     else error "Tried to make an LL1 error without having any information to construct one with"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseWithTable" kind="sem">

```mc
sem parseWithTable : all state. all prodLabel. ParserConcrete_Table prodLabel state -> String -> state -> String -> Either (ParseError TokenParser_Token TokenReprBase_TokenRepr state prodLabel) Dyn
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parseWithTable table filename state =
  | contents ->
    match table with {start = start, lits = lits, firstOfRhs = firstOfRhs} in
    let lastOpen = ref (None ()) in
    let getNextToken = lam stream.
      let res: NextTokenResult = nextToken stream in
        -- OPT(vipa, 2021-02-08): Could use the hash of the lit to maybe optimize this, either by using a hashmap, or by first checking against the hash in a bloom filter or something like that
      if if (eqString "" res.lit) then true else not (mapMem res.lit lits)
        then {token = TokParsed res.token, stream = res.stream}
        else {token = LitParsed {lit = res.lit, info = res.info}, stream = res.stream} in
    recursive
      let openNt = lam nt. lam token. lam stack. lam stream.
        modref lastOpen (Some (nt.nt, token, stack));
        let table = deref nt.table in
        match mapLookup (parsedSymToSpecSym token) table with Some r then
          work (snoc stack {seen = [], rest = r.syms, action = r.action, label = r.label}) token stream
        else Left (_mkLL1Error firstOfRhs (deref lastOpen) (None ()))
      let work = lam stack. lam token. lam stream.
        match stack with stack ++ [curr & {rest = [NtSym nt] ++ rest}] then
          openNt nt token (snoc stack {curr with rest = rest}) stream
        else match stack with stack ++ [above & {seen = seenAbove}, {seen = seen, rest = [], action = action}] then
          work (snoc stack {above with seen = snoc seenAbove (UserSym (action state seen))}) token stream
        else match stack with oldStack & (stack ++ [curr & {rest = [t] ++ rest, seen = seen}]) then
          if parsedMatchesSpec t token then
            modref lastOpen (None ());
            let next = getNextToken stream in
            work (snoc stack {{curr with rest = rest} with seen = snoc seen token}) next.token next.stream
          else Left (_mkLL1Error firstOfRhs (deref lastOpen) (Some (t, token, oldStack)))
        else match stack with [{seen = seen, rest = [], action = action}] then
          match token with TokParsed (EOFTok _)
            then Right (action state seen)
            else Left (_mkLL1Error firstOfRhs (deref lastOpen) (Some (TokSpec (EOFRepr ()), token, stack)))
        else print "ERROR: ";
             dprintLn (stack, token, stream);
             error "Unexpected parse error, this shouldn't happen"
    in
      let stream = {pos = initPos filename, str = contents} in
      match getNextToken stream with {token = token, stream = stream} in
      openNt start token [] stream
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="highlightsForFound" kind="sem">

```mc
sem highlightsForFound : ParsedSymbol TokenParser_Token -> [Highlight]
```



<ToggleWrapper text="Code..">
```mc
sem highlightsForFound =
  | TokParsed (EOFTok {info = Info x}) ->
    let info = Info {{x with row1 = subi x.row1 1} with col1 = 0} in
    [Irrelevant info, Added {content = tokReprToStr (EOFRepr ()), ensureSurroundedBySpaces = false}]
  | x -> [Relevant (symParsedInfo x)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ll1ToErrorHighlightSpec" kind="sem">

```mc
sem ll1ToErrorHighlightSpec : all state. all prodLabel. ParseError TokenParser_Token TokenReprBase_TokenRepr state prodLabel -> {info: Info, found: SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel, expected: [SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel], highlight: [Highlight]}
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ll1ToErrorHighlightSpec =
  | UnexpectedFirst x ->
    let info = symParsedInfo x.found in
    { highlight = highlightsForFound x.found, found = parsedSymToSpecSym x.found, expected = x.expected, info = info }
  | UnexpectedToken x ->
    let info = symParsedInfo x.found in
    { highlight = highlightsForFound x.found, found = parsedSymToSpecSym x.found, expected = [x.expected], info = info }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ll1DefaultHighlight" kind="sem">

```mc
sem ll1DefaultHighlight : all prodLabel. all state. String -> {info: Info, found: SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel, expected: [SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel], highlight: [Highlight]} -> (Info, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ll1DefaultHighlight content =
  | x ->
    let expectedStr = switch map symSpecToStr x.expected
      case [x] then x
      case [a, b] then join [a, " or ", b]
      case rest ++ [b] then join [strJoin ", " rest, ", or ", b]
      end
    in
    let highlight = formatHighlights terminalHighlightErrorConfig content x.highlight in
    let message = join
      [ "Unexpected token, found ", symSpecToStr x.found, ", expected ", expectedStr, "\n"
      , highlight
      ] in
    (x.info, message)
```
</ToggleWrapper>
</DocBlock>

