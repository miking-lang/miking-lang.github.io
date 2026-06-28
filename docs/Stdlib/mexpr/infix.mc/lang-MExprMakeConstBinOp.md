import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprMakeConstBinOp  
  

Fragment for constructing constant binary operators. Used by InfixArithParser

  
  
  
## Semantics  
  

          <DocBlock title="makeConstBinOp" kind="sem">

```mc
sem makeConstBinOp : all a. Int -> Pos -> String -> a -> Int -> ConstAst_Const -> Option {pos: Pos, str: String, val: Ast_Expr -> Ast_Expr -> Ast_Expr, prec: Int, assoc: a}
```



<ToggleWrapper text="Code..">
```mc
sem makeConstBinOp (n: Int) (p: Pos) (xs: String)
                     assoc (prec: Int) =
  | op ->
    let p2 = advanceCol p 1 in
    Some {
      val = lam x. lam y.
        let op = TmConst {val = op, ty = tyunknown_, info = makeInfo p p2} in
        let app = lam x. lam y. 
                TmApp {lhs = x, rhs = y, ty = tyunknown_, info = mergeInfo (infoTm x) (infoTm y)} in
        let res = (app (app op x) y) in
        res, 
      pos = p2, str = xs, assoc = assoc, prec = prec}
```
</ToggleWrapper>
</DocBlock>

