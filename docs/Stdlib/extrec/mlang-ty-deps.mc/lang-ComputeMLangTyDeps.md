import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ComputeMLangTyDeps  
  

  
  
  
## Semantics  
  

          <DocBlock title="_collectNames" kind="sem">

```mc
sem _collectNames : MLangTyDepsEnv -> Ast_Decl -> MLangTyDepsEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _collectNames env =
  | _ -> env
  | DeclLang d ->
    foldl _collectNames env d.decls
  | DeclSyn d ->
    let env = if null d.includes
              then {env with extensibleTypes = setInsert d.ident env.extensibleTypes}
              else env in

    let typeIdents = map (lam def. def.tyName) d.defs in

    {env with extensibleTypes = foldr setInsert env.extensibleTypes typeIdents}
  | DeclCosyn d ->
    if d.isBase then
      {env with extensibleTypes = setInsert d.ident env.extensibleTypes}
    else
      env
  | SynDeclProdExt d ->
    match d.globalExt with Some globalExt then
      match mapLookup d.ident env.baseMap with Some baseIdent in

      let excludedCons = setOfSeq nameCmp (map (lam e. e.ident) d.individualExts) in

      let oldList = mapLookupOr [] baseIdent env.globalExtMap in
      let newList = cons {ty = globalExt, excludedCons = excludedCons} oldList in

      {env with globalExtMap = mapInsert baseIdent newList env.globalExtMap}
    else
      env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_gatherDeps" kind="sem">

```mc
sem _gatherDeps : MLangTyDepsEnv -> Set Name -> Ast_Type -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _gatherDeps env acc =
  | TyCon t ->
    if setMem t.ident env.extensibleTypes then
      setInsert t.ident acc
    else
      acc
  | ty ->
    sfold_Type_Type (_gatherDeps env) acc ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_handleDef" kind="sem">

```mc
sem _handleDef : MLangTyDepsEnv -> [Ast_Type] -> {ident: Name, tyName: Name, tyIdent: Ast_Type} -> MLangTyDepsEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _handleDef env exts =
  | {ident = ident, tyIdent = tyIdent, tyName = tyName} ->
    let mergeTy = lam l. lam r.
      match l with TyRecord leftRec in
      match r with TyRecord rightRec in
      TyRecord {leftRec with fields = mapUnion leftRec.fields rightRec.fields}
    in
    let ty = foldl mergeTy tyIdent exts in

    let deps = _gatherDeps env (setEmpty nameCmp) ty in

    {env with depGraph = setFold (lam g. lam dep. digraphMaybeAddEdge tyName dep () g) env.depGraph deps}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_establishDepGraph" kind="sem">

```mc
sem _establishDepGraph : MLangTyDepsEnv -> Ast_Decl -> MLangTyDepsEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _establishDepGraph env =
  | DeclLang d ->
    foldl _establishDepGraph env d.decls
  | DeclCosyn d ->
    let ident = d.ident in
    let deps = _gatherDeps env (setEmpty nameCmp) d.ty in
    {env with depGraph = setFold (lam g. lam dep. digraphMaybeAddEdge ident dep () g) env.depGraph deps}
  | DeclSyn d ->
    match mapLookup d.ident env.baseMap with Some baseIdent in

    let typeIdents = map (lam def. def.tyName) d.defs in

    let work = lam g. lam tyIdent. digraphMaybeAddEdge baseIdent tyIdent () g in
    let env = {env with depGraph = foldl work env.depGraph typeIdents} in

    let exts = match mapLookup baseIdent env.globalExtMap with Some extensions
      then extensions
      else []
    in

    let def2ext = lam d.
      mapOption (lam ext. if not (setMem d.ident ext.excludedCons) then Some (d.tyIdent) else None ()) exts
    in

    foldl (lam env. lam d. _handleDef env (def2ext d) d) env d.defs
  | SynDeclProdExt d ->
    foldl (lam env. lam d. _handleDef env [] d) env d.individualExts
  | _ -> env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_updateTyDeps" kind="sem">

```mc
sem _updateTyDeps : DependencyGraph -> TyDeps -> Name -> TyDeps
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _updateTyDeps graph acc =
  | name ->
    let deps = setOfKeys (digraphBFS name graph) in
    mapInsert name deps acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_computeTyDeps" kind="sem">

```mc
sem _computeTyDeps : DependencyGraph -> TyDeps
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _computeTyDeps =
  | graph ->
    let vertices = digraphVertices graph in
    foldl (_updateTyDeps graph) (mapEmpty nameCmp) vertices
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getProgTyDeps" kind="sem">

```mc
sem getProgTyDeps : Map Name Name -> MLangTopLevel_MLangProgram -> TyDeps
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getProgTyDeps baseMap =
  | {decls = decls} ->
    let env = {baseMap = baseMap,
               extensibleTypes = setEmpty nameCmp,
               globalExtMap = mapEmpty nameCmp,
               depGraph = digraphEmpty nameCmp (lam. lam. true)} in

    let env = foldl _collectNames env decls in

    let env = {env with depGraph = digraphAddVertices (setToSeq env.extensibleTypes) env.depGraph} in

    let env = foldl _establishDepGraph env decls in

    _computeTyDeps env.depGraph
```
</ToggleWrapper>
</DocBlock>

