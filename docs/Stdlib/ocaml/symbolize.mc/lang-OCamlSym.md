import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr (env : SymEnv) =
  | OTmMatch {target = target, arms = arms} ->
    let symbArm = lam arm.
      match arm with (pat, expr) in
      match symbolizePat env (mapEmpty cmpString) pat with (patEnv, pat) in
      let thnEnv = symbolizeUpdateVarEnv env patEnv in
      (pat, symbolizeExpr thnEnv expr)
    in
    OTmMatch { target = symbolizeExpr env target, arms = map symbArm arms }
  | OTmConApp t ->
    let ident =
      getSymbol {kind = "constructor",
                 info = [],
                 allowFree = env.allowFree}
        env.currentEnv.conEnv t.ident
    in
    let args = map (symbolizeExpr env) t.args in
    OTmConApp {t with ident = ident,
                      args = args}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizePat" kind="sem">

```mc
sem symbolizePat : all ext. SymEnv -> Map String Name -> Ast_Pat -> (Map String Name, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizePat env patEnv =
  | OPatCon t ->
    let ident =
      getSymbol {kind = "constructor",
                 info = [],
                 allowFree = env.allowFree}
        env.currentEnv.conEnv t.ident
    in
    match mapAccumL (symbolizePat env) patEnv t.args with (patEnv, args) in
    (patEnv, OPatCon {t with ident = ident,
                             args = args})
```
</ToggleWrapper>
</DocBlock>

