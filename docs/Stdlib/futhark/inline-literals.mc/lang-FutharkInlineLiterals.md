import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkInlineLiterals  
  

  
  
  
## Types  
  

          <DocBlock title="InlineEnv" kind="type">

```mc
type InlineEnv : Map Name FutExpr
```



<ToggleWrapper text="Code..">
```mc
type InlineEnv = Map Name FutExpr
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="inlineLiterals" kind="sem">

```mc
sem inlineLiterals : FutharkAst_FutProg -> FutharkAst_FutProg
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inlineLiterals =
  | FProg t ->
    let inlineEnv = mapEmpty nameCmp in
    match mapAccumL inlineLiteralsDecl inlineEnv t.decls with (_, decls) in
    FProg {t with decls = decls}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inlineLiteralsDecl" kind="sem">

```mc
sem inlineLiteralsDecl : FutharkInlineLiterals_InlineEnv -> FutharkAst_FutDecl -> (FutharkInlineLiterals_InlineEnv, FutharkAst_FutDecl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inlineLiteralsDecl env =
  | FDeclConst t -> (mapInsert t.ident t.val env, FDeclConst t)
  | FDeclFun t -> (env, FDeclFun {t with body = inlineLiteralsExpr env t.body})
  | d -> (env, d)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inlineLiteralsExpr" kind="sem">

```mc
sem inlineLiteralsExpr : FutharkInlineLiterals_InlineEnv -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inlineLiteralsExpr env =
  | FEVar t ->
    match mapLookup t.ident env with Some expr then expr
    else FEVar t
  | FELet t ->
    let body = inlineLiteralsExpr env t.body in
    match body with FERecord _ | FEConst _ then
      let env = mapInsert t.ident body env in inlineLiteralsExpr env t.inexpr
    else FELet {t with body = body, inexpr = inlineLiteralsExpr env t.inexpr}
  | e -> smap_FExpr_FExpr (inlineLiteralsExpr env) e
```
</ToggleWrapper>
</DocBlock>

