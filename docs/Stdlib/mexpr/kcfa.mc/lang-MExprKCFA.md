import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="addBaseMatchConstraints" kind="sem">

```mc
sem addBaseMatchConstraints : _a -> _a
```

<Description>{`Function that adds a set of universal base match constraints to a CFAGraph`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addBaseMatchConstraints =
  | graph ->
    { graph with mcgfs = concat [generateMatchConstraints] graph.mcgfs }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addBaseConstraints" kind="sem">

```mc
sem addBaseConstraints : _a -> _a
```

<Description>{`Function that adds a set of universal base constraints to a CFAGraph`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addBaseConstraints =
  | graph ->
    let cgfs = [ generateConstraints graph.im,
                 generateConstraintsMatch graph.im graph.mcgfs ] in
    { graph with cgfs = concat cgfs graph.cgfs }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraintsEmpty" kind="sem">

```mc
sem initConstraintsEmpty : KCFA_CFAGraph -> Ast_Expr -> KCFA_CFAGraph
```

<Description>{`Function that initializes the constraints in a CFAGraph for an empty  
context and context environmentNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem initConstraintsEmpty graph =
  | t ->
    match initConstraints (ctxEmpty ()) (ctxEnvEmpty ()) graph t with (_, graph)
    in graph
```
</ToggleWrapper>
</DocBlock>

