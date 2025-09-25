import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LowerUncurried  
  

  
  
  
## Semantics  
  

          <DocBlock title="lowerUncurried" kind="sem">

```mc
sem lowerUncurried : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lowerUncurried =
  | tm ->
    let tm = smap_Expr_Expr lowerUncurried tm in
    let tm = smap_Expr_Type lowerUncurriedType tm in
    let tm = smap_Expr_TypeLabel lowerUncurriedType tm in
    tm
  | TmUncurriedApp x ->
    let args = x.positional in
    let args = map lowerUncurried args in
    let args = if null args then [withType tyunit_ unit_] else args in
    match
      let f = lam fullTy. lam arg.
        (tyarrow_ (tyTm arg) fullTy, (arg, fullTy)) in
      mapAccumR f x.ty args
    with (fullTy, argsWithResTy) in
    foldl
      (lam tm. lam argPair. withType argPair.1 (app_ tm argPair.0))
      (withType fullTy (lowerUncurried x.f))
      argsWithResTy
  | TmUncurriedLam x ->
    let params = x.positional in
    let params = if null params
      then [{ident = nameSym "", tyAnnot = tyunit_, tyParam = tyunit_, info = x.info}]
      else params in
    let mkLam = lam param. lam body.
      let tyParam = lowerUncurriedType param.tyParam in
      TmLam
      { ident = param.ident
      , tyAnnot = lowerUncurriedType param.tyAnnot
      , tyParam = tyParam
      , info = param.info
      , body = lowerUncurried body
      , ty = tyarrow_ tyParam (tyTm body)
      } in
    foldr mkLam (lowerUncurried x.body) params
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lowerUncurriedType" kind="sem">

```mc
sem lowerUncurriedType : Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lowerUncurriedType =
  | ty -> smap_Type_Type lowerUncurriedType ty
  | TyUncurriedArrow x ->
    let params = x.positional in
    let params = map lowerUncurriedType params in
    let params = if null params then [tyunit_] else params in
    foldr tyarrow_ x.ret params
```
</ToggleWrapper>
</DocBlock>

