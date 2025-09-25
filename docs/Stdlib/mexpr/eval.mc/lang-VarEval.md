import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval ctx =
  | TmVar r ->
    match evalEnvLookup r.ident ctx.env with Some t then t
    else
      errorSingle [r.info]
        (concat "Unknown variable: " (pprintVarString (nameGetStr r.ident)))
```
</ToggleWrapper>
</DocBlock>

