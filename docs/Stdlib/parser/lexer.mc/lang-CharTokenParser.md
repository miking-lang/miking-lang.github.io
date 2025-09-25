import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharTokenParser  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
  | CharTok {info : Info, val : Char}
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
  | CharRepr ()
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
  | "'" ++ str ->
    match matchChar (advanceCol pos 1) str with {val = val, pos = pos2, str = str} then
      match str with "'" ++ str then
        let pos2 = advanceCol pos2 1 in
        let info = makeInfo pos pos2 in
        { token = CharTok {info = info, val = val}
        , lit = ""
        , info = info
        , stream = {pos = pos2, str = str}
        }
      else posErrorExit pos "Expected ' to close character literal."
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
  | CharTok _ -> match tokRepr with CharRepr _ then true else false
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
  | CharTok {info = info} -> info
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
  | CharRepr _ -> "<Char>"
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
  | CharTok tok -> snoc "<Char>" tok.val
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
  | CharTok _ -> CharRepr ()
```
</ToggleWrapper>
</DocBlock>

