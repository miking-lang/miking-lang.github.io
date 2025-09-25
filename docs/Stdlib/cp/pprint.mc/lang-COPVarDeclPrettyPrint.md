import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPVarDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPDecl" kind="sem">

```mc
sem pprintCOPDecl : PprintEnv -> COPAst_COPDecl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPDecl env =
  | COPVarDecl {id = id, domain = domain } ->
    match pprintVarName env id with (env, id) in
    match pprintCOPDomain env domain with (env, domain) in
    (env, join ["var ", domain, ": ", id, ";"])
```
</ToggleWrapper>
</DocBlock>

