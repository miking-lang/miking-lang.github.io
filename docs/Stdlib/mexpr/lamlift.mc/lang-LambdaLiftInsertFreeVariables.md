import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LambdaLiftInsertFreeVariables  
  

  
  
  
## Types  
  

          <DocBlock title="TmVarRec" kind="type">

```mc
type TmVarRec : { ident: Name, ty: Type, info: Info, frozen: Bool }
```



<ToggleWrapper text="Code..">
```mc
type TmVarRec =
    { ident : Name
    , ty: Type
    , info: Info
    , frozen: Bool
    }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="insertFreeVariablesH" kind="sem">

```mc
sem insertFreeVariablesH : Map Name LambdaLiftSolution -> Map Name (LambdaLiftInsertFreeVariables_TmVarRec -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem insertFreeVariablesH solutions subMap =
  | tm & TmVar t ->
    optionMapOr tm (lam f. f t) (mapLookup t.ident subMap)
  | TmDecl (x & {decl = DeclLet (t & {body = TmLam _})}) ->
    match mapLookup t.ident solutions with Some sol then
      let sol = _orderSolution sol in
      let tyBody = updateType sol t.tyBody t.tyBody in
      let tyAnnot = updateType sol t.tyBody t.tyAnnot in
      let body = insertFreeVariablesH solutions subMap t.body in
      let body = updateLambdaBody sol body in
      let inexpr =
        let subMap = mapInsert t.ident (mkSolApplication sol tyBody) subMap in
        insertFreeVariablesH solutions subMap x.inexpr in
      TmDecl {x with decl = DeclLet {t with tyBody = tyBody, tyAnnot = tyAnnot, body = body}, inexpr = inexpr}
    else errorSingle [t.info] (join ["Found no free variable solution for ",
                                     nameGetStr t.ident])
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let updateBindingShallow = lam solutions. lam subMap. lam binding.
      match mapLookup binding.ident solutions with Some sol then
        let sol = _orderSolution sol in
        let tyBody = updateType sol binding.tyBody binding.tyBody in
        let tyAnnot = updateType sol binding.tyBody binding.tyAnnot in
        let body = updateLambdaBody sol binding.body in
        let subMap = mapInsert binding.ident (mkSolApplication sol tyBody) subMap in
        (subMap, {binding with tyBody = tyBody, tyAnnot = tyAnnot, body = body})
      else errorSingle [binding.info] (join ["Lambda lifting error: No solution found for binding ",
                                             nameGetStr binding.ident])
    in
    let updateBindingNonShallow = lam solutions. lam subMap. lam binding.
      {binding with body = insertFreeVariablesH solutions subMap binding.body} in
    match mapAccumL (updateBindingShallow solutions) subMap t.bindings with (subMap, bindings) in
    let bindings = map (updateBindingNonShallow solutions subMap) bindings in
    let inexpr = insertFreeVariablesH solutions subMap x.inexpr in
    TmDecl {x with decl = DeclRecLets {t with bindings = bindings}, inexpr = inexpr}
  | t -> smap_Expr_Expr (insertFreeVariablesH solutions subMap) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="insertFreeVariables" kind="sem">

```mc
sem insertFreeVariables : Map Name LambdaLiftSolution -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem insertFreeVariables (solutions : Map Name LambdaLiftSolution) =
  | t -> insertFreeVariablesH solutions (mapEmpty nameCmp) t
```
</ToggleWrapper>
</DocBlock>

