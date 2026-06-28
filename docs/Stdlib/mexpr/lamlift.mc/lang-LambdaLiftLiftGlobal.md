import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LambdaLiftLiftGlobal  
  

  
  
  
## Semantics  
  

          <DocBlock title="liftGlobal" kind="sem">

```mc
sem liftGlobal : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem liftGlobal =
  | TmDecl x ->
    match smapAccumL_Decl_Expr liftGlobalH [] x.decl with (lifted, decl) in
    let inexpr = liftGlobal x.inexpr in
    bindall_ lifted (TmDecl {x with decl = decl, inexpr = inexpr})
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let lifted = collectBindingsToRecLet t.info t.bindings in
    bindall_ lifted (liftGlobal x.inexpr)
  | t ->
    match liftGlobalH [] t with (lifted, t) in
    bindall_ lifted t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getLetBindings" kind="sem">

```mc
sem getLetBindings : Ast_Decl -> Either [LetDeclAst_DeclLetRecord] Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getLetBindings =
  | DeclLet x -> Left [x]
  | DeclRecLets x -> Left x.bindings
  | d -> Right d
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectBindingsToRecLet" kind="sem">

```mc
sem collectBindingsToRecLet : Info -> [LetDeclAst_DeclLetRecord] -> [Ast_Decl]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectBindingsToRecLet info = | bindings ->
    let f = lam acc. lam bind.
      match liftGlobalH acc bind.body with (acc, body) in
      (acc, {bind with body = body}) in
    match mapAccumL f [] bindings with (decls, bindings) in
    let decls = snoc decls (DeclRecLets {info = info, bindings = bindings}) in
    let decls = map getLetBindings decls in
    match eitherPartition decls with (bindings, decls) in
    snoc decls (DeclRecLets {bindings = join bindings, info = info})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="liftGlobalH" kind="sem">

```mc
sem liftGlobalH : [Ast_Decl] -> Ast_Expr -> ([Ast_Decl], Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem liftGlobalH lifted =
  | t -> smapAccumL_Expr_Expr liftGlobalH lifted t
  | TmDecl (x & {decl = DeclType _ | DeclConDef _ | DeclExt _}) ->
    liftGlobalH (snoc lifted x.decl) x.inexpr
  | TmDecl (x & {decl = DeclLet t}) ->
    match liftGlobalH lifted t.body with (lifted, body) in
    match t.body with TmLam _ then
      let lifted = snoc lifted (DeclLet {t with body = body}) in
      liftGlobalH lifted x.inexpr
    else match liftGlobalH lifted x.inexpr with (lifted, inexpr) in
    (lifted, TmDecl {x with decl = DeclLet {t with body = body}, inexpr = inexpr})
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let newLifted = collectBindingsToRecLet t.info t.bindings in
    liftGlobalH (concat lifted newLifted) x.inexpr
```
</ToggleWrapper>
</DocBlock>

