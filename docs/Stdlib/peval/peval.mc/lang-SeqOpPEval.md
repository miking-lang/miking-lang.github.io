import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmApp {
    lhs = TmApp {
      lhs = TmConst { val = CGet _},
      rhs = TmVar _
    },
    rhs = TmConst { val = CInt _} | TmVar _
  } -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalApply" kind="sem">

```mc
sem pevalApply : Info -> PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> (Ast_Expr, Ast_Expr) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem pevalApply info ctx k =
  | (TmConstApp {const = CMap _, args = [f]}, TmSeq s) ->
    let f = lam x. lam k.
      pevalApply info ctx (pevalBind ctx k) (f, x)
    in
    mapK f s.tms (lam tms. k (TmSeq { s with tms = tms }))
  | (TmConstApp {const = CMapi _, args = [f]}, TmSeq s) ->
    let f = lam i. lam x. lam k.
      pevalApply info ctx
        (pevalBind ctx (lam f.
          pevalApply info ctx (pevalBind ctx k) (f, x)))
        (f, (int_ i))
    in
    mapiK f s.tms (lam tms. k (TmSeq { s with tms = tms }))
  | (TmConstApp {const = CFoldl _, args = [f, acc]}, TmSeq s) ->
    let f = lam acc. lam x. lam k.
      pevalApply info ctx
        (pevalBind ctx (lam f.
          pevalApply info ctx (pevalBind ctx k) (f, x)))
        (f, acc)
    in
    foldlK f acc s.tms k
  | (TmConstApp {const = CIter _, args = [f]}, TmSeq s) ->
    let f = lam acc. lam x. lam k.
      pevalApply info ctx (lam t. k (semi_ acc t)) (f, x)
    in
    foldlK f unit_ s.tms k
```
</ToggleWrapper>
</DocBlock>

