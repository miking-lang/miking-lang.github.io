import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataPatTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotPat" kind="sem">

```mc
sem typeAnnotPat : TypeEnv -> Ast_Type -> Ast_Pat -> (TypeEnv, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotPat (env : TypeEnv) (expectedTy : Type) =
  | PatCon t ->
    match optionMap inspectType (mapLookup t.ident env.conEnv)
    with Some (TyArrow {from = argTy, to = to}) then
      match typeAnnotPat env argTy t.subpat with (env, subpat) then
        (env, PatCon {{t with subpat = subpat} with ty = to})
      else never
    else (env, PatCon t)
```
</ToggleWrapper>
</DocBlock>

