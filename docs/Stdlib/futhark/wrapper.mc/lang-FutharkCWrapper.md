import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkCWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="futharkContextInit" kind="sem">

```mc
sem futharkContextInit : PMExprCWrapper_CWrapperEnv -> [CTopAst_CTop]
```

<Description>{`Generates global Futhark context config and context variables along with a  
function to initialize them if they have not already been initialized.  
This allows us to reuse the same context instead of constructing a new one  
for each call, which significantly reduces the overhead of accelerate  
calls.  
  
NOTE\(larshum, 2021\-10\-19\): As we do not know when the last accelerate call  
happens, the context config and context are not freed. This should not be  
a problem because all values should be deallocated after each Futhark  
call.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem futharkContextInit =
  | env ->
    match env.targetEnv with FutharkTargetEnv fenv in
    let ctxConfigStructId = _getIdentExn "futhark_context_config" in
    let ctxStructId = _getIdentExn "futhark_context" in
    let ctxConfigIdent = fenv.futharkContextConfigIdent in
    let ctxIdent = fenv.futharkContextIdent in
    let initBody = [
      CSIf {
        cond = CEBinOp {
          op = COEq (),
          lhs = CEVar {id = ctxConfigIdent},
          rhs = CEVar {id = _getIdentExn "NULL"}
        },
        thn = [
          CSExpr { expr = CEBinOp {
            op = COAssign (),
            lhs = CEVar {id = ctxConfigIdent},
            rhs = CEApp {
              fun = _getIdentExn "futhark_context_config_new", args = []}}},
          CSExpr { expr = CEBinOp {
            op = COAssign (),
            lhs = CEVar {id = ctxIdent},
            rhs = CEApp {
              fun = _getIdentExn "futhark_context_new",
              args = [CEVar {id = ctxConfigIdent}]}}}],
        els = []}] in
    [ CTDef {
        ty = CTyPtr {ty = CTyStruct {id = Some ctxConfigStructId,
                                     mem = None ()}},
        id = Some ctxConfigIdent,
        init = None ()},
      CTDef {
        ty = CTyPtr {ty = CTyStruct {id = Some ctxStructId, mem = None ()}},
        id = Some ctxIdent,
        init = None ()},
      CTFun {
        ret = CTyVoid (),
        id = fenv.initContextIdent,
        params = [],
        body = initBody} ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateInitWrapperEnv" kind="sem">

```mc
sem generateInitWrapperEnv : () -> PMExprCWrapper_CWrapperEnv
```



<ToggleWrapper text="Code..">
```mc
sem generateInitWrapperEnv =
  | _ ->
    let targetEnv = FutharkTargetEnv {
      initContextIdent = nameSym "initContext",
      futharkContextConfigIdent = nameSym "config",
      futharkContextIdent = nameSym "ctx"} in
    let env : CWrapperEnv = _emptyWrapperEnv () in
    {env with targetEnv = targetEnv}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateMarshallingCode" kind="sem">

```mc
sem generateMarshallingCode : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```



<ToggleWrapper text="Code..">
```mc
sem generateMarshallingCode =
  | env ->
    let stmt1 = generateOCamlToCWrapper env in
    let stmt2 = generateCToFutharkWrapper env in
    let stmt3 = generateFutharkCall env in
    let stmt4 = generateFutharkToCWrapper env in
    let stmt5 = generateCToOCamlWrapper env in
    join [stmt1, stmt2, stmt3, stmt4, stmt5]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateWrapperCode" kind="sem">

```mc
sem generateWrapperCode : Map Name PMExprExtractAccelerate_AccelerateData -> CProgAst_CProg
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateWrapperCode =
  | accelerated ->
    let env = generateInitWrapperEnv () in
    match generateWrapperCodeH env accelerated with (env, entryPointWrappers) in
    let contextInit = futharkContextInit env in
    -- NOTE(larshum, 2021-08-27): According to
    -- https://ocaml.org/manual/intfc.html CAML_NAME_SPACE should be defined
    -- before including caml headers, but the current C AST does not support
    -- this. It seems to be working without it, though.
    CPProg {
      includes = [
        "<stddef.h>",
        "<stdlib.h>",
        "<stdio.h>",
        "\"mexpr-futhark.h\"",
        "\"caml/alloc.h\"",
        "\"caml/memory.h\"",
        "\"caml/mlvalues.h\""
      ],
      tops = join [contextInit, entryPointWrappers]}
```
</ToggleWrapper>
</DocBlock>

