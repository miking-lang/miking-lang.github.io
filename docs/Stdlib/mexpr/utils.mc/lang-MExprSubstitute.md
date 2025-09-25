import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprSubstitute  
  

  
  
  
## Semantics  
  

          <DocBlock title="substituteIdentifiers" kind="sem">

```mc
sem substituteIdentifiers : Map Name Name -> Ast_Expr -> Ast_Expr
```

<Description>{`Applies the substitutions of the provided map to the identifiers of the  
given AST.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substituteIdentifiers replacements =
  | ast -> substituteIdentifiersExpr replacements ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="subIdent" kind="sem">

```mc
sem subIdent : Map Name Name -> Name -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem subIdent replacements =
  | id -> optionGetOrElse (lam. id) (mapLookup id replacements)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="substituteIdentifiersSDecl" kind="sem">

```mc
sem substituteIdentifiersSDecl : Map Name Name -> Ast_Decl -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substituteIdentifiersSDecl replacements =
  | d -> d
  | DeclLet x -> DeclLet {x with ident = subIdent replacements x.ident}
  | DeclRecLets x ->
    let f = lam bind. {bind with ident = subIdent replacements bind.ident} in
    DeclRecLets {x with bindings = map f x.bindings}
  | DeclType x -> DeclType
    { x with ident = subIdent replacements x.ident
    , params = map (subIdent replacements) x.params
    }
  | DeclConDef x -> DeclConDef {x with ident = subIdent replacements x.ident}
  | DeclExt x -> DeclExt {x with ident = subIdent replacements x.ident}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="substituteIdentifiersExpr" kind="sem">

```mc
sem substituteIdentifiersExpr : Map Name Name -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substituteIdentifiersExpr replacements =
  | TmVar t -> TmVar {t with ident = subIdent replacements t.ident}
  | TmConApp t ->
    let ast = TmConApp {t with ident = subIdent replacements t.ident} in
    let ast = smap_Expr_Expr (substituteIdentifiersExpr replacements) ast in
    let ast = smap_Expr_Type (substituteIdentifiersType replacements) ast in
    let ast = smap_Expr_TypeLabel (substituteIdentifiersType replacements) ast in
    let ast = smap_Expr_Pat (substituteIdentifiersPat replacements) ast in
    withType (substituteIdentifiersType replacements (tyTm ast)) ast
  | TmLam t ->
    let ast = TmLam {t with ident = subIdent replacements t.ident} in
    let ast = smap_Expr_Expr (substituteIdentifiersExpr replacements) ast in
    let ast = smap_Expr_Type (substituteIdentifiersType replacements) ast in
    let ast = smap_Expr_TypeLabel (substituteIdentifiersType replacements) ast in
    let ast = smap_Expr_Pat (substituteIdentifiersPat replacements) ast in
    withType (substituteIdentifiersType replacements (tyTm ast)) ast
  | TmDecl x ->
    let ast = TmDecl {x with decl = substituteIdentifiersSDecl replacements x.decl} in
    let ast = smap_Expr_Expr (substituteIdentifiersExpr replacements) ast in
    let ast = smap_Expr_Type (substituteIdentifiersType replacements) ast in
    let ast = smap_Expr_TypeLabel (substituteIdentifiersType replacements) ast in
    let ast = smap_Expr_Pat (substituteIdentifiersPat replacements) ast in
    withType (substituteIdentifiersType replacements (tyTm ast)) ast
  | ast ->
    let ast = smap_Expr_Expr (substituteIdentifiersExpr replacements) ast in
    let ast = smap_Expr_Type (substituteIdentifiersType replacements) ast in
    let ast = smap_Expr_TypeLabel (substituteIdentifiersType replacements) ast in
    let ast = smap_Expr_Pat (substituteIdentifiersPat replacements) ast in
    withType (substituteIdentifiersType replacements (tyTm ast)) ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="substituteIdentifiersType" kind="sem">

```mc
sem substituteIdentifiersType : Map Name Name -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substituteIdentifiersType replacements =
  | TyCon t -> TyCon {t with ident = subIdent replacements t.ident}
  | TyVar t -> TyVar {t with ident = subIdent replacements t.ident}
  | TyAll t -> TyAll {t with ident = subIdent replacements t.ident, ty = substituteIdentifiersType replacements t.ty}
  | ty -> smap_Type_Type (substituteIdentifiersType replacements) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="substituteIdentifiersPat" kind="sem">

```mc
sem substituteIdentifiersPat : Map Name Name -> Ast_Pat -> Ast_Pat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substituteIdentifiersPat replacements =
  | PatCon t ->
    PatCon {t with ident = subIdent replacements t.ident,
                   subpat = substituteIdentifiersPat replacements t.subpat}
  | p ->
    let p = smap_Pat_Pat (substituteIdentifiersPat replacements) p in
    withTypePat (substituteIdentifiersType replacements (tyPat p)) p
```
</ToggleWrapper>
</DocBlock>

