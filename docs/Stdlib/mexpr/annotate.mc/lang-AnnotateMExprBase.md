import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AnnotateMExprBase  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprAnnot" kind="sem">

```mc
sem exprAnnot : Ast_Expr -> Option Annotator_Annotation
```



<ToggleWrapper text="Code..">
```mc
sem exprAnnot : Expr -> Option Annotation
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patAnnot" kind="sem">

```mc
sem patAnnot : Ast_Pat -> Option Annotator_Annotation
```



<ToggleWrapper text="Code..">
```mc
sem patAnnot : Pat -> Option Annotation
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeAnnot" kind="sem">

```mc
sem typeAnnot : Ast_Type -> Option Annotator_Annotation
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnot : Type -> Option Annotation
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="annotateMExpr" kind="sem">

```mc
sem annotateMExpr : Ast_Expr -> Annotator_Output
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem annotateMExpr = | tm ->
    let annots = _exprAnnots tm in
    annotateAndReadSources annots
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_exprAnnots" kind="sem">

```mc
sem _exprAnnots : Ast_Expr -> [(Info, Annotator_Annotation)]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _exprAnnots = | tm ->
    let res = match exprAnnot tm with Some annot
      then [(infoTm tm, annot)]
      else [] in
    let res = sfold_Expr_Expr (lam acc. lam e. concat acc (_exprAnnots e)) res tm in
    let res = sfold_Expr_Type (lam acc. lam t. concat acc (_typeAnnots t)) res tm in
    let res = sfold_Expr_Pat (lam acc. lam p. concat acc (_patAnnots p)) res tm in
    res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_patAnnots" kind="sem">

```mc
sem _patAnnots : Ast_Pat -> [(Info, Annotator_Annotation)]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _patAnnots = | pat ->
    let res = match patAnnot pat with Some annot
      then [(infoPat pat, annot)]
      else [] in
    let res = sfold_Pat_Expr (lam acc. lam e. concat acc (_exprAnnots e)) res pat in
    let res = sfold_Pat_Type (lam acc. lam t. concat acc (_typeAnnots t)) res pat in
    let res = sfold_Pat_Pat (lam acc. lam p. concat acc (_patAnnots p)) res pat in
    res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_typeAnnots" kind="sem">

```mc
sem _typeAnnots : Ast_Type -> [(Info, Annotator_Annotation)]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _typeAnnots = | ty ->
    let res = match typeAnnot ty with Some annot
      then [(infoTy ty, annot)]
      else [] in
    let res = sfold_Type_Type (lam acc. lam t. concat acc (_typeAnnots t)) res ty in
    res
```
</ToggleWrapper>
</DocBlock>

