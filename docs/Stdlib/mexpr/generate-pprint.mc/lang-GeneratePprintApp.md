import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePprintApp  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getPprintFunction" kind="sem">

```mc
sem _getPprintFunction : GeneratePprint_GPprintEnv -> Ast_Type -> (GeneratePprint_GPprintEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getPprintFunction env =
  | TyApp x ->
    match getPprintFunction env x.lhs with (env, lhs) in
    match getPprintFunction env x.rhs with (env, rhs) in
    (env, app_ lhs rhs)
```
</ToggleWrapper>
</DocBlock>

