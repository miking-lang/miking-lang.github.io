import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Test  
  

  
  
  
## Semantics  
  

          <DocBlock title="testCfa" kind="sem">

```mc
sem testCfa : Ast_Expr -> CFA_CFAGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem testCfa =
  | t ->
    let graph = emptyCFAGraphInit t in
    let graph = addBaseMatchConstraints graph in
    let graph = addBaseConstraints graph t in
    solveCfa graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="testCfaDebug" kind="sem">

```mc
sem testCfaDebug : PprintEnv -> Ast_Expr -> (PprintEnv, CFA_CFAGraph)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem testCfaDebug pprintenv =
  | t ->
    let graph = emptyCFAGraphInit t in
    let graph = addBaseMatchConstraints graph in
    let graph = addBaseConstraints graph t in
    solveCfaDebug pprintenv graph
```
</ToggleWrapper>
</DocBlock>

