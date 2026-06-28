import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UsePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode (indent : Int) (env: PprintEnv) =
  | DeclUse t ->
    match pprintLangName env t.ident with (env,ident) in
    (env, join ["use ", ident])
```
</ToggleWrapper>
</DocBlock>

