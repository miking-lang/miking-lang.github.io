import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UIntTokenParser  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
  | IntTok {info : Info, val : Int}
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
  | IntRepr ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="parseToken" kind="sem">

```mc
sem parseToken : all a. Pos -> String -> {lit: [a], info: Info, token: TokenParser_Token, stream: {pos: Pos, str: String}}
```



<ToggleWrapper text="Code..">
```mc
sem parseToken (pos : Pos) =
  | (['0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'] ++ _) & str ->
    match parseUInt pos str with {val = val, pos = pos2, str = str}
    then parseIntCont val pos pos2 str
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseIntCont" kind="sem">

```mc
sem parseIntCont : all a. String -> Pos -> Pos -> String -> {lit: [a], info: Info, token: TokenParser_Token, stream: {pos: Pos, str: String}}
```



<ToggleWrapper text="Code..">
```mc
sem parseIntCont (acc : String) (pos1 : Pos) (pos2 : Pos) =
  | str ->
    let info = makeInfo pos1 pos2 in
    { token = IntTok {info = info, val = string2int acc}
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
  | IntTok _ -> match tokRepr with IntRepr _ then true else false
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
  | IntTok {info = info} -> info
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
  | IntRepr _ -> "<Int>"
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
  | IntTok tok -> concat "<Int>" (int2string tok.val)
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
  | IntTok _ -> IntRepr ()
```
</ToggleWrapper>
</DocBlock>

