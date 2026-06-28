import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtRecCollectEnv  
  

  
  
  
## Semantics  
  

          <DocBlock title="collectEnv" kind="sem">

```mc
sem collectEnv : AccEnv -> Ast_Expr -> AccEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectEnv env =
  | TmDecl (x & {decl = DeclRecType t}) ->
    match mapLookup t.ident env.defs with Some _ then
      errorMulti
        [(t.info, nameGetStr t.ident)]
        "An extensible record type with this Name already exists!"
    else
      let defs = mapInsert t.ident (mapEmpty cmpString) env.defs in
      collectEnv {env with defs = defs} x.inexpr
  | TmDecl (x & {decl = DeclRecField t}) ->
    match t.tyIdent with TyAll tyAll then

      -- Collect other parameters to re-insert later.
      recursive let work = lam acc. lam ty.
        match ty with TyAll tyAll then
          let acc = cons (tyAll.info, tyAll.ident, tyAll.kind) acc in
          work acc tyAll.ty
        else
          (acc, ty)
      in
      match work [] tyAll.ty with (params, ty) in

      recursive let work2 = lam ty.
        match ty with TyApp {lhs = lhs} then
          work2 lhs
        else
          ty
      in

      match ty with TyArrow {from = lhs, to = rhs} then
        let lhs = work2 lhs in

        match lhs with TyCon {ident = ident} then
          match mapLookup ident env.defs with Some labelTypeMap then
            let work = lam ty. lam triple.
              TyAbs {ident = triple.1,
                     kind  = triple.2,
                     body  = ty} in

            let params = cons (NoInfo(), tyAll.ident, Mono()) params in

            let ty = foldl work rhs (reverse params) in

            -- let ty = TyAbs {ident = tyAll.ident,
            --                 kind = Mono (),
            --                 body = rhs} in
            let labelTypeMap = mapInsert t.label (nameNoSym "", ty) labelTypeMap in

            let env = {env with defs = mapInsert ident labelTypeMap env.defs} in
            collectEnv env x.inexpr
          else
            errorMulti
              [(t.info, "")]
              "The tyCon on lhs must be an extensible record type!"
        else
          errorMulti
            [(t.info, "")]
            "The type of a record field must have TyCon on lhs!"
      else
        errorMulti
          [(t.info, "")]
          (concat
            "Expected an arrow arrow type! But found: "
            (type2str t.tyIdent))
    else
      errorSingle [t.info] "The type of a record field must be quantified over a mapping!"
  | expr ->
    sfold_Expr_Expr collectEnv env expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="includedRowTypes" kind="sem">

```mc
sem includedRowTypes : Set Name -> Ast_Type -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem includedRowTypes acc =
  | TyCon {ident = ident} -> setInsert ident acc
  | ty -> sfold_Type_Type includedRowTypes acc ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateDependencyGraph" kind="sem">

```mc
sem updateDependencyGraph : DependencyGraph -> Name -> [Ast_Type] -> DependencyGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem updateDependencyGraph graph name =| types ->
    let includedTypes = foldl includedRowTypes (setEmpty nameCmp) types in
    let graph = digraphMaybeAddVertex name graph in
    let addEdge = lam g. lam n.
      let g = digraphMaybeAddVertex n g in
      digraphMaybeAddEdge name n () g
    in
    setFold addEdge graph includedTypes
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createDependencyGraph" kind="sem">

```mc
sem createDependencyGraph : ExtRecDefs -> DependencyGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createDependencyGraph =
  | env ->
    let graph = digraphEmpty nameCmp (lam. lam. true) in

    let work = lam graph. lam name. lam labelTyMap.
      updateDependencyGraph graph name (map snd (mapValues labelTyMap)) in

    mapFoldWithKey work graph env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateTyDeps" kind="sem">

```mc
sem updateTyDeps : DependencyGraph -> TyDeps -> Name -> TyDeps
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem updateTyDeps graph acc =
  | name ->
    let deps = setOfKeys (digraphBFS name graph) in
    mapInsert name deps acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="computeTyDeps" kind="sem">

```mc
sem computeTyDeps : DependencyGraph -> TyDeps
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem computeTyDeps =
  | graph ->
    let vertices = digraphVertices graph in
    foldl (updateTyDeps graph) (mapEmpty nameCmp) vertices
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="computeLabelTyDeps" kind="sem">

```mc
sem computeLabelTyDeps : TyDeps -> ExtRecDefs -> LabelTyDeps
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem computeLabelTyDeps tydeps =
  | defs ->
    let work = lam n. lam innerMap. mapMapWithKey (lam label. lam pair.
      match pair with (ext, ty) in
      let includedNames = includedRowTypes (setEmpty nameCmp) ty in
      setFold (lam acc. lam n. setUnion acc (match mapLookup n tydeps with Some s in s)) (setEmpty nameCmp) includedNames
    ) innerMap in
    mapMapWithKey work defs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dumpTyDeps" kind="sem">

```mc
sem dumpTyDeps : TyDeps -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem dumpTyDeps =
  | tyDeps ->
    let pairs = mapToSeq tyDeps in
    let pprintPair = lam pair.
      match pair with (name, nameSet) in
      let nameSetStr = strJoin ", " (map nameGetStr (setToSeq nameSet)) in
      join ["tydeps(", nameGetStr name, ") = ", nameSetStr]
    in
    strJoin "\n" ["=== TyDeps ===", strJoin "\n" (map pprintPair pairs), "=== END TyDeps ==="]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dumpDependencyGraph" kind="sem">

```mc
sem dumpDependencyGraph : DependencyGraph -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem dumpDependencyGraph =
  | graph ->
    let edges = digraphEdges graph in
    let edgesStr = map (lam e. join [nameGetStr e.0, " -> ", nameGetStr e.1]) edges in
    strJoin "\n" (snoc (cons "=== DEPENDECY GRAPH ===" edgesStr) "=== END GRAPH ===")
```
</ToggleWrapper>
</DocBlock>

