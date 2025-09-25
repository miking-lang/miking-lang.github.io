import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlTopGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateTops" kind="sem">

```mc
sem generateTops : GenerateEnv -> Ast_Expr -> [OCamlTopAst_Top]
```



<ToggleWrapper text="Code..">
```mc
sem generateTops (env : GenerateEnv) =
  | t ->
    match generateTopsAndExpr env t with (tops, expr) then
      snoc tops (OTopExpr { expr = expr })
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateTopsAndExpr" kind="sem">

```mc
sem generateTopsAndExpr : GenerateEnv -> Ast_Expr -> ([OCamlTopAst_Top], Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem generateTopsAndExpr (env : GenerateEnv) =
  | TmDecl (x & {decl = DeclLet t}) ->
    let here = OTopLet { ident = t.ident, tyBody = t.tyBody, body = generate env t.body } in
    let later: ([Top], Expr) = generateTopsAndExpr env x.inexpr in
    (cons here later.0, later.1)
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let f = lam binding : DeclLetRecord.
      { ident = binding.ident
      , tyBody = binding.tyBody
      , body = generate env binding.body
      } in
    let here = OTopRecLets { bindings = map f t.bindings } in
    let later: ([Top], Expr) = generateTopsAndExpr env x.inexpr in
    (cons here later.0, later.1)
  | TmDecl (x & {decl = DeclExt t}) ->
    match convertExternalBody env t.ident t.tyIdent t.info with body in
    let here = OTopLet { ident = t.ident, tyBody = t.tyIdent, body = body } in
    let later : ([Top], Expr) = generateTopsAndExpr env x.inexpr in
    (cons here later.0, later.1)
  | t ->
    ([], generate env t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="convertExternalBody" kind="sem">

```mc
sem convertExternalBody : GenerateEnv -> Name -> Ast_Type -> Info -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem convertExternalBody (env : GenerateEnv) (ident : Name) (tyIdent : Type) =
  | info ->
    match mapLookup ident env.exts with Some r then
      let r : ExternalImpl = head r in
      match convertData info env (OTmExprExt { expr = r.expr }) (r.ty, tyIdent)
      with (_, body) in
      body
    else
      errorSingle [info] (join ["No implementation for external ", nameGetStr ident])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generate" kind="sem">

```mc
sem generate : GenerateEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generate (env : GenerateEnv) =
```
</ToggleWrapper>
</DocBlock>

