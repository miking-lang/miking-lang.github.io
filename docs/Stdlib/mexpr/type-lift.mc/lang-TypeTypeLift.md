import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeTypeLift  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeLiftExpr" kind="sem">

```mc
sem typeLiftExpr : TypeLiftBase_TypeLiftEnv -> Ast_Expr -> (TypeLiftBase_TypeLiftEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftExpr (env : TypeLiftEnv) =
  | TmDecl (x & {decl = DeclType t}) ->
    let tyIdent =
      match t.tyIdent with TyUnknown t2 then tyWithInfo t2.info (tyvariant_ [])
      else t.tyIdent
    in
    match typeLiftType env tyIdent with (env, tyIdent) in
    let env : TypeLiftEnv = env in
    let env =
      -- Ignore any existing constructors in the variant type.
      match tyIdent with TyVariant {info = info} then
        let variantNameTy = TyVariantName {ident = t.ident, info = info} in
        {{env with variants = mapInsert t.ident (mapEmpty nameCmp) env.variants}
              with typeEnv = assocSeqInsert t.ident variantNameTy env.typeEnv}
      else match tyIdent
      with TyRecord {fields = fields} & ty then
        let f = lam env. lam. lam ty. typeLiftType env ty in
        match mapMapAccum f env fields with (env, _) in
        match addRecordToEnv env ty with (env, _) in
        env
      else {env with typeEnv = assocSeqInsert t.ident tyIdent env.typeEnv}
    in
    match typeLiftExpr env x.inexpr with (env, inexpr) in
    (env, inexpr)
```
</ToggleWrapper>
</DocBlock>

