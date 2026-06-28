import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NeverEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval ctx =
  | TmNever t ->
    errorSingle [t.info] (join [ "Reached a never term, which should be "
            , "impossible in a well-typed program."])
```
</ToggleWrapper>
</DocBlock>

