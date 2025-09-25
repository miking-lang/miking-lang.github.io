import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ast.mc  
  

Language fragments for MLang, extending those of MExpr.  
  
The Decl syntax fragment contains the top\-level declarations in an  
MCore file such as DeclInclude, DeclUtest, DeclLang, but also  
declarations that must be inside language fragments \(DeclSyn and DeclSem\).  
As such it is possible to create invalid MCore ASTs using this fragment by,  
for example, putting a DeclInclude or DeclUtest inside of a DeclInclude or  
by putting a DeclSyn or DeclSem at the top\-level.  
  
This fragement also extends the MExpr Expr and Type syntax fragments  
by adding a TmUse and TyUse respectively.  
  
An MLang program consists of a list of Decls and the expression to be  
evaluated.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/stringid.mc"} style={S.link}>stringid.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>mexpr/info.mc</a>  
  
## Types  
  

          <DocBlock title="DeclKind" kind="type">

```mc
type DeclKind
```



<ToggleWrapper text="Code..">
```mc
type DeclKind
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="BaseKind" kind="con">

```mc
con BaseKind : () -> DeclKind
```



<ToggleWrapper text="Code..">
```mc
con BaseKind : () -> DeclKind
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SumExtKind" kind="con">

```mc
con SumExtKind : () -> DeclKind
```



<ToggleWrapper text="Code..">
```mc
con SumExtKind : () -> DeclKind
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="UseDeclAst" kind="lang" link="/docs/Stdlib/mlang/ast.mc/lang-UseDeclAst">

```mc
lang UseDeclAst
```

<Description>{`DeclUse \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang UseDeclAst = Ast
  syn Decl =
  | DeclUse {ident : Name, info : Info}

  sem infoDecl =
  | DeclUse t -> t.info

  sem declWithInfo (info : Info) =
  | DeclUse t -> DeclUse {t with info = info}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TyUseAst" kind="lang" link="/docs/Stdlib/mlang/ast.mc/lang-TyUseAst">

```mc
lang TyUseAst
```



<ToggleWrapper text="Code..">
```mc
lang TyUseAst = Ast
  syn Type =
  | TyUse {ident : Name,
           info : Info,
           inty : Type}

  sem infoTy =
  | TyUse {info = info} -> info

  sem tyWithInfo info =
  | TyUse t -> TyUse {t with info = info}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LangDeclAst" kind="lang" link="/docs/Stdlib/mlang/ast.mc/lang-LangDeclAst">

```mc
lang LangDeclAst
```

<Description>{`DeclLang \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang LangDeclAst = DeclAst
  syn Decl =
  | DeclLang {ident : Name,
              includes : [Name],
              decls : [Decl],
              info : Info}

  sem infoDecl =
  | DeclLang d -> d.info

  sem declWithInfo info =
  | DeclLang d -> DeclLang {d with info = info}

  sem smapAccumL_Decl_Decl f acc =
  | DeclLang x ->
    match mapAccumL f acc x.decls with (acc, decls) in
    (acc, DeclLang {x with decls = decls})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SynDeclAst" kind="lang" link="/docs/Stdlib/mlang/ast.mc/lang-SynDeclAst">

```mc
lang SynDeclAst
```

