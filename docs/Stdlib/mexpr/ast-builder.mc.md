import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ast-builder.mc  
  

Helper functions for creating AST nodes.  
Functions for types are defined in ast.mc

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/assoc.mc"} style={S.link}>assoc.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>info.mc</a>, <a href={"/docs/Stdlib/error.mc"} style={S.link}>error.mc</a>, <a href={"/docs/Stdlib/stringid.mc"} style={S.link}>stringid.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>  
  
## Variables  
  

          <DocBlock title="noinfo_" kind="let">

```mc
let noinfo_  : Info
```

<Description>{`Info`}</Description>


<ToggleWrapper text="Code..">
```mc
let noinfo_ = NoInfo ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ityint_" kind="let">

```mc
let ityint_ i : Info -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ityint_ = use IntTypeAst in
  lam i. TyInt {info = i}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyint_" kind="let">

```mc
let tyint_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyint_ = use IntTypeAst in
  TyInt {info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ityfloat_" kind="let">

```mc
let ityfloat_ i : Info -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ityfloat_ = use FloatTypeAst in
  lam i. TyFloat {info = i}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyfloat_" kind="let">

```mc
let tyfloat_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyfloat_ = use FloatTypeAst in
  TyFloat {info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="itybool_" kind="let">

```mc
let itybool_ i : Info -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let itybool_ = use BoolTypeAst in
  lam i. TyBool {info = i}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tybool_" kind="let">

