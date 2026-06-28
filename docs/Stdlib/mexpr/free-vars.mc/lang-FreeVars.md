import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FreeVars  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeVars" kind="sem">

```mc
sem freeVars : Ast_Expr -> Set Name
```

<Description>{`Returns the set of free variables for a given expression. Assumes  
that the expression is symbolized \(and no Names are defined more  
than once\).No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem freeVars =| t -> freeVarsExpr (setEmpty nameCmp) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="freeVarsExpr" kind="sem">

```mc
sem freeVarsExpr : Set Name -> Ast_Expr -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem freeVarsExpr acc =
  | t -> sfold_Expr_Expr freeVarsExpr acc t
```
</ToggleWrapper>
</DocBlock>

