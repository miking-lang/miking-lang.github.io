import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MetaVarTypeTCUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyMeta" kind="sem">

```mc
sem unifyMeta : Unify_Unifier () -> TCEnv -> [Info] -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> ()
```



<ToggleWrapper text="Code..">
```mc
sem unifyMeta u tcenv info env =
  | (TyMetaVar t1 & ty1, TyMetaVar t2 & ty2) ->
    match (deref t1.contents, deref t2.contents) with (Unbound r1, Unbound r2) then
      if not (nameEq r1.ident r2.ident) then
        unifyCheck tcenv info r1 ty2;
        unifyCheck tcenv info r2 ty1;
        let updated =
          Unbound {r1 with level = mini r1.level r2.level,
                           kind  = (addKinds u env (r1.kind, r2.kind)).1} in
        modref t1.contents updated;
        modref t2.contents (Link ty1)
      else ()
    else error "unifyMeta reached non-unwrapped MetaVar!"
  | (TyMetaVar t1 & ty1, !TyMetaVar _ & ty2) ->
    match deref t1.contents with Unbound tv then
      unifyCheck tcenv info tv ty2;
      unifyKinds u env (getKind tcenv ty2, tv.kind);
      modref t1.contents (Link env.wrappedRhs)
    else error "unifyMeta reached non-unwrapped MetaVar!"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyCheckBase" kind="sem">

```mc
sem unifyCheckBase : TCEnv -> [Info] -> Set Name -> MetaVarTypeAst_MetaVarRec -> Ast_Type -> ()
```



<ToggleWrapper text="Code..">
```mc
sem unifyCheckBase env info boundVars tv =
  | TyMetaVar t ->
    match deref t.contents with Unbound r then
      if nameEq r.ident tv.ident then
        let msg = join [
          "* Encountered a type occurring within itself.\n",
          "* Recursive types are only permitted using data constructors.\n",
          "* When type checking the expression\n"
        ] in
        errorSingle info msg
      else
        let kind =
          match (tv.kind, r.kind) with (Mono _, Poly _) then Mono ()
          else unifyCheckKind env info boundVars tv r.kind; r.kind
        in
        let updated = Unbound {r with level = mini r.level tv.level,
                                      kind  = kind} in
        modref t.contents updated
    else
      error "Non-unbound MetaVar in unifyCheckBase!"
```
</ToggleWrapper>
</DocBlock>

