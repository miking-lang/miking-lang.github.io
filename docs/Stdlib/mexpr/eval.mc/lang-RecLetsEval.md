import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="evalDecl" kind="sem">

```mc
sem evalDecl : Eval_EvalCtx -> Ast_Decl -> Eval_EvalCtx
```



<ToggleWrapper text="Code..">
```mc
sem evalDecl ctx =
  | DeclRecLets t ->
    recursive let envPrime : Lazy EvalEnv = lam.
      let wraplambda = lam v.
        match v with TmLam t then
          TmClos {ident = t.ident, body = t.body, env = envPrime, info = t.info}
        else
          errorSingle [infoTm v]
            "Right-hand side of recursive let must be a lambda"
      in
      foldl
        (lam env. lam bind.
          evalEnvInsert bind.ident (wraplambda bind.body) env)
        ctx.env t.bindings
    in
    {ctx with env = envPrime ()}
```
</ToggleWrapper>
</DocBlock>

