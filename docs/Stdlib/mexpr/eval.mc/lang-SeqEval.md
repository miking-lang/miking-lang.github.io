import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval ctx =
  | TmSeq s ->
    let vs = map (eval ctx) s.tms in
    TmSeq {s with tms = vs}
```
</ToggleWrapper>
</DocBlock>

