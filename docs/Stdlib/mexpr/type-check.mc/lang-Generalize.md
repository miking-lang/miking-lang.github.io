import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Generalize  
  

  
  
  
## Semantics  
  

          <DocBlock title="inst" kind="sem">

```mc
sem inst : Info -> Level -> Ast_Type -> Ast_Type
```

<Description>{`Instantiate the top\-level type variables of \`ty' with fresh unification variables.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inst (info : Info) (lvl : Level) = | ty ->
    (instAndSubst info lvl ty).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instAndSubst" kind="sem">

```mc
sem instAndSubst : Info -> Level -> Ast_Type -> (Ast_Type, Map Name Ast_Type)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem instAndSubst info lvl = | ty ->
    switch stripTyAll ty
    case ([], _) then (tyWithInfo info ty, mapEmpty nameCmp)
    case (vars, stripped) then
      let inserter = lam subst. lam v : (Name, Kind).
        let kind = smap_Kind_Type (substituteVars info subst) v.1 in
        mapInsert v.0 (newnmetavar (nameGetStr v.0) kind lvl info) subst
      in
      let subst = foldl inserter (mapEmpty nameCmp) vars in
      (tyWithInfo info (substituteVars info subst stripped), subst)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gen" kind="sem">

```mc
sem gen : Level -> Map Name Ast_Kind -> Ast_Type -> (Ast_Type, [_a])
```

<Description>{`Generalize the unification variables in \`ty' introduced at least at level \`lvl\`.  
Return the generalized type and the sequence of variables quantified.  
Any rigid variable in the map \`vs' encountered will also be quantified over.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem gen (lvl : Level) (vs : Map Name Kind) =
  | ty ->
    let vars = distinct (lam x. lam y. nameEq x.0 y.0)
                        (genBase lvl vs (setEmpty nameCmp) ty) in
    let iteratee = lam v. lam ty1.
      let kind = match v.1 with Mono _ then Poly () else v.1 in
      TyAll {info = infoTy ty, ident = v.0, ty = ty1, kind = kind}
    in
    (foldr iteratee ty vars, vars)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="genBase" kind="sem">

```mc
sem genBase : Level -> Map Name Ast_Kind -> Set Name -> Ast_Type -> [_a]
```



<ToggleWrapper text="Code..">
```mc
sem genBase (lvl : Level) (vs : Map Name Kind) (bound : Set Name) =
  | ty ->
    sfold_Type_Type (lam vars. lam ty.
      concat vars (genBase lvl vs bound ty)) [] ty
```
</ToggleWrapper>
</DocBlock>

