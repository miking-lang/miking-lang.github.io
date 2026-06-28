import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
  | TmDecl (x & {decl = DeclUtest t}) ->
    let test = typeAnnotExpr env t.test in
    let expected = typeAnnotExpr env t.expected in
    let inexpr = typeAnnotExpr env x.inexpr in
    let tusing = optionMap (typeAnnotExpr env) t.tusing in
    let tonfail = optionMap (typeAnnotExpr env) t.tonfail in
    let failMsgType = lam eqFun : Bool. lam ty.
      join [
        if eqFun then "Custom equality" else "Failing",
        " function was found to have incorrect type.\n",
        "Type was inferred to be ", _pprintType ty
      ]
    in
    let failMsgArgType =
      lam eqFun : Bool. lam right : Bool. lam ty : Type.
        join [
          if eqFun then "Custom equality" else "Failing",
          " function expected ",
          if right then "right-hand" else "left-hand",
          " side of type ",
          _pprintType ty, ", got argument of incompatible type ",
          _pprintType (if right then (tyTm expected) else (tyTm test))
        ]
    in
    -- Handle custom equality function
    let t =
      let failMsgType = failMsgType true in
      let failMsgArgType = failMsgArgType true in
      match tusing with Some tu then
        -- Has custom equality function
        switch tyTm tu
        case
          TyArrow (ta1 & {
            from = lty,
            to = TyArrow (ta2 & {from = rty, to = TyBool _})
          })
        then
          match compatibleType env.tyEnv (tyTm test) lty with Some lty then
            match compatibleType env.tyEnv (tyTm expected) rty
              with Some rty
            then
              let arrowTy =
                TyArrow
                  {ta1 with from = lty, to = TyArrow {ta2 with from = rty}}
              in
              {t with
               test = withType lty test,
               expected = withType rty expected,
               tusing = Some (withType arrowTy tu),
               tonfail = Some (withType arrowTy tu)}
            else
              errorSingle [t.info] (failMsgArgType true rty)
          else
            errorSingle [t.info] (failMsgArgType false lty)
        case ty then
          errorSingle [t.info] (failMsgType ty)
        end
      else
        -- Does not have custom equality function
        t
    in
    -- Handle custom failing function
    let t =
      let failMsgType = failMsgType false in
      let failMsgArgType = failMsgArgType false in
      match tonfail with Some to then
        -- Has custom failing function
        switch tyTm to
        case
          ty & (TyArrow (ta1 & {
            from = lty,
            to = TyArrow (ta2 & {from = rty, to = TySeq {ty = TyChar _}})
          }))
        then
          match compatibleType env.tyEnv (tyTm test) lty with Some lty then
            match compatibleType env.tyEnv (tyTm expected) rty
              with Some rty
            then
              let arrowTy =
                TyArrow
                  {ta1 with from = lty, to = TyArrow {ta2 with from = rty}}
              in
              {t with
               test = withType lty test,
               expected = withType rty expected,
               tonfail = Some (withType arrowTy to)}
            else
              errorSingle [t.info] (failMsgArgType true rty)
          else
            errorSingle [t.info] (failMsgArgType false lty)
        case ty then
          errorSingle [t.info] (failMsgType ty)
        end
      else
        -- Does not have custom equality function
        t
    in
    -- Handle LHS RHS
    let t =
      match compatibleType env.tyEnv (tyTm test) (tyTm expected) with Some eTy
      then
        {t with
         test = withType eTy test,
         expected = withType eTy expected}
      else
        let msg = join [
          "Arguments to utest have incompatible types\n",
          "LHS: ", _pprintType (tyTm test),
          "\nRHS: ", _pprintType (tyTm expected)
        ] in
        errorSingle [t.info] msg
    in
    TmDecl {x with inexpr = inexpr, ty = tyTm inexpr, decl = DeclUtest t}
```
</ToggleWrapper>
</DocBlock>

