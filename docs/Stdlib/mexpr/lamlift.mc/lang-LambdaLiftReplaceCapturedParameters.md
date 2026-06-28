import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LambdaLiftReplaceCapturedParameters  
  

  
  
  
## Semantics  
  

          <DocBlock title="replaceCapturedParameters" kind="sem">

```mc
sem replaceCapturedParameters : Map Name LambdaLiftSolution -> Ast_Expr -> (Map Name FinalOrderedLamLiftSolution, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem replaceCapturedParameters solutions =
  | ast ->
    let newNamesForSolution
      : LambdaLiftSolution -> (Map Name Name, FinalOrderedLamLiftSolution)
      = lam sol.
        let varsToParams = mapMapWithKey (lam k. lam. nameSetNewSym k) sol.vars in
        let tyVarsToParams = mapMapWithKey (lam k. lam. nameSetNewSym k) sol.tyVars in
        let ordSol = _orderSolution sol in
        let substs = mapUnion varsToParams tyVarsToParams in
        ( substs
        , { vars = ordSol.vars
          , varsToParams = varsToParams
          , tyVars = ordSol.tyVars
          , tyVarsToParams = tyVarsToParams
          }
        ) in
    let merged = mapMap newNamesForSolution solutions in
    let subMap = mapMap (lam x. x.0) merged in
    let solutions = mapMap (lam x. x.1) merged in

    (solutions, replaceCapturedParametersH subMap ast)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="replaceCapturedParametersH" kind="sem">

```mc
sem replaceCapturedParametersH : Map Name (Map Name Name) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem replaceCapturedParametersH subMap =
  | TmDecl (x & {decl = DeclLet t}) ->
    let t =
      match mapLookup t.ident subMap with Some subs then
        { t with body = substituteIdentifiers subs t.body
        , tyAnnot = substituteIdentifiersType subs t.tyAnnot
        , tyBody = substituteIdentifiersType subs t.tyBody
        }
      else t in
    TmDecl {x with decl = DeclLet t, inexpr = replaceCapturedParametersH subMap x.inexpr}
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let replaceCapturedParametersBinding = lam bind.
      match mapLookup bind.ident subMap with Some subs then
        { bind with body = substituteIdentifiers subs bind.body
        , tyAnnot = substituteIdentifiersType subs bind.tyAnnot
        , tyBody = substituteIdentifiersType subs bind.tyBody
        }
      else bind
    in
    let bindings = map replaceCapturedParametersBinding t.bindings in
    TmDecl
    {x with decl = DeclRecLets {t with bindings = bindings}
    , inexpr = replaceCapturedParametersH subMap x.inexpr
    }
  | t -> smap_Expr_Expr (replaceCapturedParametersH subMap) t
```
</ToggleWrapper>
</DocBlock>

