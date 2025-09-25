import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExprParser  
  

Top of the expression parser. Connects WSAC with parsing of other non terminals

  
  
  
## Semantics  
  

          <DocBlock title="parseExpr" kind="sem">

```mc
sem parseExpr : Pos -> String -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem parseExpr (p: Pos) =
  | s ->
    let r1 : ParseResult Expr = parseExprMain p 0 s in
    let r2 : StrPos = eatWSAC r1.pos r1.str in
    if eqi (length r2.str) 0 then r1.val
    else posErrorExit r2.pos "Parse error. Unknown characters."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseExprMain" kind="sem">

```mc
sem parseExprMain : Pos -> Int -> String -> ParseResult Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem parseExprMain (p: Pos) (prec: Int) =
  | s ->
    let r1 : StrPos = eatWSAC p s in
    let exp : ParseResult Expr = parseExprImp r1.pos r1.str in
    let r2 : StrPos = eatWSAC exp.pos exp.str in
    parseInfix r2.pos prec exp r2.str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseInfix" kind="sem">

```mc
sem parseInfix : Pos -> Int -> ParseResult Ast_Expr -> String -> ParseResult Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem parseInfix (p: Pos) (prec: Int) (exp: ParseResult Expr) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseExprImp" kind="sem">

```mc
sem parseExprImp : Pos -> String -> ParseResult Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem parseExprImp (p: Pos) =
  | _ -> posErrorExit p "Parse error. Unknown character sequence."
```
</ToggleWrapper>
</DocBlock>

