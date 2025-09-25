import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclAst  
  

TmDecl \-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmDecl {decl : Decl, inexpr : Expr, info : Info, ty : Type}
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
sem infoTm = | TmDecl x -> x.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm = | TmDecl x -> x.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfo" kind="sem">

```mc
sem withInfo : Info -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withInfo info = | TmDecl x -> TmDecl {x with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType ty = | TmDecl x -> TmDecl {x with ty = ty}
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
  | TmDecl x ->
    -- NOTE(vipa, 2025-05-07): We currently see a TmDecl as a
    -- composite value that includes the Decl in itself, thus
    -- smapAccumL looks "through" the decl as well
    match smapAccumL_Decl_Expr f acc x.decl with (acc, decl) in
    match f acc x.inexpr with (acc, inexpr) in
    (acc, TmDecl {x with decl = decl, inexpr = inexpr})
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
  | TmDecl x ->
    -- NOTE(vipa, 2025-05-07): We currently see a TmDecl as a
    -- composite value that includes the Decl in itself, thus
    -- smapAccumL looks "through" the decl as well
    match smapAccumL_Decl_Type f acc x.decl with (acc, decl) in
    (acc, TmDecl {x with decl = decl})
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
  | TmDecl x ->
    match smapAccumL_Decl_TypeLabel f acc x.decl with (acc, decl) in
    match f acc x.ty with (acc, ty) in
    (acc, TmDecl {x with decl = decl, ty = ty})
```
</ToggleWrapper>
</DocBlock>

