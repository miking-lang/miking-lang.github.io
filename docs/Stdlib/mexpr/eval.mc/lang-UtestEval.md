import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="eq" kind="sem">

```mc
sem eq : all a. all a1. Ast_Expr -> a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem eq (e1 : Expr) =
  | _ -> errorSingle [infoTm e1] "Equality not defined for expression"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalDecl" kind="sem">

```mc
sem evalDecl : Eval_EvalCtx -> Ast_Decl -> Eval_EvalCtx
```



<ToggleWrapper text="Code..">
```mc
sem evalDecl ctx =
  | DeclUtest r ->
    let v1 = eval ctx r.test in
    let v2 = eval ctx r.expected in
    let tusing = optionMap (eval ctx) r.tusing in
    let result = match tusing with Some tusing then
      match apply ctx r.info (apply ctx r.info (tusing, v1), v2)
      with TmConst {val = CBool {val = b}} then b
      else errorSingle [r.info] "Invalid utest equivalence function"
    else
      eqExpr v1 v2 in
    (if result then print "Test passed\n" else
      match r.tonfail with Some tonfail then
        match
          apply ctx r.info (apply ctx r.info (tonfail, v1), v2)
          with TmSeq seqr
        then
          print (_evalSeqOfCharsToString seqr.info seqr.tms)
        else errorSingle [r.info] "Invalid utest failure function"
      else print "Test failed\n");
    ctx
```
</ToggleWrapper>
</DocBlock>

