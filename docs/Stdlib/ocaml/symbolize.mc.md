import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# symbolize.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/symbolize.mc"} style={S.link}>mexpr/symbolize.mc</a>  
  
## Languages  
  

          <DocBlock title="OCamlSym" kind="lang" link="/docs/Stdlib/ocaml/symbolize.mc/lang-OCamlSym">

```mc
lang OCamlSym
```



<ToggleWrapper text="Code..">
```mc
lang OCamlSym =
  VarSym + AppAst + LamSym + LetSym + RecLetsSym + RecordAst + ConstAst
  + NamedPatSym + IntPat + CharPat + BoolPat + RecordAst
  + OCamlMatch + OCamlTuple + OCamlData
  + UnknownTypeAst + IntTypeAst + BoolTypeAst + FloatTypeAst + CharTypeAst
  + RecordTypeAst + ConTypeSym + OCamlExternal
  + OCamlString + OCamlRecord + OCamlLabel

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
end
```
</ToggleWrapper>
</DocBlock>