```mc
let tybool_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tybool_ = use BoolTypeAst in
  TyBool {info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tychar_" kind="let">

```mc
let tychar_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tychar_ = use CharTypeAst in
  TyChar {info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="itychar_" kind="let">

```mc
let itychar_ i : Info -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let itychar_ = use CharTypeAst in
  lam i. TyChar {info = i}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyunknown_" kind="let">

```mc
let tyunknown_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyunknown_ = use UnknownTypeAst in
  TyUnknown {info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ityunknown_" kind="let">

```mc
let ityunknown_ i : Info -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ityunknown_ = use UnknownTypeAst in
  lam i: Info.
  TyUnknown {info = i}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ityseq_" kind="let">

```mc
let ityseq_ info ty : Info -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ityseq_ = use SeqTypeAst in
  lam info. lam ty.
  TySeq {ty = ty, info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyseq_" kind="let">

```mc
let tyseq_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyseq_ = use SeqTypeAst in
  lam ty.
  ityseq_ (NoInfo ()) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tystr_" kind="let">

```mc
let tystr_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tystr_ = tyseq_ tychar_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="itystr_" kind="let">

```mc
let itystr_ i : Info -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let itystr_ = lam i. ityseq_ i (itychar_ i)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensor_" kind="let">

```mc
let tytensor_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensor_ = use TensorTypeAst in
  lam ty.
  TyTensor {ty = ty, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ityarrow_" kind="let">

```mc
let ityarrow_ info from to : Info -> Ast_Type -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ityarrow_ = use FunTypeAst in
  lam info. lam from. lam to.
  TyArrow {from = from, to = to, info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyarrow_" kind="let">

```mc
let tyarrow_ from to : Ast_Type -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyarrow_ = use FunTypeAst in
  lam from. lam to.
  ityarrow_ (NoInfo ()) from to
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyarrows_" kind="let">

```mc
let tyarrows_ tys : [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyarrows_ = use FunTypeAst in
  lam tys.
  foldr1 (lam e. lam acc. TyArrow {from = e, to = acc, info = NoInfo ()}) tys
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyRecord" kind="let">

```mc
let tyRecord info fields : Info -> [(String, Ast_Type)] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyRecord : Info -> [(String, use Ast in Type)] -> use Ast in Type =
  use RecordTypeAst in
  lam info. lam fields.
  let fieldMapFunc = lam b : (String, Type). (stringToSid b.0, b.1) in
  TyRecord {
    fields = mapFromSeq cmpSID (map fieldMapFunc fields),
    info = info
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyrecord_" kind="let">

```mc
let tyrecord_  : [(String, Ast_Type)] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyrecord_ = tyRecord (NoInfo ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="itytuple_" kind="let">

```mc
let itytuple_ i tys : Info -> [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let itytuple_ = lam i. lam tys.
  tyRecord i (mapi (lam i. lam ty. (int2string i, ty)) tys)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytuple_" kind="let">

```mc
let tytuple_ tys : [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytuple_ = lam tys.
  tyrecord_ (mapi (lam i. lam ty. (int2string i, ty)) tys)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyunit_" kind="let">

```mc
let tyunit_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyunit_ = tyrecord_ []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyvariant_" kind="let">

```mc
let tyvariant_ constrs : [(Name, Ast_Type)] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyvariant_ = use VariantTypeAst in
  lam constrs.
  TyVariant {
    constrs = mapFromSeq nameCmp constrs,
    info = NoInfo ()
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyapp_" kind="let">

```mc
let tyapp_ lhs rhs : Ast_Type -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyapp_ = use AppTypeAst in
  lam lhs. lam rhs.
  TyApp {lhs = lhs, rhs = rhs, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyapps_" kind="let">

```mc
let tyapps_ lhs args : Ast_Type -> [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyapps_ = use AppTypeAst in
  lam lhs. lam args.
  foldl tyapp_ lhs args
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyalias_" kind="let">

```mc
let tyalias_ display content : Ast_Type -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyalias_ = use AliasTypeAst in
  lam display. lam content.
  TyAlias {display = display, content = content}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nsitycon_" kind="let">

```mc
let nsitycon_ n d i : Name -> Ast_Type -> Info -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let nsitycon_ = use ConTypeAst in
  lam n. lam d. lam i.
  TyCon {ident = n, data = d, info = i}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nitycon_" kind="let">

```mc
let nitycon_ n i : Name -> Info -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let nitycon_ = lam n. lam i.
  nsitycon_ n tyunknown_ i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ntycon_" kind="let">

```mc
let ntycon_ n : Name -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ntycon_ = lam n.
  nitycon_ n (NoInfo ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tycon_" kind="let">

```mc
let tycon_ s : String -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tycon_ = lam s.
  ntycon_ (nameNoSym s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intyvar_" kind="let">

```mc
let intyvar_ i n : Info -> Name -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let intyvar_ = use VarTypeAst in
  lam i. lam n.
    TyVar {ident = n,
           info = i}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ntyvar_" kind="let">

```mc
let ntyvar_ n : Name -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ntyvar_ = use VarTypeAst in
  lam n.
  TyVar {ident = n, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyvar_" kind="let">

```mc
let tyvar_ s : String -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyvar_ =
  lam s.
  ntyvar_ (nameNoSym s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nstyall_" kind="let">

```mc
let nstyall_ n kind ty : Name -> Ast_Kind -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let nstyall_ = use AllTypeAst in
  lam n. lam kind. lam ty.
  TyAll {ident = n, info = NoInfo (), ty = ty, kind = kind}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="styall_" kind="let">

```mc
let styall_ s : String -> Ast_Kind -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let styall_ = lam s. nstyall_ (nameNoSym s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ntyall_" kind="let">

```mc
let ntyall_ n : Name -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ntyall_ : Name -> use Ast in Type -> Type  = use PolyKindAst in
  lam n.
  nstyall_ n (Poly ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyall_" kind="let">

```mc
let tyall_ s : String -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyall_ = use PolyKindAst in
  lam s.
  styall_ s (Poly ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyalls_" kind="let">

```mc
let tyalls_ strs ty : [String] -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyalls_ =
  lam strs. lam ty.
  foldr tyall_ ty strs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorcreateuninitint_" kind="let">

```mc
let tytensorcreateuninitint_  : Ast_Type
```

<Description>{`Tensor OP types`}</Description>


<ToggleWrapper text="Code..">
```mc
let tytensorcreateuninitint_ =
  tyarrow_ (tyseq_ tyint_) (tytensor_ tyint_)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorcreateuninitfloat_" kind="let">

```mc
let tytensorcreateuninitfloat_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorcreateuninitfloat_ =
  tyarrow_ (tyseq_ tyint_) (tytensor_ tyfloat_)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorcreateint_" kind="let">

```mc
let tytensorcreateint_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorcreateint_ =
  tyarrows_ [ tyseq_ tyint_
            , tyarrow_ (tyseq_ tyint_) tyint_
            , tytensor_ tyint_ ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorcreatefloat_" kind="let">

```mc
let tytensorcreatefloat_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorcreatefloat_ =
  tyarrows_ [ tyseq_ tyint_
            , tyarrow_ (tyseq_ tyint_) tyfloat_
            , tytensor_ tyfloat_ ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorcreate_" kind="let">

```mc
let tytensorcreate_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorcreate_ = lam ty.
  tyarrows_ [ tyseq_ tyint_
            , tyarrow_ (tyseq_ tyint_) ty
            , tytensor_ ty ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorgetexn_" kind="let">

```mc
let tytensorgetexn_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorgetexn_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tyseq_ tyint_
            , ty ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorsetexn_" kind="let">

```mc
let tytensorsetexn_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorsetexn_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tyseq_ tyint_
            , ty, tyunit_ ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorlineargetexn_" kind="let">

```mc
let tytensorlineargetexn_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorlineargetexn_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tyint_
            , ty ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorlinearsetexn_" kind="let">

```mc
let tytensorlinearsetexn_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorlinearsetexn_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tyint_
            , ty, tyunit_ ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorrank_" kind="let">

```mc
let tytensorrank_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorrank_ = lam ty.
  tyarrow_ (tytensor_ ty) tyint_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorshape_" kind="let">

```mc
let tytensorshape_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorshape_ = lam ty.
  tyarrow_ (tytensor_ ty) (tyseq_ tyint_)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorreshapeexn_" kind="let">

```mc
let tytensorreshapeexn_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorreshapeexn_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tyseq_ tyint_
            , tytensor_ ty ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorblitexn_" kind="let">

```mc
let tytensorblitexn_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorblitexn_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tytensor_ ty
            , tyunit_ ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorcopy_" kind="let">

```mc
let tytensorcopy_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorcopy_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tytensor_ ty]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensortransposeexn_" kind="let">

```mc
let tytensortransposeexn_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensortransposeexn_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tyint_
            , tyint_
            , tytensor_ ty ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorsliceexn_" kind="let">

```mc
let tytensorsliceexn_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorsliceexn_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tyseq_ tyint_
            , tytensor_ ty ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensorsubexn_" kind="let">

```mc
let tytensorsubexn_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensorsubexn_ = lam ty.
  tyarrows_ [ tytensor_ ty
            , tyint_
            , tyint_
            , tytensor_ ty ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensoriteri_" kind="let">

```mc
let tytensoriteri_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensoriteri_ = lam ty.
  tyarrows_ [ tyarrows_ [ tyint_
                        , tytensor_ ty
                        , tyunit_ ]
            , tytensor_ ty
            , tyunit_ ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensoreq_" kind="let">

```mc
let tytensoreq_ ty1 ty2 : Ast_Type -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensoreq_ = lam ty1. lam ty2.
  tyarrows_ [ tyarrows_ [ty1, ty2, tybool_]
            , tytensor_ ty1
            , tytensor_ ty2
            , tybool_ ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tytensortostring_" kind="let">

```mc
let tytensortostring_ ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tytensortostring_ = lam ty.
  tyarrows_ [ tyarrow_ ty tystr_
            , tytensor_ ty
            , tystr_ ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="kidata_" kind="let">

```mc
let kidata_ s : [(Name, {lower: Set Name, upper: Option (Set Name)})] -> Ast_Kind
```



<ToggleWrapper text="Code..">
```mc
let kidata_ =
  use DataKindAst in
  lam s. Data {types = mapFromSeq nameCmp s}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npvar_" kind="let">

```mc
let npvar_ n : Name -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let npvar_ = use MExprAst in
  lam n : Name.
  PatNamed {ident = PName n, info = NoInfo (), ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pvar_" kind="let">

```mc
let pvar_ s : String -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pvar_ = use MExprAst in
  lam s.
  npvar_ (nameNoSym s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pvarw_" kind="let">

```mc
let pvarw_  : Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pvarw_ = use MExprAst in
  PatNamed {ident = PWildcard (), info = NoInfo(), ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="punit_" kind="let">

```mc
let punit_  : Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let punit_ = use MExprAst in
  PatRecord { bindings = mapEmpty cmpSID, info = NoInfo(), ty = tyunknown_ }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pint_" kind="let">

```mc
let pint_ i : Int -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pint_ = use MExprAst in
  lam i.
  PatInt {val = i, info = NoInfo(), ty = tyint_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pchar_" kind="let">

```mc
let pchar_ c : Char -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pchar_ = use MExprAst in
  lam c.
  PatChar {val = c, info = NoInfo(), ty = tychar_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pbool_" kind="let">

```mc
let pbool_ b : Bool -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pbool_ = use MExprAst in
  lam b. PatBool {val = b, info = NoInfo(), ty = tybool_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ptrue_" kind="let">

```mc
let ptrue_  : Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let ptrue_ = use MExprAst in
  pbool_ true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pfalse_" kind="let">

```mc
let pfalse_  : Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pfalse_ = use MExprAst in
  pbool_ false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npcon_" kind="let">

```mc
let npcon_ n cp : Name -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let npcon_ = use MExprAst in
  lam n. lam cp.
  PatCon {ident = n, subpat = cp, info = NoInfo(), ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pcon_" kind="let">

```mc
let pcon_ cs cp : String -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pcon_ = use MExprAst in
  lam cs. lam cp.
  npcon_ (nameNoSym cs) cp
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patRecord" kind="let">

```mc
let patRecord bindings info : [(String, Ast_Pat)] -> Info -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let patRecord : [(String, use Ast in Pat)] -> Info -> use Ast in Pat =
  use MExprAst in
  lam bindings : [(String, Pat)].
  lam info : Info.
  let bindingMapFunc = lam b : (String, Pat). (stringToSid b.0, b.1) in
  PatRecord {
    bindings = mapFromSeq cmpSID (map bindingMapFunc bindings),
    info = info,
    ty = tyunknown_
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prec_" kind="let">

```mc
let prec_ bindings : [(String, Ast_Pat)] -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let prec_ = lam bindings. patRecord bindings (NoInfo ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patTuple" kind="let">

```mc
let patTuple ps info : [Ast_Pat] -> Info -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let patTuple = lam ps : use Ast in [Pat]. lam info : Info.
  patRecord (mapi (lam i. lam p. (int2string i, p)) ps) info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ptuple_" kind="let">

```mc
let ptuple_ ps : [Ast_Pat] -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let ptuple_ = lam ps. patTuple ps (NoInfo ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pseqtot_" kind="let">

```mc
let pseqtot_ ps : [Ast_Pat] -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pseqtot_ = use MExprAst in
  lam ps.
  PatSeqTot {pats = ps, info = NoInfo(), ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ipseqtot_" kind="let">

```mc
let ipseqtot_ i ps : Info -> [Ast_Pat] -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let ipseqtot_ = use MExprAst in
  lam i. lam ps.
  PatSeqTot {pats = ps, info = i, ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pstr_" kind="let">

```mc
let pstr_ str : String -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pstr_ = use MExprAst in
  lam str.
  pseqtot_ (map pchar_ str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pseqedgew_" kind="let">

```mc
let pseqedgew_ pre post : [Ast_Pat] -> [Ast_Pat] -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pseqedgew_ = use MExprAst in
  lam pre. lam post.
  PatSeqEdge {prefix = pre, middle = PWildcard (), postfix = post, info = NoInfo(), ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pseqedgen_" kind="let">

```mc
let pseqedgen_ pre middle post : [Ast_Pat] -> Name -> [Ast_Pat] -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pseqedgen_ = use MExprAst in
  lam pre. lam middle : Name. lam post.
  PatSeqEdge {prefix = pre, middle = PName middle, postfix = post, info = NoInfo(), ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pseqedge_" kind="let">

```mc
let pseqedge_ pre middle post : [Ast_Pat] -> String -> [Ast_Pat] -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pseqedge_ = use MExprAst in
  lam pre. lam middle. lam post.
  pseqedgen_ pre (nameNoSym middle) post
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pand_" kind="let">

```mc
let pand_ l r : Ast_Pat -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pand_ = use MExprAst in
  lam l. lam r.
  PatAnd {lpat = l, rpat = r, info = NoInfo(), ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="por_" kind="let">

```mc
let por_ l r : Ast_Pat -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let por_ = use MExprAst in
  lam l. lam r.
  PatOr {lpat = l, rpat = r, info = NoInfo(), ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pnot_" kind="let">

```mc
let pnot_ p : Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
let pnot_ = use MExprAst in
  lam p.
  PatNot {subpat = p, info = NoInfo(), ty = tyunknown_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bind_" kind="let">

```mc
let bind_ decl expr : Ast_Decl -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bind_ : use Ast in Decl -> Expr -> Expr
  = lam decl. lam expr. use DeclAst in
    TmDecl { decl = decl, inexpr = expr, info = NoInfo (), ty = tyunknown_ }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bindall_" kind="let">

```mc
let bindall_ decls expr : [Ast_Decl] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bindall_ : use Ast in [Decl] -> Expr -> Expr = use MExprAst in
  lam decls. lam expr.
  foldr bind_ expr decls
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="uunit_" kind="let">

```mc
let uunit_  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let uunit_ = use MExprAst in
  TmRecord {bindings = mapEmpty cmpSID, ty = tyunknown_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unit_" kind="let">

```mc
let unit_  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let unit_ = use MExprAst in
  TmRecord {bindings = mapEmpty cmpSID, ty = tyunit_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nlet_" kind="let">

```mc
let nlet_ n ty body : Name -> Ast_Type -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let nlet_ = use MExprAst in
  lam n. lam ty. lam body.
  DeclLet {ident = n, tyAnnot = ty, tyBody = ty, body = body, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="let_" kind="let">

```mc
let let_ s ty body : String -> Ast_Type -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let let_ = use MExprAst in
  lam s. lam ty. lam body.
  nlet_ (nameNoSym s) ty body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nulet_" kind="let">

```mc
let nulet_ n body : Name -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let nulet_ = use MExprAst in
  lam n. lam body.
  nlet_ n tyunknown_ body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ulet_" kind="let">

```mc
let ulet_ s body : String -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let ulet_ = use MExprAst in
  lam s. lam body.
  let_ s tyunknown_ body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="next_" kind="let">

```mc
let next_ n e ty : Name -> Bool -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let next_ = use MExprAst in
  lam n. lam e. lam ty.
  DeclExt {ident = n, tyIdent = ty, effect = e, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ext_" kind="let">

```mc
let ext_ s e ty : String -> Bool -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let ext_ = use MExprAst in
  lam s. lam e. lam ty.
  next_ (nameNoSym s) e ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ntype_" kind="let">

```mc
let ntype_ n params ty : Name -> [Name] -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let ntype_ = use MExprAst in
  lam n. lam params. lam ty.
  DeclType {ident = n, tyIdent = ty, params = params, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="type_" kind="let">

```mc
let type_ s params ty : String -> [String] -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let type_ = use MExprAst in
  lam s. lam params. lam ty.
  ntype_ (nameNoSym s) (map nameNoSym params) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nreclets_" kind="let">

```mc
let nreclets_ bs : [(Name, Ast_Type, Ast_Expr)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let nreclets_ = use MExprAst in
  lam bs.
  let bindingMapFunc = lam t : (Name, Type, Expr).
    { ident = t.0
    , tyAnnot = t.1
    , tyBody = t.1
    , body = t.2
    , info = NoInfo ()
    }
  in
  DeclRecLets {bindings = map bindingMapFunc bs, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reclets_" kind="let">

```mc
let reclets_ bs : [(String, Ast_Type, Ast_Expr)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let reclets_ = use MExprAst in
  lam bs.
  let bindingMapFunc = lam b : (String, Type, Expr).
    (nameNoSym b.0, b.1, b.2)
  in
  nreclets_ (map bindingMapFunc bs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nureclets_" kind="let">

```mc
let nureclets_ bs : [(Name, Ast_Expr)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let nureclets_ = use MExprAst in
  lam bs.
  let bindingMapFunc = lam b : (Name, Expr).
    (b.0, tyunknown_, b.1)
  in
  nreclets_ (map bindingMapFunc bs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ureclets_" kind="let">

```mc
let ureclets_ bs : [(String, Ast_Expr)] -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let ureclets_ = use MExprAst in
  lam bs.
  let bindingMapFunc = lam b : (String, Expr).
    (b.0, tyunknown_, b.1)
  in
  reclets_ (map bindingMapFunc bs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reclet_" kind="let">

```mc
let reclet_ s ty body : String -> Ast_Type -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let reclet_ = use MExprAst in
  lam s. lam ty. lam body.
  reclets_ [(s, ty, body)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ureclet_" kind="let">

```mc
let ureclet_ s body : String -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let ureclet_ = use MExprAst in
  lam s. lam body.
  ureclets_ [(s, body)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reclets_empty" kind="let">

```mc
let reclets_empty  : Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let reclets_empty = use MExprAst in
  reclets_ []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nreclets_add" kind="let">

```mc
let nreclets_add n ty body reclets : Name -> Ast_Type -> Ast_Expr -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let nreclets_add = use MExprAst in
  lam n. lam ty. lam body. lam reclets.
  match reclets with DeclRecLets t then
    let newbind = {ident = n, tyAnnot = ty, tyBody = ty, body = body, info = NoInfo ()} in
    DeclRecLets {t with bindings = cons newbind t.bindings}
  else
    errorSingle [infoDecl reclets] "reclets is not a TmRecLets construct"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reclets_add" kind="let">

```mc
let reclets_add s ty body reclets : String -> Ast_Type -> Ast_Expr -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let reclets_add = use MExprAst in
  lam s. lam ty. lam body. lam reclets.
  nreclets_add (nameNoSym s) ty body reclets
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nureclets_add" kind="let">

```mc
let nureclets_add n body reclets : Name -> Ast_Expr -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let nureclets_add = use MExprAst in
  lam n. lam body. lam reclets.
  nreclets_add n tyunknown_ body reclets
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ureclets_add" kind="let">

```mc
let ureclets_add s body reclets : String -> Ast_Expr -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let ureclets_add = use MExprAst in
  lam s. lam body. lam reclets.
  reclets_add s tyunknown_ body reclets
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ncondef_" kind="let">

```mc
let ncondef_ n ty : Name -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let ncondef_ = use MExprAst in
  lam n. lam ty.
  DeclConDef {ident = n, tyIdent = ty, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="condef_" kind="let">

```mc
let condef_ s ty : String -> Ast_Type -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let condef_ = use MExprAst in
  lam s. lam ty.
  ncondef_ (nameNoSym s) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nucondef_" kind="let">

```mc
let nucondef_ n : Name -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let nucondef_ = use MExprAst in
  lam n.
  ncondef_ n tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ucondef_" kind="let">

```mc
let ucondef_ s : String -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let ucondef_ = use MExprAst in
  lam s.
  condef_ s tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nvar_" kind="let">

```mc
let nvar_ n : Name -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let nvar_ = use MExprAst in
  lam n.
  TmVar {ident = n, ty = tyunknown_, info = NoInfo (), frozen = false}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="var_" kind="let">

```mc
let var_ s : String -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let var_ = use MExprAst in
  lam s.
  nvar_ (nameNoSym s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="freeze_" kind="let">

```mc
let freeze_ var : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let freeze_ = use MExprAst in
  lam var.
  match var with TmVar t then TmVar {t with frozen = true}
  else errorSingle [infoTm var] "var is not a TmVar construct"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nconapp_" kind="let">

```mc
let nconapp_ n b : Name -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let nconapp_ = use MExprAst in
  lam n. lam b.
  TmConApp {ident = n, body = b, ty = tyunknown_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="conapp_" kind="let">

```mc
let conapp_ s b : String -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let conapp_ = use MExprAst in
  lam s. lam b.
  nconapp_ (nameNoSym s) b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="const_" kind="let">

```mc
let const_ ty c : Ast_Type -> ConstAst_Const -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let const_ = use MExprAst in
  lam ty. lam c.
  TmConst {val = c, ty = ty, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="uconst_" kind="let">

```mc
let uconst_  : ConstAst_Const -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let uconst_ = const_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmLam" kind="let">

```mc
let tmLam info ty ident tyAnnot body : Info -> Ast_Type -> Name -> Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tmLam = use MExprAst in
  lam info : Info.
  lam ty : Type.
  lam ident : Name.
  lam tyAnnot : Type.
  lam body : Expr.
  TmLam {
    ident = ident,
    tyAnnot = tyAnnot,
    tyParam = tyAnnot,
    ty = ty,
    body = body,
    info = info
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nlam_" kind="let">

```mc
let nlam_  : Name -> Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let nlam_ = tmLam (NoInfo ()) tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lam_" kind="let">

```mc
let lam_ s ty body : String -> Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let lam_ = use MExprAst in
  lam s. lam ty. lam body.
  nlam_ (nameNoSym s) ty body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nulam_" kind="let">

```mc
let nulam_ n body : Name -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let nulam_ = use MExprAst in
  lam n. lam body.
  nlam_ n tyunknown_ body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ulam_" kind="let">

```mc
let ulam_ s body : String -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let ulam_ = use MExprAst in
  lam s. lam body.
  lam_ s tyunknown_ body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nlams_" kind="let">

```mc
let nlams_ params body : [(Name, Ast_Type)] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let nlams_ = use MExprAst in
  lam params. lam body.
  foldr (lam p : (Name, Type). lam acc. nlam_ p.0 p.1 acc) body params
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lams_" kind="let">

```mc
let lams_ params body : [(String, Ast_Type)] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let lams_ = use MExprAst in
  lam params. lam body.
  foldr (lam p : (String, Type). lam acc. lam_ p.0 p.1 acc) body params
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ulams_" kind="let">

```mc
let ulams_ idents body : [String] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let ulams_ = use MExprAst in
  lam idents. lam body.
  foldr (lam s. lam acc. ulam_ s acc) body idents
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nulams_" kind="let">

```mc
let nulams_ names body : [Name] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let nulams_ = use MExprAst in
  lam names. lam body.
  foldr (lam n. lam acc. nulam_ n acc) body names
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="if_" kind="let">

```mc
let if_ cond thn els : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let if_ = use MExprAst in
  lam cond. lam thn. lam els.
  TmMatch {target = cond, pat = ptrue_, thn = thn,
           els = els, ty = tyunknown_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="match_" kind="let">

```mc
let match_ target pat thn els : Ast_Expr -> Ast_Pat -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let match_ = use MExprAst in
  lam target. lam pat. lam thn. lam els.
  TmMatch {target = target, pat = pat, thn = thn, els = els,
           ty = tyunknown_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="seq_" kind="let">

```mc
let seq_ tms : [Ast_Expr] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let seq_ = use MExprAst in
  lam tms.
  TmSeq {tms = tms, ty = tyunknown_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmRecord" kind="let">

```mc
let tmRecord info ty bindings : Info -> Ast_Type -> [(String, Ast_Expr)] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tmRecord = use MExprAst in
  lam info : Info.
  lam ty : Type.
  lam bindings : [(String, Expr)].
  let bindingMapFunc = lam b : (String, Expr). (stringToSid b.0, b.1) in
  TmRecord {
    bindings = mapFromSeq cmpSID (map bindingMapFunc bindings),
    ty = ty,
    info = NoInfo ()
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="record_" kind="let">

```mc
let record_  : Ast_Type -> [(String, Ast_Expr)] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let record_ = tmRecord (NoInfo ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="urecord_" kind="let">

```mc
let urecord_  : [(String, Ast_Expr)] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let urecord_ = record_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="autoty_record_" kind="let">

```mc
let autoty_record_ bindings : [(String, Ast_Expr)] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let autoty_record_ = lam bindings.
  use MExprAst in
  let bindings = mapFromSeq cmpSID (map (lam x. (stringToSid x.0, x.1)) bindings) in
  TmRecord {
    bindings = bindings,
    ty = TyRecord {
      fields = mapMap tyTm bindings,
      info = NoInfo ()
    },
    info = NoInfo ()
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmTuple" kind="let">

```mc
let tmTuple info ty tms : Info -> Ast_Type -> [Ast_Expr] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tmTuple = use MExprAst in
  lam info : Info. lam ty : Type. lam tms : [Expr].
  tmRecord info ty (mapi (lam i. lam t. (int2string i, t)) tms)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuple_" kind="let">

```mc
let tuple_  : Ast_Type -> [Ast_Expr] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tuple_ = tmTuple (NoInfo ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utuple_" kind="let">

```mc
let utuple_  : [Ast_Expr] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utuple_ = tuple_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="autoty_tuple_" kind="let">

```mc
let autoty_tuple_ tms : [Ast_Expr] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let autoty_tuple_ = lam tms. autoty_record_ (mapi (lam i. lam t. (int2string i, t)) tms)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="urecord_empty" kind="let">

```mc
let urecord_empty  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let urecord_empty = uunit_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="record_empty" kind="let">

```mc
let record_empty  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let record_empty = unit_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="record_add" kind="let">

```mc
let record_add key value record : String -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let record_add = use MExprAst in
  lam key. lam value. lam record.
  match record with TmRecord t then
      TmRecord {t with bindings = mapInsert (stringToSid key) value t.bindings}
  else
      errorSingle [infoTm record] "record is not a TmRecord construct"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="record_add_bindings" kind="let">

```mc
let record_add_bindings bindings record : [(String, Ast_Expr)] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let record_add_bindings : use Ast in [(String, Expr)] -> Expr -> Expr =
  lam bindings. lam record.
  foldl (lam recacc. lam b. record_add b.0 b.1 recacc) record bindings
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="record2tuple" kind="let">

```mc
let record2tuple bindings : all a. Map SID a -> Option [a]
```

<Description>{`Get an optional list of tuple expressions for a record. If the record does  
not represent a tuple, None \(\) is returned.`}</Description>


<ToggleWrapper text="Code..">
```mc
let record2tuple
  : all a. Map SID a
    -> Option [a]
  = lam bindings.
    let keys = map sidToString (mapKeys bindings) in
    match forAll stringIsInt keys with false then None () else
      let intKeys = map string2int keys in
      let sortedKeys = sort subi intKeys in
      -- Check if keys are a sequence 0..(n-1)
      match sortedKeys with [] then None ()
      else match sortedKeys with [h] ++ _ in
           if and (eqi 0 h)
                (eqi (subi (length intKeys) 1) (last sortedKeys)) then
             Some (map (lam key. mapLookupOrElse
                                 (lam. error "Key not found")
                                 (stringToSid (int2string key)) bindings)
                     sortedKeys)
           else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="never_" kind="let">

```mc
let never_  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let never_ = use MExprAst in
  TmNever {ty = tyunknown_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inever_" kind="let">

```mc
let inever_ i : Info -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let inever_ = use MExprAst in
  lam i : Info. TmNever {ty = tyunknown_, info = i}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchex_" kind="let">

```mc
let matchex_ target pat thn : Ast_Expr -> Ast_Pat -> Ast_Expr -> Ast_Expr
```

<Description>{`Exhaustive match`}</Description>


<ToggleWrapper text="Code..">
```mc
let matchex_ = use MExprAst in
  lam target. lam pat. lam thn.
    match_ target pat thn never_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchall_" kind="let">

```mc
let matchall_ matches : [Ast_Expr] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let matchall_ = use MExprAst in
  lam matches.
    foldr1 (lam m. lam acc.
      match m with TmMatch t then
        TmMatch {t with els = acc}
      else errorSingle [infoTm m] "expected match expression")
      matches
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nrecordproj_" kind="let">

```mc
let nrecordproj_ name key r : Name -> String -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let nrecordproj_ = use MExprAst in
  lam name. lam key. lam r.
  -- It is fine to use any variable name here. It doesn't matter if it
  -- overwrites a previous binding, since that binding will never be used in
  -- the then clause in any case.
  match_ r (withTypePat (tyTm r) (prec_ [(key,npvar_ name)])) (nvar_ name) never_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="recordproj_" kind="let">

```mc
let recordproj_ key r : String -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let recordproj_ = use MExprAst in
  lam key. lam r.
  nrecordproj_ (nameSym "x") key r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ntupleproj_" kind="let">

```mc
let ntupleproj_ name i t : Name -> Int -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let ntupleproj_ = use MExprAst in
  lam name. lam i. lam t.
  nrecordproj_ name (int2string i) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tupleproj_" kind="let">

```mc
let tupleproj_ i t : Int -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tupleproj_ = use MExprAst in
  lam i. lam t.
  recordproj_ (int2string i) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="recordupdate_" kind="let">

```mc
let recordupdate_ rec key value : Ast_Expr -> String -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let recordupdate_ = use MExprAst in
  lam rec. lam key. lam value.
  TmRecordUpdate {
    rec = rec,
    key = stringToSid key,
    value = value,
    ty = tyunknown_,
    info = NoInfo ()
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmApp" kind="let">

```mc
let tmApp info ty l r : Info -> Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tmApp = use MExprAst in
  lam info : Info. lam ty : Type. lam l : Expr. lam r : Expr.
  TmApp {lhs = l, rhs = r, ty = ty, info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="app_" kind="let">

```mc
let app_  : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let app_ = tmApp (NoInfo ()) tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appSeq_" kind="let">

```mc
let appSeq_ f seq : Ast_Expr -> [Ast_Expr] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let appSeq_ = use MExprAst in
  lam f. lam seq.
  foldl app_ f seq
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appf1_" kind="let">

```mc
let appf1_ f a1 : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let appf1_ = use MExprAst in
  lam f. lam a1.
  app_ f a1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appf2_" kind="let">

```mc
let appf2_ f a1 a2 : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let appf2_ = use MExprAst in
  lam f. lam a1. lam a2.
  app_ (appf1_ f a1) a2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appf3_" kind="let">

```mc
let appf3_ f a1 a2 a3 : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let appf3_ = use MExprAst in
  lam f. lam a1. lam a2. lam a3.
  app_ (appf2_ f a1 a2) a3
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appf4_" kind="let">

```mc
let appf4_ f a1 a2 a3 a4 : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let appf4_ = use MExprAst in
  lam f. lam a1. lam a2. lam a3. lam a4.
  app_ (appf3_ f a1 a2 a3) a4
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appf5_" kind="let">

```mc
let appf5_ f a1 a2 a3 a4 a5 : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let appf5_ = use MExprAst in
  lam f. lam a1. lam a2. lam a3. lam a4. lam a5.
  app_ (appf4_ f a1 a2 a3 a4) a5
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appf6_" kind="let">

```mc
let appf6_ f a1 a2 a3 a4 a5 a6 : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let appf6_ = use MExprAst in
  lam f. lam a1. lam a2. lam a3. lam a4. lam a5. lam a6.
  app_ (appf5_ f a1 a2 a3 a4 a5) a6
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appf7_" kind="let">

```mc
let appf7_ f a1 a2 a3 a4 a5 a6 a7 : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let appf7_ = use MExprAst in
  lam f. lam a1. lam a2. lam a3. lam a4. lam a5. lam a6. lam a7.
  app_ (appf6_ f a1 a2 a3 a4 a5 a6) a7
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appf8_" kind="let">

```mc
let appf8_ f a1 a2 a3 a4 a5 a6 a7 a8 : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let appf8_ = use MExprAst in
  lam f. lam a1. lam a2. lam a3. lam a4. lam a5. lam a6. lam a7. lam a8.
  app_ (appf7_ f a1 a2 a3 a4 a5 a6 a7) a8
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestu_" kind="let">

```mc
let utestu_ t e u : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let utestu_ = use MExprAst in
  lam t. lam e. lam u.
    DeclUtest {
      test = t,
      expected = e,
      tusing = Some u,
      tonfail = None (),
      info = NoInfo ()
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utesto_" kind="let">

```mc
let utesto_ t e o : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let utesto_ = use MExprAst in
  lam t. lam e. lam o.
    DeclUtest {
      test = t,
      expected = e,
      tusing = None (),
      tonfail = Some o,
      info = NoInfo ()
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestuo_" kind="let">

```mc
let utestuo_ t e u o : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let utestuo_ = use MExprAst in
  lam t. lam e. lam u. lam o.
    DeclUtest {
      test = t,
      expected = e,
      tusing = Some u,
      tonfail = Some o,
      info = NoInfo ()
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utest_" kind="let">

```mc
let utest_ t e : Ast_Expr -> Ast_Expr -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
let utest_ = use MExprAst in
  lam t. lam e.
    DeclUtest {
      test = t,
      expected = e,
      tusing = None (),
      tonfail = None (),
      info = NoInfo ()
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="asc_" kind="let">

```mc
let asc_ ty expr : Ast_Type -> Ast_Expr -> Ast_Expr
```

<Description>{`Ascription`}</Description>


<ToggleWrapper text="Code..">
```mc
let asc_ = use MExprAst in
  lam ty. lam expr.
  bind_ (let_ "x" ty expr) (var_ "x")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsafeCoerce_" kind="let">

```mc
let unsafeCoerce_ e : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let unsafeCoerce_ = use MExprAst in
  lam e.
  app_ (uconst_ (CUnsafeCoerce ())) e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="int_" kind="let">

```mc
let int_ i : Int -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let int_ = use MExprAst in
  lam i.
  uconst_ (CInt {val = i})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="float_" kind="let">

```mc
let float_ f : Float -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let float_ = use MExprAst in
  lam f.
  uconst_ (CFloat {val = f})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="true_" kind="let">

```mc
let true_  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let true_ = use MExprAst in
  uconst_ (CBool {val = true})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="false_" kind="let">

```mc
let false_  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let false_ = use MExprAst in
  uconst_ (CBool {val = false})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bool_" kind="let">

```mc
let bool_ v : Bool -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bool_ = use MExprAst in
  lam v.
  uconst_ (CBool {val = v})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="char_" kind="let">

```mc
let char_ c : Char -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let char_ = use MExprAst in
  lam c.
  uconst_ (CChar {val = c})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="str_" kind="let">

```mc
let str_ s : String -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let str_ = use MExprAst in
  lam s.
  TmSeq {tms = map char_ s, ty = tyunknown_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symb_" kind="let">

```mc
let symb_ c : Symbol -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let symb_ = use MExprAst in
  lam c.
  uconst_ (CSymb {val = c})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addi_" kind="let">

```mc
let addi_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let addi_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CAddi ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="subi_" kind="let">

```mc
let subi_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let subi_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CSubi ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="muli_" kind="let">

```mc
let muli_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let muli_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CMuli ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="divi_" kind="let">

```mc
let divi_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let divi_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CDivi ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="modi_" kind="let">

```mc
let modi_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let modi_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CModi ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="negi_" kind="let">

```mc
let negi_ n : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let negi_ = use MExprAst in
  lam n.
  appf1_ (uconst_ (CNegi ())) n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addf_" kind="let">

```mc
let addf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let addf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CAddf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="subf_" kind="let">

```mc
let subf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let subf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CSubf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mulf_" kind="let">

```mc
let mulf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let mulf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CMulf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="divf_" kind="let">

```mc
let divf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let divf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CDivf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="negf_" kind="let">

```mc
let negf_ a : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let negf_ = use MExprAst in
  lam a.
  appf1_ (uconst_ (CNegf ())) a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="floorfi_" kind="let">

```mc
let floorfi_ x : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let floorfi_ = use MExprAst in
  lam x.
  appf1_ (uconst_ (CFloorfi ())) x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ceilfi_" kind="let">

```mc
let ceilfi_ x : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let ceilfi_ = use MExprAst in
  lam x.
  appf1_ (uconst_ (CCeilfi ())) x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="roundfi_" kind="let">

```mc
let roundfi_ x : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let roundfi_ = use MExprAst in
  lam x.
  appf1_ (uconst_ (CRoundfi ())) x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="int2float_" kind="let">

```mc
let int2float_ x : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let int2float_ = use MExprAst in
  lam x.
  appf1_ (uconst_ (CInt2float ())) x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqi_" kind="let">

```mc
let eqi_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let eqi_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CEqi ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="neqi_" kind="let">

```mc
let neqi_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let neqi_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CNeqi ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lti_" kind="let">

```mc
let lti_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let lti_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CLti ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gti_" kind="let">

```mc
let gti_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let gti_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CGti ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leqi_" kind="let">

```mc
let leqi_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let leqi_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CLeqi ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="geqi_" kind="let">

```mc
let geqi_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let geqi_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CGeqi ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqc_" kind="let">

```mc
let eqc_ c1 c2 : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let eqc_ = use MExprAst in
  lam c1. lam c2.
  appf2_ (uconst_ (CEqc ())) c1 c2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="int2char_" kind="let">

```mc
let int2char_ i : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let int2char_ = use MExprAst in
  lam i.
  app_ (uconst_ (CInt2Char ())) i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="char2int_" kind="let">

```mc
let char2int_ c : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let char2int_ = use MExprAst in
  lam c.
  app_ (uconst_ (CChar2Int ())) c
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="stringIsfloat_" kind="let">

```mc
let stringIsfloat_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let stringIsfloat_ = use MExprAst in
  lam s.
  app_ (uconst_ (CStringIsFloat ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="string2float_" kind="let">

```mc
let string2float_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let string2float_ = use MExprAst in
  lam s.
  app_ (uconst_ (CString2float ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="float2string_" kind="let">

```mc
let float2string_ f : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let float2string_ = use MExprAst in
  lam f.
  app_ (uconst_ (CFloat2string ())) f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqf_" kind="let">

```mc
let eqf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let eqf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CEqf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ltf_" kind="let">

```mc
let ltf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let ltf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CLtf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leqf_" kind="let">

```mc
let leqf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let leqf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CLeqf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gtf_" kind="let">

```mc
let gtf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let gtf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CGtf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="geqf_" kind="let">

```mc
let geqf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let geqf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CGeqf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="neqf_" kind="let">

```mc
let neqf_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let neqf_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CNeqf ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="slli_" kind="let">

```mc
let slli_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let slli_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CSlli ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="srli_" kind="let">

```mc
let srli_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let srli_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CSrli ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="srai_" kind="let">

```mc
let srai_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let srai_ = use MExprAst in
  lam a. lam b.
  appf2_ (uconst_ (CSrai ())) a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_" kind="let">

```mc
let get_ s i : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let get_ = use MExprAst in
  lam s. lam i.
  appf2_ (uconst_ (CGet ())) s i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_" kind="let">

```mc
let set_ s i v : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let set_ = use MExprAst in
  lam s. lam i. lam v.
  appf3_ (uconst_ (CSet ())) s i v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="empty_" kind="let">

```mc
let empty_  : Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let empty_ = use MExprAst in
  seq_ []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cons_" kind="let">

```mc
let cons_ x s : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let cons_ = use MExprAst in
  lam x. lam s.
  appf2_ (uconst_ (CCons ())) x s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snoc_" kind="let">

```mc
let snoc_ s x : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let snoc_ = use MExprAst in
  lam s. lam x.
  appf2_ (uconst_ (CSnoc ())) s x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="concat_" kind="let">

```mc
let concat_ s1 s2 : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let concat_ = use MExprAst in
  lam s1. lam s2.
  appf2_ (uconst_ (CConcat ())) s1 s2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="length_" kind="let">

```mc
let length_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let length_ = use MExprAst in
  lam s.
  appf1_ (uconst_ (CLength ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reverse_" kind="let">

```mc
let reverse_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let reverse_ = use MExprAst in
  lam s.
  appf1_ (uconst_ (CReverse ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="splitat_" kind="let">

```mc
let splitat_ s n : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let splitat_ = use MExprAst in
  lam s. lam n.
  appf2_ (uconst_ (CSplitAt ())) s n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="create_" kind="let">

```mc
let create_ n f : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let create_ = use MExprAst in
  lam n. lam f.
  appf2_ (uconst_ (CCreate ())) n f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createList_" kind="let">

```mc
let createList_ n f : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let createList_ = use MExprAst in
  lam n. lam f.
  appf2_ (uconst_ (CCreateList ())) n f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createRope_" kind="let">

```mc
let createRope_ n f : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let createRope_ = use MExprAst in
  lam n. lam f.
  appf2_ (uconst_ (CCreateRope ())) n f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isList_" kind="let">

```mc
let isList_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let isList_ = use MExprAst in
  lam s.
  app_ (uconst_ (CIsList ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isRope_" kind="let">

```mc
let isRope_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let isRope_ = use MExprAst in
  lam s.
  app_ (uconst_ (CIsRope ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="head_" kind="let">

```mc
let head_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let head_ = use MExprAst in
  lam s.
  app_ (uconst_ (CHead ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tail_" kind="let">

```mc
let tail_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tail_ = use MExprAst in
  lam s.
  app_ (uconst_ (CTail ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="null_" kind="let">

```mc
let null_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let null_ = use MExprAst in
  lam s.
  app_ (uconst_ (CNull ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_" kind="let">

```mc
let map_ f s : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let map_ = use MExprAst in
  lam f. lam s.
  appf2_ (uconst_ (CMap ())) f s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapi_" kind="let">

```mc
let mapi_ f s : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let mapi_ = use MExprAst in
  lam f. lam s.
  appf2_ (uconst_ (CMapi ())) f s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iter_" kind="let">

```mc
let iter_ f s : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let iter_ = use MExprAst in
  lam f. lam s.
  appf2_ (uconst_ (CIter ())) f s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iteri_" kind="let">

```mc
let iteri_ f s : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let iteri_ = use MExprAst in
  lam f. lam s.
  appf2_ (uconst_ (CIteri ())) f s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldl_" kind="let">

```mc
let foldl_ f acc s : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let foldl_ = use MExprAst in
  lam f. lam acc. lam s.
  appf3_ (uconst_ (CFoldl ())) f acc s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldr_" kind="let">

```mc
let foldr_ f acc s : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let foldr_ = use MExprAst in
  lam f. lam acc. lam s.
  appf3_ (uconst_ (CFoldr ())) f acc s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="subsequence_" kind="let">

```mc
let subsequence_ s off n : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let subsequence_ = use MExprAst in
  lam s. lam off. lam n.
  appf3_ (uconst_ (CSubsequence ())) s off n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="and_" kind="let">

```mc
let and_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`Short circuit logical expressions`}</Description>


<ToggleWrapper text="Code..">
```mc
let and_ = use MExprAst in
  lam a. lam b. if_ a b false_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="or_" kind="let">

```mc
let or_ a b : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let or_ = use MExprAst in
  lam a. lam b. if_ a true_ b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="not_" kind="let">

```mc
let not_ b : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let not_ = use MExprAst in
  lam b. if_ b false_ true_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gensym_" kind="let">

```mc
let gensym_ u : Ast_Expr -> Ast_Expr
```

<Description>{`Symbol operations`}</Description>


<ToggleWrapper text="Code..">
```mc
let gensym_ = use MExprAst in
  lam u. appf1_ (uconst_ (CGensym ())) u
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqsym_" kind="let">

```mc
let eqsym_ s1 s2 : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let eqsym_ = use MExprAst in
  lam s1. lam s2.
  appf2_ (uconst_ (CEqsym ())) s1 s2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sym2hash_" kind="let">

```mc
let sym2hash_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let sym2hash_ = use MExprAst in
  lam s.
  appf1_ (uconst_ (CSym2hash ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ref_" kind="let">

```mc
let ref_ v : Ast_Expr -> Ast_Expr
```

<Description>{`References`}</Description>


<ToggleWrapper text="Code..">
```mc
let ref_ = use MExprAst in
  lam v. appf1_ (uconst_ (CRef ())) v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="deref_" kind="let">

```mc
let deref_ r : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let deref_ = use MExprAst in
  lam r. appf1_ (uconst_ (CDeRef ())) r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="modref_" kind="let">

```mc
let modref_ r v : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let modref_ = use MExprAst in
  lam r. lam v. appf2_ (uconst_ (CModRef ())) r v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="readFile_" kind="let">

```mc
let readFile_ f : Ast_Expr -> Ast_Expr
```

<Description>{`File operations`}</Description>


<ToggleWrapper text="Code..">
```mc
let readFile_ = use MExprAst in
  lam f. appf1_ (uconst_ (CFileRead ())) f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="writeFile_" kind="let">

```mc
let writeFile_ f d : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let writeFile_ = use MExprAst in
  lam f. lam d. appf2_ (uconst_ (CFileWrite ())) f d
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileExists_" kind="let">

```mc
let fileExists_ f : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let fileExists_ = use MExprAst in
  lam f. appf1_ (uconst_ (CFileExists ())) f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="deleteFile_" kind="let">

```mc
let deleteFile_ f : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let deleteFile_ = use MExprAst in
  lam f. appf1_ (uconst_ (CFileDelete ())) f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="print_" kind="let">

```mc
let print_ s : Ast_Expr -> Ast_Expr
```

<Description>{`I/O operations`}</Description>


<ToggleWrapper text="Code..">
```mc
let print_ = use MExprAst in
  lam s. app_ (uconst_ (CPrint ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printError_" kind="let">

```mc
let printError_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let printError_ = use MExprAst in
  lam s. app_ (uconst_ (CPrintError ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dprint_" kind="let">

```mc
let dprint_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let dprint_ = use MExprAst in
  lam s. app_ (uconst_ (CDPrint ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="flushStdout_" kind="let">

```mc
let flushStdout_ u : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let flushStdout_ = use MExprAst in
  lam u. app_ (uconst_ (CFlushStdout ())) u
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="flushStderr_" kind="let">

```mc
let flushStderr_ u : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let flushStderr_ = use MExprAst in
  lam u. app_ (uconst_ (CFlushStderr ())) u
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="readLine_" kind="let">

```mc
let readLine_ u : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let readLine_ = use MExprAst in
  lam u. app_ (uconst_ (CReadLine ())) u
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="randIntU_" kind="let">

```mc
let randIntU_ lo hi : Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`Random number generation`}</Description>


<ToggleWrapper text="Code..">
```mc
let randIntU_ = use MExprAst in
  lam lo. lam hi. appf2_ (uconst_ (CRandIntU ())) lo hi
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="randSetSeed_" kind="let">

```mc
let randSetSeed_ s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let randSetSeed_ = use MExprAst in
  lam s. appf1_ (uconst_ (CRandSetSeed ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="error_" kind="let">

```mc
let error_ s : Ast_Expr -> Ast_Expr
```

<Description>{`Error`}</Description>


<ToggleWrapper text="Code..">
```mc
let error_ = use MExprAst in
  lam s. appf1_ (uconst_ (CError ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exit_" kind="let">

```mc
let exit_ n : Ast_Expr -> Ast_Expr
```

<Description>{`Exit`}</Description>


<ToggleWrapper text="Code..">
```mc
let exit_ = use MExprAst in
  lam n. appf1_ (uconst_ (CExit ())) n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argv_" kind="let">

```mc
let argv_  : Ast_Expr
```

<Description>{`Argv`}</Description>


<ToggleWrapper text="Code..">
```mc
let argv_ = use MExprAst in
  uconst_ (CArgv ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="command_" kind="let">

```mc
let command_ s : Ast_Expr -> Ast_Expr
```

<Description>{`Command`}</Description>


<ToggleWrapper text="Code..">
```mc
let command_ = use MExprAst in
  lam s. appf1_ (uconst_ (CCommand ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wallTimeMs_" kind="let">

```mc
let wallTimeMs_ u : Ast_Expr -> Ast_Expr
```

<Description>{`Time operations`}</Description>


<ToggleWrapper text="Code..">
```mc
let wallTimeMs_ = use MExprAst in
  lam u. appf1_ (uconst_ (CWallTimeMs ())) u
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sleepMs_" kind="let">

```mc
let sleepMs_ n : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let sleepMs_ = use MExprAst in
  lam n. appf1_ (uconst_ (CSleepMs ())) n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorCreateInt_" kind="let">

```mc
let tensorCreateInt_ s f : Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`Tensors`}</Description>


<ToggleWrapper text="Code..">
```mc
let tensorCreateInt_ = use MExprAst in
  lam s. lam f.
  appf2_ (const_ tytensorcreateint_ (CTensorCreateInt ())) s f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorCreateFloat_" kind="let">

```mc
let tensorCreateFloat_ s f : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorCreateFloat_ = use MExprAst in
  lam s. lam f.
  appf2_ (const_ tytensorcreatefloat_ (CTensorCreateFloat ())) s f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorCreate_" kind="let">

```mc
let tensorCreate_ ty s f : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorCreate_ = use MExprAst in
  lam ty. lam s. lam f.
  appf2_ (const_ (tytensorcreate_ ty) (CTensorCreate ())) s f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorCreate_" kind="let">

```mc
let utensorCreate_  : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorCreate_ = tensorCreate_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorGetExn_" kind="let">

```mc
let tensorGetExn_ ty t is : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorGetExn_ = use MExprAst in
  lam ty. lam t. lam is.
  appf2_ (const_ (tytensorgetexn_ ty) (CTensorGetExn ())) t is
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorGetExn_" kind="let">

```mc
let utensorGetExn_  : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorGetExn_ = tensorGetExn_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorSetExn_" kind="let">

```mc
let tensorSetExn_ ty t is v : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorSetExn_ = use MExprAst in
  lam ty. lam t. lam is. lam v.
  appf3_ (const_ (tytensorsetexn_ ty) (CTensorSetExn ())) t is v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorSetExn_" kind="let">

```mc
let utensorSetExn_  : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorSetExn_ = tensorSetExn_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorLinearGetExn_" kind="let">

```mc
let tensorLinearGetExn_ ty t i : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorLinearGetExn_ = use MExprAst in
  lam ty. lam t. lam i.
  appf2_ (const_ (tytensorlineargetexn_ ty) (CTensorLinearGetExn ())) t i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorLinearGetExn_" kind="let">

```mc
let utensorLinearGetExn_  : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorLinearGetExn_ = tensorLinearGetExn_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorLinearSetExn_" kind="let">

```mc
let tensorLinearSetExn_ ty t i v : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorLinearSetExn_ = use MExprAst in
  lam ty. lam t. lam i. lam v.
  appf3_ (const_ (tytensorlinearsetexn_ ty) (CTensorLinearSetExn ())) t i v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorLinearSetExn_" kind="let">

```mc
let utensorLinearSetExn_  : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorLinearSetExn_ = tensorLinearSetExn_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorRank_" kind="let">

```mc
let tensorRank_ ty t : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorRank_ = use MExprAst in
  lam ty. lam t.
  appf1_ (const_ (tytensorrank_ ty) (CTensorRank ())) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorRank_" kind="let">

```mc
let utensorRank_  : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorRank_ = tensorRank_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorShape_" kind="let">

```mc
let tensorShape_ ty t : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorShape_ = use MExprAst in
  lam ty. lam t.
  appf1_ (const_ (tytensorshape_ ty) (CTensorShape ())) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorShape_" kind="let">

```mc
let utensorShape_  : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorShape_ = tensorShape_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorReshapeExn_" kind="let">

```mc
let tensorReshapeExn_ ty t s : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorReshapeExn_ = use MExprAst in
  lam ty. lam t. lam s.
  appf2_ (const_ (tytensorreshapeexn_ ty) (CTensorReshapeExn ())) t s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorReshapeExn_" kind="let">

```mc
let utensorReshapeExn_  : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorReshapeExn_ = tensorReshapeExn_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorCopy_" kind="let">

```mc
let tensorCopy_ ty t : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorCopy_ = use MExprAst in
  lam ty. lam t.
  appf1_ (const_ (tytensorblitexn_ ty) (CTensorCopy ())) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorCopy_" kind="let">

```mc
let utensorCopy_  : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorCopy_ = tensorCopy_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorTransposeExn_" kind="let">

```mc
let tensorTransposeExn_ ty t dim0 dim1 : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorTransposeExn_ = use MExprAst in
  lam ty. lam t. lam dim0. lam dim1.
  appf3_ (const_ (tytensortransposeexn_ ty) (CTensorTransposeExn ())) t dim0 dim1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorTransposeExn_" kind="let">

```mc
let utensorTransposeExn_  : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorTransposeExn_ = tensorTransposeExn_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorSliceExn_" kind="let">

```mc
let tensorSliceExn_ ty t s : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorSliceExn_ = use MExprAst in
  lam ty. lam t. lam s.
  appf2_ (const_ (tytensorsliceexn_ ty) (CTensorSliceExn ())) t s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorSliceExn_" kind="let">

```mc
let utensorSliceExn_  : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorSliceExn_ = tensorSliceExn_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorSubExn_" kind="let">

```mc
let tensorSubExn_ ty t ofs len : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorSubExn_ = use MExprAst in
  lam ty. lam t. lam ofs. lam len.
  appf3_ (const_ (tytensorsubexn_ ty) (CTensorSubExn ())) t ofs len
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorSubExn_" kind="let">

```mc
let utensorSubExn_  : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorSubExn_ = tensorSubExn_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorIterSlice_" kind="let">

```mc
let tensorIterSlice_ ty f t : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorIterSlice_ = use MExprAst in
  lam ty. lam f. lam t.
  appf2_ (const_ (tytensoriteri_ ty) (CTensorIterSlice ())) f t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorIterSlice_" kind="let">

```mc
let utensorIterSlice_  : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorIterSlice_ = tensorIterSlice_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorEq_" kind="let">

```mc
let tensorEq_ ty1 ty2 eq t1 t2 : Ast_Type -> Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensorEq_ = use MExprAst in
  lam ty1. lam ty2. lam eq. lam t1. lam t2.
  appf3_ (const_ (tytensoreq_ ty1 ty2) (CTensorEq ())) eq t1 t2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensorEq_" kind="let">

```mc
let utensorEq_  : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensorEq_ = tensorEq_ tyunknown_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensor2string_" kind="let">

```mc
let tensor2string_ ty el2str t : Ast_Type -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let tensor2string_ = use MExprAst in
  lam ty. lam el2str. lam t.
  appf2_ (const_ (tytensortostring_ ty) (CTensorToString ())) el2str t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utensor2string_" kind="let">

```mc
let utensor2string_  : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let utensor2string_ = tensor2string_ tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserParseMExprString_" kind="let">

```mc
let bootParserParseMExprString_ options key str : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`Bootparser`}</Description>


<ToggleWrapper text="Code..">
```mc
let bootParserParseMExprString_ = use MExprAst in
  lam options. lam key. lam str.
    appf3_ (uconst_ (CBootParserParseMExprString ())) options key str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserParseMCoreFile_" kind="let">

```mc
let bootParserParseMCoreFile_ pruneArgs key str : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserParseMCoreFile_ = use MExprAst in
  lam pruneArgs.
  lam key.
  lam str.
  appf3_
    (uconst_ (CBootParserParseMCoreFile ()))
    pruneArgs
    key
    str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserGetId_" kind="let">

```mc
let bootParserGetId_ pt : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserGetId_ = use MExprAst in
  lam pt. appf1_ (uconst_ (CBootParserGetId ())) pt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserGetTerm_" kind="let">

```mc
let bootParserGetTerm_ pt n : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserGetTerm_ = use MExprAst in
  lam pt. lam n.
  appf2_ (uconst_ (CBootParserGetTerm ())) pt n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserGetString_" kind="let">

```mc
let bootParserGetString_ pt n : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserGetString_ = use MExprAst in
  lam pt. lam n.
  appf2_ (uconst_ (CBootParserGetString ())) pt n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserGetInt_" kind="let">

```mc
let bootParserGetInt_ pt n : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserGetInt_ = use MExprAst in
  lam pt. lam n.
  appf2_ (uconst_ (CBootParserGetInt ())) pt n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserGetFloat_" kind="let">

```mc
let bootParserGetFloat_ pt n : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserGetFloat_ = use MExprAst in
  lam pt. lam n.
  appf2_ (uconst_ (CBootParserGetFloat ())) pt n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserGetListLength_" kind="let">

```mc
let bootParserGetListLength_ pt n : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserGetListLength_ = use MExprAst in
  lam pt. lam n.
  appf2_ (uconst_ (CBootParserGetListLength ())) pt n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserGetConst_" kind="let">

```mc
let bootParserGetConst_ pt n : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserGetConst_ = use MExprAst in
  lam pt. lam n.
  appf2_ (uconst_ (CBootParserGetConst ())) pt n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserGetPat_" kind="let">

```mc
let bootParserGetPat_ pt n : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserGetPat_ = use MExprAst in
  lam pt. lam n.
  appf2_ (uconst_ (CBootParserGetPat ())) pt n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bootParserGetInfo_" kind="let">

```mc
let bootParserGetInfo_ pt n : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let bootParserGetInfo_ = use MExprAst in
  lam pt. lam n.
  appf2_ (uconst_ (CBootParserGetInfo ())) pt n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="semi_" kind="let">

```mc
let semi_ expr1 expr2 : Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`Sequencing \(;\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let semi_ = lam expr1. lam expr2. bind_ (ulet_ "" expr1) expr2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="oldBind_" kind="let">

```mc
let oldBind_ l r : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let oldBind_ : use Ast in Expr -> Expr -> Expr = use MExprAst in
  lam l. lam r.
  match l with TmDecl x
  then TmDecl {x with inexpr = oldBind_ x.inexpr r}
  else r
```
</ToggleWrapper>
</DocBlock>

