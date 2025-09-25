import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ast.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>mexpr/ast-builder.mc</a>, <a href={"/docs/Stdlib/extrec/ast.mc"} style={S.link}>extrec/ast.mc</a>  
  
## Types  
  

          <DocBlock title="OCamlTopBinding" kind="type">

```mc
type OCamlTopBinding : { ident: Name, tyBody: Type, body: Expr }
```



<ToggleWrapper text="Code..">
```mc
type OCamlTopBinding =
  { ident : Name
  , tyBody : use Ast in Type
  , body : use Ast in Expr
  }
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="OCamlTopAst" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlTopAst">

```mc
lang OCamlTopAst
```



<ToggleWrapper text="Code..">
```mc
lang OCamlTopAst = Ast
  syn Top =
  | OTopTypeDecl { ident : Name, ty : Type }
  | OTopVariantTypeDecl { ident : Name, constrs : Map Name Type }
  | OTopCExternalDecl { ident : Name, ty : Type, bytecodeIdent : Name,
                        nativeIdent : Name }
  | OTopLet { ident : Name, tyBody: Type, body : Expr }
  | OTopRecLets { bindings : [OCamlTopBinding] }
  | OTopExpr { expr : Expr }
  | OTopTryWith { try : Expr, arms : [(Pat, Expr)] }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlDefaultError" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlDefaultError">

```mc
lang OCamlDefaultError
```



<ToggleWrapper text="Code..">
```mc
lang OCamlDefaultError = Ast
  sem infoTm =
  | _ -> error "infoTm not implemented for OCaml terms!"

  sem tyTm =
  | _ -> error "tyTm not implemented for OCaml terms!"

  sem withType ty =
  | _ -> error "withType not implemented for OCaml terms!"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlRecord" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlRecord">

```mc
lang OCamlRecord
```



<ToggleWrapper text="Code..">
```mc
lang OCamlRecord = Ast
  syn Expr =
  | OTmRecord {bindings : [(String, Expr)], tyident : Type}
  | OTmProject {field : String, tm : Expr}

  syn Pat =
  | OPatRecord {bindings : Map SID Pat}

  sem smapAccumL_Expr_Expr
    : all acc. (acc -> Expr -> (acc, Expr)) -> acc -> Expr -> (acc, Expr)
  sem smapAccumL_Expr_Expr f acc =
  | OTmRecord t ->
    let bindFunc = lam acc. lam bind : (String, Expr).
      match f acc bind.1 with (acc, expr) then
        (acc, (bind.0, expr))
      else never in
    match mapAccumL bindFunc acc t.bindings with (acc, bindings) then
      (acc, OTmRecord {t with bindings = bindings})
    else never
  | OTmProject t ->
    match f acc t.tm with (acc, tm) then
      (acc, OTmProject {t with tm = tm})
    else never

  sem smapAccumL_Pat_Pat
    : all acc. (acc -> Pat -> (acc, Pat)) -> acc -> Pat -> (acc, Pat)
  sem smapAccumL_Pat_Pat f acc =
  | OPatRecord t ->
    match mapMapAccum (lam acc. lam. lam p. f acc p) acc t.bindings
    with (acc, bindings) then
      (acc, OPatRecord {t with bindings = bindings})
    else never
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlRecordUpdate" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlRecordUpdate">

```mc
lang OCamlRecordUpdate
```