<Description>{`DeclSyn \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang SynDeclAst = DeclAst
  syn Decl =
  | DeclSyn {ident : Name,
             params : [Name],
             defs : [{ident : Name, tyIdent : Type, tyName : Name}],
             -- The list of syns whose constructors should be included.
             -- The first string identifies the langauge of the include
             -- and the second string identifies the name.
             includes : [(String, String)],
             info : Info,
             declKind : DeclKind}

  sem infoDecl =
  | DeclSyn d -> d.info

  sem declWithInfo info =
  | DeclSyn d -> DeclSyn {d with info = info}

  sem smapAccumL_Decl_Type f acc =
  | DeclSyn x ->
    let f = lam acc. lam def.
      match f acc def.tyIdent with (acc, tyIdent) in
      (acc, {def with tyIdent = tyIdent}) in
    match mapAccumL f acc x.defs with (acc, defs) in
    (acc, DeclSyn {x with defs = defs})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SynProdExtDeclAst" kind="lang" link="/docs/Stdlib/mlang/ast.mc/lang-SynProdExtDeclAst">

```mc
lang SynProdExtDeclAst
```



<ToggleWrapper text="Code..">
```mc
lang SynProdExtDeclAst = DeclAst
  syn Decl =
  | SynDeclProdExt {ident : Name,
                    extIdent : Name,
                    params : [Name],
                    globalExt : Option Type,
                    individualExts : [{ident : Name, tyIdent : Type}],
                    includes : [(String, String)],
                    info : Info}

  sem infoDecl =
  | SynDeclProdExt {info = info} -> info

  sem declWithInfo info =
  | SynDeclProdExt d -> SynDeclProdExt {d with info = info}

  sem smapAccumL_Decl_Type f acc =
  | SynDeclProdExt x ->
    let f = lam acc. lam def.
      match f acc def.tyIdent with (acc, tyIdent) in
      (acc, {def with tyIdent = tyIdent}) in
    match mapAccumL f acc x.individualExts with (acc, individualExts) in
    (acc, SynDeclProdExt {x with individualExts = individualExts})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SemDeclAst" kind="lang" link="/docs/Stdlib/mlang/ast.mc/lang-SemDeclAst">

```mc
lang SemDeclAst
```

<Description>{`DeclSem \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang SemDeclAst = DeclAst
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
  syn Decl =
  | DeclSem DeclSemType

  sem infoDecl =
  | DeclSem d -> d.info

  sem declWithInfo info =
  | DeclSem d -> DeclSem {d with info = info}

  sem smapAccumL_Decl_Type f acc =
  | DeclSem x ->
    let farg = lam acc. lam def.
      match f acc def.tyAnnot with (acc, tyAnnot) in
      (acc, {def with tyAnnot = tyAnnot}) in
    match f acc x.tyAnnot with (acc, tyAnnot) in
    match f acc x.tyBody with (acc, tyBody) in
    match optionMapAccum (mapAccumL farg) acc x.args with (acc, args) in
    (acc, DeclSem {x with args = args, tyAnnot = tyAnnot, tyBody = tyBody})

  sem smapAccumL_Decl_Expr f acc =
  | DeclSem x ->
    let fcase = lam acc. lam c.
      match f acc c.thn with (acc, thn) in
      (acc, {c with thn = thn}) in
    match mapAccumL fcase acc x.cases with (acc, cases) in
    (acc, DeclSem {x with cases = cases})

  sem smapAccumL_Decl_Pat f acc =
  | DeclSem x ->
    let fcase = lam acc. lam c.
      match f acc c.pat with (acc, pat) in
      (acc, {c with pat = pat}) in
    match mapAccumL fcase acc x.cases with (acc, cases) in
    (acc, DeclSem {x with cases = cases})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IncludeDeclAst" kind="lang" link="/docs/Stdlib/mlang/ast.mc/lang-IncludeDeclAst">

```mc
lang IncludeDeclAst
```

<Description>{`DeclInclude \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang IncludeDeclAst = DeclAst
  syn Decl =
  | DeclInclude {path : String,
                 info : Info}

  sem infoDecl =
  | DeclInclude d -> d.info

  sem declWithInfo info =
  | DeclInclude d -> DeclInclude {d with info = info}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MLangTopLevel" kind="lang" link="/docs/Stdlib/mlang/ast.mc/lang-MLangTopLevel">

```mc
lang MLangTopLevel
```



<ToggleWrapper text="Code..">
```mc
lang MLangTopLevel = DeclAst
  type MLangProgram = {
    decls : [Decl],
    expr : Expr
  }

  sem countProgNodes : MLangProgram -> Int
  sem countProgNodes =
  | prog ->
    let count = foldl countDeclNodes 0 prog.decls in
    countExprNodes count prog.expr

  -- Todo: Extend to also look at patterns.
  sem countDeclNodes count =
  | decl ->
    let count = addi count 1 in
    let count = sfold_Decl_Decl countDeclNodes count decl in
    let count = sfold_Decl_Type countTypeNodes count decl in
    let count = sfold_Decl_Expr countExprNodes count decl in
    count

  sem smap_Prog_Decl : all acc. (acc -> Decl -> (acc, Decl)) -> acc -> MLangProgram -> (acc, MLangProgram)
  sem smap_Prog_Decl f acc =
  | prog ->
    match mapAccumL f acc prog.decls with (acc, decls) in
    (acc, {prog with decls = decls})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MLangAst" kind="lang" link="/docs/Stdlib/mlang/ast.mc/lang-MLangAst">

```mc
lang MLangAst
```



<ToggleWrapper text="Code..">
```mc
lang MLangAst =

  -- Top level program
  MLangTopLevel

  -- Additional expressions

  -- Declarations
  + LangDeclAst + SynDeclAst + SemDeclAst + LetDeclAst + TypeDeclAst
  + RecLetsDeclAst + DataDeclAst + UtestDeclAst + ExtDeclAst + IncludeDeclAst
  + UseDeclAst + TyUseAst
end
```
</ToggleWrapper>
</DocBlock>

