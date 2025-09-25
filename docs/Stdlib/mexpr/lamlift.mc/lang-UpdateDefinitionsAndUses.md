import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UpdateDefinitionsAndUses  
  

  
  
  
## Semantics  
  

          <DocBlock title="mapUnderTyAlls" kind="sem">

```mc
sem mapUnderTyAlls : (Ast_Type -> Ast_Type) -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapUnderTyAlls f =
  | TyAll t -> TyAll {t with ty = mapUnderTyAlls f t.ty}
  | ty -> f ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateType" kind="sem">

```mc
sem updateType : OrderedLamLiftSolution -> Ast_Type -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem updateType sol inferredTy = | ty ->
    let info = infoTy ty in
    let addParam = lam pair. lam ty.
      TyArrow {from = pair.1, to = ty, info = info} in
    let addTyAll = lam ty. lam pair.
      TyAll {info = info, ident = pair.0, kind = pair.1, ty = ty} in
    switch (unwrapType ty, inferredTy, sol.tyVars)
    -- NOTE(vipa, 2023-10-12): Keep binding un-annotated unless we
    -- also need to quantify over new type variables
    case (TyUnknown _, _, []) then ty
    -- NOTE(vipa, 2023-10-12): Otherwise use the annotation primarily,
    -- but take the inferred type if there was no explicit annotation
    case (TyUnknown _, ty, ![]) | (ty & !TyUnknown _, _, _) then
      let ty = mapUnderTyAlls (lam ty. foldr addParam ty sol.vars) ty in
      foldl addTyAll ty sol.tyVars
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateLambdaBody" kind="sem">

```mc
sem updateLambdaBody : OrderedLamLiftSolution -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem updateLambdaBody sol = | tm ->
    let info = infoTm tm in
    let addParam = lam pair. lam acc. TmLam
      { ident = pair.0
      , tyAnnot = match unwrapType pair.1 with TyAll _ then pair.1 else tyunknown_
      , tyParam = pair.1
      , body = acc
      , ty = TyArrow {from = pair.1, to = tyTm acc, info = info}
      , info = info
      } in
    foldr addParam tm sol.vars
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkSolApplication" kind="sem">

```mc
sem mkSolApplication : all a. _a1 -> a -> {ty: Ast_Type, info: Info, ident: Name, frozen: Bool} -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem mkSolApplication sol newFType = | x ->
    let removeOneArrow = lam ty. match ty with TyArrow x
      then x.to
      else error "Compiler error in lambda lifting" in
    let addApp = lam acc. lam pair. TmApp
      { lhs = acc
      , rhs = TmVar
        { ident = pair.0
        , ty = pair.1
        , info = x.info
        -- NOTE(vipa, 2023-10-09): We freeze the variable if it might
        -- be polymorphic, otherwise the type might be wrong. It would
        -- be correct (but verbose) to always freeze since \\`ty\\` always
        -- exactly matches the definition-site type of the binding.
        , frozen = match unwrapType pair.1 with TyAll _ | TyUnknown _ then true else false
        }
      , info = x.info
      -- , ty = removeOneArrow (tyTm acc)
      , ty = ityunknown_ x.info
      } in
    let tm = foldl addApp (TmVar {x with frozen = false}) sol.vars in
    if x.frozen then
      -- NOTE(vipa, 2023-10-09): Re-freeze the variable with an
      -- intermediate let-binding
      let n = nameSetNewSym x.ident in
      -- NOTE(vipa, 2023-10-09): The generated AST will technically
      -- not type-check, because of the value restriction: we can't
      -- have a polymorphic value defined as anything but a
      -- value. \\`tm\\` here is a series of applications, i.e., not a
      -- value. We know from the transformation that it will be a
      -- value, and we could eta-expand if we want to get it fully
      -- correct, but I'm leaving it like this for the moment.
      TmDecl
      { decl = DeclLet
        { ident = n
        , tyAnnot = x.ty
        , tyBody = x.ty
        , body = tm
        , info = x.info
        }
      , inexpr = TmVar {ident = n, frozen = true, info = x.info, ty = x.ty}
      , info = x.info
      , ty = x.ty
      }
    else tm
```
</ToggleWrapper>
</DocBlock>

