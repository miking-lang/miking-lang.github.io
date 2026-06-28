import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# KTest  
  

  
  
  
## Semantics  
  

          <DocBlock title="testCfa" kind="sem">

```mc
sem testCfa : Int -> Ast_Expr -> KCFA_CFAGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem testCfa k =
  | t ->
    let graph = emptyCFAGraph k t in
    let graph = addBaseMatchConstraints graph in
    let graph = addBaseConstraints graph in
    let graph = initConstraintsEmpty graph t in
    solveCfa graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="testCfaDebug" kind="sem">

```mc
sem testCfaDebug : PprintEnv -> Int -> Ast_Expr -> (PprintEnv, KCFA_CFAGraph)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem testCfaDebug pprintenv k =
  | t ->
    let graph = emptyCFAGraph k t in
    let graph = addBaseMatchConstraints graph in
    let graph = addBaseConstraints graph in
    let graph = initConstraintsEmpty graph t in
    solveCfaDebug pprintenv graph
```
</ToggleWrapper>
</DocBlock>

