import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IdentParser  
  

Parse identifier

  
  
  
## Semantics  
  

          <DocBlock title="parseExprImp" kind="sem">

```mc
sem parseExprImp : Pos -> String -> ParseResult Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem parseExprImp (p: Pos) =
  | (['_' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' |
      'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' |
      'x' | 'y' | 'z' ] ++ s) & xs ->
    let r : ParseResult String = parseIdent false p xs in
    nextIdent p r.str r.val
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nextIdent" kind="sem">

```mc
sem nextIdent : Pos -> String -> String -> ParseResult Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem nextIdent (p: Pos) (xs: String) =
```
</ToggleWrapper>
</DocBlock>

