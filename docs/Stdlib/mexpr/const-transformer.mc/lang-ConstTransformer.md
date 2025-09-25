import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstTransformer  
  

  
  
  
## Semantics  
  

          <DocBlock title="constTransform" kind="sem">

```mc
sem constTransform : [_b] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constTransform builtin =
  | t ->
      let f = lam acc. lam v.
        match v with (x, c) then mapInsert x (Some (uconst_ c)) acc else never in
      let env = foldl f (mapEmpty cmpString) builtin in
      let t2 = ctWorker env t in
      --dprint t2;
      t2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctWorkerDecl" kind="sem">

```mc
sem ctWorkerDecl : Map String (Option Ast_Expr) -> Ast_Decl -> (Map String (Option Ast_Expr), Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem ctWorkerDecl (env: Map String (Option Expr)) =
  | DeclLet r ->
    let body = ctWorker env r.body in
    (mapInsert (nameGetStr r.ident) (None()) env, DeclLet {r with body = body})
  | DeclRecLets r ->
    let fEnv = lam acc. lam b:DeclLetRecord. mapInsert (nameGetStr b.ident) (None()) acc in
    let env = foldl fEnv env r.bindings in
    let bindings = map (lam b:DeclLetRecord. {b with body = ctWorker env b.body}) r.bindings in
    (env, DeclRecLets {r with bindings = bindings})
  | d & DeclExt r ->
    (mapInsert (nameGetStr r.ident) (None()) env, d)
  | d -> (env, smap_Decl_Expr (ctWorker env) d)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctWorker" kind="sem">

```mc
sem ctWorker : Map String (Option Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem ctWorker (env: Map String (Option Expr)) =
  | TmDecl x ->
    match ctWorkerDecl env x.decl with (env, decl) in
    let inexpr = ctWorker env x.inexpr in
    TmDecl {x with decl = decl, inexpr = inexpr}
  | TmLam r ->
    let t = ctWorker (mapInsert (nameGetStr r.ident) (None()) env) r.body in
    TmLam {r with body = t}
  | TmVar r ->
    let ident = nameGetStr r.ident in
    match mapFindOrElse (lam. Some (TmVar r)) ident env with Some tm
    then _constWithInfos r.info tm else TmVar r
  | TmMatch r ->
    let fEnv = lam acc. lam x. mapInsert x (None()) acc in
    let env2 = foldl fEnv env (ctGetPatVars [] r.pat) in
    TmMatch {r with target = ctWorker env r.target
                  , thn = ctWorker env2 r.thn
                  , els = ctWorker env r.els}
  | t -> smap_Expr_Expr (ctWorker env) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctGetPatVars" kind="sem">

```mc
sem ctGetPatVars : [String] -> Ast_Pat -> [String]
```



<ToggleWrapper text="Code..">
```mc
sem ctGetPatVars (acc: [String]) =
  | PatNamed r ->
      match r.ident with PName n then cons (nameGetStr n) acc else acc
  | t -> sfold_Pat_Pat ctGetPatVars acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constTransformConstsToVars" kind="sem">

```mc
sem constTransformConstsToVars : Map ConstAst_Const Name -> Ast_Expr -> Ast_Expr
```

<Description>{`Replaces all constants in an expression with variables where the name of  
the variable is defined by \`env\`. Only constant that are  
present in \`env\` are replaced.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constTransformConstsToVars env =
  | t & TmConst r ->
    optionMapOr t
      (lam ident. TmVar {
        ident = ident,
        ty = r.ty,
        info = r.info,
        frozen = false
      })
      (mapLookup r.val env)
  | t -> smap_Expr_Expr (constTransformConstsToVars env) t
```
</ToggleWrapper>
</DocBlock>

