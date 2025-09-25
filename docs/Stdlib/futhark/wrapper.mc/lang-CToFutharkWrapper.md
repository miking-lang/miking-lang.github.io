import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CToFutharkWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="_generateCToFutharkWrapperArgH" kind="sem">

```mc
sem _generateCToFutharkWrapperArgH : Name -> PMExprCWrapper_ArgData -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateCToFutharkWrapperArgH ctxIdent arg =
  | FutharkSeqRepr t ->
    let futharkSeqTypeStr = getSeqFutharkTypeString (FutharkSeqRepr t) in
    let seqTypeIdent = _getIdentOrInitNew (concat "futhark_" futharkSeqTypeStr) in
    let seqNewIdent = _getIdentOrInitNew (concat "futhark_new_" futharkSeqTypeStr) in
    let allocStmt = CSDef {
      ty = CTyPtr {ty = CTyStruct {id = Some seqTypeIdent, mem = None ()}},
      id = Some arg.gpuIdent,
      init = Some (CIExpr {expr = CEApp {
        fun = seqNewIdent,
        args =
          concat
            [CEVar {id = ctxIdent}, CEVar {id = t.ident}]
            (map (lam id. CEVar {id = id}) t.dimIdents)}})} in
    let freeCTempStmt = CSExpr {expr = CEApp {
      fun = _getIdentExn "free",
      args = [CEVar {id = t.ident}]}} in
    [allocStmt, freeCTempStmt]
  | FutharkRecordRepr t ->
    -- TODO(larshum, 2022-03-09): Implement support for passing records to
    -- Futhark.
    error "Record parameters have not been implemented for Futhark"
  | FutharkBaseTypeRepr t ->
    [CSDef {
      ty = CTyPtr {ty = t.ty}, id = Some arg.gpuIdent,
      init = Some (CIExpr {expr = CEVar {id = t.ident}})}]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateCToFutharkWrapperArg" kind="sem">

```mc
sem _generateCToFutharkWrapperArg : Name -> [CStmtAst_CStmt] -> PMExprCWrapper_ArgData -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateCToFutharkWrapperArg ctxIdent accStmts =
  | arg ->
    let stmts = _generateCToFutharkWrapperArgH ctxIdent arg arg.cData in
    concat accStmts stmts
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateCToFutharkWrapper" kind="sem">

```mc
sem generateCToFutharkWrapper : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateCToFutharkWrapper =
  | env ->
    match env.targetEnv with FutharkTargetEnv fenv in
    let ctxIdent = fenv.futharkContextIdent in
    let initContextCall = CSExpr {expr = CEApp {
      fun = fenv.initContextIdent, args = []}} in
    cons
      initContextCall
      (foldl (_generateCToFutharkWrapperArg ctxIdent) [] env.arguments)
```
</ToggleWrapper>
</DocBlock>

