import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="cpsFullIdentity" kind="sem">

```mc
sem cpsFullIdentity : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cpsFullIdentity =
  | e ->
    let id = withInfo (infoTm e) (ulam_ "x" (var_ "x")) in
    cpsFullCont id e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cpsFullCont" kind="sem">

```mc
sem cpsFullCont : Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cpsFullCont k =
  | e ->
    let env = _cpsEnvDefault in
    let e = exprCps env (Some k) e in
    mapPre_Expr_Expr (exprTyCps env) e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cpsPartialIdentity" kind="sem">

```mc
sem cpsPartialIdentity : (Name -> Bool) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cpsPartialIdentity transformFun =
  | e ->
    let id = withInfo (infoTm e) (ulam_ "x" (var_ "x")) in
    cpsPartialCont transformFun id e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cpsPartialCont" kind="sem">

```mc
sem cpsPartialCont : (Name -> Bool) -> Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cpsPartialCont transformFun k =
  | e ->
    let env = { _cpsEnvDefault with transform = transformFun, partial = true } in
    let e = exprCps env (Some k) e in
    mapPre_Expr_Expr (exprTyCps env) e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps : CPSEnv -> Option Expr -> Expr -> Expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprTyCps" kind="sem">

```mc
sem exprTyCps : CPSEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem exprTyCps env =
  | e -> e -- Default is to do nothing
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyCps" kind="sem">

```mc
sem tyCps : CPSEnv -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyCps env =
  | t -> smap_Type_Type (tyCps env) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tailCall" kind="sem">

```mc
sem tailCall : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem tailCall =
  | TmDecl {decl = DeclLet { ident = ident}, inexpr = inexpr } ->
    match inexpr with TmVar { ident = varIdent } then nameEq ident varIdent
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="transform" kind="sem">

```mc
sem transform : CPSEnv -> Name -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem transform env =
  | n -> env.transform n
```
</ToggleWrapper>
</DocBlock>

