import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateEqualityBase  
  

  
  
  
## Semantics  
  

          <DocBlock title="equalityId" kind="sem">

```mc
sem equalityId : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, Name)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem equalityId info env =
  | ty ->
    let id = equalityIdH info env ty in
    ({env with eq = mapInsert ty id env.eq}, id)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="equalityIdH" kind="sem">

```mc
sem equalityIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem equalityIdH info env =
  | ty ->
    let msg = join [
      "A custom equality function is required for type ", type2str ty, ".\n"
    ] in
    errorSingle [info] msg
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateEqualityBody" kind="sem">

```mc
sem generateEqualityBody : Info -> UtestBase_UtestEnv -> Ast_Type -> (Name, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateEqualityBody info env =
  | ty ->
    match mapLookup ty env.eq with Some id then
      (id, generateEqualityBodyH info env ty)
    else
      errorSingle [infoTy ty]
        (concat "Cannot generate equality function for type " (type2str ty))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateEqualityBodyH" kind="sem">

```mc
sem generateEqualityBodyH : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateEqualityBodyH info env =
  | ty ->
    errorSingle [infoTy ty]
      (concat "Cannot generate equality function for type " (type2str ty))
```
</ToggleWrapper>
</DocBlock>

