import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenOpAstLang  
  

  
  
  
## Semantics  
  

          <DocBlock title="_mkConstructorFragment" kind="sem">

```mc
sem _mkConstructorFragment : FieldLabels -> Map Name InternalSynDesc -> GenOperator -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _mkConstructorFragment labels synNames = | op ->
    let desc = mapFindExn op.baseTypeName synNames in
    let synName = desc.synName in
    let conName = op.opConstructorName in

    let getInfo =
      let x = nameSym "x" in
      DeclSem
      { ident = desc.functions.getInfo
      , tyAnnot = tyunknown_
      , tyBody = tyunknown_
      , args = Some []
      , includes = [], declKind = BaseKind ()
      , cases = [{pat = npcon_ conName (npvar_ x), thn = recordproj_ labels.info (nvar_ x)}]
      , info = NoInfo ()
      } in
    let getTerms =
      let x = nameSym "x" in
      DeclSem
      { ident = desc.functions.getTerms
      , tyAnnot = tyunknown_
      , tyBody = tyunknown_
      , args = Some []
      , includes = [], declKind = BaseKind ()
      , cases = [{pat = npcon_ conName (npvar_ x), thn = recordproj_ labels.terms (nvar_ x)}]
      , info = NoInfo ()
      } in
    let unsplit =
      let unsplit_ = lam r. app_ (nvar_ desc.functions.unsplit) r in
      let x = nameSym "x" in
      let arm = switch op.mkUnsplit
        case AtomUnsplit f then
          { pat = npcon_ _incNames.c.atomP (prec_ [("self", npcon_ conName (npvar_ x))])
          , thn = utuple_
            [ recordproj_ labels.info (nvar_ x)
            , f {record = nvar_ x, info = recordproj_ labels.info (nvar_ x)}
            ]
          }
        case PrefixUnsplit f then
          let info = nameSym "info" in
          let r = nameSym "r" in
          let rinfo = nameSym "rinfo" in
          { pat = npcon_ _incNames.c.prefixP
            (prec_
              [ ("self", npcon_ conName (npvar_ x))
              , ("rightChildAlts", pseqedgew_ [npvar_ r] [])
              ]
            )
          , thn = match_
            (unsplit_ (nvar_ r))
            (ptuple_ [npvar_ rinfo, npvar_ r])
            (_nuletin_ info (_mergeInfos_ [recordproj_ labels.info (nvar_ x), nvar_ rinfo])
              (utuple_
                [ nvar_ info
                , f { record = nvar_ x , right = nvar_ r , info = nvar_ info}
                ]))
            never_
          }
        case PostfixUnsplit f then
          let info = nameSym "info" in
          let l = nameSym "l" in
          let linfo = nameSym "linfo" in
          { pat = npcon_ _incNames.c.postfixP
            (prec_
              [ ("self", npcon_ conName (npvar_ x))
              , ("leftChildAlts", pseqedgew_ [npvar_ l] [])
              ]
            )
          , thn = match_
            (unsplit_ (nvar_ l))
            (ptuple_ [npvar_ linfo, npvar_ l])
            (_nuletin_ info (_mergeInfos_ [nvar_ linfo, recordproj_ labels.info (nvar_ x)])
              (utuple_
                [ nvar_ info
                , f { record = nvar_ x , left = nvar_ l , info = nvar_ info}
                ]))
            never_
          }
        case InfixUnsplit f then
          let info = nameSym "info" in
          let l = nameSym "l" in
          let linfo = nameSym "linfo" in
          let r = nameSym "r" in
          let rinfo = nameSym "rinfo" in
          { pat = npcon_ _incNames.c.infixP
            (prec_
              [ ("self", npcon_ conName (npvar_ x))
              , ("leftChildAlts", pseqedgew_ [npvar_ l] [])
              , ("rightChildAlts", pseqedgew_ [npvar_ r] [])
              ]
            )
          , thn = match_
            (utuple_ [unsplit_ (nvar_ l), unsplit_ (nvar_ r)])
            (ptuple_
              [ ptuple_ [npvar_ linfo, npvar_ l]
              , ptuple_ [npvar_ rinfo, npvar_ r]
              ])
            (_nuletin_ info (_mergeInfos_ [nvar_ linfo, recordproj_ labels.info (nvar_ x), nvar_ rinfo])
              (utuple_
                [ nvar_ info
                , f { record = nvar_ x , left = nvar_ l, right = nvar_ r , info = nvar_ info}
                ]))
            never_
          }
        end
      in DeclSem
      { ident = desc.functions.unsplit
      , tyAnnot = tyunknown_
      , tyBody = tyunknown_
      , args = Some []
      , includes = [], declKind = BaseKind ()
      , cases = [arm]
      , info = NoInfo ()
      } in
    let grouping = match (op.mkUnsplit, op.assoc) with (InfixUnsplit _, !NAssoc _)
      then [ DeclSem
        { ident = desc.functions.groupingsAllowed
        , tyAnnot = tyunknown_
        , tyBody = tyunknown_
        , args = Some []
        , includes = [], declKind = BaseKind ()
        , cases =
          [ { pat = ptuple_ [npcon_ op.opConstructorName pvarw_, npcon_ op.opConstructorName pvarw_]
            , thn = match op.assoc with LAssoc _ then nconapp_ _incNames.c.gleft unit_ else nconapp_ _incNames.c.gright unit_
            }
          ]
        , info = NoInfo ()
        }]
      else [] in
    DeclLang
    { ident = conName  -- TODO(vipa, 2023-05-08): This reuses a \\`Name\\`, though in a different kind of scope. Might be worth creating a new name and syncing, but it's too much work right now
    , includes = cons desc.baseOpFragmentName op.requiredFragments
    , decls = concat
      grouping
      [ DeclSyn
        { ident = synName
        , params = [nameNoSym "lstyle", nameNoSym "rstyle"]
        , includes = [], declKind = BaseKind ()
        , defs = [{ident = conName, tyIdent = op.carried, tyName = nameNoSym (concat (nameGetStr conName) "Type")}]
        , info = NoInfo ()
        }
      , getInfo
      , getTerms
      , unsplit
      ]
    , info = NoInfo ()
    }
```
</ToggleWrapper>
</DocBlock>

