import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestLoader  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Hook" kind="syn">

```mc
syn Hook
```



<ToggleWrapper text="Code..">
```mc
syn Hook =
  | UtestHook
    { defaultOnFail : Name
    , runner : Name
    , exitOnFailure : Name
    , includeUtestIf : {static : Bool, info : Info} -> Bool
    }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="enableUtestGeneration" kind="sem">

```mc
sem enableUtestGeneration : ({info: Info, static: Bool} -> Bool) -> MCoreLoader_Loader -> MCoreLoader_Loader
```

<Description>{`Enable code generation replacing \`utest\` with equivalent  
code. Will remove \`StripUtestHook\` if present.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem enableUtestGeneration includeUtestIf = | loader ->
    if hasHook (lam x. match x with UtestHook _ then true else false) loader then loader else

    -- NOTE(vipa, 2025-01-27): We strip utests found in files before
    -- we're ready. Notably, this means that we can never utest things
    -- that eq-generation, pprint-generation, or the utest-runtime
    -- depend on.
    let loader = addHook loader (StripUtestHook ()) in
    let loader = enableEqGeneration loader in
    let loader = enablePprintGeneration loader in
    match includeFileExn "." "stdlib::mexpr/utest-runtime.mc" loader with (utestEnv, loader) in

    let hook =
      { defaultOnFail = _getVarExn "utestDefaultOnFail" utestEnv
      , runner = _getVarExn "utestRunner" utestEnv
      , exitOnFailure = _getVarExn "utestExitOnFailure" utestEnv
      , includeUtestIf = includeUtestIf
      } in
    let loader = remHook (lam x. match x with StripUtestHook _ then true else false) loader in
    addHook loader (UtestHook hook)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_preBuildFullAst" kind="sem">

```mc
sem _preBuildFullAst : MCoreLoader_Loader -> MCoreLoader_Hook -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
sem _preBuildFullAst loader = | UtestHook hook ->
    let decl = DeclLet
      { ident = nameNoSym ""
      , tyAnnot = tyunknown_
      , tyBody = tyunknown_
      , body = app_ (nvar_ (hook.exitOnFailure)) unit_
      , info = NoInfo ()
      } in
    _addDeclExn loader decl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_postTypecheck" kind="sem">

```mc
sem _postTypecheck : MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Hook -> (MCoreLoader_Loader, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem _postTypecheck loader decl = | UtestHook hook ->
    match decl with DeclUtest d then
      if hook.includeUtestIf {static = true, info = d.info} then
        match replaceUtests hook true loader (bind_ decl unit_) with (loader, expr) in
        let decl = DeclLet
          { ident = nameNoSym ""
          , tyAnnot = tyunit_
          , tyBody = tyunit_
          , body = expr
          , info = d.info
          } in
        (loader, decl)
      else
        let noop = DeclLet
          { ident = nameNoSym ""
          , tyAnnot = tyunknown_
          , tyBody = tyunit_
          , body = unit_
          , info = d.info
          } in
        (loader, noop)
    else
      smapAccumL_Decl_Expr (replaceUtests hook true) loader decl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="replaceUtests" kind="sem">

```mc
sem replaceUtests : {runner: Name, defaultOnFail: Name, exitOnFailure: Name, includeUtestIf: {info: Info, static: Bool} -> Bool} -> Bool -> MCoreLoader_Loader -> Ast_Expr -> (MCoreLoader_Loader, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem replaceUtests hook static loader =
  | tm & TmLam _ -> smapAccumL_Expr_Expr (replaceUtests hook false) loader tm
  | tm -> smapAccumL_Expr_Expr (replaceUtests hook static) loader tm
  | TmDecl (x & {decl = DeclUtest t}) ->
    if hook.includeUtestIf {static = static, info = t.info} then
      let infoStr = str_ (info2str t.info) in

      match
        match t.tusing with Some eqfn
        then (loader, str_ (concat "    Using: " (expr2str eqfn)), eqfn)
        else match eqFunctionsFor [tyTm t.expected] loader with (loader, [eqfn]) in (loader, str_ "", eqfn)
      with (loader, usingStr, eqFn) in

      match
        match t.tonfail with Some ppfn then (loader, ppfn) else
        match pprintFunctionsFor [tyTm t.test, tyTm t.expected] loader with (loader, [testF, expectedF]) in
        (loader, appf2_ (nvar_ hook.defaultOnFail) testF expectedF)
      with (loader, onFailFn) in

      -- NOTE(vipa, 2025-01-27): This doesn't replace utests occurring
      -- in \\`using\\` or \\`else\\`, which is consistent with the old
      -- implementation, but maybe not ideal? It should be *very* rare
      -- that it matters though.
      match replaceUtests hook static loader t.test with (loader, test) in
      match replaceUtests hook static loader t.expected with (loader, expected) in
      match replaceUtests hook static loader x.inexpr with (loader, inexpr) in

      let test = appSeq_ (nvar_ hook.runner) [infoStr, usingStr, onFailFn, eqFn, test, expected] in
      let tm = TmDecl
        { decl = DeclLet
          { ident = nameNoSym ""
          , tyAnnot = tyunknown_
          , tyBody = tyunit_
          , body = test
          , info = t.info
          }
        , inexpr = inexpr
        , ty = tyTm inexpr
        , info = x.info
        } in
      (loader, tm)
    else
      replaceUtests hook static loader x.inexpr
```
</ToggleWrapper>
</DocBlock>

