import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetDeclAst  
  

DeclLetRecord \-\-

  
  
  
## Types  
  

          <DocBlock title="DeclLetRecord" kind="type">

```mc
type DeclLetRecord : { ident: Name, tyAnnot: Type, tyBody: Type, body: Expr, info: Info }
```



<ToggleWrapper text="Code..">
```mc
type DeclLetRecord =
    { ident : Name
    , tyAnnot : Type
    , tyBody : Type
    , body : Expr
    , info: Info
    }
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
  | DeclLet DeclLetRecord
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
  | DeclLet d -> d.info
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
  | DeclLet d -> DeclLet {d with info = info}
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
  | DeclLet x ->
    match f acc x.body with (acc, body) in
    (acc, DeclLet {x with body = body})
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
  | DeclLet x ->
    match f acc x.tyAnnot with (acc, tyAnnot) in
    (acc, DeclLet {x with tyAnnot = tyAnnot})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_TypeLabel" kind="sem">

```mc
sem smapAccumL_Decl_TypeLabel : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_TypeLabel f acc =
  | DeclLet x ->
    match f acc x.tyBody with (acc, tyBody) in
    (acc, DeclLet {x with tyBody = tyBody})
```
</ToggleWrapper>
</DocBlock>

