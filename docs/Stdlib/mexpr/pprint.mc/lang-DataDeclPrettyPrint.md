import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclConDef x ->
    match pprintConName env x.ident with (env, str) in
    let tyIdent = match x.tyIdent with TyUnknown _
      then None ()
      else Some x.tyIdent in
    match optionMapAccum (getTypeStringCode indent) env tyIdent with (env, ty) in
    let ty = optionMapOr "" (concat ": ") ty in
    (env, join ["con ", str, ty])
```
</ToggleWrapper>
</DocBlock>

