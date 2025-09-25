import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SideEffect  
  

  
  
  
## Semantics  
  

          <DocBlock title="sideEffectEnvEmpty" kind="sem">

```mc
sem sideEffectEnvEmpty : () -> SideEffectEnv
```



<ToggleWrapper text="Code..">
```mc
sem sideEffectEnvEmpty =
  | () -> {sideEffectId = setEmpty nameCmp, arityId = mapEmpty nameCmp}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateSideEffectEnv" kind="sem">

```mc
sem updateSideEffectEnv : SideEffectEnv -> Name -> Int -> Bool -> SideEffectEnv
```



<ToggleWrapper text="Code..">
```mc
sem updateSideEffectEnv (env : SideEffectEnv) (id : Name) (arity : Int) =
  | se ->
    let env =
      if neqi arity 0 then {env with arityId = mapInsert id arity env.arityId}
      else env in
    if se then {env with sideEffectId = setInsert id env.sideEffectId} else env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="identHasSideEffects" kind="sem">

```mc
sem identHasSideEffects : SideEffectEnv -> Name -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem identHasSideEffects (env : SideEffectEnv) =
  | id -> setMem id env.sideEffectId
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="identArity" kind="sem">

```mc
sem identArity : SideEffectEnv -> Name -> Int
```



<ToggleWrapper text="Code..">
```mc
sem identArity (env : SideEffectEnv) =
  | id ->
    optionGetOrElse
      (lam. 0)
      (mapLookup id env.arityId)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprHasSideEffectH" kind="sem">

```mc
sem exprHasSideEffectH : SideEffectEnv -> Bool -> Bool -> Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem exprHasSideEffectH : SideEffectEnv -> Bool -> Bool -> Expr -> Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprHasSideEffect" kind="sem">

```mc
sem exprHasSideEffect : SideEffectEnv -> Ast_Expr -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem exprHasSideEffect env =
  | t -> exprHasSideEffectH env true false t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hasSideEffect" kind="sem">

```mc
sem hasSideEffect : Ast_Expr -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem hasSideEffect =
  | t -> exprHasSideEffect (sideEffectEnvEmpty ()) t
```
</ToggleWrapper>
</DocBlock>

