import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# nfa.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/graph.mc"} style={S.link}>graph.mc</a>, <a href={"/docs/Stdlib/char.mc"} style={S.link}>char.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Types  
  

          <DocBlock title="NFA" kind="type">

```mc
type NFA
```



<ToggleWrapper text="Code..">
```mc
type NFA v l  = {
  graph: Digraph v l,
  startState: v,
  acceptStates: [v]
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="nfaGetEqv" kind="let">

```mc
let nfaGetEqv dfa : all v. all l. NFA v l -> v -> v -> Bool
```

<Description>{`get equality function for states`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaGetEqv : all v. all l. NFA v l -> v -> v -> Bool = lam dfa.
  digraphEqv dfa.graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaGetCmp" kind="let">

```mc
let nfaGetCmp dfa : all v. all l. NFA v l -> v -> v -> Int
```

<Description>{`get comparison function for states`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaGetCmp : all v. all l. NFA v l -> v -> v -> Int = lam dfa.
  digraphCmpv dfa.graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaGetEql" kind="let">

```mc
let nfaGetEql dfa : all v. all l. NFA v l -> l -> l -> Bool
```

<Description>{`get equality functions for labels`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaGetEql : all v. all l. NFA v l -> l -> l -> Bool = lam dfa.
  dfa.graph.eql
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaStates" kind="let">

```mc
let nfaStates nfa : all v. all l. NFA v l -> [v]
```

<Description>{`get all states in nfa`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaStates : all v. all l. NFA v l -> [v] = lam nfa.
  digraphVertices nfa.graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaTransitions" kind="let">

```mc
let nfaTransitions nfa : all v. all l. NFA v l -> [DigraphEdge v l]
```

<Description>{`get all transitions in nfa`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaTransitions : all v. all l. NFA v l -> [DigraphEdge v l] = lam nfa.
  digraphEdges nfa.graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaStartState" kind="let">

```mc
let nfaStartState nfa : all v. all l. NFA v l -> v
```

<Description>{`get start state of the nfa`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaStartState : all v. all l. NFA v l -> v = lam nfa.
  nfa.startState
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaAcceptStates" kind="let">

```mc
let nfaAcceptStates nfa : all v. all l. NFA v l -> [v]
```

<Description>{`get the accept states in the nfa`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaAcceptStates : all v. all l. NFA v l -> [v] = lam nfa.
  nfa.acceptStates
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaTransitionsBetween" kind="let">

```mc
let nfaTransitionsBetween s1 s2 nfa : all v. all l. v -> v -> NFA v l -> [DigraphEdge v l]
```

<Description>{`get all transitions from state s1 to state s2`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaTransitionsBetween : all v. all l. v -> v -> NFA v l -> [DigraphEdge v l] =
  lam s1. lam s2. lam nfa.
  digraphEdgesBetween s1 s2 nfa.graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaInStates" kind="let">

```mc
let nfaInStates s nfa : all v. all l. v -> NFA v l -> [v]
```

<Description>{`get all predecessor states to state s`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaInStates : all v. all l. v -> NFA v l -> [v] = lam s. lam nfa.
  digraphPredeccessors s nfa.graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaOutStates" kind="let">

```mc
let nfaOutStates s nfa : all v. all l. v -> NFA v l -> [v]
```

<Description>{`get all successor states to state s`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaOutStates : all v. all l. v -> NFA v l -> [v] = lam s. lam nfa.
  digraphSuccessors s nfa.graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaCheckValues" kind="let">

```mc
let nfaCheckValues trans s eqv eql accS startS : all a. all a1. all a2. all a3. a -> [a1] -> (a2 -> a1 -> Bool) -> a3 -> [a2] -> a2 -> ()
```

<Description>{`check that values are acceptable for the NFA`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaCheckValues = lam trans. lam s. lam eqv. lam eql. lam accS. lam startS.
  if not (setIsSubsetEq eqv accS s) then error "Some accepted states do not exist"
  else if not (eqsetMem eqv startS s) then error "The start state does not exist"
  else ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaAddState" kind="let">

```mc
let nfaAddState nfa state : all v. all l. NFA v l -> v -> NFA v l
```

<Description>{`States are represented by vertices in a directed graph`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaAddState : all v. all l. NFA v l -> v -> NFA v l =  lam nfa. lam state.
  {
    graph = (digraphAddVertex state nfa.graph),
    startState = nfa.startState,
    acceptStates = nfa.acceptStates
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaAddTransition" kind="let">

```mc
let nfaAddTransition nfa trans : all v. all l. NFA v l -> DigraphEdge v l -> NFA v l
```

<Description>{`Transitions between two states are represented by edges between vertices`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaAddTransition : all v. all l. NFA v l -> DigraphEdge v l -> NFA v l =
  lam nfa. lam trans.
  let states = nfaStates nfa in
  let from = trans.0 in
  let to = trans.1 in
  let label = trans.2 in
  {
    graph = (digraphAddEdge from to label nfa.graph),
    startState = nfa.startState,
    acceptStates = nfa.acceptStates
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaIsAcceptedState" kind="let">

```mc
let nfaIsAcceptedState s nfa : all v. all l. v -> NFA v l -> Bool
```

<Description>{`returns true if state s is an accepted state in the nfa`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaIsAcceptedState : all v. all l. v -> NFA v l -> Bool = lam s. lam nfa.
  eqsetMem (digraphEqv nfa.graph) s nfa.acceptStates
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaStateHasTransition" kind="let">

```mc
let nfaStateHasTransition s trans lbl : all v. all l. v -> Digraph v l -> l -> Bool
```

<Description>{`check if there is a transition with label lbl from state s`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaStateHasTransition : all v. all l. v -> Digraph v l -> l -> Bool =
  lam s. lam trans. lam lbl.
  let neighbors = digraphEdgesFrom s trans in
  --check if lbl is a label in the neighbors list
  eqsetMem trans.eql lbl (map (lam x. x.2) neighbors)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaNextStates" kind="let">

```mc
let nfaNextStates from graph lbl : all v. all l. v -> Digraph v l -> l -> [v]
```

<Description>{`get next state from state s with label lbl. Throws error if no transition is found`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaNextStates : all v. all l. v -> Digraph v l -> l -> [v] =
  lam from. lam graph. lam lbl.
  let neighbors = digraphEdgesFrom from graph in
  let matches = filter (lam x. graph.eql x.2 lbl) neighbors in
  let neighboringStates = map (lam x. x.1) matches in
  match matches with [] then
  error "No transition was found"
  else neighboringStates
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaMakeInputPath" kind="let">

```mc
let nfaMakeInputPath i currentState input nfa : all v. all l. Int -> v -> [l] -> NFA v l -> [{index: Int, state: v, status: String}]
```



<ToggleWrapper text="Code..">
```mc
let nfaMakeInputPath : all v. all l.
  Int -> v -> [l] -> NFA v l -> [{state : v, index : Int, status : String}] =
  lam i. lam currentState. lam input. lam nfa.
  let pathIsAccepted = lam path.
    if null path then false
    else (eqsetEqual eqChar (last path).status "accepted")
  in
  if (eqi (length input) 0) then
    if (nfaIsAcceptedState currentState nfa) then [{state = currentState,index = i, status = "accepted"}]
    else [{state = currentState, index = i, status = "not accepted"}]
  -- check if transition exists. If yes, go to next state
  else if nfaStateHasTransition currentState nfa.graph (head input) then
    foldl (lam path. lam elem.
      if (pathIsAccepted path) then path
      else
        let config = [{state = currentState,index = i, status = ""}] in
        join [path, config, nfaMakeInputPath (addi i 1) elem (tail input) nfa]
    ) [] (nfaNextStates currentState nfa.graph (head input))
  else [{state = currentState, index = i, status = "stuck"}]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaConstr" kind="let">

