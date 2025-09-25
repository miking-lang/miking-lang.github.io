import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CarriedTypeGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="mkLanguages" kind="sem">

```mc
sem mkLanguages : GenInput -> [Ast_Decl]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

