import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypeLift  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeLiftExpr" kind="sem">

```mc
sem typeLiftExpr : TypeLiftBase_TypeLiftEnv -> Ast_Expr -> (TypeLiftBase_TypeLiftEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftExpr (env : TypeLiftEnv) =
  | TmDecl (x & {decl = DeclConDef t}) ->
    recursive let unwrapTypeVarIdent = lam ty : Type.
      match ty with TyCon t then Some t.ident
      else match ty with TyApp t then unwrapTypeVarIdent t.lhs
      else None ()
    in
    let env =
      match inspectType t.tyIdent with TyArrow {from = from, to = to} then
        match unwrapTypeVarIdent to with Some ident then
          match typeLiftType env from with (env, from) then
            let f = lam variantMap. mapInsert t.ident from variantMap in
            let err = lam.
              errorSingle [t.info] (join ["Constructor ", nameGetStr t.ident,
                                          " defined before referenced variant type ",
                                          nameGetStr ident])
            in
            let env : TypeLiftEnv = env in
            let variantMap = mapLookupApplyOrElse f err ident env.variants in
            {env with variants = mapInsert ident variantMap env.variants}
          else never
        else env
      else env
    in
    match typeLiftExpr env x.inexpr with (env, inexpr) then
      (env, inexpr)
    else never
```
</ToggleWrapper>
</DocBlock>

