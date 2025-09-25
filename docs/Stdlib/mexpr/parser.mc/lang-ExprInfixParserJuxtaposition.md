import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExprInfixParserJuxtaposition  
  

This parser should be used for application using juxaposition

  
  
  
## Semantics  
  

          <DocBlock title="parseInfixImp" kind="sem">

```mc
sem parseInfixImp : Pos -> String -> Option {pos: Pos, str: String, val: Ast_Expr -> Ast_Expr -> Ast_Expr, prec: Int, assoc: ExprInfixParser_Associativity}
```



<ToggleWrapper text="Code..">
```mc
sem parseInfixImp (p: Pos) =
  | str ->
    Some {
      val = lam x. lam y.
        TmApp {lhs = x, rhs = y, ty = tyunknown_, info = mergeInfo (infoTm x) (infoTm y)},
      pos = p, str = str, assoc = LeftAssoc (), prec = 50}
```
</ToggleWrapper>
</DocBlock>

