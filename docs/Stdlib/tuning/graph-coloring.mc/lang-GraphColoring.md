import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GraphColoring  
  

  
  
  
## Semantics  
  

          <DocBlock title="colorCallGraph" kind="sem">

```mc
sem colorCallGraph : [NameInfo] -> Ast_Expr -> (CallCtxEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem colorCallGraph (publicFns : [NameInfo]) =
  | t ->
    let pub2priv =
      _nameMapInit (map (lam t : NameInfo. t.0) publicFns)
        identity _privFunFromName
    in
    let tm = _replacePublic pub2priv t in

    -- Compute the call graph
    let g = toCallGraph tm in

    -- Prune the call graph
    let eqPaths : [EqPaths] =
      _eqPaths g publicFns callGraphTop [] tm
    in
    let eqPathsAssoc =
      map (lam e: EqPaths.
        (e.id, e.eqPaths)) eqPaths
    in
    let eqPathsMap : Map NameInfo [Path] = mapFromSeq nameInfoCmp eqPathsAssoc in
    let keepEdges : [Edge] =
      foldl (lam acc. lam path : (NameInfo, [[(NameInfo,NameInfo,NameInfo)]]).
               concat acc (foldl concat [] path.1))
        [] eqPathsAssoc
    in

    -- Keep edges that are part of context strings
    let edgeCmp = lam e1 : DigraphEdge NameInfo NameInfo. lam e2 : DigraphEdge NameInfo NameInfo.
      nameInfoCmp e1.2 e2.2
    in
    let keepEdges = setToSeq (setOfSeq edgeCmp keepEdges) in

    let pruned = foldl (lam acc. lam e : DigraphEdge NameInfo NameInfo.
      match e with (from, to, lbl) then
        digraphAddEdge from to lbl
          (digraphMaybeAddVertex from (digraphMaybeAddVertex to acc))
      else never)
      (digraphEmpty nameInfoCmp nameInfoEq)
      keepEdges in

    -- Initialize environment
    let env = callCtxInit publicFns pruned tm in

    -- Declare the incoming variables
    let incVars = callCtxDeclareIncomingVars _incUndef env in
    let tm = bindall_ incVars tm in

    -- Transform program to maintain the call history when needed
    match _maintainCallCtx eqPathsMap callGraphTop env tm with (env, prog) in
    (env, prog)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_maintainCallCtx" kind="sem">

```mc
sem _maintainCallCtx : Map NameInfo [Path] -> (Name, Info) -> CallCtxEnv -> Ast_Expr -> (CallCtxEnv, Ast_Expr)
```

<Description>{`Main function for graph coloring. Maintains call context history by  
updating incoming variables before function calls.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _maintainCallCtx (eqPaths : Map NameInfo [Path]) (cur : NameInfo) (env : CallCtxEnv) =
  -- Application: caller updates incoming variable of callee
  | TmDecl (x & {decl = DeclLet ({ body = TmApp a } & t)}) ->
    match
      match _maintainCallCtx eqPaths cur env x.inexpr with (env, inexpr) in
      match _maintainCallCtx eqPaths cur env t.body with (env, body) in
      ( env,
        TmDecl { x with decl = DeclLet {t with body = body}
               , inexpr = inexpr})
    with (env, le) in
    let env : CallCtxEnv = env in
    -- Track call only if edge is part of the call graph
    match env with { callGraph = callGraph } in
    match callCtxFunLookup cur.0 env with Some _ then
      match _appGetCallee (TmApp a) with Some callee then
        match callCtxFunLookup (nameInfoGetName callee) env
        with Some iv then
          if digraphIsSuccessor callee cur callGraph then
            -- Set the incoming var of callee to current node
            let count = callCtxLbl2Count t.ident env in
            let update = callCtxModifyIncomingVar iv count env in
            (env, bind_ (nulet_ (nameSym "") update) le)
          else (env, le) -- edge not part of call graph
        else (env, le) -- callee not part of call graph
      else (env, le) -- not an application with TmVar
    else (env, le) -- caller not part of call graph

  | TmDecl (x & {decl = DeclLet ({ body = TmHole { depth = depth }, ident = ident} & t)}) ->
    let paths = mapFindExn (ident, t.info) eqPaths in
    let env = callCtxAddHole t.body (ident, t.info) paths cur env in
    match _maintainCallCtx eqPaths cur env x.inexpr with (env, inexpr) in
    (env, TmDecl {x with inexpr = inexpr})

  -- Function definitions: possibly update cur inside body of function
  | TmDecl (x & {decl = DeclLet ({ body = TmLam lm } & t)}) ->
    let curBody = (t.ident, t.info) in
    match _maintainCallCtx eqPaths curBody env t.body with (env, body) in
    match _maintainCallCtx eqPaths cur env x.inexpr with (env, inexpr) in
    ( env,
      TmDecl { x with decl = DeclLet {t with body = body}
             , inexpr = inexpr})

  | TmDecl (x & {decl = DeclRecLets ({ bindings = bindings } & t), inexpr = inexpr}) ->
    match
      mapAccumL (lam env : CallCtxEnv. lam bind : DeclLetRecord.
        let curBody =
          match bind with { body = TmLam lm } then (bind.ident, bind.info)
          else cur
        in
        match _maintainCallCtx eqPaths curBody env bind.body
        with (env, body) in (env, { bind with body = body })
      ) env bindings
    with (env, newBinds) in
    match _maintainCallCtx eqPaths cur env inexpr with (env, inexpr) in
    ( env,
      TmDecl { x with decl = DeclRecLets {t with bindings = newBinds}
             , inexpr = inexpr})
  | tm ->
    smapAccumL_Expr_Expr (_maintainCallCtx eqPaths cur) env tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_replacePublic" kind="sem">

