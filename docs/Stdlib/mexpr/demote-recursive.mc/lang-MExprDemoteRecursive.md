import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprDemoteRecursive  
  

Performs a "demotion" of all recursive bindings in the given expression.  
The result is that  
1. Bindings that do not make use of recursion at all are translated to  
   let\-expressions.  
2. Bindings are split up into multiple recursive let\-expressions, such that  
   all bindings of each resulting recursive let are dependent on each other.

  
  
  
## Semantics  
  

          <DocBlock title="demoteRecursive" kind="sem">

```mc
sem demoteRecursive : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem demoteRecursive =
  | tm -> smap_Expr_Expr demoteRecursive tm
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let f = lam acc. lam binding.
      ( mapInsert binding.ident (binding, freeVars binding.body) acc
      , {binding with body = demoteRecursive binding.body}
      ) in
    match mapAccumL f (mapEmpty nameCmp) t.bindings with (usedMap, bindings) in
    let g = mapFoldWithKey (lam g. lam k. lam. digraphMaybeAddVertex k g)
      (digraphEmpty nameCmp (lam. lam. true))
      usedMap in
    let f = lam g. lam from. lam pair.
      setFold (lam g. lam to. if mapMem to usedMap then digraphAddEdge from to () g else g) g pair.1 in
    let g = mapFoldWithKey f g usedMap in
    let attachGroup = lam group. lam inexpr.
      switch group
      case [] then
        -- TODO(vipa, 2025-03-19): Is this even possible? It's in the
        -- old code
        inexpr
      case [name] then
        match mapFindExn name usedMap with (binding, free) in
        if setMem name free
        then TmDecl
          {x with decl = DeclRecLets {t with bindings = [binding]}
          , inexpr = inexpr
          }
        else TmDecl
          {x with decl = DeclLet
            {ident = binding.ident
            , tyAnnot = binding.tyAnnot
            , tyBody = binding.tyBody
            , body = binding.body
            , info = binding.info
            }
          , inexpr = inexpr
          , ty = x.ty
          }
      case names then
        let bindings = mapReverse (lam name. (mapFindExn name usedMap).0) names in
        TmDecl {x with decl = DeclRecLets {t with bindings = bindings}, inexpr = inexpr}
      end in
    let inexpr = demoteRecursive x.inexpr in
    foldr attachGroup inexpr (digraphTarjan g)
```
</ToggleWrapper>
</DocBlock>

