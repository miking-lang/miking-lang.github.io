import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Unify  
  

  
  
  
## Types  
  

          <DocBlock title="UnifyEnv" kind="type">

```mc
type UnifyEnv : { wrappedLhs: Type, wrappedRhs: Type, boundNames: BiNameMap }
```



<ToggleWrapper text="Code..">
```mc
type UnifyEnv = {
    wrappedLhs: Type,  -- The currently examined left-hand subtype, before resolving aliases
    wrappedRhs: Type,  -- The currently examined right-hand subtype, before resolving aliases
    boundNames: BiNameMap  -- The bijective correspondence between bound variables in scope
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Unifier" kind="type">

```mc
type Unifier
```



<ToggleWrapper text="Code..">
```mc
type Unifier u = {
    empty : u,
    combine : u -> u -> u,
    unify : UnifyEnv -> Type -> Type -> u,
    unifyRepr : UnifyEnv -> ReprVar -> ReprVar -> u,
    err : UnifyError -> u
  }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="UnifyError" kind="syn">

```mc
syn UnifyError
```



<ToggleWrapper text="Code..">
```mc
syn UnifyError =
  | Types (Type, Type)
  | Records (Map SID Type, Map SID Type)
  | Kinds (Kind, Kind)
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="unifyTypes" kind="sem">

```mc
sem unifyTypes : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> u
```

<Description>{`Unify the types \`ty1\` and \`ty2\` under the assumptions of \`env\`.  
Takes an abstract type \`u\` satisfying the interface \`Unifier\` to  
perform the actual variable unifications.  
For an example usage, see \`unifyPure\` below.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyTypes u env =
  | (ty1, ty2) ->
    unifyBase u
      {env with wrappedLhs = ty1, wrappedRhs = ty2}
      (unwrapType ty1, unwrapType ty2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyBase" kind="sem">

```mc
sem unifyBase : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> u
```

<Description>{`unifyBase env \(ty1, ty2\) unifies ty1 and ty2 under the  
assumptions of env.  
IMPORTANT: Assumes that ty1 = unwrapType env.wrappedLhs and  
ty2 = unwrapType env.wrappedRhs.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyBase u env =
  | (ty1, ty2) ->
    u.err (Types (ty1, ty2))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyKinds" kind="sem">

```mc
sem unifyKinds : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Kind, Ast_Kind) -> u
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyKinds u env =
  | (k1, k2) -> u.err (Kinds (k1, k2))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addKinds" kind="sem">

```mc
sem addKinds : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Kind, Ast_Kind) -> (u, Ast_Kind)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addKinds u env =
  | (k1, k2) -> (u.err (Kinds (k1, k2)), k1)
```
</ToggleWrapper>
</DocBlock>

