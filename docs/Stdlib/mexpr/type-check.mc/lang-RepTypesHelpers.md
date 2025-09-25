import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RepTypesHelpers  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyReprs" kind="sem">

```mc
sem unifyReprs : Int -> Ref [(ReprVar, ReprVar)] -> ReprVar -> ReprVar -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyReprs scope delayedReprUnifications a = | b ->
    let abot = botRepr a in
    let bbot = botRepr b in
    match (deref abot, deref bbot) with (UninitRepr _, _) | (_, UninitRepr _) then () else
    match (deref abot, deref bbot) with (BotRepr a, BotRepr b) in
    if eqsym a.sym b.sym then () else
    if lti (maxi a.scope b.scope) scope then
      modref delayedReprUnifications (snoc (deref delayedReprUnifications) (abot, bbot))
    else
      if leqi a.scope b.scope
      then modref bbot (LinkRepr abot)
      else modref abot (LinkRepr bbot)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="newRepr" kind="sem">

```mc
sem newRepr : TCEnv -> ReprVar
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem newRepr = | env ->
    ref (BotRepr {sym = gensym (), scope = env.reptypes.reprScope})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withNewReprScope" kind="sem">

```mc
sem withNewReprScope : all a. TCEnv -> (TCEnv -> a) -> (a, Int, [(ReprVar, ReprVar)])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem withNewReprScope env = | f ->
    let reprScope = deref env.reptypes.nextReprScope in
    let env =
      { env with reptypes =
        { env.reptypes with delayedReprUnifications = ref []
        , reprScope = reprScope
        }
      } in
    modref env.reptypes.nextReprScope (addi 1 reprScope);
    let res = f env in
    (res, reprScope, deref env.reptypes.delayedReprUnifications)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="captureDelayedReprUnifications" kind="sem">

```mc
sem captureDelayedReprUnifications : all a. TCEnv -> (() -> a) -> (a, [(ReprVar, ReprVar)])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem captureDelayedReprUnifications env = | f ->
    let prev = deref env.reptypes.delayedReprUnifications in
    modref env.reptypes.delayedReprUnifications [];
    let res = f () in
    let new = deref env.reptypes.delayedReprUnifications in
    modref env.reptypes.delayedReprUnifications prev;
    (res, new)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findReprs" kind="sem">

```mc
sem findReprs : [ReprVar] -> Ast_Type -> [ReprVar]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findReprs acc =
  | TyRepr x ->
    let acc = snoc acc x.repr in
    let acc = findReprs acc x.arg in
    acc
  | TyAlias x -> findReprs acc x.content
  | ty -> sfold_Type_Type findReprs acc ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="containsRepr" kind="sem">

```mc
sem containsRepr : Ast_Type -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem containsRepr =
  | TyRepr _ -> true
  | ty -> sfold_Type_Type (lam acc. lam ty. if acc then acc else containsRepr ty) false ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeReprSubsts" kind="sem">

```mc
sem removeReprSubsts : Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem removeReprSubsts =
  | TySubst x -> removeReprSubsts x.arg
  | ty -> smap_Type_Type removeReprSubsts ty
```
</ToggleWrapper>
</DocBlock>

