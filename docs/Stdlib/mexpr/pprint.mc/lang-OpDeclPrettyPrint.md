import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclOp x ->
    match pprintEnvGetStr env x.ident with (env, ident) in
    match getTypeStringCode indent env x.tyAnnot with (env, ty) in
    (env,
     join ["letop ", pprintVarString ident, " : ", ty])
```
</ToggleWrapper>
</DocBlock>

