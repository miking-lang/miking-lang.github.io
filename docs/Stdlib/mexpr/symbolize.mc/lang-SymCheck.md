import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SymCheck  
  

To test that the symbolization works as expected, we define functions that  
verify all names in the AST have been symbolized.

  
  
  
## Semantics  
  

          <DocBlock title="isFullySymbolized" kind="sem">

```mc
sem isFullySymbolized : Ast_Expr -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isFullySymbolized =
  | ast -> isFullySymbolizedExpr ast ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isFullySymbolizedDecl" kind="sem">

```mc
sem isFullySymbolizedDecl : Ast_Decl -> () -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedDecl =
  | DeclLet l ->
    foldl _and (lam. true) [
      lam. nameHasSym l.ident,
      isFullySymbolizedType l.tyAnnot,
      isFullySymbolizedExpr l.body
    ]
  | DeclRecLets l ->
    let isFullySymbolizedBinding = lam b.
      _and (lam. nameHasSym b.ident)
        (_and
           (isFullySymbolizedType b.tyAnnot)
           (isFullySymbolizedExpr b.body))
    in
    foldl _and (lam. true) (map isFullySymbolizedBinding l.bindings)
  | DeclType l ->
    _and (lam. nameHasSym l.ident) (_and
          (lam. (forAll nameHasSym l.params))
          (isFullySymbolizedType l.tyIdent))
  | DeclExt l ->
    _and (lam. nameHasSym l.ident) (isFullySymbolizedType l.tyIdent)
  | DeclConDef l ->
    _and (lam. nameHasSym l.ident) (isFullySymbolizedType l.tyIdent)
  | d ->
    _and (sfold_Decl_Expr (_andFold isFullySymbolizedExpr) (lam. true) d)
      (sfold_Decl_Type (_andFold isFullySymbolizedType) (lam. true) d)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isFullySymbolizedExpr" kind="sem">

```mc
sem isFullySymbolizedExpr : Ast_Expr -> () -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedExpr =
  | TmVar t -> lam. nameHasSym t.ident
  | TmLam t ->
    _and (lam. nameHasSym t.ident)
      (_and
         (isFullySymbolizedType t.tyAnnot)
         (isFullySymbolizedExpr t.body))
  | TmConApp t ->
    _and (lam. nameHasSym t.ident) (isFullySymbolizedExpr t.body)
  | TmDecl x ->
    _and (isFullySymbolizedDecl x.decl) (isFullySymbolizedExpr x.inexpr)
  | t ->
    _and (sfold_Expr_Expr (_andFold isFullySymbolizedExpr) (lam. true) t)
      (_and
         (sfold_Expr_Type (_andFold isFullySymbolizedType) (lam. true) t)
         (sfold_Expr_Pat (_andFold isFullySymbolizedPat) (lam. true) t))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isFullySymbolizedPat" kind="sem">

```mc
sem isFullySymbolizedPat : Ast_Pat -> () -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedPat =
  | PatNamed {ident = PName id} -> lam. nameHasSym id
  | PatCon t ->
    _and (lam. nameHasSym t.ident) (isFullySymbolizedPat t.subpat)
  | p ->
    _and
      (sfold_Pat_Pat (_andFold isFullySymbolizedPat) (lam. true) p)
      (sfold_Pat_Type (_andFold isFullySymbolizedType) (lam. true) p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isFullySymbolizedType" kind="sem">

```mc
sem isFullySymbolizedType : Ast_Type -> () -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedType =
  | TyCon {ident = ident} | TyVar {ident = ident} -> lam. nameHasSym ident
  | TyAll t ->
    _and (lam. nameHasSym t.ident) (isFullySymbolizedType t.ty)
  | ty ->
    sfold_Type_Type (_andFold isFullySymbolizedType) (lam. true) ty
```
</ToggleWrapper>
</DocBlock>

