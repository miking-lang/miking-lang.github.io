import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AstEffect  
  

  
  
  
## Semantics  
  

          <DocBlock title="smapEffFromTraversal" kind="sem">

```mc
sem smapEffFromTraversal : all a. all b. (all acc. (acc -> a -> (acc, a)) -> acc -> b -> (acc, b)) -> (a -> Effect_Eff a) -> b -> Effect_Eff b
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapEffFromTraversal smapAccumL f =
  | e ->
    let effMapMChildren : b -> Eff [a] =
      lam x.
      (smapAccumL
         (lam acc. lam a. (effMap2 snoc acc (f a), a))
         (return []) x).0
    in
    let setChildren : b -> [a] -> b =
      lam x. lam children.
      let f =
        lam acc. lam e.
        match acc with [h] ++ t then (t, h) else ([], e)
      in
      (smapAccumL f children x).1
    in
    effMap (setChildren e) (effMapMChildren e)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapEff_Expr_Expr" kind="sem">

```mc
sem smapEff_Expr_Expr : all a. (Ast_Expr -> Effect_Eff Ast_Expr) -> Ast_Expr -> Effect_Eff Ast_Expr
```

<Description>{`Perform a computation on the the immediate sub\-expressions of an  
expression.  Note that this function is capable of emulating  
smapAccumL through use of the State effect.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapEff_Expr_Expr f =
  | e -> smapEffFromTraversal #frozen"smapAccumL_Expr_Expr" f e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapEff_Expr_Type" kind="sem">

```mc
sem smapEff_Expr_Type : all a. (Ast_Type -> Effect_Eff Ast_Type) -> Ast_Expr -> Effect_Eff Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapEff_Expr_Type f =
  | e -> smapEffFromTraversal #frozen"smapAccumL_Expr_Type" f e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapEff_Expr_Pat" kind="sem">

```mc
sem smapEff_Expr_Pat : all a. (Ast_Pat -> Effect_Eff Ast_Pat) -> Ast_Expr -> Effect_Eff Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapEff_Expr_Pat f =
  | e -> smapEffFromTraversal #frozen"smapAccumL_Expr_Pat" f e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapEff_Expr_TypeLabel" kind="sem">

```mc
sem smapEff_Expr_TypeLabel : all a. (Ast_Type -> Effect_Eff Ast_Type) -> Ast_Expr -> Effect_Eff Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapEff_Expr_TypeLabel f =
  | e -> smapEffFromTraversal #frozen"smapAccumL_Expr_TypeLabel" f e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapEff_Type_Type" kind="sem">

```mc
sem smapEff_Type_Type : all a. (Ast_Type -> Effect_Eff Ast_Type) -> Ast_Type -> Effect_Eff Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapEff_Type_Type f =
  | e -> smapEffFromTraversal #frozen"smapAccumL_Type_Type" f e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapEff_Pat_Pat" kind="sem">

```mc
sem smapEff_Pat_Pat : all a. (Ast_Pat -> Effect_Eff Ast_Pat) -> Ast_Pat -> Effect_Eff Ast_Pat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapEff_Pat_Pat f =
  | e -> smapEffFromTraversal #frozen"smapAccumL_Pat_Pat" f e
```
</ToggleWrapper>
</DocBlock>

