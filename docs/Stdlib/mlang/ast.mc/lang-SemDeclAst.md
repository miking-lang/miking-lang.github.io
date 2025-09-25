import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SemDeclAst  
  

DeclSem \-\-

  
  
  
## Types  
  

          <DocBlock title="DeclSemType" kind="type">

```mc
type DeclSemType : { ident: Name, tyAnnot: Type, tyBody: Type, args: Option [{ ident: Name, tyAnnot: Type }], cases: [{ pat: Pat, thn: Expr }], includes: [(String, String)], info: Info, declKind: DeclKind }
```



<ToggleWrapper text="Code..">
```mc
type DeclSemType = {ident : Name,
                      tyAnnot : Type,
                      tyBody : Type,
                      args : Option [{ident : Name, tyAnnot : Type}],
                      cases : [{pat : Pat, thn : Expr}],
                      -- The list of semantic function s whose cases should be included.
                      -- The first string identifies the langauge of the include
                      -- and the second string identifies the name.
                      includes : [(String, String)],
                      info : Info,
                      declKind : DeclKind}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Decl" kind="syn">

```mc
syn Decl
```



<ToggleWrapper text="Code..">
```mc
syn Decl =
  | DeclSem DeclSemType
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoDecl" kind="sem">

```mc
sem infoDecl : Ast_Decl -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoDecl =
  | DeclSem d -> d.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declWithInfo" kind="sem">

```mc
sem declWithInfo : Info -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
sem declWithInfo info =
  | DeclSem d -> DeclSem {d with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Type" kind="sem">

```mc
sem smapAccumL_Decl_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Type f acc =
  | DeclSem x ->
    let farg = lam acc. lam def.
      match f acc def.tyAnnot with (acc, tyAnnot) in
      (acc, {def with tyAnnot = tyAnnot}) in
    match f acc x.tyAnnot with (acc, tyAnnot) in
    match f acc x.tyBody with (acc, tyBody) in
    match optionMapAccum (mapAccumL farg) acc x.args with (acc, args) in
    (acc, DeclSem {x with args = args, tyAnnot = tyAnnot, tyBody = tyBody})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Expr" kind="sem">

```mc
sem smapAccumL_Decl_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Expr f acc =
  | DeclSem x ->
    let fcase = lam acc. lam c.
      match f acc c.thn with (acc, thn) in
      (acc, {c with thn = thn}) in
    match mapAccumL fcase acc x.cases with (acc, cases) in
    (acc, DeclSem {x with cases = cases})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Pat" kind="sem">

```mc
sem smapAccumL_Decl_Pat : all acc. (acc -> Ast_Pat -> (acc, Ast_Pat)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Pat f acc =
  | DeclSem x ->
    let fcase = lam acc. lam c.
      match f acc c.pat with (acc, pat) in
      (acc, {c with pat = pat}) in
    match mapAccumL fcase acc x.cases with (acc, cases) in
    (acc, DeclSem {x with cases = cases})
```
</ToggleWrapper>
</DocBlock>

