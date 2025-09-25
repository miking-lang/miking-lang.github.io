import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# repr-ast.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>  
  
## Types  
  

          <DocBlock title="OpCost" kind="type">

```mc
type OpCost : Float
```

<Description>{`NOTE\(vipa, 2023\-06\-12\): We assume a certain collection size and  
explicitly evaluate the cost expression`}</Description>


<ToggleWrapper text="Code..">
```mc
type OpCost = Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ReprContent" kind="type">

```mc
type ReprContent
```

<Description>{`A representation unification variable, for use in the UCT analysis`}</Description>


<ToggleWrapper text="Code..">
```mc
type ReprContent
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ReprVar" kind="type">

```mc
type ReprVar : Ref ReprContent
```



<ToggleWrapper text="Code..">
```mc
type ReprVar = Ref ReprContent
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ImplId" kind="type">

```mc
type ImplId : Int
```



<ToggleWrapper text="Code..">
```mc
type ImplId = Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CollectedImpl" kind="type">

```mc
type CollectedImpl : { selfCost: OpCost, body: Expr, specType: Type, info: Info }
```



<ToggleWrapper text="Code..">
```mc
type CollectedImpl = use Ast in
  { selfCost : OpCost
  , body : Expr
  , specType : Type
  , info : Info
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ImplData" kind="type">

```mc
type ImplData : { impls: Map SID [CollectedImpl], reprs: Map Name { vars: [Name], pat: Type, repr: Type } }
```



<ToggleWrapper text="Code..">
```mc
type ImplData = use Ast in
  { impls : Map SID [CollectedImpl]
  , reprs : Map Name {vars : [Name], pat : Type, repr : Type}
  }
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="UninitRepr" kind="con">

```mc
con UninitRepr : () -> ReprContent
```



<ToggleWrapper text="Code..">
```mc
con UninitRepr : () -> ReprContent
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BotRepr" kind="con">

```mc
con BotRepr : { sym: Symbol, scope: Int } -> ReprContent
```



<ToggleWrapper text="Code..">
```mc
con BotRepr :
  { sym : Symbol
  , scope : Int
  } -> ReprContent
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LinkRepr" kind="con">

```mc
con LinkRepr : ReprVar -> ReprContent
```



<ToggleWrapper text="Code..">
```mc
con LinkRepr :
  -- Invariant: link may only point to a repr with <= scope
  ReprVar -> ReprContent
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="TyWildAst" kind="lang" link="/docs/Stdlib/mexpr/repr-ast.mc/lang-TyWildAst">

```mc
lang TyWildAst
```



<ToggleWrapper text="Code..">
```mc
lang TyWildAst = Ast
  syn Type =
  | TyWild { info : Info }

  sem tyWithInfo info =
  | TyWild x -> TyWild {x with info = info}

  sem infoTy =
  | TyWild x -> x.info
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ReprTypeAst" kind="lang" link="/docs/Stdlib/mexpr/repr-ast.mc/lang-ReprTypeAst">

```mc
lang ReprTypeAst
```



<ToggleWrapper text="Code..">
```mc
lang ReprTypeAst = Ast
 syn Type =
 | TyRepr { info : Info, arg : Type, repr : ReprVar }

 sem tyWithInfo info =
 | TyRepr x -> TyRepr {x with info = info}

 sem infoTy =
 | TyRepr x -> x.info

 sem smapAccumL_Type_Type f acc =
 | TyRepr x ->
   match f acc x.arg with (acc, arg) in
   (acc, TyRepr { x with arg = arg })
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ReprSubstAst" kind="lang" link="/docs/Stdlib/mexpr/repr-ast.mc/lang-ReprSubstAst">

```mc
lang ReprSubstAst
```



<ToggleWrapper text="Code..">
```mc
lang ReprSubstAst = Ast
  syn Type =
  | TySubst { info : Info, arg : Type, subst : Name }

  sem tyWithInfo info =
  | TySubst x -> TySubst {x with info = info}

  sem infoTy =
  | TySubst x -> x.info

  sem smapAccumL_Type_Type f acc =
  | TySubst x ->
   match f acc x.arg with (acc, arg) in
   (acc, TySubst { x with arg = arg })
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OpDeclAst" kind="lang" link="/docs/Stdlib/mexpr/repr-ast.mc/lang-OpDeclAst">

```mc
lang OpDeclAst
```



