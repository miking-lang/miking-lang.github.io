import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprCWrapper  
  

Defines an extensible C wrapper generation language fragment. This fragment  
can be extended to implement the target\-specific parts of the wrapper, while  
allowing reuse of the parts that all targets will have in common.

  
  
  
## Types  
  

          <DocBlock title="ArgData" kind="type">

```mc
type ArgData : { mexprIdent: Name, mexprType: Type, copyStatus: CopyStatus, cData: CDataRepr, gpuIdent: Name }
```



<ToggleWrapper text="Code..">
```mc
type ArgData = {
    -- The identifier and type of the OCaml value representing the MExpr
    -- argument.
    mexprIdent : Name,
    mexprType : Type,

    -- A status used to determine whether copying a parameter can be omitted,
    -- when copying between OCaml and the accelerate backend. Currently only
    -- used for tensors in the CUDA backend.
    copyStatus : CopyStatus,

    -- The intermediate representation of the argument in C.
    cData : CDataRepr,

    -- The identifier of the argument in the GPU backend. We do not store an
    -- explicit type of the argument as the type is backend-specific.
    gpuIdent : Name
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CWrapperEnv" kind="type">

```mc
type CWrapperEnv : { arguments: [ArgData], return: ArgData, functionIdent: Name, targetEnv: TargetWrapperEnv }
```



<ToggleWrapper text="Code..">
```mc
type CWrapperEnv = {
    -- Identifiers and type of the arguments of the function. These are needed
    -- to keep track of identifiers (in OCaml, C and the GPU target) across
    -- multiple translation steps.
    arguments : [ArgData],

    -- Identifiers and type of the return value. Needed for the same reason as
    -- above.
    return : ArgData,

    -- The name of the GPU function that is being called.
    functionIdent : Name,

    -- Environment containing target-specific variables.
    targetEnv : TargetWrapperEnv}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="CDataRepr" kind="syn">

```mc
syn CDataRepr
```

