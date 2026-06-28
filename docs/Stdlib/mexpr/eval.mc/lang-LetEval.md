import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="evalDecl" kind="sem">

```mc
sem evalDecl : Eval_EvalCtx -> Ast_Decl -> Eval_EvalCtx
```



<ToggleWrapper text="Code..">
```mc
sem evalDecl ctx =
  | DeclLet t ->
    {ctx with env = evalEnvInsert t.ident (eval ctx t.body) ctx.env}
```
</ToggleWrapper>
</DocBlock>

