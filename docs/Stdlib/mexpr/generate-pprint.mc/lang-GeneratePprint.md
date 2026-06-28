import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePprint  
  

  
  
  
## Types  
  

          <DocBlock title="GPprintEnv" kind="type">

```mc
type GPprintEnv : { conFunctions: Map Name Name, varFunctions: Map Name Name, newFunctions: [(Name, Expr)], tcEnv: TCEnv, int2string: Name, bool2string: Name, seq2string: Name, escapeString: Name, escapeChar: Name }
```



<ToggleWrapper text="Code..">
```mc
type GPprintEnv =
    { conFunctions : Map Name Name  -- For TyCons
    , varFunctions : Map Name Name  -- For TyVars
    , newFunctions : [(Name, Expr)]  -- To be defined

    , tcEnv : TCEnv -- Current typechecking environment

    , int2string : Name
    , bool2string : Name
    , seq2string : Name
    , escapeString : Name
    , escapeChar : Name
    }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getPprintFunction" kind="sem">

```mc
sem getPprintFunction : GeneratePprint_GPprintEnv -> Ast_Type -> (GeneratePprint_GPprintEnv, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getPprintFunction env = | ty -> _getPprintFunction env (unwrapType ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getPprintFunction" kind="sem">

```mc
sem _getPprintFunction : GeneratePprint_GPprintEnv -> Ast_Type -> (GeneratePprint_GPprintEnv, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _getPprintFunction env = | ty ->
    errorSingle [infoTy ty] (concat "Missing case for _getPprintFunction " (type2str ty))
```
</ToggleWrapper>
</DocBlock>