<ToggleWrapper text="Code..">
```mc
lang OpDeclAst = Ast
  syn Decl =
  | DeclOp { info : Info, ident : Name, tyAnnot : Type }

  sem declWithInfo info =
  | DeclOp x -> DeclOp {x with info = info}

  sem infoDecl =
  | DeclOp x -> x.info

  sem smapAccumL_Decl_Type f acc =
  | DeclOp x ->
    match f acc x.tyAnnot with (env, tyAnnot) in
    (env, DeclOp {x with tyAnnot = tyAnnot})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OpImplAst" kind="lang" link="/docs/Stdlib/mexpr/repr-ast.mc/lang-OpImplAst">

```mc
lang OpImplAst
```



<ToggleWrapper text="Code..">
```mc
lang OpImplAst = Ast
  type DeclOpImplRec = use Ast in
    { ident : Name
    , implId : ImplId
    , reprScope : Int
    , metaLevel : Int
    , selfCost : OpCost
    , body : Expr
    , specType : Type
    , delayedReprUnifications : [(ReprVar, ReprVar)]
    , info : Info
    }
  syn Decl =
  | DeclOpImpl DeclOpImplRec

  sem infoDecl =
  | DeclOpImpl x -> x.info

  sem smapAccumL_Decl_Expr f acc =
  | DeclOpImpl x ->
    match f acc x.body with (acc, body) in
    (acc, DeclOpImpl {x with body = body})

  sem smapAccumL_Decl_Type f acc =
  | DeclOpImpl x ->
    match f acc x.specType with (acc, specType) in
    (acc, DeclOpImpl {x with specType = specType})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OpVarAst" kind="lang" link="/docs/Stdlib/mexpr/repr-ast.mc/lang-OpVarAst">

```mc
lang OpVarAst
```



<ToggleWrapper text="Code..">
```mc
lang OpVarAst = Ast
  type TmOpVarRec = {ident : Name, ty : Type, info : Info, frozen : Bool, scaling : OpCost}
  syn Expr =
  | TmOpVar TmOpVarRec

  sem tyTm =
  | TmOpVar x -> x.ty

  sem withType ty =
  | TmOpVar x -> TmOpVar {x with ty = ty}

  sem infoTm =
  | TmOpVar x -> x.info

  sem withInfo info =
  | TmOpVar x -> TmOpVar {x with info = info}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ReprDeclAst" kind="lang" link="/docs/Stdlib/mexpr/repr-ast.mc/lang-ReprDeclAst">

```mc
lang ReprDeclAst
```



<ToggleWrapper text="Code..">
```mc
lang ReprDeclAst = Ast
  syn Decl =
  | DeclRepr
    { ident : Name
    , vars : [Name]
    , pat : Type
    , repr : Type
    , info : Info
    }

  sem infoDecl =
  | DeclRepr x -> x.info

  sem declWithInfo info =
  | DeclRepr x -> DeclRepr {x with info = info}

  sem smapAccumL_Decl_Type f acc =
  | DeclRepr x ->
    match f acc x.pat with (acc, pat) in
    match f acc x.repr with (acc, repr) in
    (acc, DeclRepr {x with pat = pat, repr = repr})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RepTypesAst" kind="lang" link="/docs/Stdlib/mexpr/repr-ast.mc/lang-RepTypesAst">

```mc
lang RepTypesAst
```



<ToggleWrapper text="Code..">
```mc
lang RepTypesAst = ReprTypeAst + ReprSubstAst + OpDeclAst + OpImplAst + OpVarAst + ReprDeclAst + TyWildAst
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="botRepr" kind="let">

```mc
let botRepr r : ReprVar -> ReprVar
```



<ToggleWrapper text="Code..">
```mc
let botRepr : ReprVar -> ReprVar = lam r.
  switch deref r
  case BotRepr _ | UninitRepr _ then r
  case LinkRepr x then
    let bot = botRepr x in
    modref r (LinkRepr bot);
    bot
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="emptyImplData" kind="let">

```mc
let emptyImplData  : ImplData
```



<ToggleWrapper text="Code..">
```mc
let emptyImplData : ImplData =
  { impls = mapEmpty cmpSID
  , reprs = mapEmpty nameCmp
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeImplData" kind="let">

```mc
let mergeImplData a b : ImplData -> ImplData -> ImplData
```



<ToggleWrapper text="Code..">
```mc
let mergeImplData : ImplData -> ImplData -> ImplData = lam a. lam b.
  { impls = mapUnionWith concat a.impls b.impls
  , reprs = mapUnionWith (lam. lam. never) a.reprs b.reprs
  }
```
</ToggleWrapper>
</DocBlock>

