import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UncurriedAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmUncurriedApp
    { f : Expr
    , positional : [Expr]
    , info : Info
    , ty : Type
    }
  | TmUncurriedLam
    { positional : [{ident : Name, tyAnnot : Type, tyParam : Type, info : Info}]
    , body : Expr
    , info : Info
    , ty : Type
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TyUncurriedArrow
    { positional : [Type]
    , ret : Type
    , info : Info
    }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | TmUncurriedLam x -> x.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm =
  | TmUncurriedLam x -> x.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfo" kind="sem">

```mc
sem withInfo : Info -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withInfo info =
  | TmUncurriedLam x -> TmUncurriedLam {x with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType ty =
  | TmUncurriedLam x -> TmUncurriedLam {x with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_Expr" kind="sem">

```mc
sem smapAccumL_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Expr f acc =
  | TmUncurriedLam x ->
    match f acc x.body with (acc, body) in
    (acc, TmUncurriedLam {x with body = body})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_Type" kind="sem">

```mc
sem smapAccumL_Expr_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Type f acc =
  | TmUncurriedLam x ->
    let f = lam acc. lam param.
      match f acc param.tyAnnot with (acc, tyAnnot) in
      (acc, {param with tyAnnot = tyAnnot}) in
    match mapAccumL f acc x.positional with (acc, positional) in
    (acc, TmUncurriedLam {x with positional = positional})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_TypeLabel" kind="sem">

```mc
sem smapAccumL_Expr_TypeLabel : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_TypeLabel f acc =
  | TmUncurriedLam x ->
    match f acc x.ty with (acc, ty) in
    let f = lam acc. lam param.
      match f acc param.tyParam with (acc, tyParam) in
      (acc, {param with tyParam = tyParam}) in
    match mapAccumL f acc x.positional with (acc, positional) in
    (acc, TmUncurriedLam {x with positional = positional, ty = ty})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTy" kind="sem">

```mc
sem infoTy : Ast_Type -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTy =
  | TyUncurriedArrow x -> x.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyWithInfo" kind="sem">

```mc
sem tyWithInfo : Info -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyWithInfo info =
  | TyUncurriedArrow x -> TyUncurriedArrow {x with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Type_Type" kind="sem">

```mc
sem smapAccumL_Type_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Type -> (acc, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Type_Type f acc =
  | TyUncurriedArrow x ->
    match mapAccumL f acc x.positional with (acc, positional) in
    match f acc x.ret with (acc, ret) in
    (acc, TyUncurriedArrow {x with positional = positional, ret = ret})
```
</ToggleWrapper>
</DocBlock>

