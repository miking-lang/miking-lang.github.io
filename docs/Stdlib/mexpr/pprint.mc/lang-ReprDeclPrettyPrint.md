import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ReprDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclRepr x ->
    match pprintEnvGetStr env x.ident with (env, ident) in
    match getTypeStringCode indent env x.pat with (env, pat) in
    match getTypeStringCode indent env x.repr with (env, repr) in
    let str = join
      [ "repr ", ident, " {", pat, " = ", repr, "}"
      ] in
    (env, str)
```
</ToggleWrapper>
</DocBlock>

