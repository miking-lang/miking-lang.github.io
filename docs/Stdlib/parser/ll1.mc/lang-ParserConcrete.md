import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ParserConcrete  
  

NOTE\(vipa, 2022\-03\-02\): This is essentially just a language  
fragment to enable adding new \`Token\`s, everything else is intended  
to be closed

  
  
  
## Types  
  

          <DocBlock title="TableProd" kind="type">

```mc
type TableProd
```

<Description>{`NOTE\(vipa, 2021\-02\-08\): These should be opaque`}</Description>


<ToggleWrapper text="Code..">
```mc
type TableProd prodLabel state = {syms: [SpecSymbol Token TokenRepr state prodLabel], label: prodLabel, action: Action Token state}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Table" kind="type">

```mc
type Table
```



<ToggleWrapper text="Code..">
```mc
type Table prodLabel state = {start: {nt: Name, table: (Ref (Map (SpecSymbol Token TokenRepr state prodLabel) (TableProd prodLabel state)))}, firstOfRhs: [SpecSymbol Token TokenRepr state prodLabel] -> SymSet state prodLabel, lits: Map String ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Production" kind="type">

```mc
type Production
```



<ToggleWrapper text="Code..">
```mc
type Production prodLabel state =
    { nt: Name
    , label: prodLabel
    , rhs: [SpecSymbol Token TokenRepr state prodLabel]
    , action: Action Token state
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Grammar" kind="type">

```mc
type Grammar
```



<ToggleWrapper text="Code..">
```mc
type Grammar prodLabel state =
    { start: Name
    , productions: [Production prodLabel state]
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FullStackItem" kind="type">

```mc
type FullStackItem
```



<ToggleWrapper text="Code..">
```mc
type FullStackItem prodLabel state = {seen: [ParsedSymbol Token], rest: [SpecSymbol Token TokenRepr state prodLabel], label: prodLabel, action: Action Token state}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="symParsedToStr" kind="sem">

```mc
sem symParsedToStr : ParsedSymbol TokenParser_Token -> String
```



<ToggleWrapper text="Code..">
```mc
sem symParsedToStr =
  | UserSym _ -> "<UserSym>"
  | TokParsed t -> tokToStr t
  | LitParsed t -> t.lit
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symParsedInfo" kind="sem">

```mc
sem symParsedInfo : ParsedSymbol TokenParser_Token -> Info
```



<ToggleWrapper text="Code..">
```mc
sem symParsedInfo =
  | UserSym _ -> NoInfo ()
  | TokParsed t -> tokInfo t
  | LitParsed t -> t.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parsedSymToSpecSym" kind="sem">

```mc
sem parsedSymToSpecSym : all state. all prodLabel. ParsedSymbol TokenParser_Token -> SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parsedSymToSpecSym =
  | TokParsed t -> TokSpec (tokToRepr t)
  | LitParsed x -> LitSpec {lit = x.lit}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parsedMatchesSpec" kind="sem">

```mc
sem parsedMatchesSpec : all tok. all state. all prodLabel. SpecSymbol tok TokenReprBase_TokenRepr state prodLabel -> ParsedSymbol TokenParser_Token -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem parsedMatchesSpec spec =
  | TokParsed t -> match spec with TokSpec repr then tokKindEq repr t else false
  | LitParsed x -> match spec with LitSpec s then eqString x.lit s.lit else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_sanitizeStack" kind="sem">

```mc
sem _sanitizeStack : all prodLabel. all state. [ParserConcrete_FullStackItem prodLabel state] -> [StackItem TokenParser_Token TokenReprBase_TokenRepr state prodLabel]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _sanitizeStack =
  | stack ->
    let genSymToSym = lam sym.
      match sym with NtSym {nt = nt} then NtSpec nt else sym in
    let work = lam item.
      {seen = item.seen, rest = map genSymToSym item.rest, label = item.label} in
    map work stack
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_expectedFromStack" kind="sem">

```mc
sem _expectedFromStack : all state. all prodLabel. ([SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel] -> ParserBase_SymSet state prodLabel) -> [ParserConcrete_FullStackItem prodLabel state] -> [SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _expectedFromStack =
  | firstOfRhs ->
    recursive let work = lam stack.
      match stack with stack ++ [{rest = rest}] then
        let res = firstOfRhs rest in
        let here = mapKeys res.syms in
        if res.eps
        then concat here (work stack)
        else here
      else []
    in work
```
</ToggleWrapper>
</DocBlock>

