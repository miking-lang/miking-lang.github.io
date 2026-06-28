import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExprInfixParserClosed  
  

This parser should be used if juxtaposition is NOT used

  
  
  
## Semantics  
  

          <DocBlock title="parseInfixImp" kind="sem">

```mc
sem parseInfixImp : Pos -> String -> Option {pos: Pos, str: String, val: Ast_Expr -> Ast_Expr -> Ast_Expr, prec: Int, assoc: ExprInfixParser_Associativity}
```



<ToggleWrapper text="Code..">
```mc
sem parseInfixImp (p: Pos) =
  | _ -> None ()
```
</ToggleWrapper>
</DocBlock>

