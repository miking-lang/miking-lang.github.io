import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstCFA  
  

  
  
  
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
  --
  -- The \\`intermediates\\` sequence stores internal generated names used to
  -- implement higher-order constants such as foldl and map. The intermediates
  -- sequence is empty for all non-higher-order constants.
  | AVConst { id: IName, const: Const, args: [IName], intermediates: [IName] }
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
  | AVConst { id = id, const = const, args = args, intermediates = intermediates } ->
    let const = getConstStringCode 0 const in
    match mapAccumL (pprintVarIName im) env args with (env,args) in
    let args = strJoin ", " args in
    match pprintVarIName im env id with (env,id) in
    match mapAccumL (pprintVarIName im) env intermediates with (env,intermediates) in
    (env, join [const,"<", id, ">", "(", args, ")",
                if null intermediates then "" else
                  join ["[", strJoin ", " intermediates, "]"]])
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
      let ncmp = subi lhs.id rhs.id in
      if eqi 0 ncmp then
        -- We intentionally do not include the intermediates in the comparison.
        -- This ensures that every specific occurence of a constant have at
        -- most one initial AVConst. The result is that all ConstPropFuns
        -- operating on the constant share and have access to the same
        -- intermediates.
        seqCmp subi lhs.args rhs.args
      else ncmp
    else cmp
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : CFA_GenFun
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraints graph =
  | TmDecl {decl = DeclLet { ident = ident, body = TmConst t, info = info }} ->
    generateConstraintsConst graph t.info (name2intAcc graph.ia info ident) t.val
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : CFA_CFAGraphInit -> Info -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst graph info ident =
  | _ -> errorSingle [info] "Constant not supported in CFA"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="numConstIntermediates" kind="sem">

```mc
sem numConstIntermediates : ConstAst_Const -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem numConstIntermediates =
  | _ -> 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addNewConst" kind="sem">

```mc
sem addNewConst : CFA_CFAGraphInit -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addNewConst graph ident =
  | const ->
    let intermediates =
      create (numConstIntermediates const) (lam. nameSym "_intrm_") in
    match mapAccumL addKeyGet graph.ia intermediates with (ia, intermediates) in
    let cstr = CstrInit {
      lhs = AVConst {
        id = ident,
        const = const,
        args = [],
        intermediates = intermediates
      },
      rhs = ident
    } in
    { graph with cstrs = cons cstr graph.cstrs, ia = ia }
```
</ToggleWrapper>
</DocBlock>

