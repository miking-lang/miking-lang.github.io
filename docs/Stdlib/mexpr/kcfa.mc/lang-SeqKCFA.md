import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqKCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```



<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  -- Abstract representation of sequences. Contains a set of names that may
  -- flow to the sequence.
  | AVSeq { names: Set (IName,Ctx) }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cmpAbsValH" kind="sem">

```mc
sem cmpAbsValH : (CFABase_AbsVal, CFABase_AbsVal) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpAbsValH =
  | (AVSeq { names = lhs }, AVSeq { names = rhs }) -> setCmp lhs rhs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : Index_IndexMap -> KCFA_Ctx -> KCFA_CtxEnv -> Ast_Expr -> KCFA_GenFunAcc
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraints im ctx env =
  | TmDecl {decl = DeclLet { ident = ident, body = TmSeq t, info = info }} ->
    let names = foldl (lam acc: [(IName,Ctx)]. lam t: Expr.
      match t with TmVar t then
        let tident = name2int im t.info t.ident in
        cons (tident, ctxEnvLookup im t.info tident env) acc
      else acc) [] t.tms
    in
    let av: AbsVal = AVSeq { names = setOfSeq cmpINameCtx names } in
    let ident = name2int im info ident in
    let cstrs = [ CstrInit { lhs = av, rhs = (ident, ctx) } ] in
    (ctxEnvAdd ident ctx env, cstrs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absValToString" kind="sem">

```mc
sem absValToString : Index_IndexMap -> PprintEnv -> CFABase_AbsVal -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem absValToString im (env: PprintEnv) =
  | AVSeq { names = names } ->
    match mapAccumL (pprintVarINameCtx im) env (setToSeq names)
    with (env,names) in
    let names = strJoin ", " names in
    (env, join ["[{", names, "}]"])
```
</ToggleWrapper>
</DocBlock>

