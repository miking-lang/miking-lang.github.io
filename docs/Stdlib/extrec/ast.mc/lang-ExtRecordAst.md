import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtRecordAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmExtRecord  {bindings : Map String Expr,
                  ident : Name,
                  ty : Type,
                  info : Info}
  | TmExtExtend {e : Expr,
                 bindings : Map String Expr,
                 ty : Type,
                 info : Info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Decl" kind="syn">

```mc
syn Decl
```



<ToggleWrapper text="Code..">
```mc
syn Decl =
  | DeclRecType {ident : Name,
                 params : [Name],
                 info : Info}
  | DeclRecField {label : String,
                  tyIdent : Type,
                  info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | TmExtRecord t -> t.info
  | TmExtExtend t -> t.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoDecl" kind="sem">

```mc
sem infoDecl : Ast_Decl -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoDecl =
  | DeclRecField t -> t.info
  | DeclRecType t -> t.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm =
  | TmExtRecord t -> t.ty
  | TmExtExtend t -> t.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfo" kind="sem">

```mc
sem withInfo : Info -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withInfo info =
  | TmExtRecord t -> TmExtRecord {t with info = info}
  | TmExtExtend t -> TmExtExtend {t with info = info}
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
  | DeclRecField t -> DeclRecField {t with info = info}
  | DeclRecType t -> DeclRecType {t with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType  ty =
  | TmExtRecord t -> TmExtRecord {t with ty = ty}
  | TmExtExtend t -> TmExtExtend {t with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_Expr" kind="sem">

```mc
sem smapAccumL_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Expr f acc =
  | TmExtRecord t ->
    match mapMapAccum (lam acc. lam. lam e. f acc e) acc t.bindings with (acc, bindings) in
    (acc, TmExtRecord {t with bindings = bindings})
  | TmExtExtend t ->
    match f acc t.e with (acc, e) in
    match mapMapAccum (lam acc. lam. lam e. f acc e) acc t.bindings
    with (acc, bindings) in
    (acc, TmExtExtend {t with e = e, bindings = bindings})
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
  | DeclRecField t ->
    match f acc t.tyIdent with (acc, tyIdent) in
    (acc, DeclRecField {t with tyIdent = tyIdent})
```
</ToggleWrapper>
</DocBlock>

