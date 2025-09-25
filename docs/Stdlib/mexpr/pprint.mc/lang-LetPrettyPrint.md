import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintLetAssignmentCode" kind="sem">

```mc
sem pprintLetAssignmentCode : Int -> PprintEnv -> {body: Ast_Expr, ident: Name, tyAnnot: Ast_Type} -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintLetAssignmentCode (indent : Int) (env: PprintEnv) =
  | {ident = ident, body = body, tyAnnot = tyAnnot} ->
    match pprintEnvGetStr env ident with (env,baseStr) in
    match
      match tyAnnot with TyUnknown _ then (env,"") else
      match getTypeStringCode indent env tyAnnot with (env, ty) in
      (env, concat ": " ty)
    with (env, tyStr) in
    match pprintCode (pprintIncr indent) env body with (env,bodyStr) in
    let bodySep =
      if gti (length bodyStr) env.optSingleLineLimit then
        pprintNewline (pprintIncr indent)
      else " "
    in
    (env,
     join ["let ", pprintVarString baseStr, tyStr, " =", bodySep, bodyStr])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | DeclLet t ->
    pprintLetAssignmentCode indent env {
      ident = t.ident,
      body = t.body,
      tyAnnot = t.tyAnnot
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env: PprintEnv) =
  | TmDecl (x & {decl = DeclLet t}) ->
    match pprintEnvGetStr env t.ident with (env,baseStr) in
    match pprintCode indent env x.inexpr with (env,inexpr) in
    if eqString baseStr "" then
      match printParen (pprintIncr indent) env t.body with (env,body)
      in (env, join [body, pprintNewline indent, "; ", inexpr])
    else
      match pprintLetAssignmentCode indent env {
              ident = t.ident, body = t.body, tyAnnot = t.tyAnnot}
      with (env, letStr) in
      let inSep =
        if gti (length letStr) env.optSingleLineLimit then
          pprintNewline indent
        else " "
      in
      (env,
       join [letStr, inSep, "in",
             pprintNewline indent, inexpr])
```
</ToggleWrapper>
</DocBlock>

