import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OperatorTokenParser  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
  | OperatorTok {info : Info, val : String}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TokenRepr" kind="syn">

```mc
syn TokenRepr
```



<ToggleWrapper text="Code..">
```mc
syn TokenRepr =
  | OperatorRepr ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="parseToken" kind="sem">

```mc
sem parseToken : Pos -> String -> {lit: String, info: Info, token: TokenParser_Token, stream: {pos: Pos, str: String}}
```



<ToggleWrapper text="Code..">
```mc
sem parseToken (pos : Pos) =
  | [('%' | '<' | '>' | '!' | '?' | '~' | ':' | '.' | '$' | '&' | '*' |
      '+' | '-' | '/' | '=' | '@' | '^' | '|') & c] ++ str ->
    match parseOperatorCont (advanceCol pos 1) str with {val = val, stream = stream}
    then
      let val = cons c val in
      let info = makeInfo pos stream.pos in
      { token = OperatorTok {info = info, val = val}
      , lit = val
      , info = info
      , stream = stream}
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokKindEq" kind="sem">

```mc
sem tokKindEq : TokenReprBase_TokenRepr -> TokenParser_Token -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem tokKindEq (tokRepr : TokenRepr) =
  | OperatorTok _ -> match tokRepr with OperatorRepr _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokInfo" kind="sem">

```mc
sem tokInfo : TokenParser_Token -> Info
```



<ToggleWrapper text="Code..">
```mc
sem tokInfo =
  | OperatorTok {info = info} -> info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokReprToStr" kind="sem">

```mc
sem tokReprToStr : TokenReprBase_TokenRepr -> String
```



<ToggleWrapper text="Code..">
```mc
sem tokReprToStr =
  | OperatorRepr _ -> "<Operator>"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokToStr" kind="sem">

```mc
sem tokToStr : TokenParser_Token -> String
```



<ToggleWrapper text="Code..">
```mc
sem tokToStr =
  | OperatorTok tok -> concat "<Operator>" tok.val
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokToRepr" kind="sem">

```mc
sem tokToRepr : TokenParser_Token -> TokenReprBase_TokenRepr
```



<ToggleWrapper text="Code..">
```mc
sem tokToRepr =
  | OperatorTok _ -> OperatorRepr ()
```
</ToggleWrapper>
</DocBlock>

