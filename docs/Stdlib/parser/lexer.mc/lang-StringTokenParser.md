import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# StringTokenParser  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
  | StringTok {info : Info, val : String}
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
  | StringRepr ()
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
  | "\"" ++ str ->
    recursive let work = lam acc. lam p2. lam str.
      match str with "\"" ++ str then
        {val = acc, pos = advanceCol p2 1, str = str}
      else match matchChar p2 str with {val = charval, pos = p2, str = str} then
        work (snoc acc charval) p2 str
      else never
    in match work "" (advanceCol pos 1) str with {val = val, pos = pos2, str = str} then
      let info = makeInfo pos pos2 in
      { token = StringTok {info = info, val = val}
      , lit = ""
      , info = info
      , stream = {pos = pos2, str = str}
      }
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
  | StringTok _ -> match tokRepr with StringRepr _ then true else false
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
  | StringTok {info = info} -> info
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
  | StringRepr _ -> "<String>"
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
  | StringTok tok -> concat "<String>" tok.val
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
  | StringTok _ -> StringRepr ()
```
</ToggleWrapper>
</DocBlock>

