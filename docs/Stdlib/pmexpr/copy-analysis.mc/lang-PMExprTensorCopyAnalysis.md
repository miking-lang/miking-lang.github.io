import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprTensorCopyAnalysis  
  

Performs analyses to determine whether copying of tensors can be omitted. The  
current implementation only applies to tensors used in very specific ways,  
and only considers the top\-level of the code.

  
  
  
## Types  
  

          <DocBlock title="CopyAnalysisEnv" kind="type">

```mc
type CopyAnalysisEnv : { accelerateData: Map Name AccelerateData, uninitTensors: Set Name }
```



<ToggleWrapper text="Code..">
```mc
type CopyAnalysisEnv = {
    accelerateData : Map Name AccelerateData,
    uninitTensors : Set Name
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="initCopyAnalysisEnv" kind="sem">

```mc
sem initCopyAnalysisEnv : Map Name PMExprExtractAccelerate_AccelerateData -> Ast_Expr -> PMExprTensorCopyAnalysis_CopyAnalysisEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem initCopyAnalysisEnv accelerateData =
  | t ->
    { accelerateData = accelerateData
    , uninitTensors = findUninitializedTensors (setEmpty nameCmp) t }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findUninitializedTensors" kind="sem">

```mc
sem findUninitializedTensors : Set Name -> Ast_Expr -> Set Name
```

