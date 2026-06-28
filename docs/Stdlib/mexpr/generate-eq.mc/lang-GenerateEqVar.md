import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateEqVar  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getEqFunction" kind="sem">

```mc
sem _getEqFunction : GenerateEq_GEqEnv -> Ast_Type -> (GenerateEq_GEqEnv, Ast_Expr)
```

<Description>{`NOTE\(vipa, 2025\-01\-27\): This function will error when it  
encounters a polymorphic value of unknown type. We could  
arbitrarily say "equal" or "not equal", but that seems error  
prone, or we could somehow ask surrounding code to be rewritten  
to carry an extra eq function for the polymorphic type.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _getEqFunction env =
  | TyVar x ->
    match mapLookup x.ident env.varFunctions with Some fname
    then (env, nvar_ fname)
    else errorSingle [x.info] (join ["I don't know how to compare values of the polymorphic type ", nameGetStr x.ident])
```
</ToggleWrapper>
</DocBlock>

