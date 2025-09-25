import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="evalDecl" kind="sem">

```mc
sem evalDecl : Eval_EvalCtx -> Ast_Decl -> Eval_EvalCtx
```



<ToggleWrapper text="Code..">
```mc
sem evalDecl ctx =
  | DeclExt r -> ctx -- nop
```
</ToggleWrapper>
</DocBlock>