<Description>{`Defines a representation of a certain data type, with the specifics  
defined per backend.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn CDataRepr =
  | PlaceholderRepr ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TargetWrapperEnv" kind="syn">

```mc
syn TargetWrapperEnv
```



<ToggleWrapper text="Code..">
```mc
syn TargetWrapperEnv =
  | EmptyTargetEnv ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="defaultArgData" kind="sem">

```mc
sem defaultArgData : () -> PMExprCWrapper_ArgData
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem defaultArgData =
  | () ->
    { mexprIdent = nameNoSym "", mexprType = tyunknown_
    , copyStatus = CopyBoth () , cData = PlaceholderRepr ()
    , gpuIdent = nameNoSym "" }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_emptyWrapperEnv" kind="sem">

```mc
sem _emptyWrapperEnv : () -> PMExprCWrapper_CWrapperEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _emptyWrapperEnv =
  | () ->
    { arguments = [], return = defaultArgData (), functionIdent = nameNoSym ""
    , targetEnv = EmptyTargetEnv () }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_wosize" kind="sem">

```mc
sem _wosize : CExprTypeAst_CExpr -> CExprTypeAst_CExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _wosize = 
  | e -> CEApp {fun = _getIdentExn "Wosize_val", args = [e]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isBaseType" kind="sem">

```mc
sem isBaseType : Ast_Type -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isBaseType =
  | TyInt _ | TyFloat _ | TyBool _ | TyChar _ -> true
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateCDataRepresentation" kind="sem">

```mc
sem _generateCDataRepresentation : PMExprCWrapper_CWrapperEnv -> Ast_Type -> PMExprCWrapper_CDataRepr
```

<Description>{`This implementation is backend\-specific`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateCDataRepresentation : CWrapperEnv -> Type -> CDataRepr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ocamlToCConversionFunctionIdent" kind="sem">

```mc
sem ocamlToCConversionFunctionIdent : CExprTypeAst_CType -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ocamlToCConversionFunctionIdent =
  | CTyChar _ | CTyInt _ -> _getIdentExn "Int_val"
  | CTyInt64 _ -> _getIdentExn "Long_val"
  | CTyFloat _ | CTyDouble _ -> _getIdentExn "Double_val"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cToOCamlConversionFunctionIdent" kind="sem">

```mc
sem cToOCamlConversionFunctionIdent : CExprTypeAst_CType -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cToOCamlConversionFunctionIdent =
  | CTyChar _ | CTyInt _ -> _getIdentExn "Val_int"
  | CTyInt64 _ -> _getIdentExn "Val_long"
  | CTyFloat _ | CTyDouble _ -> _getIdentExn "caml_copy_double"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getCReturnType" kind="sem">

```mc
sem _getCReturnType : Ast_Type -> CExprTypeAst_CType
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _getCReturnType =
  | TyRecord t ->
    if mapIsEmpty t.fields then
      CTyVoid ()
    else
      CTyVar {id = _getIdentExn "value"}
  | _ -> CTyVar {id = _getIdentExn "value"}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateBytecodeWrapper" kind="sem">

```mc
sem generateBytecodeWrapper : PMExprExtractAccelerate_AccelerateData -> CTopAst_CTop
```

<Description>{`Generates an additional wrapper function to be referenced from OCaml. This  
function is used when calling from bytecode \(hence the name\) and also when  
the function takes more than five parameters.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateBytecodeWrapper =
  | data ->
    let returnType = _getCReturnType data.returnType in
    let bytecodeStr = nameGetStr data.bytecodeWrapperId in
    let bytecodeFunctionName = nameSym bytecodeStr in
    let args = nameSym "args" in
    let argc = nameSym "argc" in
    let nargs = length data.params in
    let functionArgs =
      map
        (lam i. CEBinOp {
          op = COSubScript (),
          lhs = CEVar {id = args},
          rhs = CEInt {i = i}})
        (create nargs (lam i. i)) in
    let valueTy = CTyVar {id = _getIdentExn "value"} in
    CTFun {
      ret = returnType,
      id = bytecodeFunctionName,
      params = [(CTyPtr {ty = valueTy}, args), (CTyInt (), argc)],
      body = [CSRet {val = Some (CEApp {
        fun = data.identifier,
        args = functionArgs})}]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateCAMLParamDeclarations" kind="sem">

```mc
sem generateCAMLParamDeclarations : [PMExprCWrapper_ArgData] -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateCAMLParamDeclarations =
  | args ->
    let genParamStmt : [ArgData] -> String -> CStmt = lam args. lam funStr.
      let nargsStr = int2string (length args) in
      let camlParamIdent = _getIdentOrInitNew (concat funStr nargsStr) in
      CSExpr {expr = CEApp {
        fun = camlParamIdent,
        args = map (lam arg : ArgData. CEVar {id = arg.mexprIdent}) args}} in
    let nargs = length args in
    let fstArgs = subsequence args 0 5 in
    let fstDeclStmt = genParamStmt fstArgs "CAMLparam" in
    if gti nargs 5 then
      recursive let generateExtraParamDecl = lam args.
        let nargs = length args in
        let declStmt = genParamStmt (subsequence args 0 5) "CAMLxparam" in
        if gti nargs 5 then
          cons
            declStmt
            (generateExtraParamDecl (subsequence args 5 (length args)))
        else [declStmt] in
      let remainingArgs = subsequence args 5 (length args) in
      cons fstDeclStmt (generateExtraParamDecl remainingArgs)
    else [fstDeclStmt]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateMarshallingCode" kind="sem">

```mc
sem generateMarshallingCode : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`Defines the generation of marshalling code between OCaml and the GPU  
backend, including conversion between C and calls to functions defined by  
the GPU backend. As this generation depends on the GPU backend, it is only  
declared here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateMarshallingCode : CWrapperEnv -> [CStmt]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateWrapperFunctionCode" kind="sem">

```mc
sem generateWrapperFunctionCode : PMExprCWrapper_CWrapperEnv -> PMExprExtractAccelerate_AccelerateData -> [CTopAst_CTop]
```

<Description>{`Generates the main function of the wrapper code. This is the function that  
manages the marshalling between OCaml and the target GPU language.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateWrapperFunctionCode env =
  | data ->
    let toArgData = lam x : (CopyStatus, (Name, Type)).
      match x with (status, (id, ty)) in
      let default : ArgData = defaultArgData () in
      {{{{{default with mexprIdent = id}
                   with mexprType = ty}
                   with copyStatus = status}
                   with cData = _generateCDataRepresentation env ty}
                   with gpuIdent = nameSym "gpu_tmp"} in
    let bytecodeWrapper = generateBytecodeWrapper data in
    let returnIdent = nameSym "out" in
    let returnArg = (returnIdent, data.returnType) in
    let arguments = map toArgData (zip data.paramCopyStatus data.params) in
    let env = {{{env with arguments = arguments}
                     with return = toArgData (CopyBoth (), returnArg)}
                     with functionIdent = data.identifier} in
    let camlParamStmts = generateCAMLParamDeclarations env.arguments in
    let stmts = generateMarshallingCode env in
    let value = _getIdentExn "value" in
    let stmts =
      let returnTypeIsEmptyRecord =
        match data.returnType with TyRecord t then mapIsEmpty t.fields
        else false
      in
      if returnTypeIsEmptyRecord then
        let camlReturnStmt = CSExpr {expr = CEVar {
          id = _getIdentExn "CAMLreturn0"
        }} in
        join [camlParamStmts, stmts, [camlReturnStmt]]
      else
        let camlLocalStmt = CSExpr {expr = CEApp {
          fun = _getIdentExn "CAMLlocal1",
          args = [CEVar {id = returnIdent}]}} in
        let camlReturnStmt = CSExpr {expr = CEApp {
          fun = _getIdentExn "CAMLreturn",
          args = [CEVar {id = returnIdent}]}} in
        join [camlParamStmts, [camlLocalStmt], stmts, [camlReturnStmt]] in
    let withValueType = lam arg : (Name, Type).
      (CTyVar {id = value}, arg.0) in
    [ CTFun {
        ret = _getCReturnType data.returnType,
        id = data.identifier,
        params = map withValueType data.params,
        body = stmts}
    , bytecodeWrapper ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateWrapperCodeH" kind="sem">

```mc
sem generateWrapperCodeH : PMExprCWrapper_CWrapperEnv -> Map Name PMExprExtractAccelerate_AccelerateData -> (PMExprCWrapper_CWrapperEnv, [CTopAst_CTop])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateWrapperCodeH env =
  | accelerated ->
    let entryPointWrappers =
      map (generateWrapperFunctionCode env) (mapValues accelerated) in
    (env, join entryPointWrappers)
```
</ToggleWrapper>
</DocBlock>

