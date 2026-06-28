import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePprintChar  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getPprintFunction" kind="sem">

```mc
sem _getPprintFunction : GeneratePprint_GPprintEnv -> Ast_Type -> (GeneratePprint_GPprintEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getPprintFunction env =
  | ty & TyChar _ ->
    let n = nameSym "c" in
    (env, nlam_ n ty (seq_ [char_ '\'', app_ (nvar_ env.escapeChar) (nvar_ n), char_ '\'']))
```
</ToggleWrapper>
</DocBlock>

