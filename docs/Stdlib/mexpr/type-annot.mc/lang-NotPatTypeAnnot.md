import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NotPatTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotPat" kind="sem">

```mc
sem typeAnnotPat : TypeEnv -> Ast_Type -> Ast_Pat -> ({tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type}, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotPat (env : TypeEnv) (expectedTy : Type) =
  | PatNot t ->
    match typeAnnotPat env expectedTy t.subpat with (env, subpat) then
      (env, PatNot {{t with subpat = subpat} with ty = expectedTy})
    else never
```
</ToggleWrapper>
</DocBlock>

