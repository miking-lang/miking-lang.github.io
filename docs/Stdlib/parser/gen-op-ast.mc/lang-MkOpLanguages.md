import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MkOpLanguages  
  

  
  
  
## Semantics  
  

          <DocBlock title="mkOpLanguages" kind="sem">

```mc
sem mkOpLanguages : GenOpInput -> GenOpResult
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mkOpLanguages = | config ->
    let synDescs : Map Name InternalSynDesc = mapMapWithKey
      (lam original. lam desc.
        let synStr = config.namingScheme.synName (nameGetStr original) in
        { bad = desc.bad
        , grouping = desc.grouping
        , precedence = desc.precedence
        , baseFragmentName = desc.baseFragmentName
        , synName = nameSym synStr
        , baseOpFragmentName = nameSym (config.namingScheme.opBaseLangName (nameGetStr original))
        , functions =
          { topAllowed = nameSym (concat "topAllowed_" synStr)
          , leftAllowed = nameSym (concat "leftAllowed_" synStr)
          , rightAllowed = nameSym (concat "rightAllowed_" synStr)
          , groupingsAllowed = nameSym (concat "groupingsAllowed_" synStr)
          , parenAllowed = nameSym (concat "parenAllowed_" synStr)
          , getInfo = nameSym (concat "getInfo_" synStr)
          , getTerms = nameSym (concat "getTerms_" synStr)
          , unsplit = nameSym (concat "unsplit_" synStr)
          }
        })
      config.syns in
    let baseFragments = map _mkBaseFragment (mapBindings synDescs) in
    let constructorFragments = map (_mkConstructorFragment config.fieldLabels synDescs) config.operators in
    let composedFragment = _mkComposedFragment config synDescs constructorFragments in
    let fragments = join
      [ baseFragments
      , constructorFragments
      , [composedFragment]
      ] in
    let res : GenOpResult = _mkBrWrappers synDescs in
    {res with fragments = concat fragments res.fragments}
```
</ToggleWrapper>
</DocBlock>

