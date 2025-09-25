import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UFloatTokenParser  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
  | FloatTok {info : Info, val : Float}
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
  | FloatRepr ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="parseIntCont" kind="sem">

```mc
sem parseIntCont : all a. String -> Pos -> Pos -> String -> {lit: [a], info: Info, token: TokenParser_Token, stream: {pos: Pos, str: String}}
```



<ToggleWrapper text="Code..">
```mc
sem parseIntCont (acc : String) (pos1 : Pos) (pos2 : Pos) =
  | ['.'] ++ str ->
    parseFloatCont acc pos1 (advanceCol pos2 1) str
  | (['.', '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'] ++ _) & str ->
    match parseFloatExponent (advanceCol pos2 1) (tail str)
    with {val = val, pos = pos3, str = str}
    then
      let acc = join [acc, ".", val] in
      parseFloatCont acc pos1 pos3 str
    else never
  | ( [ 'e' | 'E'] ++ _
    & ( [_, '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'] ++ _
      | [_, '+' | '-', '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'] ++ _
      )
    ) & str -> parseFloatCont acc pos1 pos2 str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseFloatCont" kind="sem">

```mc
sem parseFloatCont : all a. String -> Pos -> Pos -> String -> {lit: [a], info: Info, token: TokenParser_Token, stream: {pos: Pos, str: String}}
```



<ToggleWrapper text="Code..">
```mc
sem parseFloatCont (acc : String) (pos1 : Pos) (pos2 : Pos) =
  | ( [ ('e' | 'E') & e] ++ _
    & ( [_, '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'] ++ _
      | [_, '+' | '-', '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'] ++ _
      )
    ) & str ->
    match parseFloatExponent (advanceCol pos2 1) (tail str) with {val = val, pos = pos2, str = str}
    then
      let info = makeInfo pos1 pos2 in
      { token = FloatTok {info = info, val = string2float (join [acc, "e", val])}
      , lit = ""
      , info = info
      , stream = {pos = pos2, str = str}
      }
    else never
  | str ->
    let info = makeInfo pos1 pos2 in
    { token = FloatTok {info = info, val = string2float acc}
    , lit = ""
    , info = info
    , stream = {pos = pos2, str = str}
    }
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
  | FloatTok _ -> match tokRepr with FloatRepr _ then true else false
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
  | FloatTok {info = info} -> info
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
  | FloatRepr _ -> "<Float>"
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
  | FloatTok tok -> concat "<Float>" (float2string tok.val)
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
  | FloatTok _ -> FloatRepr ()
```
</ToggleWrapper>
</DocBlock>

