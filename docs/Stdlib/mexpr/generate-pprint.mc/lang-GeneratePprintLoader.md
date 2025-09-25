import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePprintLoader  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Hook" kind="syn">

```mc
syn Hook
```



<ToggleWrapper text="Code..">
```mc
syn Hook =
  | PprintHook
    { baseEnv : GPprintEnv
    , functions : Ref (Map Name Name)  -- Names for TyCon related pprint functions
    }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="enablePprintGeneration" kind="sem">

```mc
sem enablePprintGeneration : MCoreLoader_Loader -> MCoreLoader_Loader
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem enablePprintGeneration = | loader ->
    if hasHook (lam x. match x with PprintHook _ then true else false) loader then loader else

    match includeFileExn "." "stdlib::string.mc" loader with (stringEnv, loader) in
    match includeFileExn "." "stdlib::bool.mc" loader with (boolEnv, loader) in
    match includeFileExn "." "stdlib::char.mc" loader with (charEnv, loader) in

    let baseEnv =
      { conFunctions = mapEmpty nameCmp
      , varFunctions = mapEmpty nameCmp
      , newFunctions = []
      , tcEnv = typcheckEnvEmpty
      , int2string = _getVarExn "int2string" stringEnv
      , bool2string = _getVarExn "bool2string" boolEnv
      , seq2string = _getVarExn "seq2string" stringEnv
      , escapeString = _getVarExn "escapeString" stringEnv
      , escapeChar = _getVarExn "escapeChar" charEnv
      } in

    let hook = PprintHook
      { baseEnv = baseEnv
      , functions = ref (mapEmpty nameCmp)
      } in
    addHook loader hook
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_registerCustomPprintFunction" kind="sem">

```mc
sem _registerCustomPprintFunction : Name -> Ast_Expr -> MCoreLoader_Loader -> MCoreLoader_Hook -> Option (MCoreLoader_Loader, ())
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _registerCustomPprintFunction tyConName f loader =
  | _ -> None ()
  | PprintHook hook ->
    let pprintName = nameSym (concat "pprint" (nameGetStr tyConName)) in
    let loader = _addDeclExn loader (nulet_ pprintName f) in
    Some (loader, modref hook.functions (mapInsert tyConName pprintName (deref hook.functions)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="registerCustomPprintFunction" kind="sem">

```mc
sem registerCustomPprintFunction : Name -> Ast_Expr -> MCoreLoader_Loader -> MCoreLoader_Loader
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem registerCustomPprintFunction tyConName f = | loader ->
    (withHookState (_registerCustomPprintFunction tyConName f) loader).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_pprintFunctionsFor" kind="sem">

```mc
sem _pprintFunctionsFor : [Ast_Type] -> MCoreLoader_Loader -> MCoreLoader_Hook -> Option (MCoreLoader_Loader, [Ast_Expr])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _pprintFunctionsFor tys loader =
  | _ -> None ()
  | PprintHook hook ->
    match mapAccumL getPprintFunction {hook.baseEnv with conFunctions = deref hook.functions, tcEnv = _getTCEnv loader} tys
      with (env, printFs) in

    modref hook.functions env.conFunctions;
    let loader = if null env.newFunctions
      then loader
      else _addDeclExn loader (nureclets_ env.newFunctions) in
    Some (loader, printFs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintFunctionsFor" kind="sem">

```mc
sem pprintFunctionsFor : [Ast_Type] -> MCoreLoader_Loader -> (MCoreLoader_Loader, [Ast_Expr])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintFunctionsFor tys = | loader ->
    withHookState (_pprintFunctionsFor tys) loader
```
</ToggleWrapper>
</DocBlock>

