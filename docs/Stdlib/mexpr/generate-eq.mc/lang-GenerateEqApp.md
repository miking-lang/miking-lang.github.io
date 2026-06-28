import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateEqApp  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getEqFunction" kind="sem">

```mc
sem _getEqFunction : GenerateEq_GEqEnv -> Ast_Type -> (GenerateEq_GEqEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getEqFunction env =
  | TyApp x ->
    match getEqFunction env x.lhs with (env, lhs) in
    match getEqFunction env x.rhs with (env, rhs) in
    (env, app_ lhs rhs)
```
</ToggleWrapper>
</DocBlock>

