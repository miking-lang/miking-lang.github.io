import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePprintVar  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getPprintFunction" kind="sem">

```mc
sem _getPprintFunction : GeneratePprint_GPprintEnv -> Ast_Type -> (GeneratePprint_GPprintEnv, Ast_Expr)
```

<Description>{`NOTE\(vipa, 2025\-01\-27\): This function will print a constant  
\`\<poly \(name\-of\-type\-var\)\>\` when it encounters a polymorphic  
value of unknown type. We could error instead, or somehow ask  
surrounding code to be rewritten to carry an extra pprint  
function for the polymorphic type.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _getPprintFunction env =
  | TyVar x ->
    match mapLookup x.ident env.varFunctions with Some fname
    then (env, nvar_ fname)
    else (env, ulam_ "" (str_ (join ["<poly (", nameGetStr x.ident, ")>"])))
```
</ToggleWrapper>
</DocBlock>

