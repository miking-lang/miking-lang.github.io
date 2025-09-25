import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UNumParser  
  

Parsing of an unsigned number

  
  
  
## Semantics  
  

          <DocBlock title="parseExprImp" kind="sem">

```mc
sem parseExprImp : Pos -> String -> ParseResult Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem parseExprImp (p : Pos) =
  | (['0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'] ++ s) & xs ->
    let n : ParseResult String = parseUInt p xs in
    let nextChar = if null n.str then None () else Some (head n.str) in
    nextNum p n.str n.val nextChar
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nextNum" kind="sem">

```mc
sem nextNum : Pos -> String -> String -> Option Char -> ParseResult Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem nextNum (p: Pos) (xs: String) (nval: String) =
```
</ToggleWrapper>
</DocBlock>

