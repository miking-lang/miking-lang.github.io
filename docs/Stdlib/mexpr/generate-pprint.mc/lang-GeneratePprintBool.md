import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePprintBool  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getPprintFunction" kind="sem">

```mc
sem _getPprintFunction : GeneratePprint_GPprintEnv -> Ast_Type -> (GeneratePprint_GPprintEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getPprintFunction env =
  | TyBool _ -> (env, nvar_ env.bool2string)
```
</ToggleWrapper>
</DocBlock>