```mc
let nfaConstr s trans startS accS cmpv eql : all v. all l. [v] -> [DigraphEdge v l] -> v -> [v] -> (v -> v -> Int) -> (l -> l -> Bool) -> NFA v l
```

<Description>{`constructor for the NFA`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaConstr = lam s. lam trans. lam startS. lam accS. lam cmpv. lam eql.
  let eqv = lam v1. lam v2. eqi (cmpv v1 v2) 0 in
  nfaCheckValues trans s eqv eql accS startS;
  let emptyDigraph = digraphEmpty cmpv eql in
  let initNfa = {
    graph = emptyDigraph,
    startState = startS,
    acceptStates = accS
  } in
  foldl nfaAddTransition (foldl nfaAddState initNfa s) trans
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nfaFromDigraph" kind="let">

```mc
let nfaFromDigraph g startS accS : all l. all v. Digraph v l -> v -> [v] -> NFA v l
```

<Description>{`Create an NFA from a Digraph`}</Description>


<ToggleWrapper text="Code..">
```mc
let nfaFromDigraph = lam g. lam startS. lam accS.
  nfaConstr (digraphVertices g) (digraphEdges g) startS accS (digraphCmpv g) (digraphEql g)
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
let states = [0,1,2] in
let states2 = [0,1,2,3,4] in
let transitions = [(0,1,'1'),(1,1,'1'),(1,2,'0'),(2,2,'0'),(2,1,'1')] in
let transitions2 = [(0,1,'1'),(1,3,'1'),(1,2,'1')] in
let startState = 0 in
let acceptStates = [2] in
let newNfa = nfaConstr states transitions startState acceptStates subi eqChar in
let newNfa2 = nfaConstr states2 transitions2 startState acceptStates subi eqChar in
let newNfa3 = nfaConstr states2 transitions2 startState [3] subi eqChar in
utest eqi startState newNfa.startState with true in
utest eqsetEqual eqi acceptStates newNfa.acceptStates with true in
utest (digraphHasVertices states newNfa.graph) with true in
utest (digraphHasEdges transitions newNfa.graph) with true in
utest (digraphHasEdges [(1,2,'1')] (nfaAddTransition newNfa (1,2,'1')).graph) with true in
utest (digraphHasVertex 7 (nfaAddState newNfa 7).graph) with true in
utest nfaIsAcceptedState 2 newNfa with true in
utest nfaIsAcceptedState 3 newNfa with false in
utest nfaNextStates 1 newNfa.graph '0' with [2] in
-- Not accepted
utest nfaMakeInputPath (negi 1) newNfa.startState "1011" newNfa with
  [{status = "",state = 0,index = negi 1},
  {status = "",state = 1,index = 0},
  {status = "",state = 2,index = 1},
  {status = "",state = 1,index = 2},
  {status = "not accepted",state = 1,index = 3}] in
-- Accepted
utest nfaMakeInputPath (negi 1) newNfa.startState "10110" newNfa with
  [{status = "",state = 0,index = negi 1},
  {status = "",state = 1,index = 0},
  {status = "",state = 2,index = 1},
  {status = "",state = 1,index = 2},
  {status = "",state = 1,index = 3},
  {status = "accepted",state = 2,index = 4}] in
-- Invalid transition
utest nfaMakeInputPath (negi 1) newNfa.startState "0110" newNfa with
  [{status = "stuck",state = 0,index = negi 1}] in
-- Input of length 0
utest nfaMakeInputPath (negi 1) newNfa.startState "" newNfa with
  [{status = "not accepted",state = 0,index = negi 1}] in
-- Accepted, after branch got stuck.
 utest nfaMakeInputPath (negi 1) newNfa2.startState "11" newNfa2 with
  [{status = "",state = 0,index = (negi 1)},
  {status = "",state = 1,index = 0},
  {status = "not accepted", state = 3,index = 1},
  {status = "",state = 1,index = 0},
  {status = "accepted",state = 2,index = 1}] in
-- Accepted, got accepted in the first branch (the second isn't)
utest nfaMakeInputPath (negi 1) newNfa3.startState "11" newNfa3 with
  [{status = "",state = 0,index = (negi 1)},
  {status = "",state = 1,index = 0},
  {status = "accepted",state = 3,index = 1}] in
()
```
</ToggleWrapper>
</DocBlock>

