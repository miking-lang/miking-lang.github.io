import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# dfa.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/nfa.mc"} style={S.link}>nfa.mc</a>  
  
## Types  
  

          <DocBlock title="DFA" kind="type">

```mc
type DFA
```

<Description>{`adds syntactic sugar for DFA type  
DFA is based on the same data types as the NFA`}</Description>


<ToggleWrapper text="Code..">
```mc
type DFA v l = NFA v l
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="checkSpecificDuplicate" kind="let">

```mc
let checkSpecificDuplicate trans rest eqv eql : all v. all l. DigraphEdge v l -> [DigraphEdge v l] -> (v -> v -> Bool) -> (l -> l -> Bool) -> Bool
```



<ToggleWrapper text="Code..">
```mc
let checkSpecificDuplicate : all v. all l.
  DigraphEdge v l -> [DigraphEdge v l] -> (v -> v -> Bool) -> (l -> l -> Bool) -> Bool =
  lam trans. lam rest. lam eqv. lam eql.
  if(eqi (length rest) 0) then false
  else
  let first = head rest in
  let rest = tail rest in
  if(and (eqv first.0 trans.0) (eql first.2 trans.2)) then true
  else checkSpecificDuplicate trans rest eqv eql
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dfaConstr" kind="let">

```mc
let dfaConstr s trans startS accS cmpv eql : all a. all l. [a] -> [DigraphEdge a l] -> a -> [a] -> (a -> a -> Int) -> (l -> l -> Bool) -> NFA a l
```

<Description>{`constructor for the DFA`}</Description>


<ToggleWrapper text="Code..">
```mc
let dfaConstr = lam s. lam trans. lam startS. lam accS. lam cmpv. lam eql.
  let eqv = lam v1. lam v2. eqi (cmpv v1 v2) 0 in
	match checkDuplicateLabels trans eqv eql with
	Some _ then error "There are duplicate labels for same state outgoing transition at"
	else nfaConstr s trans startS accS cmpv eql
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dfaFromDigraph" kind="let">

```mc
let dfaFromDigraph  : all l. all v. Digraph v l -> v -> [v] -> NFA v l
```

<Description>{`Creat a DFA from a Digraph`}</Description>


<ToggleWrapper text="Code..">
```mc
let dfaFromDigraph = nfaFromDigraph
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
let transitions = [(0,1,'1'),(1,1,'1'),(1,2,'0'),(2,2,'0'),(2,1,'1')] in
let startState = 0 in
let acceptStates = [2] in
let newDfa = dfaConstr states transitions startState acceptStates subi eqChar in
utest eqi startState newDfa.startState with true in
utest eqsetEqual eqi acceptStates newDfa.acceptStates with true in
utest (digraphHasVertices states newDfa.graph) with true in
utest (digraphHasEdges transitions newDfa.graph) with true in
utest (digraphHasEdges [(1,2,'1')] (nfaAddTransition newDfa (1,2,'1')).graph) with true in
utest (digraphHasVertex 7 (nfaAddState newDfa 7).graph) with true in
utest nfaIsAcceptedState 2 newDfa with true in
utest nfaIsAcceptedState 3 newDfa with false in ()
```
</ToggleWrapper>
</DocBlock>

