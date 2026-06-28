import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkCWrapperBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CDataRepr" kind="syn">

```mc
syn CDataRepr
```

<Description>{`Definition of the intermediate representation definitions for the Futhark  
backend. Note that nested sequences are treated as one 'FutharkSeqRepr',  
and that sequences can only contain base types.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn CDataRepr =
  | FutharkSeqRepr {ident : Name, data : CDataRepr, dimIdents : [Name],
                    sizeIdent : Name, elemTy : CType}
  | FutharkRecordRepr {fields : [CDataRepr]}
  | FutharkBaseTypeRepr {ident : Name, ty : CType}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TargetWrapperEnv" kind="syn">

```mc
syn TargetWrapperEnv
```

<Description>{`In the Futhark\-specific environment, we store identifiers related to the  
Futhark context config and the context.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn TargetWrapperEnv =
  | FutharkTargetEnv {
      initContextIdent : Name, futharkContextConfigIdent : Name,
      futharkContextIdent : Name}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getFutharkElementTypeString" kind="sem">

```mc
sem getFutharkElementTypeString : CExprTypeAst_CType -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getFutharkElementTypeString =
  | CTyChar _ | CTyInt64 _ -> "i64"
  | CTyDouble _ -> "f64"
  | CTyPtr t -> getFutharkElementTypeString t.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getSeqFutharkTypeString" kind="sem">

```mc
sem getSeqFutharkTypeString : PMExprCWrapper_CDataRepr -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getSeqFutharkTypeString =
  | FutharkSeqRepr t ->
    let elemTyStr = getFutharkElementTypeString t.elemTy in
    let dims = length t.dimIdents in
    join [elemTyStr, "_", int2string dims, "d"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getFutharkCType" kind="sem">

```mc
sem getFutharkCType : PMExprCWrapper_CDataRepr -> CExprTypeAst_CType
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getFutharkCType =
  | t & (FutharkSeqRepr _) ->
    let seqTypeStr = getSeqFutharkTypeString t in
    let seqTypeIdent = _getIdentOrInitNew (concat "futhark_" seqTypeStr) in
    CTyPtr {ty = CTyStruct {id = Some seqTypeIdent, mem = None ()}}
  | FutharkRecordRepr t ->
    -- TODO(larshum, 2022-03-09): How do we figure out this type?
    error "Records have not been implemented for Futhark"
  | FutharkBaseTypeRepr t -> t.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mexprToCType" kind="sem">

```mc
sem mexprToCType : Ast_Type -> CExprTypeAst_CType
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mexprToCType =
  | TyInt _ -> CTyInt64 ()
  | TyFloat _ -> CTyDouble ()
  | TyBool _ -> CTyChar ()
  | TyChar _ -> CTyChar ()
  | ty ->
    let tystr = use MExprPrettyPrint in type2str ty in
    errorSingle [infoTy ty]
      (join ["Type ", tystr, " cannot be passed to accelerated expressions ",
             "using the functional backend."])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateCDataRepresentation" kind="sem">

```mc
sem _generateCDataRepresentation : PMExprCWrapper_CWrapperEnv -> Ast_Type -> PMExprCWrapper_CDataRepr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateCDataRepresentation env =
  | TySeq ty ->
    recursive let findSequenceDimensions = lam n. lam ty.
      match ty with TySeq t then
        findSequenceDimensions (addi n 1) t.ty
      else (n, ty)
    in
    match findSequenceDimensions 0 (TySeq ty) with (dims, elemType) in
    if isBaseType elemType then
      let dimIdents = create dims (lam. nameSym "d") in
      FutharkSeqRepr {
        ident = nameSym "seq_tmp", data = _generateCDataRepresentation env ty.ty,
        dimIdents = dimIdents, sizeIdent = nameSym "n",
        elemTy = mexprToCType elemType}
    else
      let tystr = use MExprPrettyPrint in type2str (TySeq ty) in
      errorSingle [ty.info] (join ["Sequences of ", tystr, " are not supported in Futhark wrapper"])
  | TyTensor {info = info} ->
    errorSingle [info] "Tensors are not supported in Futhark wrapper"
  | (TyRecord t) & ty ->
    let labels = tyRecordOrderedLabels ty in
    let fields : [CDataRepr] =
      map
        (lam label : SID.
          match mapLookup label t.fields with Some ty then
            _generateCDataRepresentation env ty
          else
            errorSingle [t.info] "Inconsistent labels in record type")
        labels in
    FutharkRecordRepr {fields = fields}
  | ty -> FutharkBaseTypeRepr {ident = nameSym "c_tmp", ty = mexprToCType ty}
```
</ToggleWrapper>
</DocBlock>

