import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkCallWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateFutharkCall" kind="sem">

```mc
sem generateFutharkCall : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateFutharkCall =
  | env ->
    match env.targetEnv with FutharkTargetEnv fenv in
    let return : ArgData = env.return in
    let returnType = return.mexprType in

    -- Declare Futhark return value
    let futResultDeclStmt = CSDef {
      ty = getFutharkCType return.cData,
      id = Some return.gpuIdent, init = None ()} in
    -- TODO(larshum, 2021-09-03): This only works under the assumption that the
    -- function name (i.e. the string) is unique.
    let functionStr =
      match futPprintEnvGetStr pprintEnvEmpty env.functionIdent with (_, ident) in
      ident
    in
    let funcId = nameSym (concat "futhark_entry_" functionStr) in
    let returnCodeIdent = nameSym "v" in
    let returnCodeDeclStmt = CSDef {
      ty = CTyInt64 (), id = Some returnCodeIdent, init = None ()
    } in

    -- Call Futhark entry point and synchronize context afterwards
    let args =
      map
        (lam arg : ArgData.
          match arg.cData with FutharkBaseTypeRepr _ then
            CEUnOp {op = CODeref (), arg = CEVar {id = arg.gpuIdent}}
          else CEVar {id = arg.gpuIdent})
        env.arguments in
    let functionCallStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = returnCodeIdent},
      rhs = CEApp {
        fun = funcId,
        args =
          concat
            [ CEVar {id = fenv.futharkContextIdent}
            , CEUnOp {op = COAddrOf (), arg = CEVar {id = return.gpuIdent}} ]
            args}}} in
    let contextSyncStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = returnCodeIdent},
      rhs = CEApp {
        fun = _getIdentExn "futhark_context_sync",
        args = [CEVar {id = fenv.futharkContextIdent}]}}} in

    -- Handle Futhark errors by printing the error message and exiting
    let errorHandlingStmt = CSIf {
      cond = CEBinOp {
        op = CONeq (),
        lhs = CEVar {id = returnCodeIdent},
        rhs = CEInt {i = 0}},
      thn = [
        CSExpr {expr = CEApp {
          fun = _getIdentExn "printf",
          args = [
            CEString {s = "Runtime error in generated code: %s\n"},
            CEApp {
              fun = _getIdentExn "futhark_context_get_error",
              args = [CEVar {id = fenv.futharkContextIdent}]}]}},
        CSExpr {expr = CEApp {
          fun = _getIdentExn "exit",
          args = [CEVar {id = returnCodeIdent}]}}],
      els = []} in

    -- Deallocate the Futhark input values
    let deallocStmts =
      join
        (map
          (lam arg : ArgData.
            match arg.cData with FutharkSeqRepr t then
              let futTypeStr = getSeqFutharkTypeString (FutharkSeqRepr t) in
              let futFreeStr = concat "futhark_free_" futTypeStr in
              let deallocIdent = _getIdentOrInitNew futFreeStr in
              [CSExpr {expr = CEApp {
                fun = deallocIdent,
                args = [
                  CEVar {id = fenv.futharkContextIdent},
                  CEVar {id = arg.gpuIdent}]}}]
            else [])
          env.arguments)
    in

    concat
      [futResultDeclStmt, returnCodeDeclStmt, functionCallStmt,
       errorHandlingStmt, contextSyncStmt, errorHandlingStmt]
      deallocStmts
```
</ToggleWrapper>
</DocBlock>

