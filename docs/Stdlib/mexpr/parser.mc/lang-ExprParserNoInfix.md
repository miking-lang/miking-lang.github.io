import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExprParserNoInfix  
  

Include this fragment if there are no infix operations

  
  
  
## Semantics  
  

          <DocBlock title="parseInfix" kind="sem">

```mc
sem parseInfix : Pos -> Int -> ParseResult Ast_Expr -> String -> ParseResult Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem parseInfix (p: Pos) (prec: Int) (exp: ParseResult Expr) =
  | _ -> exp
```
</ToggleWrapper>
</DocBlock>

