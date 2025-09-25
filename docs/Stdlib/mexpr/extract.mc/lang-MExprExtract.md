import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprExtract  
  

  
  
  
## Semantics  
  

          <DocBlock title="extractAst" kind="sem">

```mc
sem extractAst : Set Name -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem extractAst identifiers = | ast ->
    -- NOTE(larshum, 2022-09-06): In the base case, we return the integer
    -- literal 0, rather than an empty record, as the former works better in
    -- our C compiler.
    let defaultBase = TmConst
      { val = CInt {val = 0}
      , ty = TyInt {info = NoInfo ()}
      , info = NoInfo ()
      } in
    (extractAstExpr identifiers defaultBase ast).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractAstExpr" kind="sem">

```mc
sem extractAstExpr : Set Name -> Ast_Expr -> Ast_Expr -> (Set Name, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem extractAstExpr used base = | tm ->
    match tm with TmDecl (x & {decl = decl, inexpr = expr}) then
      match extractAstExpr used base expr with (used, expr) in
      match extractAstDecl used decl with Some (used, decl)
      then (used, TmDecl {x with decl = decl, inexpr = expr})
      else (used, expr)
    else (used, base)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractAstDecl" kind="sem">

```mc
sem extractAstDecl : Set Name -> Ast_Decl -> Option (Set Name, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem extractAstDecl used =
  -- NOTE(vipa, 2025-03-19): Utests cannot be used; they don't define
  -- anything
  | DeclUtest _ -> None ()

  -- NOTE(vipa, 2025-03-19): All these define exactly one name that's
  -- only in scope after the Decl, thus they can be treated
  -- identically
  | decl & (DeclConDef {ident = ident} | DeclLet {ident = ident} | DeclType {ident = ident} | DeclExt {ident = ident}) ->
    if setMem ident used then
      let used = mapRemove ident used in
      let used = sfold_Decl_Expr freeNamesExpr used decl in
      let used = sfold_Decl_Type freeNamesType used decl in
      Some (used, decl)
    else None ()

  -- NOTE(vipa, 2025-03-19): RecLets are harder because they define
  -- multiple things simultaneously with potential mutual dependency
  | DeclRecLets x ->
    let bindingToUsed = lam acc. lam binding.
      let usedHere = freeNames binding.body in
      let usedHere = freeNamesType usedHere binding.tyAnnot in
      mapInsert binding.ident usedHere acc in
    let usedInBindings = foldl bindingToUsed (mapEmpty nameCmp) x.bindings in
    let transitiveClosure
      : all x. (Map x (Set x)) -> Set x -> Set x
      = lam trans. lam initial.
        recursive let work = lam curr. lam new.
          let findNew = lam acc. lam x.
            optionMapOr acc (setUnion acc) (mapLookup x trans) in
          let new = setSubtract (setFold findNew (setEmpty (mapGetCmpFun curr)) new) curr in
          if setIsEmpty new then curr else
          work (setUnion curr new) new in
        work initial initial in
    let used = transitiveClosure usedInBindings used in
    match filter (lam b. setMem b.ident used) x.bindings with bindings & ([_] ++ _) then
      let used = foldl (lam used. lam b. setRemove b.ident used) used bindings in
      Some (used, DeclRecLets {x with bindings = bindings})
    else None ()
```
</ToggleWrapper>
</DocBlock>

