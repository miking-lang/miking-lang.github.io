import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlTypeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | OTyList {info : Info, ty : Type}
  | OTyArray {info : Info, ty : Type}
  | OTyTuple {info : Info, tys : [Type]}
  | OTyBigarrayGenarray {info : Info, layout : Type, elty : Type, ty : Type}
  | OTyBigarrayArray {
      info : Info, rank : Int,  layout : Type, elty : Type, ty : Type
    }
  | OTyBigarrayFloat64Elt {info : Info}
  | OTyBigarrayIntElt {info : Info}
  | OTyBigarrayClayout {info : Info}
  | OTyLabel {info : Info, label : String, ty : Type}
  | OTyVar {info : Info, ident : Name}
  | OTyVarExt {info : Info, ident : String, args : [Type]}
  | OTyParam {info : Info, ident : String}
  | OTyRecord {info : Info, fields : [(String, Type)], tyident : Type}
  | OTyRecordExt {
      info : Info,
      fields : [{label : String, asLabel : String, ty : Type}],
      tyident : Type
    }
  | OTyString {info: Info}
  | OTyInlinedRecord {info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoTy" kind="sem">

```mc
sem infoTy : Ast_Type -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTy =
  | OTyList r -> r.info
  | OTyArray r -> r.info
  | OTyTuple r -> r.info
  | OTyBigarrayGenarray r -> r.info
  | OTyBigarrayArray r -> r.info
  | OTyBigarrayFloat64Elt r -> r.info
  | OTyBigarrayIntElt r -> r.info
  | OTyBigarrayClayout r -> r.info
  | OTyLabel r -> r.info
  | OTyVarExt r -> r.info
  | OTyParam r -> r.info
  | OTyRecord r -> r.info
  | OTyRecordExt r -> r.info
  | OTyString r -> r.info
  | OTyInlinedRecord r -> r.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Type_Type" kind="sem">

```mc
sem smapAccumL_Type_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Type -> (acc, Ast_Type)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Type_Type f acc =
  | OTyList t ->
    match f acc t.ty with (acc, ty) in
    (acc, OTyList {t with ty = ty})
  | OTyArray t ->
    match f acc t.ty with (acc, ty) in
    (acc, OTyArray {t with ty = ty})
  | OTyTuple t ->
    match mapAccumL f acc t.tys with (acc, tys) in
    (acc, OTyTuple {t with tys = tys})
  | OTyBigarrayGenarray t ->
    match t with {ty = ty, elty = elty, layout = layout} in
    match f acc ty with (acc, ty) in
    match f acc elty with (acc, elty) in
    match f acc layout with (acc, layout) in
    let t = {{{t with ty = ty} with elty = elty} with layout = layout} in
    (acc, OTyBigarrayGenarray t)
  | OTyBigarrayArray t ->
    match t with {ty = ty, elty = elty, layout = layout} in
    match f acc ty with (acc, ty) in
    match f acc elty with (acc, elty) in
    match f acc layout with (acc, layout) in
    let t = {{{t with ty = ty} with elty = elty} with layout = layout} in
    (acc, OTyBigarrayArray t)
  | OTyLabel t ->
    match f acc t.ty with (acc, ty) in
    (acc, OTyLabel {t with ty = ty})
  | OTyVarExt t ->
    match mapAccumL f acc t.args with (acc, args) in
    (acc, OTyVarExt {t with args = args})
  | OTyRecord t ->
    let fieldFun = lam acc. lam field : (String, Type).
      match f acc field.1 with (acc, ty) in
      (acc, (field.0, ty))
    in
    match mapAccumL fieldFun acc t.fields with (acc, fields) in
    match f acc t.tyident with (acc, tyident) in
    (acc, OTyRecord {{t with fields = fields}
                        with tyident = tyident})
  | OTyRecordExt t ->
    let fieldFun =
      lam acc. lam field : {label : String, asLabel : String, ty : Type}.
        match f acc field.ty with (acc, ty) in
        (acc, { field with ty = ty })
    in
    match mapAccumL fieldFun acc t.fields with (acc, fields) in
    match f acc t.tyident with (acc, tyident) in
    (acc, OTyRecordExt {{t with fields = fields}
                           with tyident = tyident})
```
</ToggleWrapper>
</DocBlock>

