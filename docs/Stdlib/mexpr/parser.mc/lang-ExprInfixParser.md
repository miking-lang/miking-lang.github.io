import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExprInfixParser  
  

General fragment for handling infix operations

  
  
  
## Syntaxes  
  

          <DocBlock title="Associativity" kind="syn">

```mc
syn Associativity
```



<ToggleWrapper text="Code..">
```mc
syn Associativity =
  | LeftAssoc ()
  | RightAssoc ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="parseInfix" kind="sem">

```mc
sem parseInfix : Pos -> Int -> {pos: Pos, str: String, val: Ast_Expr} -> String -> ParseResult Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem parseInfix (p: Pos) (prec: Int) (exp: ParseResult Expr) =
  | str ->
    let r : StrPos = eatWSAC p str in
    match parseInfixImp r.pos r.str with Some op then
      let op : {val : Expr -> Expr -> Expr, pos : Pos, str : String,
                assoc : Associativity, prec : Int} = op in
      if geqi op.prec prec then
        let prec2 = match op.assoc with LeftAssoc ()
                    then addi op.prec 1
                    else op.prec in
        let exp2 : ParseResult Expr = parseExprMain op.pos prec2 op.str in
        let exp3 = {val = op.val exp.val exp2.val,
                    pos = exp2.pos, str = exp2.str} in
	      parseInfix exp3.pos prec exp3 exp3.str
      else exp
    else exp
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseInfixImp" kind="sem">

```mc
sem parseInfixImp : Pos -> String -> Option {pos: Pos, str: String, val: Ast_Expr -> Ast_Expr -> Ast_Expr, prec: Int, assoc: ExprInfixParser_Associativity}
```



<ToggleWrapper text="Code..">
```mc
sem parseInfixImp (p: Pos) =
```
</ToggleWrapper>
</DocBlock>

