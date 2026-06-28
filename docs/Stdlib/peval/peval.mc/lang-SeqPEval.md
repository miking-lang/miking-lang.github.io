import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```

<Description>{`NOTE\(oerikss, 2022\-02\-15\): We do not have to check inside the sequences as the  
elements vill always be values in the PEval transformation.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmSeq _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalEval" kind="sem">

```mc
sem pevalEval : PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem pevalEval ctx k =
  | TmSeq r ->
    mapK
      (lam t. lam k. pevalBind ctx k t)
      r.tms
      (lam tms. k (TmSeq { r with tms = tms }))
```
</ToggleWrapper>
</DocBlock>

