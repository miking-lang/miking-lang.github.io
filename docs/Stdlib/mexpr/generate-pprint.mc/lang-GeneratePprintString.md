import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePprintString  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getPprintFunction" kind="sem">

```mc
sem _getPprintFunction : GeneratePprint_GPprintEnv -> Ast_Type -> (GeneratePprint_GPprintEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getPprintFunction env =
  | ty & TySeq {ty = TyChar _} ->
    let n = nameSym "x" in
    (env, nlam_ n ty (cons_ (char_ '"') (snoc_ (app_ (nvar_ env.escapeString) (nvar_ n)) (char_ '"'))))
```
</ToggleWrapper>
</DocBlock>

