import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# HashStringTokenParser  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
  | HashStringTok {info : Info, hash : String, val : String}
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
  | HashStringRepr {hash : String}
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
  | "#" ++ str ->
    match parseIdentCont (advanceCol pos 1) str with {val = hash, pos = pos2, str = str} then
      match str with "\"" ++ str then
        recursive let work = lam acc. lam p2. lam str.
          match str with "\"" ++ str then
            {val = acc, pos = advanceCol p2 1, str = str}
          else match matchChar p2 str with {val = charval, pos = p2, str = str} then
            work (snoc acc charval) p2 str
          else never
        in match work "" (advanceCol pos2 1) str with {val = val, pos = pos2, str = str} then
          let info = makeInfo pos pos2 in
          { token = HashStringTok {info = info, hash = hash, val = val}
          , lit = ""
          , info = info
          , stream = {pos = pos2, str = str}
          }
        else never
      else posErrorExit pos2 "Expected \" to begin hash string"
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
  | HashStringTok {hash = hash} -> match tokRepr with HashStringRepr {hash = hash2}
    then eqString hash hash2
    else false
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
  | HashStringTok {info = info} -> info
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
  | HashStringRepr {hash = hash} -> join ["<", hash, " HashString>"]
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
  | HashStringTok tok -> join ["<Hash:", tok.hash, ">", tok.val]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokReprCmp2" kind="sem">

```mc
sem tokReprCmp2 : (TokenReprBase_TokenRepr, TokenReprBase_TokenRepr) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem tokReprCmp2 =
  | (HashStringRepr l, HashStringRepr r) -> cmpString l.hash r.hash
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
  | HashStringTok x -> HashStringRepr {hash = x.hash}
```
</ToggleWrapper>
</DocBlock>

