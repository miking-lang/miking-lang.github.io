import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprIdentifierPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintVarName" kind="sem">

```mc
sem pprintVarName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintVarName (env: PprintEnv) =
  | name ->
    match pprintEnvGetStr env name with (env,str) in
    let s = pprintVarString str in
    (env, s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintFrozenName" kind="sem">

```mc
sem pprintFrozenName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintFrozenName (env: PprintEnv) =
  | name ->
    match pprintEnvGetStr env name with (env,str) in
    let s = pprintFrozenString str in
    (env, s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintConName" kind="sem">

```mc
sem pprintConName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintConName (env: PprintEnv) =
  | name ->
    match pprintEnvGetStr env name with (env,str) in
    let s = pprintConString str in
    (env, s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintTypeName" kind="sem">

```mc
sem pprintTypeName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintTypeName (env: PprintEnv) =
  | name ->
    match pprintEnvGetStr env name with (env,str) in
    let s = pprintTypeString str in
    (env, s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintLabelString" kind="sem">

```mc
sem pprintLabelString : SID -> String
```



<ToggleWrapper text="Code..">
```mc
sem pprintLabelString =
  | sid ->
    _parserStr (sidToString sid) "#label" _isValidLowerIdent
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintProjString" kind="sem">

```mc
sem pprintProjString : SID -> String
```



<ToggleWrapper text="Code..">
```mc
sem pprintProjString =
  | sid ->
    _parserStr (sidToString sid) "#label"
    (lam str. if forAll isDigit str then true else _isValidLowerIdent str)
```
</ToggleWrapper>
</DocBlock>

