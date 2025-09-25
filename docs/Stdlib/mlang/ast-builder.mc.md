import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ast-builder.mc  
  

Helper functions for creating MLang AST nodes.  
Functions for types are defined in ast.mc

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>mexpr/ast-builder.mc</a>, <a href={"/docs/Stdlib/mlang/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/extrec/ast.mc"} style={S.link}>extrec/ast.mc</a>  
  
## Variables  
  

          <DocBlock title="base_kind_" kind="let">

```mc
let base_kind_  : DeclKind
```



<ToggleWrapper text="Code..">
```mc
let base_kind_ = BaseKind ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sumext_kind_" kind="let">

```mc
let sumext_kind_  : DeclKind
```



<ToggleWrapper text="Code..">
```mc
let sumext_kind_ = SumExtKind ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nuse_" kind="let">

```mc
let nuse_ n : Name -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let nuse_ = use UseDeclAst in
  lam n.
  DeclUse {ident = n, info = NoInfo {}}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="use_" kind="let">

```mc
let use_ s : String -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let use_ =
  lam s.
  nuse_ (nameNoSym s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ntyuse_" kind="let">

```mc
let ntyuse_ n inty : Name -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ntyuse_ = use TyUseAst in
  lam n : Name. lam inty : Type.
  TyUse {ident = n,
         info = NoInfo {},
         inty = inty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyuse_" kind="let">

```mc
let tyuse_ s inty : String -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyuse_ = use TyUseAst in
  lam s : String. lam inty : Type.
  TyUse {ident = nameNoSym s,
         info = NoInfo {},
         inty = inty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_nlangin_" kind="let">

```mc
let decl_nlangin_ n nincls decls : Name -> [Name] -> [Ast_Decl] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_nlangin_ = use MLangAst in
  lam n. lam nincls. lam decls.
  DeclLang {ident = n,
            includes = nincls,
            decls = decls,
            info = NoInfo {}}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_nlangi_" kind="let">

```mc
let decl_nlangi_ n incls decls : Name -> [String] -> [Ast_Decl] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_nlangi_ = use MLangAst in
  lam n. lam incls. lam decls.
  decl_nlangin_ n (map nameNoSym incls) decls
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_langin_" kind="let">

```mc
let decl_langin_ s nincls decls : String -> [Name] -> [Ast_Decl] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_langin_ = use MLangAst in
  lam s. lam nincls. lam decls.
  decl_nlangin_ (nameNoSym s) nincls decls
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_langi_" kind="let">

```mc
let decl_langi_ s incls decls : String -> [String] -> [Ast_Decl] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_langi_ = use MLangAst in
  lam s. lam incls. lam decls.
  decl_nlangin_ (nameNoSym s) (map nameNoSym incls) decls
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_nlang_" kind="let">

```mc
let decl_nlang_ n decls : Name -> [Ast_Decl] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_nlang_ = use MLangAst in
  lam n. lam decls.
  decl_nlangin_ n [] decls
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_lang_" kind="let">

```mc
let decl_lang_ s decls : String -> [Ast_Decl] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_lang_ = use MLangAst in
  lam s. lam decls.
  decl_nlang_ (nameNoSym s) decls
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_nsynn_" kind="let">

```mc
let decl_nsynn_ isBase n ndefs : Bool -> Name -> [(Name, Ast_Type)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_nsynn_ = use MLangAst in
  lam isBase. lam n. lam ndefs: [(Name, Type)].
  DeclSyn {ident = n,
           defs = map (lam t. {ident = t.0, tyIdent = t.1, tyName = nameNoSym (concat (nameGetStr t.0) "Type")}) ndefs,
           params = [],
           includes = [],
           info = NoInfo {},
           declKind = if isBase then base_kind_ else sumext_kind_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_nsyn_" kind="let">

```mc
let decl_nsyn_ isBase n defs : Bool -> Name -> [(String, Ast_Type)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_nsyn_ = use MLangAst in
  lam isBase. lam n. lam defs: [(String, Type)].
  decl_nsynn_ isBase n (map (lam t. (nameNoSym t.0, t.1)) defs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_synn_" kind="let">

```mc
let decl_synn_ isBase s ndefs : Bool -> String -> [(Name, Ast_Type)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_synn_ = use MLangAst in
  lam isBase. lam s. lam ndefs: [(Name, Type)].
  decl_nsynn_ isBase (nameNoSym s) ndefs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_syn_" kind="let">

```mc
let decl_syn_ s defs : String -> [(String, Ast_Type)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_syn_ = use MLangAst in
  lam s. lam defs: [(String, Type)].
  decl_nsyn_ true (nameNoSym s) defs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_syn_ext_" kind="let">

```mc
let decl_syn_ext_ s defs : String -> [(String, Ast_Type)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_syn_ext_ = use MLangAst in
  lam s. lam defs: [(String, Type)].
  decl_nsyn_ false (nameNoSym s) defs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_syn_params_" kind="let">

```mc
let decl_syn_params_ s ss defs : String -> [String] -> [(String, Ast_Type)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_syn_params_ = use MLangAst in
  lam s : String. lam ss : [String]. lam defs : [(String, Type)].
  DeclSyn {ident = nameNoSym s,
           defs = map (lam t. {ident = nameNoSym t.0,
                               tyIdent = t.1,
                               tyName = nameNoSym (concat s "Type")}) defs,
           params = map nameNoSym ss,
           includes = [],
           info = NoInfo {},
           declKind = base_kind_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_nsemty_" kind="let">

```mc
let decl_nsemty_ n ty : Name -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_nsemty_ = use MLangAst in
  lam n. lam ty.
  DeclSem {ident = n, tyAnnot = ty,
           tyBody = tyunknown_, includes = [],
           args = None (), cases = [], info = NoInfo {},
           declKind = base_kind_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_semty_" kind="let">

```mc
let decl_semty_ s ty : String -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_semty_ = use MLangAst in
  lam s. lam ty.
  decl_nsemty_ (nameNoSym s) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_semty_cases_" kind="let">

```mc
let decl_semty_cases_ s ty cases : String -> Ast_Type -> [_a] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_semty_cases_ = use MLangAst in
  lam s. lam ty. lam cases.
  let n = nameNoSym s in
  DeclSem {ident = n, tyAnnot = ty,
           tyBody = tyunknown_, includes = [],
           args = Some [],
           cases = map (lam t. {pat = t.0, thn = t.1}) cases,
           info = NoInfo {},
           declKind = base_kind_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_sem_args_ty_cases_" kind="let">

```mc
let decl_sem_args_ty_cases_ s args ty cases : String -> [(String, Ast_Type)] -> Ast_Type -> [_a] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_sem_args_ty_cases_ = use MLangAst in
  lam s : String. lam args : [(String, Type)]. lam ty : Type. lam cases.
  let n = nameNoSym s in
  DeclSem {ident = n, tyAnnot = ty,
           tyBody = tyunknown_, includes = [],
           args = Some (map (lam t. {ident = nameNoSym t.0, tyAnnot = t.1}) args),
           cases = map (lam t. {pat = t.0, thn = t.1}) cases,
           info = NoInfo {},
           declKind = base_kind_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_nsem_" kind="let">

```mc
let decl_nsem_ isBase n nargs cases : Bool -> Name -> [(Name, Ast_Type)] -> [(Ast_Pat, Ast_Expr)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_nsem_ = use MLangAst in
  lam isBase. lam n. lam nargs: [(Name, Type)]. lam cases: [(Pat, Expr)].
  DeclSem {ident = n, tyAnnot = tyunknown_,
           tyBody = tyunknown_, includes = [],
           args = Some (map (lam t. {ident = t.0, tyAnnot = t.1}) nargs),
           cases = map (lam t. {pat = t.0, thn = t.1}) cases,
           info = NoInfo {},
           declKind = if isBase then base_kind_ else sumext_kind_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_nusem_" kind="let">

```mc
let decl_nusem_ n nuargs cases : Name -> [Name] -> [(Ast_Pat, Ast_Expr)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_nusem_ = use MLangAst in
  lam n. lam nuargs: [Name]. lam cases.
  decl_nsem_ true n (map (lam x. (x, tyunknown_)) nuargs) cases
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_sem_" kind="let">

```mc
let decl_sem_ s args cases : String -> [(String, Ast_Type)] -> [(Ast_Pat, Ast_Expr)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_sem_ = use MLangAst in
  lam s. lam args: [(String, Type)]. lam cases.
  decl_nsem_ true (nameNoSym s) (map (lam t. (nameNoSym t.0, t.1)) args) cases
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_sem_ext_" kind="let">

```mc
let decl_sem_ext_ s args cases : String -> [(String, Ast_Type)] -> [(Ast_Pat, Ast_Expr)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_sem_ext_ = use MLangAst in
  lam s. lam args: [(String, Type)]. lam cases.
  decl_nsem_ false (nameNoSym s) (map (lam t. (nameNoSym t.0, t.1)) args) cases
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_usem_" kind="let">

```mc
let decl_usem_ s uargs cases : String -> [String] -> [(Ast_Pat, Ast_Expr)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_usem_ = use MLangAst in
  lam s. lam uargs: [String]. lam cases.
  decl_nusem_ (nameNoSym s) (map nameNoSym uargs) cases
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl_include_" kind="let">

```mc
let decl_include_ p : String -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let decl_include_ = use MLangAst in
  lam p.
  DeclInclude {path = p, info = NoInfo {}}
```
</ToggleWrapper>
</DocBlock>