<Description>{`Finds the identifiers of tensors that are allocated using the  
uninitialized constants.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findUninitializedTensors tensors =
  | TmDecl (x & {decl = DeclLet t}) ->
    let tensors =
      match t.body with TmApp {lhs = TmConst {val = CTensorCreateUninitInt _ |
                                                    CTensorCreateUninitFloat _}} then
        setInsert t.ident tensors
      else tensors in
    findUninitializedTensors tensors x.inexpr
  | TmDecl x -> findUninitializedTensors tensors x.inexpr
  | _ -> tensors
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateTensorCopying" kind="sem">

```mc
sem eliminateTensorCopying : Map Name PMExprExtractAccelerate_AccelerateData -> Ast_Expr -> Map Name PMExprExtractAccelerate_AccelerateData
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateTensorCopying accelerateData =
  | t ->
    let env = initCopyAnalysisEnv accelerateData t in
    let env = omitCopyUninitialized env t in
    let env = findAccelerateExclusiveTensors env t in
    env.accelerateData
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="omitCopyUninitialized" kind="sem">

```mc
sem omitCopyUninitialized : PMExprTensorCopyAnalysis_CopyAnalysisEnv -> Ast_Expr -> PMExprTensorCopyAnalysis_CopyAnalysisEnv
```

<Description>{`Omits copying tensors that are uninitialized, and whose first use occurs  
inside an accelerated expression.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem omitCopyUninitialized env =
  | t -> omitCopyUninitializedH env (setEmpty nameCmp) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="omitCopyUninitializedH" kind="sem">

```mc
sem omitCopyUninitializedH : PMExprTensorCopyAnalysis_CopyAnalysisEnv -> Set Name -> Ast_Expr -> PMExprTensorCopyAnalysis_CopyAnalysisEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem omitCopyUninitializedH env used =
  | TmDecl (x & {decl = DeclLet t}) ->
    let f = lam x : (CopyStatus, Expr).
      match x with (status, arg) in
      match arg with TmVar {ident = ident} then
        -- NOTE(larshum, 2022-08-01): If the tensor is uninitialized and it has
        -- not been used yet, its data does not need to be copied.
        if setMem ident (setSubtract env.uninitTensors used) then
          omitCopyTo status
        else status
      else status in
    match collectAppArguments t.body with (fun, args) in
    let env =
      match fun with TmVar {ident = ident} then
        match mapLookup ident env.accelerateData with Some ad then
          let copyStatus = map f (zip ad.paramCopyStatus args) in
          let ad = {ad with paramCopyStatus = copyStatus} in
          let accelerateData = mapInsert ident ad env.accelerateData in
          {env with accelerateData = accelerateData}
        else env
      else env in
    let used =
      -- NOTE(larshum, 2022-08-01): Do not collect variables from the body of
      -- an accelerate binding.
      if mapMem t.ident env.accelerateData then used
      else setUnion (collectVariables t.body) used in
    omitCopyUninitializedH env used x.inexpr
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let collectBindingVariables = lam used. lam binding.
      setUnion (collectVariables binding.body) used in
    let used = foldl collectBindingVariables used t.bindings in
    omitCopyUninitializedH env used x.inexpr
  | TmDecl {decl = DeclType _ | DeclConDef _ | DeclUtest _ | DeclExt _, inexpr = inexpr} ->
    omitCopyUninitializedH env used inexpr
  | _ -> env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectVariables" kind="sem">

```mc
sem collectVariables : Ast_Expr -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectVariables =
  | t -> collectVariablesH (setEmpty nameCmp) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectVariablesH" kind="sem">

```mc
sem collectVariablesH : Set Name -> Ast_Expr -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectVariablesH vars =
  | TmVar t -> setInsert t.ident vars
  | t -> sfold_Expr_Expr collectVariablesH vars t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findAccelerateExclusiveTensors" kind="sem">

```mc
sem findAccelerateExclusiveTensors : PMExprTensorCopyAnalysis_CopyAnalysisEnv -> Ast_Expr -> PMExprTensorCopyAnalysis_CopyAnalysisEnv
```

<Description>{`Finds tensors that are exclusively used within an accelerate expression,  
after their definition. Such tensors do not need to be copied back to the  
OCaml code.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findAccelerateExclusiveTensors env =
  | t ->
    let used = collectVariablesUsedOutsideAccelerate env (setEmpty nameCmp) t in
    findAccelerateExclusiveTensorsH env used t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_isTensorCreateConstant" kind="sem">

```mc
sem _isTensorCreateConstant : ConstAst_Const -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _isTensorCreateConstant =
  | CTensorCreateUninitInt _ | CTensorCreateUninitFloat _ | CTensorCreateInt _
  | CTensorCreateFloat _ | CTensorCreate _ -> true
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findAccelerateExclusiveTensorsH" kind="sem">

```mc
sem findAccelerateExclusiveTensorsH : PMExprTensorCopyAnalysis_CopyAnalysisEnv -> Set Name -> Ast_Expr -> PMExprTensorCopyAnalysis_CopyAnalysisEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findAccelerateExclusiveTensorsH env used =
  | TmDecl (x & {decl = DeclLet t}) ->
    let f = lam x : (CopyStatus, Expr).
      match x with (status, arg) in
      match arg with TmVar {ident = ident} then
        -- NOTE(larshum, 2022-08-01): If the variable is not used outside
        -- accelerate expressions (after initialization), we omit copying it
        -- from the accelerated code to OCaml.
        if setMem ident used then status
        else omitCopyFrom status
      else status in
    match collectAppArguments t.body with (fun, args) in
    let env =
      match fun with TmVar {ident = ident} then
        match mapLookup ident env.accelerateData with Some ad then
          let copyStatus = map f (zip ad.paramCopyStatus args) in
          let ad = {ad with paramCopyStatus = copyStatus} in
          let accelerateData = mapInsert ident ad env.accelerateData in
          {env with accelerateData = accelerateData}
        else env
      else env in
    findAccelerateExclusiveTensorsH env used x.inexpr
  | TmDecl x -> findAccelerateExclusiveTensorsH env used x.inexpr
  | _ -> env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectVariablesUsedOutsideAccelerate" kind="sem">

```mc
sem collectVariablesUsedOutsideAccelerate : PMExprTensorCopyAnalysis_CopyAnalysisEnv -> Set Name -> Ast_Expr -> Set Name
```

<Description>{`Collects a set of all variables that are used outside of accelerate  
expressions, i.e. by ignoring the definitions of accelerate bindings and  
the variables used in calls to accelerate bindings.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectVariablesUsedOutsideAccelerate env used =
  | app & (TmApp _) ->
    match collectAppArguments app with (fun, args) in
    match fun with TmVar {ident = ident} then
      if mapMem ident env.accelerateData then used
      else collectVariables app
    else collectVariables app
  | TmDecl (x & {decl = DeclLet t}) ->
    let used =
      if mapMem t.ident env.accelerateData then used
      else setUnion (collectVariables t.body) used in
    collectVariablesUsedOutsideAccelerate env used x.inexpr
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let collectBindingVariables = lam used. lam binding.
      if mapMem binding.ident env.accelerateData then used
      else setUnion (collectVariables binding.body) used in
    let used = foldl collectBindingVariables used t.bindings in
    collectVariablesUsedOutsideAccelerate env used x.inexpr
  | TmDecl x -> collectVariablesUsedOutsideAccelerate env used x.inexpr
  | _ -> used
```
</ToggleWrapper>
</DocBlock>

