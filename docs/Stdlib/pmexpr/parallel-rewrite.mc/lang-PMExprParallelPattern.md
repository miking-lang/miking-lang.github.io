import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprParallelPattern  
  

  
  
  
## Semantics  
  

          <DocBlock title="tryPatterns" kind="sem">

```mc
sem tryPatterns : [Pattern] -> LetDeclAst_DeclLetRecord -> Option Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem tryPatterns (patterns : [Pattern]) =
  | t ->
    let binding : DeclLetRecord = t in
    let n = length patterns in
    recursive let tryPattern = lam i.
      if lti i n then
        let pattern : Pattern = get patterns i in
        match matchPattern binding pattern with Some map then
          Some (pattern.replacement binding.info map)
        else
          tryPattern (addi i 1)
      else None ()
    in
    tryPattern 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parallelPatternRewrite" kind="sem">

```mc
sem parallelPatternRewrite : [Pattern] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem parallelPatternRewrite (patterns : [Pattern]) =
  | t ->
    let replacements = mapEmpty nameCmp in
    match parallelPatternRewriteH patterns replacements t with (_, t) in
    promote t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parallelPatternRewriteH" kind="sem">

```mc
sem parallelPatternRewriteH : [Pattern] -> Map Name ([(Name, Ast_Type, Info)], Ast_Expr) -> Ast_Expr -> (Map Name ([(Name, Ast_Type, Info)], Ast_Expr), Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem parallelPatternRewriteH (patterns : [Pattern])
                              (replacements : Map Name ([(Name, Type, Info)], Expr)) =
  | TmDecl (x & {decl = DeclRecLets t}) ->
    -- Collect the parameters
    let replacements =
      foldl
        (lam replacements. lam binding : DeclLetRecord.
          match functionParametersAndBody binding.body with (params, _) then
            match tryPatterns patterns binding with Some replacement then
              mapInsert binding.ident (params, replacement) replacements
            else replacements
          else replacements)
        replacements
        t.bindings in

    -- Remove bindings that have been replaced by parallel patterns
    let retainedBindings =
      filter
        (lam binding : DeclLetRecord.
          optionIsNone (mapLookup binding.ident replacements))
        t.bindings in

    if null retainedBindings then
      parallelPatternRewriteH patterns replacements x.inexpr
    else
      -- Replace applications on replaced bindings within the bodies of the
      -- bindings that remain.
      let bindings =
        map
          (lam binding : DeclLetRecord.
            match parallelPatternRewriteH patterns replacements binding.body
            with (_, body) in
            {binding with body = body})
          retainedBindings in

      -- Apply on the inexpr of the recursive let-expression (apply on the
      -- remaining part of the tree).
      match parallelPatternRewriteH patterns replacements x.inexpr
      with (replacements, inexpr) in
      (replacements, TmDecl { x with decl = DeclRecLets {t with bindings = bindings}
                            , inexpr = inexpr})
  | (TmApp {info = info}) & t ->
    let performSubstitution : Expr -> [(Name, Type, Info)] -> [Expr] -> Expr =
      lam e. lam params. lam args.
      let substMap = mapFromSeq nameCmp
        (map
          (lam paramArg : ((Name, Type, Info), Expr).
            match paramArg with ((id, ty, info), expr) in
            (id, lam info. withInfo info (withType ty expr)))
          (zip params args)) in
      substituteVariables substMap e
    in
    match collectAppArguments t with (f, args) in
    let appBody =
      match f with TmVar {ident = ident} then
        match mapLookup ident replacements with Some (params, expr) then
          let nargs = length args in
          let nparams = length params in
          if lti nargs nparams then
            let diff = subi nparams nargs in
            let extraNames = create diff (lam. nameSym "x") in
            let exprWrappedInLambdas =
              foldl
                (lam e. lam name.
                  -- TODO(larshum, 2021-12-06): Do not use TyUnknown, but
                  -- propagate the appropriate types based on the parameter
                  -- types, which are known.
                  TmLam {
                    ident = name,
                    tyAnnot = TyUnknown {info = info},
                    tyParam = TyUnknown {info = info},
                    body = e,
                    ty = tyTm e,
                    info = info})
                expr
                extraNames in
            let extraVars =
              map
                (lam id : Name.
                  TmVar {ident = id, ty = TyUnknown {info = info},
                         info = info, frozen = false})
                extraNames in
            let args = concat args (reverse extraVars) in
            Some (performSubstitution exprWrappedInLambdas params args)
          else if eqi nargs nparams then
            Some (performSubstitution expr params args)
          else errorSingle [info] (concat "Too many arguments passed to "
                                          (nameGetStr ident))
        else None ()
      else None ()
    in
    (replacements, optionGetOrElse (lam. t) appBody)
  | t -> smapAccumL_Expr_Expr (parallelPatternRewriteH patterns) replacements t
```
</ToggleWrapper>
</DocBlock>

