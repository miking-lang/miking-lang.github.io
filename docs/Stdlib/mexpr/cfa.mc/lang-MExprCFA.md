import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="addBaseMatchConstraints" kind="sem">

```mc
sem addBaseMatchConstraints : CFA_CFAGraphInit -> CFA_CFAGraphInit
```

<Description>{`Function that adds a set of universal base match constraints to a CFAGraphNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addBaseMatchConstraints =
  | graph ->
    { graph with mcgfs = cons generateMatchConstraints graph.mcgfs }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addBaseConstraints" kind="sem">

```mc
sem addBaseConstraints : CFA_CFAGraphInit -> Ast_Expr -> CFA_CFAGraphInit
```

<Description>{`Function that adds a set of universal base constraints to a CFAGraph`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addBaseConstraints (graph: CFAGraphInit) =
  | t ->

    -- Set constant propagation functions
    let graph = {graph with cpfs = cons propagateConstraintConst graph.cpfs} in

    -- Initialize constraint generating functions
    let cgfs = [ generateConstraints, generateConstraintsMatch ] in

    -- Recurse over program and generate constraints
    let graph = collectConstraints cgfs graph t in

    graph
```
</ToggleWrapper>
</DocBlock>

