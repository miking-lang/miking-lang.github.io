import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CarriedTypeHelpers  
  

  
  
  
## Semantics  
  

          <DocBlock title="_mkSmapAccumL" kind="sem">

```mc
sem _mkSmapAccumL : SFuncRequest -> Constructor -> Option Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_mkAccess" kind="sem">

```mc
sem _mkAccess : FieldAccessorRequest -> Constructor -> [Ast_Decl]
```

<Description>{`No documentation available here. sem \_mkAccess synType field =`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_mkSFuncStubs" kind="sem">

```mc
sem _mkSFuncStubs : SFuncRequest -> [Ast_Decl]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

