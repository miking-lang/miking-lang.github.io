import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IdentifierPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintVarName" kind="sem">

```mc
sem pprintVarName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintVarName : PprintEnv -> Name -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintConName" kind="sem">

```mc
sem pprintConName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintConName : PprintEnv -> Name -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintTypeName" kind="sem">

```mc
sem pprintTypeName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintTypeName : PprintEnv -> Name -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintLabelString" kind="sem">

```mc
sem pprintLabelString : SID -> String
```



<ToggleWrapper text="Code..">
```mc
sem pprintLabelString : SID -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintEnvGetStr" kind="sem">

```mc
sem pprintEnvGetStr : PprintEnv -> Name -> (PprintEnv, String)
```

<Description>{`Get a string for the given name. Returns both the string and a new  
environment.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintEnvGetStr (env : PprintEnv) =
  | name ->
    match pprintEnvLookup name env with Some str then (env,str)
    else
      let baseStr = nameGetStr name in
      if pprintEnvFree baseStr env then (pprintEnvAdd name baseStr 1 env, baseStr)
      else
        match env with {count = count} in
        let start =
          match mapLookup baseStr count
          with Some i then i else 1 in
        recursive let findFree : String -> Int -> (String, Int) =
          lam baseStr. lam i.
            let proposal = concat baseStr (int2string i) in
            if pprintEnvFree proposal env then (proposal, i)
            else findFree baseStr (addi i 1)
        in
        match findFree baseStr start with (str, i) in
        (pprintEnvAdd name str (addi i 1) env, str)
```
</ToggleWrapper>
</DocBlock>

