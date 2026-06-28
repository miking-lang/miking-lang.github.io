import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TyAnnot  
  

NOTE\(vipa, 2022\-10\-07\): This can't use AnnotateMExprBase because it  
has to thread a pprint environment, which AnnotateMExprBase doesn't  
allow.

  
  
  
## Semantics  
  

          <DocBlock title="annotateMExpr" kind="sem">

```mc
sem annotateMExpr : Ast_Expr -> Annotator_Output
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem annotateMExpr = | tm -> annotateAndReadSources (_annotateExpr pprintEnvEmpty tm).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_removeAliases" kind="sem">

```mc
sem _removeAliases : Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _removeAliases =
  | TyAlias x -> _removeAliases x.content
  | ty -> smap_Type_Type _removeAliases ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_annotateExpr" kind="sem">

```mc
sem _annotateExpr : PprintEnv -> Ast_Expr -> (PprintEnv, [(Info, Annotator_Annotation)])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _annotateExpr env = | tm ->
    match getTypeStringCode 0 env (_removeAliases (tyTm tm)) with (env, annot) in
    let annot = escapeAnnot annot in
    let res = (env, [(infoTm tm, annot)]) in
    let helper = lam f. lam acc. lam x.
      match f acc.0 x with (env, new) in
      (env, concat acc.1 new) in
    let res = sfold_Expr_Expr (helper _annotateExpr) res tm in
    let res = sfold_Expr_Pat (helper _annotatePat) res tm in
    res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_annotatePat" kind="sem">

```mc
sem _annotatePat : PprintEnv -> Ast_Pat -> (PprintEnv, [(Info, Annotator_Annotation)])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _annotatePat env = | pat ->
    match getTypeStringCode 0 env (_removeAliases (tyPat pat)) with (env, annot) in
    let annot = escapeAnnot annot in
    let res = (env, [(infoPat pat, annot)]) in
    let helper = lam f. lam acc. lam x.
      match f acc.0 x with (env, new) in
      (env, concat acc.1 new) in
    let res = sfold_Pat_Expr (helper _annotateExpr) res pat in
    let res = sfold_Pat_Pat (helper _annotatePat) res pat in
    res
```
</ToggleWrapper>
</DocBlock>

