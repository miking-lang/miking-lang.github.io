import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateEqFloat  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getEqFunction" kind="sem">

```mc
sem _getEqFunction : GenerateEq_GEqEnv -> Ast_Type -> (GenerateEq_GEqEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getEqFunction env =
  | TyFloat _ -> (env, uconst_ (CEqf ()))
```
</ToggleWrapper>
</DocBlock>

