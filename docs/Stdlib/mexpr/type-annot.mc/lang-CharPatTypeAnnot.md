import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharPatTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotPat" kind="sem">

```mc
sem typeAnnotPat : TypeEnv -> Ast_Type -> Ast_Pat -> (TypeEnv, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotPat (env : TypeEnv) (expectedTy : Type) =
  | PatChar r -> (env, PatChar {r with ty = tychar_})
```
</ToggleWrapper>
</DocBlock>

