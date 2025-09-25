import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclExt x ->
    match pprintVarName env x.ident with (env,str) in
    match getTypeStringCode indent env x.tyIdent with (env,ty) in
      let e = if x.effect then "!" else "" in
      (env,
       join ["external ", str, e, " : ", ty])
```
</ToggleWrapper>
</DocBlock>