<ToggleWrapper text="Code..">
```mc
lang OCamlRecordUpdate = Ast
  syn Expr =
  | OTmRecordUpdate {rec : Expr, updates : [(SID, Expr)]}

  sem smapAccumL_Expr_Expr
    : all acc. (acc -> Expr -> (acc, Expr)) -> acc -> Expr -> (acc, Expr)
  sem smapAccumL_Expr_Expr f acc =
  | OTmRecordUpdate t ->
    let updatesFunc = lam acc. lam update.
      match update with (key, value) in
      match f acc value with (acc, value) in
      (acc, (key, value))
    in
    match f acc t.rec with (acc, rec) in
    match mapAccumL updatesFunc acc t.updates with (acc, updates) in
    (acc, OTmRecordUpdate {t with rec = rec, updates = updates})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlMatch" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlMatch">

```mc
lang OCamlMatch
```



<ToggleWrapper text="Code..">
```mc
lang OCamlMatch = Ast
  syn Expr =
  | OTmMatch
    { target : Expr
    , arms : [(Pat, Expr)]
    }

  syn Pat =

  sem smapAccumL_Expr_Expr
    : all acc. (acc -> Expr -> (acc, Expr)) -> acc -> Expr -> (acc, Expr)
  sem smapAccumL_Expr_Expr f acc =
  | OTmMatch t ->
    let armsFunc = lam acc. lam arm : (Pat, Expr).
      match f acc arm.1 with (acc, expr) then
        (acc, (arm.0, expr))
      else never in
    match f acc t.target with (acc, target) then
      match mapAccumL armsFunc acc t.arms with (acc, arms) then
        (acc, OTmMatch {{t with target = target}
                           with arms = arms})
      else never
    else never
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlArray" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlArray">

```mc
lang OCamlArray
```



<ToggleWrapper text="Code..">
```mc
lang OCamlArray = Ast
  syn Expr =
  | OTmArray {tms : [Expr]}

  sem smapAccumL_Expr_Expr
    : all acc. (acc -> Expr -> (acc, Expr)) -> acc -> Expr -> (acc, Expr)
  sem smapAccumL_Expr_Expr f acc =
  | OTmArray t ->
    match mapAccumL f acc t.tms with (acc, tms) then
      (acc, OTmArray {t with tms = tms})
    else never
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlTuple" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlTuple">

```mc
lang OCamlTuple
```



<ToggleWrapper text="Code..">
```mc
lang OCamlTuple = Ast
  syn Expr =
  | OTmTuple { values : [Expr] }

  syn Pat =
  | OPatTuple { pats : [Pat] }

  sem smapAccumL_Expr_Expr
    : all acc. (acc -> Expr -> (acc, Expr)) -> acc -> Expr -> (acc, Expr)
  sem smapAccumL_Expr_Expr f acc =
  | OTmTuple t ->
    match mapAccumL f acc t.values with (acc, values) then
      (acc, OTmTuple {t with values = values})
    else never

  sem smapAccumL_Pat_Pat
    : all acc. (acc -> Pat -> (acc, Pat)) -> acc -> Pat -> (acc, Pat)
  sem smapAccumL_Pat_Pat f acc =
  | OPatTuple t ->
    match mapAccumL f acc t.pats with (acc, pats) then
      (acc, OPatTuple {t with pats = pats})
    else never
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlData" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlData">

```mc
lang OCamlData
```



<ToggleWrapper text="Code..">
```mc
lang OCamlData = Ast
  syn Expr =
  | OTmConApp { ident : Name, args : [Expr] }

  syn Pat =
  | OPatCon { ident : Name, args : [Pat] }

  sem smapAccumL_Expr_Expr
    : all acc. (acc -> Expr -> (acc, Expr)) -> acc -> Expr -> (acc, Expr)
  sem smapAccumL_Expr_Expr f acc =
  | OTmConApp t ->
    match mapAccumL f acc t.args with (acc, args) then
      (acc, OTmConApp {t with args = args})
    else never

  sem smapAccumL_Pat_Pat
    : all acc. (acc -> Pat -> (acc, Pat)) -> acc -> Pat -> (acc, Pat)
  sem smapAccumL_Pat_Pat f acc =
  | OPatCon t ->
    match mapAccumL f acc t.args with (acc, args) then
      (acc, OPatCon {t with args = args})
    else never
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlString" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlString">

```mc
lang OCamlString
```



<ToggleWrapper text="Code..">
```mc
lang OCamlString = Ast
  syn Expr =
  | OTmString { text : String }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlExternal" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlExternal">

```mc
lang OCamlExternal
```

