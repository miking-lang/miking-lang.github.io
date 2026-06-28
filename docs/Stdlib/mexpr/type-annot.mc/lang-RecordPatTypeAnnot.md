import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordPatTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotPat" kind="sem">

```mc
sem typeAnnotPat : TypeEnv -> Ast_Type -> Ast_Pat -> (TypeEnv, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotPat (env : TypeEnv) (expectedTy : Type) =
  | PatRecord t ->
    let expectedTy = unwrapType expectedTy in
    let expectedTy = match expectedTy with TyUnknown _ | TyApp {lhs = TyUnknown _} then t.ty else expectedTy in
    let expectedTy = match expectedTy with TyRecord _ then expectedTy else
      match (record2tuple t.bindings, mapLength t.bindings) with (Some _, length & !1) then
        -- NOTE(vipa, 2021-05-26): This looks like a tuple pattern, so
        -- we assume that the type is exactly that tuple type. This is
        -- technically a hack, and so has some cases where it breaks
        -- things, but in the common case it is fine. Once we have
        -- exact record patterns, and tuple patterns desugar to that,
        -- this can be removed.
        tytuple_ (make length tyunknown_)
      else expectedTy
    in
    let lookup =
      match expectedTy with TyRecord {fields = fields} then
        lam field. optionGetOr (ityunknown_ t.info) (mapLookup field fields)
      else
        lam. ityunknown_ t.info
    in
    let annotField = lam env. lam field. lam pat.
      typeAnnotPat env (lookup field) pat in
    match mapMapAccum annotField env t.bindings with (env, bindings) then
      (env, PatRecord {{t with bindings = bindings} with ty = expectedTy})
    else never
```
</ToggleWrapper>
</DocBlock>

