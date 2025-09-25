import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExprInfixArithParser  
  

Demonstrates the use of infix operators. The syntax is not part of basic MCore.

  
  
  
## Semantics  
  

          <DocBlock title="parseInfixImp" kind="sem">

```mc
sem parseInfixImp : Pos -> String -> Option {pos: Pos, str: String, val: Ast_Expr -> Ast_Expr -> Ast_Expr, prec: Int, assoc: ExprInfixParser_Associativity}
```



<ToggleWrapper text="Code..">
```mc
sem parseInfixImp (p: Pos) =
  | "+" ++ xs -> makeConstBinOp 1 p xs (LeftAssoc ()) 10 (CAddi {})
  | "-" ++ xs -> makeConstBinOp 1 p xs (LeftAssoc ()) 10 (CSubi {})
  | "*" ++ xs -> makeConstBinOp 1 p xs (LeftAssoc ()) 20 (CMuli {})
```
</ToggleWrapper>
</DocBlock>

