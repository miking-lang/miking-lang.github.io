import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstKCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```



<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  -- Abstract representation of constants. Contains the constant and the
  -- arguments applied to it. It also includes the \\`let\\` name that binds the
  -- constant and syntactically distinguishes it from other of its kind in the
  -- program.
  | AVConst { id: (IName,Ctx), const: Const, args: [(IName,Ctx)] }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="absValToString" kind="sem">

```mc
sem absValToString : Index_IndexMap -> PprintEnv -> CFABase_AbsVal -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem absValToString im (env: PprintEnv) =
  | AVConst { id = id, const = const, args = args } ->
    let const = getConstStringCode 0 const in
    match mapAccumL (pprintVarINameCtx im) env args with (env,args) in
    let args = strJoin ", " args in
    match pprintVarINameCtx im env id with (env,id) in
    (env, join [const,"<", id, ">", "(", args, ")"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpAbsValH" kind="sem">

```mc
sem cmpAbsValH : (CFABase_AbsVal, CFABase_AbsVal) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpAbsValH =
  | (AVConst lhs, AVConst rhs) ->
    let cmp = cmpConst lhs.const rhs.const in
    if eqi 0 cmp then
      let ncmp = cmpINameCtx lhs.id rhs.id in
      if eqi 0 ncmp then seqCmp cmpINameCtx lhs.args rhs.args
      else ncmp
    else cmp
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
  | TmDecl {decl = DeclLet { ident = ident, body = TmConst t, info = info }} ->
    let ident = name2int im info ident in
    let cstrs = generateConstraintsConst t.info (ident,ctx) t.val in
    (ctxEnvAdd ident ctx env, cstrs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : Info -> (IName, KCFA_Ctx) -> ConstAst_Const -> [CFABase_Constraint]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst info ident =
  | _ -> errorSingle [info] "Constant not supported in CFA"
```
</ToggleWrapper>
</DocBlock>

