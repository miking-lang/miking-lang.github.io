import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsDeclAst  
  

DeclRecLets \-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="Decl" kind="syn">

```mc
syn Decl
```



<ToggleWrapper text="Code..">
```mc
syn Decl =
  | DeclRecLets
    { bindings : [DeclLetRecord]
    , info : Info
    }
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
  | DeclRecLets d -> d.info
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
  | DeclRecLets d -> DeclRecLets {d with info = info}
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
  | DeclRecLets x ->
    let fbinding = lam acc. lam b.
      match f acc b.tyAnnot with (acc, tyAnnot) in
      (acc, {b with tyAnnot = tyAnnot}) in
    match mapAccumL fbinding acc x.bindings with (acc, bindings) in
    (acc, DeclRecLets {x with bindings = bindings})
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
  | DeclRecLets x ->
    let fbinding = lam acc. lam b.
      match f acc b.body with (acc, body) in
      (acc, {b with body = body}) in
    match mapAccumL fbinding acc x.bindings with (acc, bindings) in
    (acc, DeclRecLets {x with bindings = bindings})
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
  | DeclRecLets x ->
    let fbinding = lam acc. lam b.
      match f acc b.tyBody with (acc, tyBody) in
      (acc, {b with tyBody = tyBody}) in
    match mapAccumL fbinding acc x.bindings with (acc, bindings) in
    (acc, DeclRecLets {x with bindings = bindings})
```
</ToggleWrapper>
</DocBlock>

