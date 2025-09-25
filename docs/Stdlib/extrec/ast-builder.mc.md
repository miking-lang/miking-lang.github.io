import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ast-builder.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/extrec/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mlang/ast-builder.mc"} style={S.link}>mlang/ast-builder.mc</a>  
  
## Variables  
  

          <DocBlock title="ext_record_" kind="let">

```mc
let ext_record_ s b : String -> [(String, Ast_Expr)] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let ext_record_ = lam s. lam b.
  use ExtRecordAst in
  TmExtRecord {bindings = mapFromSeq cmpString b,
               ident = nameNoSym s,
               ty = tyunknown_,
               info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="placeholder_" kind="let">

```mc
let placeholder_  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let placeholder_ = use PlaceholderAst in
  TmPlaceholder {info = NoInfo (),
                 ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_ncosyn_" kind="let">

```mc
let decl_ncosyn_ n params isBase ty : Name -> [Name] -> Bool -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_ncosyn_ = use ExtRecAst in
  lam n : Name. lam params : [Name]. lam isBase : Bool. lam ty : Type.
    DeclCosyn {ident = n,
               params = params,
               isBase = isBase,
               ty = ty,
               info = NoInfo (),
               includes = []}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_cosyn_" kind="let">

```mc
let decl_cosyn_ s sparams : String -> [String] -> Bool -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_cosyn_ = lam s. lam sparams.
  decl_ncosyn_ (nameNoSym s) (map nameNoSym sparams)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_ncosem_" kind="let">

```mc
let decl_ncosem_ n nargs cases isBase : Name -> [(Name, Ast_Type)] -> [(CopatAst_Copat, Ast_Expr)] -> Bool -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_ncosem_ = use ExtRecAst in
  lam n : Name. lam nargs : [(Name, Type)]. lam cases: [(Copat, Expr)]. lam isBase : Bool.
  DeclCosem {ident = n,
             info = NoInfo (),
             args = map (lam tupl. {ident = tupl.0, tyAnnot = tupl.1}) nargs,
             cases = cases,
             isBase = isBase,
             tyAnnot = tyunknown_,
             targetTyIdent = nameNoSym "",
             includes = []}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_cosem_" kind="let">

```mc
let decl_cosem_ s args cases isBase : String -> [(String, Ast_Type)] -> [(CopatAst_Copat, Ast_Expr)] -> Bool -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_cosem_ = use ExtRecAst in
  lam s : String. lam args : [(String, Type)]. lam cases: [(Copat, Expr)]. lam isBase : Bool.
  decl_ncosem_ (nameNoSym s) (map (lam tupl. (nameNoSym tupl.0, tupl.1)) args) cases isBase
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="record_copat_" kind="let">

```mc
let record_copat_ fields : [String] -> CopatAst_Copat
```



<ToggleWrapper text="Code..">
```mc
let record_copat_ = use RecordCopatAst in
  lam fields : [String].
    RecordCopat {info = NoInfo (), fields = fields}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_syn_prodext_" kind="let">

```mc
let decl_syn_prodext_ s globExt indivExts : String -> Option Ast_Type -> [(String, Ast_Type)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_syn_prodext_ = use ExtRecAst in
  lam s. lam globExt : Option Type. lam indivExts : [(String, Type)].
  let parseExt = lam indivExt.
    {ident = nameNoSym indivExt.0,
     tyIdent = indivExt.1,
     tyName = nameNoSym (concat indivExt.0 "Type")} in
  SynDeclProdExt {ident = nameNoSym s,
                  params = [],
                  includes = [],
                  globalExt = globExt,
                  individualExts = map parseExt indivExts,
                  info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>

