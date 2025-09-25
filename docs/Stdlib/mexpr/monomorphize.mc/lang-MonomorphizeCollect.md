import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MonomorphizeCollect  
  

  
  
  
## Semantics  
  

          <DocBlock title="collectInstantiations" kind="sem">

```mc
sem collectInstantiations : Ast_Expr -> Monomorphize_MonoEnv
```

<Description>{`Collects the monomorphic instantiations of polymorphic constructs of the  
provided AST. This is performed in two passes:  
  
1. Record the definitions of polymorphic constructs \(top\-down\)  
2. Collect monomorphic instantiations of the constructs \(bottom\-up\)  
  
The resulting environment defines how to monomorphize the provided AST.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectInstantiations =
  | ast ->
    let env = recordPolymorphicDefinitions (emptyMonoEnv ()) ast in
    let inst = setOfSeq cmpInstantiation [emptyInstantiation ()] in
    collectInstantiationsExpr inst env ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="recordPolymorphicDefinitions" kind="sem">

```mc
sem recordPolymorphicDefinitions : Monomorphize_MonoEnv -> Ast_Expr -> Monomorphize_MonoEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem recordPolymorphicDefinitions env =
  | TmDecl (x & {decl = DeclLet t}) ->
    let env =
      match t.tyBody with TyAll _ then
        {env with funEnv = mapInsert t.ident (defaultInstEntry t.tyBody) env.funEnv}
      else env
    in
    let env = recordPolymorphicDefinitions env t.body in
    recordPolymorphicDefinitions env x.inexpr
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let recordBind = lam env. lam bind.
      let env =
        match bind.tyBody with TyAll _ then
          {env with funEnv = mapInsert bind.ident (defaultInstEntry bind.tyBody) env.funEnv}
        else env
      in
      recordPolymorphicDefinitions env bind.body
    in
    let env = foldl recordBind env t.bindings in
    recordPolymorphicDefinitions env x.inexpr
  | TmDecl (x & {decl = DeclType t}) ->
    let env =
      if not (null t.params) then
        -- NOTE(larshum, 2023-08-03): We construct a polymorphic type
        -- representation of the type definition so that we can treat types in
        -- the same way as other constructs later.
        let polyType =
          foldr
            ntyall_
            (foldl
              (lam accTy. lam paramId. tyapp_ accTy (ntyvar_ paramId))
              (ntycon_ t.ident) t.params)
            t.params
        in
        {env with typeEnv = mapInsert t.ident (defaultInstEntry polyType) env.typeEnv}
      else env
    in
    recordPolymorphicDefinitions env x.inexpr
  | TmDecl (x & {decl = DeclConDef t}) ->
    let env =
      match t.tyIdent with TyAll _ then
        {env with conEnv = mapInsert t.ident (defaultInstEntry t.tyIdent) env.conEnv}
      else env
    in
    recordPolymorphicDefinitions env x.inexpr
  | ast -> sfold_Expr_Expr recordPolymorphicDefinitions env ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectInstantiationsExpr" kind="sem">

```mc
sem collectInstantiationsExpr : Set Monomorphize_Instantiation -> Monomorphize_MonoEnv -> Ast_Expr -> Monomorphize_MonoEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectInstantiationsExpr instantiations env =
  | TmVar t ->
    (if t.frozen then
      monoError [t.info] "Frozen types are not supported"
    else ());
    let env = collectInstantiationsType instantiations env t.ty in
    match mapLookup t.ident env.funEnv with Some instEntry then
      -- NOTE(larshum, 2023-08-03): For each possible type instantiation of
      -- this variable, we instantiate the type of the variable (it may be
      -- polymorphic), extract the type parameter instantiation this
      -- monomorphic type represents, and add this instantiation to the entry
      -- of the function.
      let updatedInstMap =
        setFold
          (lam instMap. lam inst.
            let monoType = instantiatePolymorphicType inst t.ty in
            let funTypeInst = findTypeInstantiation instEntry.polyType monoType in
            if mapMem funTypeInst instMap then instMap
            else mapInsert funTypeInst (nameSetNewSym t.ident) instMap)
          instEntry.map instantiations
      in
      let instEntry = {instEntry with map = updatedInstMap} in
      {env with funEnv = mapInsert t.ident instEntry env.funEnv}
    else
      env
  | TmDecl (x & {decl = DeclLet t}) ->
    let env = collectInstantiationsExpr instantiations env x.inexpr in
    let env = collectInstantiationsType instantiations env t.tyAnnot in
    let env = collectInstantiationsType instantiations env t.tyBody in
    let env = collectInstantiationsType instantiations env x.ty in
    let instantiations =
      match mapLookup t.ident env.funEnv with Some instEntry then
        -- NOTE(larshum, 2023-08-03): For the body of the let-expression, we
        -- combine all instantiations of the outer variables with the possible
        -- instantiations of the type variables bound in the current
        -- let-binding.
        let innerInst = mapKeys instEntry.map in
        if null innerInst then
          instantiations
        else
          setOfSeq
            cmpInstantiation
            (join
              (map
                (lam outerInst. map (mapUnion outerInst) innerInst)
                (setToSeq instantiations)))
      else
        instantiations
    in
    collectInstantiationsExpr instantiations env t.body
  | tm & TmDecl (x & {decl = DeclRecLets t}) ->
    let bindMap : Map Name DeclLetRecord =
      mapFromSeq nameCmp (map (lam bind. (bind.ident, bind)) t.bindings)
    in
    recursive let collectInstantiationsPerScc = lam inst. lam env. lam g. lam sccs.
      match sccs with [scc] ++ sccs then
        -- NOTE(larshum, 2023-08-07): Add the instantiations of all bindings of
        -- the strongly connected component to the sequence of instantiations.
        let sccInst =
          foldl
            (lam inst. lam id.
              match mapLookup id env.funEnv with Some instEntry then
                let innerInst = mapKeys instEntry.map in
                if null innerInst then
                  inst
                else
                  setOfSeq
                    cmpInstantiation
                    (join
                      (map
                        (lam outerInst. map (mapUnion outerInst) innerInst)
                        (setToSeq inst)))
              else
                inst)
            inst scc
        in
        -- NOTE(larshum, 2023-08-07): Collect instantiations for each binding
        -- in the strongly connected component.
        let env =
          foldl
            (lam env. lam bindId.
              match mapLookup bindId bindMap with Some bind then
                let env = collectInstantiationsType sccInst env bind.tyAnnot in
                let env = collectInstantiationsType sccInst env bind.tyBody in
                collectInstantiationsExpr sccInst env bind.body
              else
                env)
            env scc
        in
        collectInstantiationsPerScc sccInst env g sccs
      else
        env
    in
    let env = collectInstantiationsExpr instantiations env x.inexpr in
    let g = constructCallGraph tm in
    let sccs = digraphTarjan g in
    collectInstantiationsPerScc instantiations env g (reverse sccs)
  | TmDecl (x & {decl = DeclConDef t}) ->
    let env = collectInstantiationsExpr instantiations env x.inexpr in
    let env = collectInstantiationsType instantiations env x.ty in
    match mapLookup t.ident env.conEnv with Some conInstEntry then
      -- NOTE(larshum, 2023-08-03): We propagate the monomorphic instantiations
      -- of the constructor to its variant type.
      let variantId = findVariantName t.tyIdent in
      match mapLookup variantId env.typeEnv with Some varInstEntry then
        let updatedInstMap =
          mapFoldWithKey
            (lam instMap. lam inst. lam.
              let conMonoType = instantiatePolymorphicType inst t.tyIdent in
              let inst =
                match inspectType conMonoType with TyArrow {to = variantTy} then
                  findTypeInstantiation varInstEntry.polyType variantTy
                else
                  monoError [t.info] "Invalid constructor type"
              in
              if mapMem inst instMap then instMap
              else mapInsert inst (nameSetNewSym variantId) instMap)
            varInstEntry.map conInstEntry.map
        in
        let varInstEntry = {varInstEntry with map = updatedInstMap} in
        {env with typeEnv = mapInsert variantId varInstEntry env.typeEnv}
      else
        monoError [t.info] "Unknown variant type of constructor"
    else env
  | TmConApp t ->
    let env = collectInstantiationsType instantiations env t.ty in
    let env =
      match mapLookup t.ident env.conEnv with Some instEntry then
        let updatedInstMap =
          setFold
            (lam instMap. lam inst.
              let ty = tyarrow_ (tyTm t.body) t.ty in
              let monoType = instantiatePolymorphicType inst ty in
              let conTypeInst = findTypeInstantiation instEntry.polyType monoType in
              if mapMem conTypeInst instMap then instMap
              else mapInsert conTypeInst (nameSetNewSym t.ident) instMap)
            instEntry.map instantiations
        in
        let instEntry = {instEntry with map = updatedInstMap} in
        {env with conEnv = mapInsert t.ident instEntry env.conEnv}
      else env
    in
    collectInstantiationsExpr instantiations env t.body
  | ast ->
    let env = sfold_Expr_Expr (collectInstantiationsExpr instantiations) env ast in
    let env = sfold_Expr_Type (collectInstantiationsType instantiations) env ast in
    let env = sfold_Expr_TypeLabel (collectInstantiationsType instantiations) env ast in
    let env = sfold_Expr_Pat (collectInstantiationsPat instantiations) env ast in
    collectInstantiationsType instantiations env (tyTm ast)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectInstantiationsPat" kind="sem">

```mc
sem collectInstantiationsPat : Set Monomorphize_Instantiation -> Monomorphize_MonoEnv -> Ast_Pat -> Monomorphize_MonoEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectInstantiationsPat instantiations env =
  | PatCon t ->
    let env =
      match mapLookup t.ident env.conEnv with Some instEntry then
        let updatedInstMap =
          setFold
            (lam instMap. lam inst.
              let ty = tyarrow_ (tyPat t.subpat) t.ty in
              let monoType = instantiatePolymorphicType inst ty in
              let conTypeInst = findTypeInstantiation instEntry.polyType monoType in
              if mapMem conTypeInst instMap then instMap
              else mapInsert conTypeInst (nameSetNewSym t.ident) instMap)
            instEntry.map instantiations
        in
        let instEntry = {instEntry with map = updatedInstMap} in
        {env with conEnv = mapInsert t.ident instEntry env.conEnv}
      else env
    in
    let env = collectInstantiationsPat instantiations env t.subpat in
    collectInstantiationsType instantiations env t.ty
  | p ->
    let env = sfold_Pat_Pat (collectInstantiationsPat instantiations) env p in
    collectInstantiationsType instantiations env (tyPat p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectInstantiationsType" kind="sem">

```mc
sem collectInstantiationsType : Set Monomorphize_Instantiation -> Monomorphize_MonoEnv -> Ast_Type -> Monomorphize_MonoEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectInstantiationsType instantiations env =
  | TyAll (t & {ty = !TyAll _}) ->
    recursive let containsNestedTyAlls = lam acc. lam ty.
      match ty with TyAll _ then true
      else sfold_Type_Type containsNestedTyAlls acc ty
    in
    if containsNestedTyAlls false t.ty then
      monoError [t.info] "Nested polymorphism is not supported"
    else
      collectInstantiationsType instantiations env t.ty
  | TyAlias t ->
    -- NOTE(larshum, 2023-08-03): We collect instantiations of polymorphic
    -- aliases through occurrences of the type, as their use in expressions or
    -- patterns are implicit.
    match getTypeArgs t.display with (TyCon {ident = id}, ![]) then
      match mapLookup id env.typeEnv with Some instEntry then
        let updatedInstMap =
          setFold
            (lam instMap. lam inst.
              let ty = instantiatePolymorphicType inst t.display in
              if isMonomorphicTypeLabel true ty then
                let aliasTypeInst = findTypeInstantiation instEntry.polyType ty in
                if mapMem aliasTypeInst instMap then instMap
                else mapInsert aliasTypeInst (nameSetNewSym id) instMap
              else instMap)
            instEntry.map instantiations
        in
        let instEntry = {instEntry with map = updatedInstMap} in
        {env with typeEnv = mapInsert id instEntry env.conEnv}
      else
        -- NOTE(larshum, 2023-08-07): If the aliased type does not have an
        -- entry, that means it is monomorphic.
        env
    else
      env
  | ty -> sfold_Type_Type (collectInstantiationsType instantiations) env ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findVariantName" kind="sem">

```mc
sem findVariantName : Ast_Type -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findVariantName =
  | TyAll t -> findVariantName t.ty
  | TyApp t -> findVariantName t.lhs
  | TyArrow t -> findVariantName t.to
  | TyCon t -> t.ident
  | ty -> monoError [infoTy ty] "Constructor type does not refer to a known variant type"
```
</ToggleWrapper>
</DocBlock>