```mc
sem _replacePublic : Map Name Name -> Ast_Expr -> Ast_Expr
```

<Description>{`Move the contents of each public function to a hidden private function, and  
forward the call to the public functions to their private equivalent.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _replacePublic (pub2priv : Map Name Name) =
  -- Function call: forward call for public function
  | TmDecl (x & {decl = DeclLet ({ body = TmApp a } & t)}) ->
    match _appGetCallee (TmApp a) with Some callee then
      match callee with (callee, _) then
        match mapLookup callee pub2priv
        with Some local then
          TmDecl { x with decl = DeclLet {t with body = _appSetCallee (TmApp a) local}
                 , inexpr = _replacePublic pub2priv x.inexpr}
        else TmDecl {x with inexpr = _replacePublic pub2priv x.inexpr}
      else never
    else TmDecl {x with inexpr = _replacePublic pub2priv x.inexpr}

  -- Function definition: create private equivalent of public functions
  | TmDecl (x & {decl = DeclLet ({ body = TmLam lm } & t)}) & tm ->
    match mapLookup t.ident pub2priv
    with Some local then
      match _forwardCall local (_replacePublic pub2priv) {ident = t.ident, body = t.body}
      with (priv, pub) then
        let pubAndRest =
          TmDecl { x with decl = DeclLet {t with ident = pub.ident, body = pub.body}
                 , inexpr = _replacePublic pub2priv x.inexpr}
        in TmDecl { x with decl = DeclLet {t with ident = priv.ident, body = priv.body}
                  , inexpr = pubAndRest}
      else never
    else TmDecl { x with decl = DeclLet {t with body = _replacePublic pub2priv t.body}
                , inexpr = _replacePublic pub2priv x.inexpr}

  | TmDecl (x & {decl = DeclRecLets ({ bindings = bindings } & t), inexpr = inexpr}) ->
    let newBinds = foldl
      (lam acc : [DeclLetRecord]. lam bind : DeclLetRecord.
        match bind with { body = TmLam lm } then
          match mapLookup bind.ident pub2priv
          with Some local then
            match _forwardCall local (_replacePublic pub2priv) {ident = bind.ident, body = bind.body}
            with (privBind, pubBind) then
              concat [{{bind with ident = privBind.ident}
                             with body = privBind.body},
                      {{bind with ident = pubBind.ident}
                             with body = pubBind.body}] acc
            else never
          else cons bind acc
        else cons bind acc)
      [] bindings
    in TmDecl { x with decl = DeclRecLets {t with bindings = newBinds}
              , inexpr = _replacePublic pub2priv x.inexpr}

  | tm -> smap_Expr_Expr (_replacePublic pub2priv) tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eqPaths" kind="sem">

```mc
sem _eqPaths : CallGraph -> [NameInfo] -> NameInfo -> [EqPaths] -> Ast_Expr -> [{id: (Name, Info), home: NameInfo, eqPaths: [[(NameInfo, NameInfo, NameInfo)]]}]
```

<Description>{`Finds the home vertex and equivalence path for each hole.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _eqPaths (g : CallGraph) (public : [NameInfo]) (cur : NameInfo) (acc: [EqPaths]) =
  | TmDecl (x & {decl = DeclLet ({body = TmHole {depth = depth}, ident = ident} & t)}) ->
    let paths = eqPaths g cur depth public in
    cons {id=(ident, t.info), home=cur, eqPaths=paths}
      (_eqPaths g public cur acc x.inexpr)

  | TmDecl (x & {decl = DeclLet ({ body = TmLam lm } & t)}) ->
    concat (_eqPaths g public (t.ident, t.info) acc t.body)
           (_eqPaths g public cur [] x.inexpr)

  | TmDecl (x & {decl = DeclRecLets t}) ->
    concat
      (foldl (lam acc. lam bind: DeclLetRecord.
         let cur =
           match bind with { body = TmLam lm } then (bind.ident, bind.info)
           else cur
         in concat acc (_eqPaths g public cur [] bind.body))
         [] t.bindings)
      (_eqPaths g public cur acc x.inexpr)

  | tm ->
    sfold_Expr_Expr (_eqPaths g public cur) acc tm
```
</ToggleWrapper>
</DocBlock>

