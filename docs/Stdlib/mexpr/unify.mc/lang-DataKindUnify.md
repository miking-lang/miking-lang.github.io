import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataKindUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="hasNoBounds" kind="sem">

```mc
sem hasNoBounds : {lower: Set Name, upper: Option (Set Name)} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem hasNoBounds =
  | ks -> if setIsEmpty ks.lower then optionIsNone ks.upper else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyKinds" kind="sem">

```mc
sem unifyKinds : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Kind, Ast_Kind) -> u
```



<ToggleWrapper text="Code..">
```mc
sem unifyKinds u env =
  | ((Mono _ | Poly _) & k, Data r) ->
    if mapAll hasNoBounds r.types then u.empty
    else u.err (Kinds (k, Data r))
  | (Data r1, Data r2) ->
    if mapAllWithKey
         (lam t. lam ks2.
           optionMapOrElse
             (lam. hasNoBounds ks2)
             (lam ks1.
               if setSubset ks2.lower ks1.lower then
                 match ks2.upper with Some m2 then
                   match ks1.upper with Some m1 then
                     setSubset (setUnion ks1.lower m1) (setUnion ks2.lower m2)
                   else false
                 else true
               else false)
             (mapLookup t r1.types))
         r2.types
    then u.empty
    else u.err (Kinds (Data r1, Data r2))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addKinds" kind="sem">

```mc
sem addKinds : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Kind, Ast_Kind) -> (u, Ast_Kind)
```



<ToggleWrapper text="Code..">
```mc
sem addKinds u env =
  | (Data r1, Data r2) ->
    let checkSubset = lam lower1. lam lower2. lam upper.
      optionMapOr true
        (lam m. setSubset (setSubtract lower1 lower2) m) upper
    in
    match
      mapFoldlOption
        (lam acc. lam t. lam ks1.
          match mapLookup t acc with Some ks2 then
            if checkSubset ks1.lower ks2.lower ks2.upper then
              if checkSubset ks2.lower ks1.lower ks1.upper then
                let upper =
                  switch (ks1.upper, ks2.upper)
                  case (Some u1, Some u2) then Some (setIntersect u1 u2)
                  case (Some u, None _) then Some (setSubtract u ks2.lower)
                  case (None _, Some u) then Some (setSubtract u ks1.lower)
                  case _ then None ()
                  end
                in
                Some
                  (mapInsert t {lower = setUnion ks1.lower ks2.lower,
                                upper = upper} acc)
              else None ()
            else None ()
          else Some (mapInsert t ks1 acc))
        r2.types r1.types
    with Some types then
      (u.empty, Data {r1 with types = types})
    else
      (u.err (Kinds (Data r1, Data r2)), Data r1)
```
</ToggleWrapper>
</DocBlock>

