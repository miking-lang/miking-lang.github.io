import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval ctx =
  | TmConApp t -> TmConApp {t with body = eval ctx t.body}
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
  | DeclConDef t -> ctx
```
</ToggleWrapper>
</DocBlock>

