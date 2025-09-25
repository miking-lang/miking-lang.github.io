import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AndPatTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotPat" kind="sem">

```mc
sem typeAnnotPat : TypeEnv -> Ast_Type -> Ast_Pat -> (TypeEnv, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotPat (env : TypeEnv) (expectedTy : Type) =
  | PatAnd t ->
    match typeAnnotPat env expectedTy t.lpat with (env, lpat) then
      match typeAnnotPat env expectedTy t.rpat with (env, rpat) then
        (env, PatAnd {{{t with lpat = lpat} with rpat = rpat} with ty = expectedTy})
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

