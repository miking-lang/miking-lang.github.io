import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MonomorphizeValidate  
  

  
  
  
## Semantics  
  

          <DocBlock title="isMonomorphic" kind="sem">

```mc
sem isMonomorphic : Ast_Expr -> Bool
```

<Description>{`Verifies that all types in the provided AST are monomorphic, i.e., that  
the AST does not contain any type variables or forall quantifiers.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isMonomorphic =
  | ast -> isMonomorphicExpr true ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isMonomorphicExpr" kind="sem">

```mc
sem isMonomorphicExpr : Bool -> Ast_Expr -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isMonomorphicExpr acc =
  | e ->
    let acc = sfold_Expr_Expr isMonomorphicExpr acc e in
    let acc = sfold_Expr_Pat isMonomorphicPat acc e in
    let acc = sfold_Expr_Type isMonomorphicType acc e in
    let acc = sfold_Expr_TypeLabel isMonomorphicTypeLabel acc e in
    isMonomorphicTypeLabel acc (tyTm e)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isMonomorphicPat" kind="sem">

```mc
sem isMonomorphicPat : Bool -> Ast_Pat -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isMonomorphicPat acc =
  | p ->
    let acc = sfold_Pat_Pat isMonomorphicPat acc p in
    isMonomorphicType acc (tyPat p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isMonomorphicType" kind="sem">

```mc
sem isMonomorphicType : Bool -> Ast_Type -> Bool
```

<Description>{`NOTE\(larshum, 2023\-08\-08\): For fields corresponding to user\-annotated  
types, the unknown type represents absence of annotation. However, in  
types annotated by the type checker, an unknown type represents a  
polymorphic type. Because of this, we use different approaches when  
checking whether a type is monomorphic depending on whether it originates  
from a user annotation or from the type checker.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isMonomorphicType acc =
  | ty -> isMonomorphicTypeH true acc ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isMonomorphicTypeLabel" kind="sem">

```mc
sem isMonomorphicTypeLabel : Bool -> Ast_Type -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isMonomorphicTypeLabel acc =
  | ty -> isMonomorphicTypeH false acc ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isMonomorphicTypeH" kind="sem">

```mc
sem isMonomorphicTypeH : Bool -> Bool -> Ast_Type -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isMonomorphicTypeH treatUnknownAsMonomorphic acc =
  | TyAll _ | TyVar _ -> false
  | TyCon _ -> true
  | TyUnknown _ -> treatUnknownAsMonomorphic
  | ty -> sfold_Type_Type (isMonomorphicTypeH treatUnknownAsMonomorphic) acc ty
```
</ToggleWrapper>
</DocBlock>

