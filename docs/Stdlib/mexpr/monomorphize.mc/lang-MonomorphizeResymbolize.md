import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MonomorphizeResymbolize  
  

  
  
  
## Semantics  
  

          <DocBlock title="resymbolizeBindings" kind="sem">

```mc
sem resymbolizeBindings : Ast_Expr -> Ast_Expr
```

<Description>{`Resymbolizes all variables bound inside the provided expression. We use  
this to ensure function definitions duplicated due to monomorphization end  
up with distinct symbols.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem resymbolizeBindings =
  | ast -> resymbolizeBindingsExpr (mapEmpty nameCmp) ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="resymbolizeBindingsDecl" kind="sem">

```mc
sem resymbolizeBindingsDecl : Map Name Name -> Ast_Decl -> (Map Name Name, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem resymbolizeBindingsDecl nameMap =
  | d -> (nameMap, smap_Decl_Expr (resymbolizeBindingsExpr nameMap) d)
  | DeclLet t ->
    let body = resymbolizeBindingsExpr nameMap t.body in
    let newId = nameSetNewSym t.ident in
    let nameMap = mapInsert t.ident newId nameMap in
    ( nameMap
    , DeclLet
      { t with ident = newId
      , tyAnnot = resymbolizeBindingsType nameMap t.tyAnnot
      , tyBody = resymbolizeBindingsType nameMap t.tyBody
      , body = body
      }
    )
  | DeclRecLets t ->
    let addNewIdBinding = lam nameMap. lam bind.
      let newId = nameSetNewSym bind.ident in
      (mapInsert bind.ident newId nameMap, {bind with ident = newId})
    in
    match mapAccumL addNewIdBinding nameMap t.bindings with (nameMap, bindings) in
    let resymbolizeBind = lam bind.
      {bind with tyAnnot = resymbolizeBindingsType nameMap bind.tyAnnot,
                 tyBody = resymbolizeBindingsType nameMap bind.tyBody,
                 body = resymbolizeBindingsExpr nameMap bind.body}
    in
    let bindings = map resymbolizeBind bindings in
    (nameMap, DeclRecLets {t with bindings = bindings})
  | DeclType t ->
    let newId = nameSetNewSym t.ident in
    let nameMap = mapInsert t.ident newId nameMap in
    ( nameMap
    , DeclType
      { t with ident = newId
      , tyIdent = resymbolizeBindingsType nameMap t.tyIdent
      }
    )
  | DeclConDef t ->
    let newId = nameSetNewSym t.ident in
    let nameMap = mapInsert t.ident newId nameMap in
    (nameMap, DeclConDef {t with ident = newId, tyIdent = resymbolizeBindingsType nameMap t.tyIdent})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="resymbolizeBindingsExpr" kind="sem">

```mc
sem resymbolizeBindingsExpr : Map Name Name -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem resymbolizeBindingsExpr nameMap =
  | TmVar t ->
    let newId =
      match mapLookup t.ident nameMap with Some newId then newId
      else t.ident
    in
    TmVar {t with ident = newId, ty = resymbolizeBindingsType nameMap t.ty}
  | TmLam t ->
    let newId = nameSetNewSym t.ident in
    let nameMap = mapInsert t.ident newId nameMap in
    TmLam {t with ident = newId,
                  tyAnnot = resymbolizeBindingsType nameMap t.tyAnnot,
                  tyParam = resymbolizeBindingsType nameMap t.tyParam,
                  body = resymbolizeBindingsExpr nameMap t.body,
                  ty = resymbolizeBindingsType nameMap t.ty}
  | TmDecl t ->
    match resymbolizeBindingsDecl nameMap t.decl with (nameMap, decl) in
    let inexpr = resymbolizeBindingsExpr nameMap t.inexpr in
    TmDecl {t with decl = decl, inexpr = inexpr}
  | TmConApp t ->
    let newId =
      match mapLookup t.ident nameMap with Some newId then newId
      else t.ident
    in
    TmConApp {t with ident = newId,
                     body = resymbolizeBindingsExpr nameMap t.body,
                     ty = resymbolizeBindingsType nameMap t.ty}
  | TmMatch t ->
    let target = resymbolizeBindingsExpr nameMap t.target in
    match resymbolizeBindingsPat nameMap t.pat with (thnNameMap, pat) in
    TmMatch {t with target = target, pat = pat,
                    thn = resymbolizeBindingsExpr thnNameMap t.thn,
                    els = resymbolizeBindingsExpr nameMap t.els,
                    ty = resymbolizeBindingsType nameMap t.ty}
  | t ->
    let t = smap_Expr_Expr (resymbolizeBindingsExpr nameMap) t in
    let t = smap_Expr_Type (resymbolizeBindingsType nameMap) t in
    let t = smap_Expr_TypeLabel (resymbolizeBindingsType nameMap) t in
    withType (resymbolizeBindingsType nameMap (tyTm t)) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="resymbolizeBindingsPat" kind="sem">

```mc
sem resymbolizeBindingsPat : Map Name Name -> Ast_Pat -> (Map Name Name, Ast_Pat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem resymbolizeBindingsPat nameMap =
  | PatNamed (t & {ident = PName id}) ->
    let newId = nameSetNewSym id in
    (mapInsert id newId nameMap, PatNamed {t with ident = PName newId})
  | PatSeqEdge (t & {middle = PName id}) ->
    let newId = nameSetNewSym id in
    (mapInsert id newId nameMap, PatSeqEdge {t with middle = PName newId})
  | PatCon t ->
    match mapLookup t.ident nameMap with Some newId then
      (nameMap, PatCon {t with ident = newId})
    else (nameMap, PatCon t)
  | p -> smapAccumL_Pat_Pat resymbolizeBindingsPat nameMap p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="resymbolizeBindingsType" kind="sem">

```mc
sem resymbolizeBindingsType : Map Name Name -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem resymbolizeBindingsType nameMap =
  | TyCon t ->
    match mapLookup t.ident nameMap with Some newId then
      TyCon {t with ident = newId}
    else TyCon t
  | TyVar t ->
    match mapLookup t.ident nameMap with Some newId then
      TyVar {t with ident = newId}
    else TyVar t
  | TyAll t ->
    let newId = nameSetNewSym t.ident in
    let nameMap = mapInsert t.ident newId nameMap in
    TyAll {t with ident = newId,
                  ty = resymbolizeBindingsType nameMap t.ty}
  | ty -> smap_Type_Type (resymbolizeBindingsType nameMap) ty
```
</ToggleWrapper>
</DocBlock>

