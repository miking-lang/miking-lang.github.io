import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BoolPatTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckPat" kind="sem">

```mc
sem typeCheckPat : TCEnv -> Map Name Ast_Type -> Ast_Pat -> (Map Name Ast_Type, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckPat env patEnv =
  | PatBool t -> (patEnv, PatBool {t with ty = TyBool {info = t.info}})
```
</ToggleWrapper>
</DocBlock>

