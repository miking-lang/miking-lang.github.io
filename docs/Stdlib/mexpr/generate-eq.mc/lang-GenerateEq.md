import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateEq  
  

  
  
  
## Types  
  

          <DocBlock title="GEqEnv" kind="type">

```mc
type GEqEnv : { conFunctions: Map Name Name, varFunctions: Map Name Name, newFunctions: [(Name, Expr)], tcEnv: TCEnv, eqSeq: Name, eqBool: Name }
```



<ToggleWrapper text="Code..">
```mc
type GEqEnv =
    { conFunctions : Map Name Name  -- For TyCons
    , varFunctions : Map Name Name  -- For TyVars
    , newFunctions : [(Name, Expr)]  -- To be defined

    , tcEnv : TCEnv -- Current typechecking environment

    , eqSeq : Name
    , eqBool : Name
    }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getEqFunction" kind="sem">

```mc
sem getEqFunction : GenerateEq_GEqEnv -> Ast_Type -> (GenerateEq_GEqEnv, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getEqFunction env = | ty -> _getEqFunction env (unwrapType ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getEqFunction" kind="sem">

```mc
sem _getEqFunction : GenerateEq_GEqEnv -> Ast_Type -> (GenerateEq_GEqEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getEqFunction : GEqEnv -> Type -> (GEqEnv, Expr)
```
</ToggleWrapper>
</DocBlock>

