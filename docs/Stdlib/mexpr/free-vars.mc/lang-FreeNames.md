import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNames" kind="sem">

```mc
sem freeNames : Ast_Expr -> Set Name
```

<Description>{`A broader form of freeVars that returns free occurrences of all  
Names, including variables, constructors, type constructors, and  
type variables. Same assumptions as for freeVars. Does not look  
at inferred types, only explicit annotations.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem freeNames = | tm ->
    freeNamesExpr (setEmpty nameCmp) tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="freeNamesExpr" kind="sem">

```mc
sem freeNamesExpr : Set Name -> Ast_Expr -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem freeNamesExpr free = | tm ->
    let free = sfold_Expr_Expr freeNamesExpr free tm in
    let free = sfold_Expr_Type freeNamesType free tm in
    free
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="freeNamesType" kind="sem">

```mc
sem freeNamesType : Set Name -> Ast_Type -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem freeNamesType free = | ty ->
    let free = sfold_Type_Type freeNamesType free ty in
    free
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="freeNamesPat" kind="sem">

```mc
sem freeNamesPat : Set Name -> Ast_Pat -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem freeNamesPat free = | pat ->
    let free = sfold_Pat_Pat freeNamesPat free pat in
    let free = sfold_Pat_Type freeNamesType free pat in
    free
```
</ToggleWrapper>
</DocBlock>

