import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateEqLoader  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Hook" kind="syn">

```mc
syn Hook
```



<ToggleWrapper text="Code..">
```mc
syn Hook =
  | EqHook
    { baseEnv : GEqEnv
    , functions : Ref (Map Name Name)  -- Names for TyCon related Eq functions
    }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="enableEqGeneration" kind="sem">

```mc
sem enableEqGeneration : MCoreLoader_Loader -> MCoreLoader_Loader
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem enableEqGeneration = | loader ->
    if hasHook (lam x. match x with EqHook _ then true else false) loader then loader else

    match includeFileExn "." "stdlib::seq.mc" loader with (seqEnv, loader) in
    match includeFileExn "." "stdlib::bool.mc" loader with (boolEnv, loader) in

    let baseEnv =
      { conFunctions = mapEmpty nameCmp
      , varFunctions = mapEmpty nameCmp
      , newFunctions = []
      , tcEnv = typcheckEnvEmpty
      , eqSeq = _getVarExn "eqSeq" seqEnv
      , eqBool = _getVarExn "eqBool" boolEnv
      } in

    let hook = EqHook
      { baseEnv = baseEnv
      , functions = ref (mapEmpty nameCmp)
      } in
    addHook loader hook
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eqFunctionsFor" kind="sem">

```mc
sem _eqFunctionsFor : [Ast_Type] -> MCoreLoader_Loader -> MCoreLoader_Hook -> Option (MCoreLoader_Loader, [Ast_Expr])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _eqFunctionsFor tys loader =
  | _ -> None ()
  | EqHook hook ->
    match mapAccumL getEqFunction {hook.baseEnv with conFunctions = deref hook.functions, tcEnv = _getTCEnv loader} tys
      with (env, printFs) in

    modref hook.functions env.conFunctions;
    let loader = if null env.newFunctions
      then loader
      else _addDeclExn loader (nureclets_ env.newFunctions) in
    Some (loader, printFs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqFunctionsFor" kind="sem">

```mc
sem eqFunctionsFor : [Ast_Type] -> MCoreLoader_Loader -> (MCoreLoader_Loader, [Ast_Expr])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqFunctionsFor tys = | loader ->
    withHookState (_eqFunctionsFor tys) loader
```
</ToggleWrapper>
</DocBlock>

