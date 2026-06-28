import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Monomorphize  
  

  
  
  
## Types  
  

          <DocBlock title="Instantiation" kind="type">

```mc
type Instantiation : Map Name Type
```

<Description>{`An instantiation maps type variable identifiers to concrete types. It  
represents a monomorphic use of a polymorphic construct.`}</Description>


<ToggleWrapper text="Code..">
```mc
type Instantiation = Map Name Type
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="InstEntry" kind="type">

```mc
type InstEntry : { map: Map Instantiation Name, polyType: Type }
```



<ToggleWrapper text="Code..">
```mc
type InstEntry = {
    map : Map Instantiation Name,
    polyType : Type
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MonoEnv" kind="type">

```mc
type MonoEnv : { funEnv: Map Name InstEntry, conEnv: Map Name InstEntry, typeEnv: Map Name InstEntry }
```

<Description>{`The monomorphization environment used to keep track of which monomorphic  
versions a polymorphic construct should be instantiated as.`}</Description>


<ToggleWrapper text="Code..">
```mc
type MonoEnv = {
    -- Environment for functions bound in let- and recursive let-expressions
    funEnv : Map Name InstEntry,

    -- Environment for polymorphic type constructors
    conEnv : Map Name InstEntry,

    -- Environment for polymorphic type variants and type aliases
    typeEnv : Map Name InstEntry
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="emptyInstantiation" kind="sem">

```mc
sem emptyInstantiation : () -> Monomorphize_Instantiation
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem emptyInstantiation =
  | _ -> mapEmpty nameCmp
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpInstantiation" kind="sem">

```mc
sem cmpInstantiation : Monomorphize_Instantiation -> Monomorphize_Instantiation -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpInstantiation lhs =
  | rhs -> mapCmp cmpType lhs rhs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultInstEntry" kind="sem">

```mc
sem defaultInstEntry : Ast_Type -> Monomorphize_InstEntry
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem defaultInstEntry =
  | ty -> {map = mapEmpty cmpInstantiation, polyType = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="emptyMonoEnv" kind="sem">

```mc
sem emptyMonoEnv : () -> Monomorphize_MonoEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem emptyMonoEnv =
  | _ ->
    { funEnv = mapEmpty nameCmp, conEnv = mapEmpty nameCmp
    , typeEnv = mapEmpty nameCmp }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="monoError" kind="sem">

```mc
sem monoError : all a. [Info] -> String -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem monoError infos =
  | msg ->
    errorSingle infos (concat "Monomorphization error: " msg)
```
</ToggleWrapper>
</DocBlock>

