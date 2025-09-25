import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateEqInt  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getEqFunction" kind="sem">

```mc
sem _getEqFunction : GenerateEq_GEqEnv -> Ast_Type -> (GenerateEq_GEqEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getEqFunction env =
  | TyInt _ -> (env, uconst_ (CEqi ()))
```
</ToggleWrapper>
</DocBlock>

