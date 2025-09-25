import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SymGetters  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getVarExn" kind="sem">

```mc
sem _getVarExn : String -> {env: SymEnv, path: String} -> Name
```

<Description>{`Helpers for looking up names from known symbolization  
environmentsNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _getVarExn str = | {path = path, env = env} ->
    match mapLookup str env.currentEnv.varEnv
    with Some n then n
    else error (join
      [ "Compiler error: expected variable \"", str, "\" to be defined in\n"
      , path
      ])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getConExn" kind="sem">

```mc
sem _getConExn : String -> {env: SymEnv, path: String} -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _getConExn str = | {path = path, env = env} ->
    match mapLookup str env.currentEnv.conEnv
    with Some n then n
    else error (join
      [ "Compiler error: expected constructor \"", str, "\" to be defined in\n"
      , path
      ])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getTyConExn" kind="sem">

```mc
sem _getTyConExn : String -> {env: SymEnv, path: String} -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _getTyConExn str = | {path = path, env = env} ->
    match mapLookup str env.currentEnv.tyConEnv
    with Some n then n
    else error (join
      [ "Compiler error: expected type \"", str, "\" to be defined in\n"
      , path
      ])
```
</ToggleWrapper>
</DocBlock>

