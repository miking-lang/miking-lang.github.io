import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclCosemPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclCosem t ->
    match pprintVarName env t.ident with (env, ident) in

    let pair = match t.tyAnnot with !TyUnknown _ then
      match getTypeStringCode indent env t.tyAnnot with (env, tyStr) in
      (env, Some (join ["cosem ", ident, " : ", tyStr]))
    else
      (env, None ()) in

    match pair with (env, typeAnnotStr) in

    let eqSym = if t.isBase then " = " else " *= " in

    let pprintCase = lam env. lam cs.
      match cs with (copat, tm) in
      match getCopatStringCode indent env copat with (env, copat) in
      match pprintCode (pprintIncr indent) env tm with (env, tm) in
      (env, join [pprintSpacing indent, "| ", copat, " <- ", "\n",
                  pprintSpacing (pprintIncr indent), tm]) in
    match mapAccumL pprintCase env t.cases with (env, str) in
    let str = strJoin "\n" str in

    let bodyStr = join ["cosem ", ident, eqSym, "\n", str] in

    match typeAnnotStr with Some typeAnnotStr then
      (env, join [typeAnnotStr, pprintNewline indent, bodyStr])
    else
      (env, bodyStr)
```
</ToggleWrapper>
</DocBlock>