<Description>{`This fragment contains variants of other ocaml constructs where the  
names should appear exactly as specified, intended to be used to  
refer to externally defined names, e.g., in the ocaml standard  
library. Note that these names will not affect other names in any  
way, meaning that these names should be chosen so that they  
\*cannot\* overlap with other names. An easy way to do that is to  
always use fully qualified names, since normal names cannot contain  
dots.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang OCamlExternal = Ast
  syn Expr =
  | OTmVarExt { ident : String }
  | OTmConAppExt { ident : String, args : [Expr] }
  | OTmExprExt { expr : String }

  syn Pat =
  | OPatConExt { ident : String, args : [Pat] }

  sem smapAccumL_Expr_Expr
    : all acc. (acc -> Expr -> (acc, Expr)) -> acc -> Expr -> (acc, Expr)
  sem smapAccumL_Expr_Expr f acc =
  | OTmConAppExt t ->
    match mapAccumL f acc t.args with (acc, args) then
      (acc, OTmConAppExt {t with args = args})
    else never

  sem smapAccumL_Pat_Pat
    : all acc. (acc -> Pat -> (acc, Pat)) -> acc -> Pat -> (acc, Pat)
  sem smapAccumL_Pat_Pat f acc =
  | OPatConExt t ->
    match mapAccumL f acc t.args with (acc, args) then
      (acc, OPatConExt {t with args = args})
    else never
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlLabel" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlLabel">

```mc
lang OCamlLabel
```



<ToggleWrapper text="Code..">
```mc
lang OCamlLabel = Ast
  syn Expr =
  | OTmLabel { label : String, arg : Expr }

  sem smapAccumL_Expr_Expr
    : all acc. (acc -> Expr -> (acc, Expr)) -> acc -> Expr -> (acc, Expr)
  sem smapAccumL_Expr_Expr f acc =
  | OTmLabel t ->
    match f acc t.arg with (acc, arg) then
      (acc, OTmLabel {t with arg = arg})
    else never
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlLam" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlLam">

```mc
lang OCamlLam
```



<ToggleWrapper text="Code..">
```mc
lang OCamlLam = Ast
  syn Expr =
  | OTmLam {label : Option String, ident : Name, body : Expr}

  sem smapAccumL_Expr_Expr
    : all acc. (acc -> Expr -> (acc, Expr)) -> acc -> Expr -> (acc, Expr)
  sem smapAccumL_Expr_Expr f acc =
  | OTmLam t ->
    match f acc t.body with (acc, body) then
      (acc, OTmLam {t with body = body})
    else never
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlTypeAst" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlTypeAst">

```mc
lang OCamlTypeAst
```



<ToggleWrapper text="Code..">
```mc
lang OCamlTypeAst =
  BoolTypeAst + IntTypeAst + FloatTypeAst + CharTypeAst + RecordTypeAst +
  FunTypeAst + OCamlLabel

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

  sem smapAccumL_Type_Type
    : all acc. (acc -> Type -> (acc, Type)) -> acc -> Type -> (acc, Type)
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
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OCamlAst" kind="lang" link="/docs/Stdlib/ocaml/ast.mc/lang-OCamlAst">

```mc
lang OCamlAst
```



<ToggleWrapper text="Code..">
```mc
lang OCamlAst =
  -- Tops
  OCamlTopAst +

  -- Terms
  VarAst + LamAst + AppAst + LetDeclAst + RecLetsDeclAst + RecordAst + OCamlMatch + OCamlTuple +
  OCamlArray + OCamlData + OCamlRecord + OCamlRecordUpdate + OCamlLabel +
  OCamlLam + PlaceholderAst + 

  -- Constants
  ArithIntAst + ShiftIntAst + ArithFloatAst + BoolAst + FloatIntConversionAst +
  IntCharConversionAst + OCamlString + RefOpAst +

  -- Patterns
  NamedPat + IntPat + CharPat + BoolPat +

  -- Compares
  CmpIntAst + CmpFloatAst + CharAst + CmpCharAst +

  -- Other
  OCamlDefaultError + OCamlExternal +

  -- Types
  OCamlTypeAst
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="otylist_" kind="let">

```mc
let otylist_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otylist_ = use OCamlAst in
  lam ty. OTyList {info = NoInfo (), ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otyarray_" kind="let">

```mc
let otyarray_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otyarray_ = use OCamlAst in
  lam ty. OTyArray {info = NoInfo (), ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otygenarray_" kind="let">

```mc
let otygenarray_ ty elty layout : Ast_Type -> Ast_Type -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otygenarray_ = use OCamlAst in
  lam ty. lam elty. lam layout.
    OTyBigarrayGenarray {
      info = NoInfo (), layout = layout, elty = elty, ty = ty
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otybaarray_" kind="let">

```mc
let otybaarray_ rank ty elty layout : Int -> Ast_Type -> Ast_Type -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otybaarray_ = use OCamlAst in
  lam rank. lam ty. lam elty. lam layout.
    OTyBigarrayArray {
      info = NoInfo (), rank = rank, layout = layout, elty = elty, ty = ty
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="oclayout_" kind="let">

```mc
let oclayout_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let oclayout_ = use OCamlAst in
  OTyBigarrayClayout {info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otygenarrayclayoutint_" kind="let">

```mc
let otygenarrayclayoutint_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otygenarrayclayoutint_ = use OCamlAst in
  otygenarray_ tyint_ (OTyBigarrayIntElt {info = NoInfo ()}) oclayout_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otygenarrayclayoutfloat_" kind="let">

```mc
let otygenarrayclayoutfloat_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otygenarrayclayoutfloat_ = use OCamlAst in
  otygenarray_ tyfloat_ (OTyBigarrayFloat64Elt {info = NoInfo ()}) oclayout_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otybaarrayclayoutint_" kind="let">

```mc
let otybaarrayclayoutint_ rank : Int -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otybaarrayclayoutint_ = use OCamlAst in
  lam rank.
    otybaarray_ rank tyint_ (OTyBigarrayIntElt {info = NoInfo ()}) oclayout_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otybaarrayclayoutfloat_" kind="let">

```mc
let otybaarrayclayoutfloat_ rank : Int -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otybaarrayclayoutfloat_ = use OCamlAst in
  lam rank.
    otybaarray_
      rank tyfloat_ (OTyBigarrayFloat64Elt {info = NoInfo ()}) oclayout_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otytuple_" kind="let">

```mc
let otytuple_ tys : [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otytuple_ = use OCamlAst in
  lam tys. OTyTuple {info = NoInfo (), tys = tys}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otyunit_" kind="let">

```mc
let otyunit_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otyunit_ = otytuple_ []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otyvarext_" kind="let">

```mc
let otyvarext_ ident args : String -> [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otyvarext_ = use OCamlAst in
  lam ident. lam args. OTyVarExt {info = NoInfo (), ident = ident, args = args}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otyparam_" kind="let">

```mc
let otyparam_ ident : String -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otyparam_ = use OCamlAst in
  lam ident. OTyParam {info = NoInfo (), ident = ident}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otylabel_" kind="let">

```mc
let otylabel_ label ty : String -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otylabel_ = use OCamlAst in
  lam label. lam ty. OTyLabel {info = NoInfo (), label = label, ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otyrecord_" kind="let">

```mc
let otyrecord_ tyident fields : Ast_Type -> [(String, Ast_Type)] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otyrecord_ = use OCamlAst in
  lam tyident. lam fields.
    OTyRecord {info = NoInfo (), tyident = tyident, fields = fields}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otyrecordext_" kind="let">

```mc
let otyrecordext_ tyident fields : Ast_Type -> [{ty: Ast_Type, label: String, asLabel: String}] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otyrecordext_ = use OCamlAst in
  lam tyident. lam fields.
    OTyRecordExt {info = NoInfo (), tyident = tyident, fields = fields}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otystring_" kind="let">

```mc
let otystring_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otystring_ = use OCamlAst in
  OTyString {info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="otyopaque_" kind="let">

```mc
let otyopaque_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let otyopaque_ = otyvarext_ "opaque" []
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr
()
```
</ToggleWrapper>
</DocBlock>

