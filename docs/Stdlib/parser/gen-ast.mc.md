import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# gen-ast.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mlang/ast.mc"} style={S.link}>mlang/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/eq.mc"} style={S.link}>mexpr/eq.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>  
  
## Types  
  

          <DocBlock title="Constructor" kind="type">

```mc
type Constructor : { name: Name, fragment: Name, synType: Name, carried: CarriedType }
```



<ToggleWrapper text="Code..">
```mc
type Constructor = use CarriedTypeBase in
  { name : Name
  , fragment : Name
  , synType : Name
  , carried : CarriedType
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SFuncRequest" kind="type">

```mc
type SFuncRequest : { synName: Name, target: Type, names: { smapAccumL: Name, smap: Name, sfold: Name } }
```



<ToggleWrapper text="Code..">
```mc
type SFuncRequest = use Ast in
  { synName : Name
  , target : Type
  , names :
    { smapAccumL : Name
    , smap : Name
    , sfold : Name
    }
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FieldAccessorRequest" kind="type">

```mc
type FieldAccessorRequest : { synName: Name, field: String, resTy: Type, names: { get: Name, set: Name, mapAccum: Name, map: Name } }
```



<ToggleWrapper text="Code..">
```mc
type FieldAccessorRequest = use Ast in
  { synName : Name
  , field : String
  , resTy : Type
  , names :
    { get : Name
    , set : Name
    , mapAccum : Name
    , map : Name
    }
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenInput" kind="type">

```mc
type GenInput : { baseName: Name, composedName: Option Name, constructors: [Constructor], sfunctions: [SFuncRequest], fieldAccessors: [FieldAccessorRequest] }
```



<ToggleWrapper text="Code..">
```mc
type GenInput =
  { baseName : Name
  , composedName : Option Name
  , constructors : [Constructor]
  , sfunctions : [SFuncRequest]
  , fieldAccessors : [FieldAccessorRequest]
  }
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="CarriedTypeBase" kind="lang" link="/docs/Stdlib/parser/gen-ast.mc/lang-CarriedTypeBase">

```mc
lang CarriedTypeBase
```



<ToggleWrapper text="Code..">
```mc
lang CarriedTypeBase = Ast
  syn CarriedType =

  sem carriedRepr : CarriedType -> Type
  sem carriedSMapAccumL : (Expr -> Expr -> Expr) -> Type -> CarriedType -> Option (Name -> Name -> Expr)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CarriedTypeHelpers" kind="lang" link="/docs/Stdlib/parser/gen-ast.mc/lang-CarriedTypeHelpers">

```mc
lang CarriedTypeHelpers
```



<ToggleWrapper text="Code..">
```mc
lang CarriedTypeHelpers = CarriedTypeBase + SemDeclAst + PrettyPrint
  sem _mkSmapAccumL : SFuncRequest -> Constructor -> Option Decl
  sem _mkSmapAccumL request =
  | constructor ->
    if nameEq request.synName constructor.synType then
      let fName = nameNoSym "f" in
      match carriedSMapAccumL (appf2_ (nvar_ fName)) request.target constructor.carried with Some mkNew then
        let accName = nameNoSym "acc" in
        let valName = nameNoSym "x" in
        let decl = DeclSem
          { ident = request.names.smapAccumL
          , tyAnnot = tyunknown_
          , tyBody = tyunknown_  -- TODO(vipa, 2023-03-09): Provide a proper type here
          , args = Some [{ident = fName, tyAnnot = tyunknown_}, {ident = accName, tyAnnot = tyunknown_}]
          , includes = [], declKind = BaseKind ()
          , cases =
            [ { pat = npcon_ constructor.name (npvar_ valName)
              , thn = match_
                (mkNew accName valName)
                (ptuple_ [npvar_ accName, npvar_ valName])
                (utuple_ [nvar_ accName, nconapp_ constructor.name (nvar_ valName)])
                never_
              }
            ]
          , info = NoInfo ()  -- TODO(vipa, 2023-03-09): Info
          } in
        Some decl
      else None ()
    else None ()

  sem _mkAccess : FieldAccessorRequest -> Constructor -> [Decl]
  -- sem _mkAccess synType field =
  sem _mkAccess request =
  | constructor ->
    if nameEq constructor.synType request.synName then
      let targetName = nameSym "target" in
      let valName = nameNoSym "val" in
      let getf = DeclSem
        { ident = request.names.get
        , tyAnnot = tyunknown_
        , tyBody = tyunknown_  -- TODO(vipa, 2023-03-09): provide a proper type here
        , args = Some []
        , includes = [], declKind = BaseKind ()
        , cases =
          [ { pat = npcon_ constructor.name (npvar_ targetName)
            , thn = recordproj_ request.field (nvar_ targetName)
            }
          ]
        , info = NoInfo () -- TODO(vipa, 2023-03-09): Info
        } in
      let setf = DeclSem
        { ident = request.names.set
        , tyAnnot = tyunknown_
        , tyBody = tyunknown_  -- TODO(vipa, 2023-03-09): provide a proper type here
        , args = Some [{ident = valName, tyAnnot = tyunknown_}]
        , includes = [], declKind = BaseKind ()
        , cases =
          [ { pat = npcon_ constructor.name (npvar_ targetName)
            , thn = nconapp_ constructor.name (recordupdate_ (nvar_ targetName) request.field (nvar_ valName))
            }
          ]
        , info = NoInfo () -- TODO(vipa, 2023-03-09): Info
        } in
      [getf, setf]
    else []

  sem _mkSFuncStubs : SFuncRequest -> [Decl]
  sem _mkSFuncStubs = | request ->
    let synTy = ntycon_ request.synName in
    let fName = nameNoSym "f" in
    let accName = nameNoSym "acc" in
    let valName = nameSym "x" in
    let smapAccumL_ = appf3_ (nvar_ request.names.smapAccumL) in
    let smapAccumL =
      let ty = tyall_ "a" (tyarrows_
        [ tyarrows_ [tyvar_ "a", request.target, tytuple_ [tyvar_ "a", request.target]]
        , tyvar_ "a"
        , synTy
        , tytuple_ [tyvar_ "a", synTy]
        ])
      in DeclSem
      { ident = request.names.smapAccumL
      , tyAnnot = ty
      , tyBody = ty
      , includes = [], declKind = BaseKind ()
      , args = Some
        [ {ident = fName, tyAnnot = tyunknown_}
        , {ident = accName, tyAnnot = tyunknown_}
        ]
      , cases =
        [ {pat = npvar_ valName, thn = utuple_ [nvar_ accName, nvar_ valName]}
        ]
      , info = NoInfo ()
      } in
    let smap =
      let ty = tyarrows_
        [ tyarrow_ request.target request.target
        , synTy
        , synTy
        ]
      in DeclSem
      { ident = request.names.smap
      , tyAnnot = ty
      , tyBody = ty
      , includes = [], declKind = BaseKind ()
      , args = Some
        [ {ident = fName, tyAnnot = tyunknown_}
        ]
      , cases =
        [ { pat = npvar_ valName
          , thn = tupleproj_ 1
            (smapAccumL_
              (ulam_ "" (nulam_ valName (utuple_ [uunit_, appf1_ (nvar_ fName) (nvar_ valName)])))
              uunit_
              (nvar_ valName))
          }
        ]
      , info = NoInfo ()
      } in
    let sfold =
      let ty = tyall_ "a" (tyarrows_
        [ tyarrows_ [tyvar_ "a", request.target, tyvar_ "a"]
        , tyvar_ "a"
        , synTy
        , tyvar_ "a"
        ])
      in DeclSem
      { ident = request.names.sfold
      , tyAnnot = ty
      , tyBody = ty
      , includes = [], declKind = BaseKind ()
      , args = Some
        [ {ident = fName, tyAnnot = tyunknown_}
        , {ident = accName, tyAnnot = tyunknown_}
        ]
      , cases =
        [ { pat = npvar_ valName
          , thn = tupleproj_ 0
            (smapAccumL_
              (nulam_ accName (nulam_ valName (utuple_ [appf2_ (nvar_ fName) (nvar_ accName) (nvar_ valName), nvar_ valName])))
              (nvar_ accName)
              (nvar_ valName))
          }
        ]
      , info = NoInfo ()
      } in
    [smapAccumL, smap, sfold]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CarriedTarget" kind="lang" link="/docs/Stdlib/parser/gen-ast.mc/lang-CarriedTarget">

```mc
lang CarriedTarget
```



<ToggleWrapper text="Code..">
```mc
lang CarriedTarget = CarriedTypeBase + Eq + Ast
  syn CarriedType =
  | TargetType {targetable : Bool, ty : Type}

  sem carriedRepr =
  | TargetType {ty = ty} -> ty

  sem carriedSMapAccumL f targetTy =
  | TargetType {targetable = false} -> None ()
  | TargetType {targetable = true, ty = ty} ->
    if eqType ty targetTy
    then Some (lam accName. lam valName. f (nvar_ accName) (nvar_ valName))
    else None ()
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CarriedSeq" kind="lang" link="/docs/Stdlib/parser/gen-ast.mc/lang-CarriedSeq">

```mc
lang CarriedSeq
```



<ToggleWrapper text="Code..">
```mc
lang CarriedSeq = CarriedTypeBase
  syn CarriedType =
  | SeqType CarriedType

  sem carriedRepr =
  | SeqType ty -> tyseq_ (carriedRepr ty)

  sem carriedSMapAccumL f targetTy =
  | SeqType ty ->
    match carriedSMapAccumL f targetTy ty with Some mkNew then Some
      (lam accName. lam valName.
        let innerAcc = nameSym "acc" in
        let innerVal = nameSym "x" in
        appf3_
          (var_ "mapAccumL")
          (nulam_ innerAcc
            (nlam_ innerVal (carriedRepr ty)
              (mkNew innerAcc innerVal)))
          (nvar_ accName)
          (nvar_ valName)
      )
    else None ()
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CarriedOption" kind="lang" link="/docs/Stdlib/parser/gen-ast.mc/lang-CarriedOption">

```mc
lang CarriedOption
```



<ToggleWrapper text="Code..">
```mc
lang CarriedOption = CarriedTypeBase
  syn CarriedType =
  | OptionType CarriedType

  sem carriedRepr =
  | OptionType ty -> tyapp_ (tycon_ "Option") (carriedRepr ty)

  sem carriedSMapAccumL f targetTy =
  | OptionType ty ->
    match carriedSMapAccumL f targetTy ty with Some mkNew then Some
      (lam accName. lam valName.
        let innerAcc = nameSym "acc" in
        let innerVal = nameSym "x" in
        appf3_
          (var_ "optionMapAccum")
          (nulam_ innerAcc
            (nulam_ innerVal
              (mkNew innerAcc innerVal)))
          (nvar_ accName)
          (nvar_ valName)
      )
    else None ()
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CarriedRecord" kind="lang" link="/docs/Stdlib/parser/gen-ast.mc/lang-CarriedRecord">

```mc
lang CarriedRecord
```



<ToggleWrapper text="Code..">
```mc
lang CarriedRecord = CarriedTypeBase
  syn CarriedType =
  | RecordType [(String, CarriedType)]

  sem carriedRepr =
  | RecordType tys -> tyrecord_
    (map
      (lam x. (x.0, carriedRepr x.1))
      tys)

  sem carriedSMapAccumL f targetTy =
  | RecordType fields ->
    let mappingFields = mapOption
      (lam x. optionMap (lam y. (x.0, y)) (carriedSMapAccumL f targetTy x.1))
      fields in
    match mappingFields with [] then None ()
    else Some
      (lam accName. lam valName.
        -- NOTE(vipa, 2021-03-03): This constructs an AST with
        -- shadowing of symbolized names, which may or may not be what
        -- we want
        let mappedFields = mapAccumR
          (lam constr. lam x. match x with (field, mkNew) then
             let fieldName = nameSym field in
             let constr = lam innerMost.
               match_
                 (bind_
                   (nulet_ fieldName (recordproj_ field (nvar_ valName)))
                   (mkNew accName fieldName))
                 (ptuple_ [npvar_ accName, npvar_ fieldName])
                 (constr innerMost)
                 never_
             in (constr, (field, fieldName))
           else never)
          identity
          mappingFields
        in match mappedFields with (constr, mappedFields) then
          constr
            (utuple_
              [ nvar_ accName
              , (foldl
                  (lam acc. lam update: (Unknown, Unknown).
                    recordupdate_ acc update.0 (nvar_ update.1))
                  (nvar_ valName)
                  mappedFields)
              ])
        else never
      )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CarriedTypeGenerate" kind="lang" link="/docs/Stdlib/parser/gen-ast.mc/lang-CarriedTypeGenerate">

```mc
lang CarriedTypeGenerate
```



<ToggleWrapper text="Code..">
```mc
lang CarriedTypeGenerate = CarriedTypeHelpers + LangDeclAst + TypeDeclAst + SynDeclAst
  sem mkLanguages : GenInput -> [Decl]
  sem mkLanguages =
  | input ->
    let synTypes = foldl
      (lam acc. lam c: Constructor. setInsert c.synType acc)
      (setEmpty nameCmp)
      input.constructors in
    let synTypes = setFold
      (lam acc. lam synType. cons (DeclSyn {ident = synType, includes = [], declKind = BaseKind (), params = [], defs = [], info = NoInfo ()}) acc)
      []
      synTypes in
    type DeclLangRec =
      { ident : Name
      , includes : [Name]
      , decls : [Decl]
      , info : Info
      } in
    let baseLang: DeclLangRec =
      let sfunctions = join
        (map _mkSFuncStubs input.sfunctions) in
      let accessors = join
        (map _mkFieldStubs input.fieldAccessors) in
      { ident = input.baseName
      , includes = []
      , decls = join [synTypes, sfunctions, accessors]
      , info = NoInfo () -- TODO(vipa, 2023-03-09): info?
      } in
    let mkConstructorLang : Constructor -> DeclLangRec = lam constructor.
      match constructor with {name = name, synType = synType, carried = carried} then
        let recordTyName = nameNoSym (concat (nameGetStr name) "Record") in
        let sfunctions = mapOption
          (lam request. _mkSmapAccumL request constructor)
          input.sfunctions in
        let accessors = map
          (lam request. _mkAccess request constructor)
          input.fieldAccessors in
        { ident = constructor.fragment
        , includes = [input.baseName]
        , decls =
          join
            [ [ DeclType {ident = recordTyName, params = [], tyIdent = carriedRepr carried, info = NoInfo ()}
              , DeclSyn {ident = synType, includes = [], declKind = BaseKind (), params = [], defs = [{ident = name, tyIdent = ntycon_ recordTyName, tyName = nameNoSym (concat (nameGetStr name) "Type")}], info = NoInfo ()}
              ]
            , sfunctions
            , join accessors
            ]
        , info = NoInfo ()
        }
      else never in
    let constructorLangs = map mkConstructorLang input.constructors in
    let constructorLangs =
      match input.composedName with Some name then
        snoc
          constructorLangs
          { ident = name
          , includes = map (lam x. x.ident) constructorLangs
          , decls = []
          , info = NoInfo ()
          }
      else constructorLangs in
  map (lam x. DeclLang x) (cons baseLang constructorLangs)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CarriedBasic" kind="lang" link="/docs/Stdlib/parser/gen-ast.mc/lang-CarriedBasic">

```mc
lang CarriedBasic
```



<ToggleWrapper text="Code..">
```mc
lang CarriedBasic = CarriedTypeGenerate + CarriedTarget + CarriedSeq + CarriedRecord + CarriedOption
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/parser/gen-ast.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = CarriedBasic + MExprEq + MExprPrettyPrint
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_mkFieldStubs" kind="let">

```mc
let _mkFieldStubs request : FieldAccessorRequest -> [Ast_Decl]
```



<ToggleWrapper text="Code..">
```mc
let _mkFieldStubs
  : use DeclAst in FieldAccessorRequest -> [Decl]
  = lam request.
    use SemDeclAst in
    let synTy = ntycon_ request.synName in
    let ty = request.resTy in
    let fName = nameNoSym "f" in
    let accName = nameNoSym "acc" in
    let valName = nameNoSym "val" in
    let targetName = nameSym "target" in
    let getf =
      let ty = tyarrow_ synTy ty
      in DeclSem
      { ident = request.names.get
      , tyAnnot = ty
      , tyBody = ty
      , args = Some []
      , args = Some []
      , cases = []
      , includes = [], declKind = BaseKind ()
      , info = NoInfo ()
      } in
    let getf_ = appf1_ (nvar_ request.names.get) in
    let setf =
      let ty = tyarrows_ [ty, synTy, synTy]
      in DeclSem
      { ident = request.names.set
      , tyAnnot = ty
      , tyBody = ty
      , args = Some [{ident = valName, tyAnnot = tyunknown_}]
      , args = Some [{ident = valName, tyAnnot = tyunknown_}]
      , cases = []
      , includes = [], declKind = BaseKind ()
      , info = NoInfo ()
      } in
    let setf_ = appf2_ (nvar_ request.names.set) in
    let mapAccumf =
      let ty = tyall_ "a" (tyarrows_
        [ tyarrows_ [tyvar_ "a", ty, tytuple_ [tyvar_ "a", ty]]
        , tyvar_ "a"
        , synTy
        , tytuple_ [tyvar_ "a", synTy]
        ])
      in DeclSem
      { ident = request.names.mapAccum
      , tyAnnot = ty
      , includes = [], declKind = BaseKind ()
      , tyBody = ty
      , args = Some [{ident = fName, tyAnnot = tyunknown_}, {ident = accName, tyAnnot = tyunknown_}]
      , args = Some [{ident = fName, tyAnnot = tyunknown_}, {ident = accName, tyAnnot = tyunknown_}]
      , cases =
        [ { pat = npvar_ targetName
          , thn = match_
            (appf2_ (nvar_ fName) (nvar_ accName) (getf_ (nvar_ targetName)))
            (ptuple_ [npvar_ accName, npvar_ valName])
            (utuple_ [nvar_ accName, setf_ (nvar_ valName) (nvar_ targetName)])
            never_
          }
        ]
      , info = NoInfo ()
      } in
    let mapf =
      let ty = tyarrows_
        [ tyarrow_ ty ty
        , synTy
        , synTy
        ]
      in DeclSem
      { ident = request.names.map
      , tyAnnot = ty
      , includes = [], declKind = BaseKind ()
      , tyBody = ty
      , args = Some [{ident = fName, tyAnnot = tyunknown_}]
      , args = Some [{ident = fName, tyAnnot = tyunknown_}]
      , cases =
        [ { pat = npvar_ targetName
          , thn = setf_ (appf1_ (nvar_ fName) (getf_ (nvar_ targetName))) (nvar_ targetName)
          }
        ]
      , info = NoInfo ()
      } in
    [getf, setf, mapAccumf, mapf]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="targetableType" kind="let">

```mc
let targetableType ty : Ast_Type -> CarriedTypeBase_CarriedType
```



<ToggleWrapper text="Code..">
```mc
let targetableType
  : use Ast in Type
  -> use CarriedTypeBase in CarriedType
  = lam ty. use CarriedTarget in TargetType {targetable = true, ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="untargetableType" kind="let">

```mc
let untargetableType ty : Ast_Type -> CarriedTypeBase_CarriedType
```



<ToggleWrapper text="Code..">
```mc
let untargetableType
  : use Ast in Type
  -> use CarriedTypeBase in CarriedType
  = lam ty. use CarriedTarget in TargetType {targetable = false, ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="seqType" kind="let">

```mc
let seqType ty : CarriedTypeBase_CarriedType -> CarriedTypeBase_CarriedType
```



<ToggleWrapper text="Code..">
```mc
let seqType
  : use CarriedTypeBase in CarriedType
  -> CarriedType
  = lam ty. use CarriedSeq in SeqType ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optionType" kind="let">

```mc
let optionType ty : CarriedTypeBase_CarriedType -> CarriedTypeBase_CarriedType
```



<ToggleWrapper text="Code..">
```mc
let optionType
  : use CarriedTypeBase in CarriedType
  -> CarriedType
  = lam ty. use CarriedOption in OptionType ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="recordType" kind="let">

```mc
let recordType fields : [(String, CarriedTypeBase_CarriedType)] -> CarriedTypeBase_CarriedType
```



<ToggleWrapper text="Code..">
```mc
let recordType
  : use CarriedTypeBase in [(String, CarriedType)]
  -> CarriedType
  = lam fields. use CarriedRecord in RecordType fields
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tupleType" kind="let">

```mc
let tupleType fields : [CarriedTypeBase_CarriedType] -> CarriedTypeBase_CarriedType
```



<ToggleWrapper text="Code..">
```mc
let tupleType
  : use CarriedTypeBase in  [CarriedType]
  -> CarriedType
  = lam fields. recordType (mapi (lam i. lam field. (int2string i, field)) fields)
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

use TestLang in

let tyInfo = targetableType (tycon_ "Info") in
let tyName = targetableType (tycon_ "Name") in
let tyString = targetableType tystr_ in
let tyExpr = targetableType (tycon_ "Expr") in
let tyType = targetableType (tycon_ "Type") in
let tyField = tupleType [tyString, tyExpr] in
let tyFields = seqType tyField in
let tyRecord = recordType
  [ ("info", tyInfo)
  , ("ty", tyType)
  , ("fields", tyFields)
  ] in

let recordConstructor =
  { name = nameSym "TmRecord"
  , fragment = nameSym "TmRecordAst"
  , synType = nameNoSym "Expr"
  , carried = tyRecord
  } in

let varConstructor =
  { name = nameSym "TmVar"
  , fragment = nameSym "TmVarAst"
  , synType = nameNoSym "Expr"
  , carried = recordType
    [ ("info", tyInfo)
    , ("ty", tyType)
    , ("ident", tyName)
    ]
  } in

let seqConstructor =
  { name = nameSym "TmSeq"
  , fragment = nameSym "TmSeqAst"
  , synType = nameNoSym "Expr"
  , carried = recordType
    [ ("info", tyInfo)
    , ("ty", tyType)
    , ("tms", seqType tyExpr)
    ]
  } in

let input =
  { baseName = nameNoSym "MExprBase"
  , constructors = [recordConstructor, varConstructor, seqConstructor]
  , sfunctions =
    [ {synName = nameNoSym "Expr", target = tycon_ "Info", names = {smapAccumL = nameNoSym "smapAccumL_EI", smap = nameNoSym "smap_EI", sfold = nameNoSym "sfold_EI"}}
    , {synName = nameNoSym "Expr", target = tycon_ "Expr", names = {smapAccumL = nameNoSym "smapAccumL_EI", smap = nameNoSym "smap_EI", sfold = nameNoSym "sfold_EI"}}
    , {synName = nameNoSym "Expr", target = tycon_ "Type", names = {smapAccumL = nameNoSym "smapAccumL_EI", smap = nameNoSym "smap_EI", sfold = nameNoSym "sfold_EI"}}
    ]
  , composedName = Some (nameNoSym "Composed")
  , fieldAccessors = []
  } in

let res = mkLanguages input in
-- printLn res;

let recordConstructor =
  { name = nameSym "TmRecord"
  , fragment = nameSym "TmRecordAst"
  , synType = nameNoSym "Expr"
  , carried = recordType
    [ ("info", untargetableType (tycon_ "Info"))
    , ("ty", untargetableType (tycon_ "Type"))
    , ( "bindings"
      , seqType
        (tupleType
          [ targetableType tystr_
          , targetableType (tycon_ "Expr")])
      )
    ]
  } in
let res = mkLanguages
  { baseName = nameNoSym "MExprBase"
  , constructors = [recordConstructor]
  , sfunctions =
    [ {synName = nameNoSym "Expr", target = tycon_ "Expr", names = {smapAccumL = nameNoSym "smapAccumL_EE", smap = nameNoSym "smap_EE", sfold = nameNoSym "sfold_EE"}}
    ]
  , composedName = Some (nameNoSym "Composed")
  , fieldAccessors = []
  } in
-- printLn res;

-- TODO(vipa, 2021-03-05): The tests here need to parse and evaluate
-- MLang, so I'm holding off on doing it in an automated fashion until
-- \\`boot-parser.mc\\` handles that

()
```
</ToggleWrapper>
</DocBlock>

