import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamAst  
  

TmLam \-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmLam {ident : Name,
           tyAnnot : Type,
           tyParam : Type,
           body : Expr,
           ty : Type,
           info : Info}
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
  | TmLam r -> r.info
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
  | TmLam t -> t.ty
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
  | TmLam t -> TmLam {t with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType (ty : Type) =
  | TmLam t -> TmLam {t with ty = ty}
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
  | TmLam t ->
    match f acc t.tyAnnot with (acc, tyAnnot) in
    (acc, TmLam {t with tyAnnot = tyAnnot})
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
  | TmLam t ->
    match f acc t.tyParam with (acc, tyParam) in
    match f acc t.ty with (acc, ty) in
    (acc, TmLam {t with tyParam = tyParam, ty = ty})
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
  | TmLam t ->
    match f acc t.body with (acc, body) in
    (acc, TmLam {t with body = body})
```
</ToggleWrapper>
</DocBlock>

