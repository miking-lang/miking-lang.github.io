import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPVarArrayDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPDecl" kind="sem">

```mc
sem pprintCOPDecl : PprintEnv -> COPAst_COPDecl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPDecl env =
  | COPVarArrayDecl {id = id, domain = domain, length = length} ->
    match pprintVarName env id with (env, id) in
    match pprintCOPExpr env length with (env, length) in
    match pprintCOPDomain env domain with (env, domain) in
    (env, join ["array [1..", length, "] of var ", domain, ": ", id, ";"])
```
</ToggleWrapper>
</DocBlock>

