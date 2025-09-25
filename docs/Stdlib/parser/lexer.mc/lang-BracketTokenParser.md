import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BracketTokenParser  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
  | LParenTok {info : Info}
  | RParenTok {info : Info}
  | LBracketTok {info : Info}
  | RBracketTok {info : Info}
  | LBraceTok {info : Info}
  | RBraceTok {info : Info}
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
  | LParenRepr ()
  | RParenRepr ()
  | LBracketRepr ()
  | RBracketRepr ()
  | LBraceRepr ()
  | RBraceRepr ()
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
  | "(" ++ str ->
    let pos2 = advanceCol pos 1 in
    let info = makeInfo pos pos2 in
    {token = LParenTok {info = info}, lit = "(", info = info, stream = {pos = pos2, str = str}}
  | ")" ++ str ->
    let pos2 = advanceCol pos 1 in
    let info = makeInfo pos pos2 in
    {token = RParenTok {info = info}, lit = ")", info = info, stream = {pos = pos2, str = str}}
  | "[" ++ str ->
    let pos2 = advanceCol pos 1 in
    let info = makeInfo pos pos2 in
    {token = LBracketTok {info = info}, lit = "[", info = info, stream = {pos = pos2, str = str}}
  | "]" ++ str ->
    let pos2 = advanceCol pos 1 in
    let info = makeInfo pos pos2 in
    {token = RBracketTok {info = info}, lit = "]", info = info, stream = {pos = pos2, str = str}}
  | "{" ++ str ->
    let pos2 = advanceCol pos 1 in
    let info = makeInfo pos pos2 in
    {token = LBraceTok {info = info}, lit = "{", info = info, stream = {pos = pos2, str = str}}
  | "}" ++ str ->
    let pos2 = advanceCol pos 1 in
    let info = makeInfo pos pos2 in
    {token = RBraceTok {info = info}, lit = "}", info = info, stream = {pos = pos2, str = str}}
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
  | LParenTok _ -> match tokRepr with LParenRepr _ then true else false
  | RParenTok _ -> match tokRepr with RParenRepr _ then true else false
  | LBracketTok _ -> match tokRepr with LBracketRepr _ then true else false
  | RBracketTok _ -> match tokRepr with RBracketRepr _ then true else false
  | LBraceTok _ -> match tokRepr with LBraceRepr _ then true else false
  | RBraceTok _ -> match tokRepr with RBraceRepr _ then true else false
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
  | LParenTok {info = info} -> info
  | RParenTok {info = info} -> info
  | LBracketTok {info = info} -> info
  | RBracketTok {info = info} -> info
  | LBraceTok {info = info} -> info
  | RBraceTok {info = info} -> info
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
  | LParenRepr _ -> "<LParen>"
  | RParenRepr _ -> "<RParen>"
  | LBracketRepr _ -> "<LBracket>"
  | RBracketRepr _ -> "<RBracket>"
  | LBraceRepr _ -> "<LBrace>"
  | RBraceRepr _ -> "<RBrace>"
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
  | LParenTok _ -> "<LParen>"
  | RParenTok _ -> "<RParen>"
  | LBracketTok _ -> "<LBracket>"
  | RBracketTok _ -> "<RBracket>"
  | LBraceTok _ -> "<LBrace>"
  | RBraceTok _ -> "<RBrace>"
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
  | LParenTok _ -> LParenRepr ()
  | RParenTok _ -> RParenRepr ()
  | LBracketTok _ -> LBracketRepr ()
  | RBracketTok _ -> RBracketRepr ()
  | LBraceTok _ -> LBraceRepr ()
  | RBraceTok _ -> RBraceRepr ()
```
</ToggleWrapper>
</DocBlock>

