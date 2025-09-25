import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# digraph.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
Represents a directed graph with labeled edges.  
  
Vertices and labels can be of any data types, as long as they have an  
equality function.  
  
An edge is represented as a triple \(from, to, label\), where the edge goes  
from "from" to "to", and "label" is the label of the edge. There can be  
several edges between two vertices.  
  
Vertices must be unique: there cannot be two vertices whose value of the  
equality function is true. This is maintained as invariant. Similarly, labels  
between any pair of vertices must be unique; this is also maintained as  
invariant.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/math.mc"} style={S.link}>math.mc</a>, <a href={"/docs/Stdlib/eqset.mc"} style={S.link}>eqset.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>  
  
## Types  
  

          <DocBlock title="DigraphEdge" kind="type">

```mc
type DigraphEdge
```



<ToggleWrapper text="Code..">
```mc
type DigraphEdge v l = (v, v, l)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Digraph" kind="type">

```mc
type Digraph
```



<ToggleWrapper text="Code..">
```mc
type Digraph v l = { adj : Map v [(v,l)],
                     eql : l -> l -> Bool }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Successors" kind="type">

```mc
type Successors
```



<ToggleWrapper text="Code..">
```mc
type Successors v = {
  i : Int,
  number : Map v Int,
  lowlink : Map v Int,
  stack : [v],
  comps : [[v]]
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="digraphEmpty" kind="let">

```mc
let digraphEmpty cmpv eql : all v. all l. (v -> v -> Int) -> (l -> l -> Bool) -> Digraph v l
```

<Description>{`Returns an empty graph. Input: A compare function for vertices and an  
equality functions for labels.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphEmpty : all v. all l. (v -> v -> Int) -> (l -> l -> Bool) -> Digraph v l =
  lam cmpv. lam eql. {adj = mapEmpty cmpv, eql = eql}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphCmpv" kind="let">

```mc
let digraphCmpv g : all v. all l. Digraph v l -> v -> v -> Int
```

<Description>{`Get comparison function for vertices.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphCmpv : all v. all l. Digraph v l -> v -> v -> Int =
  lam g. mapGetCmpFun g.adj
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphEqv" kind="let">

```mc
let digraphEqv g v1 v2 : all v. all l. Digraph v l -> v -> v -> Bool
```

<Description>{`Get equivalence function for vertices.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphEqv : all v. all l. Digraph v l -> v -> v -> Bool =
  lam g. lam v1. lam v2. eqi (digraphCmpv g v1 v2) 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphEql" kind="let">

```mc
let digraphEql g : all v. all l. Digraph v l -> l -> l -> Bool
```

<Description>{`Get equivalence function for labels.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphEql : all v. all l. Digraph v l -> l -> l -> Bool =
  lam g. g.eql
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphVertices" kind="let">

```mc
let digraphVertices g : all v. all l. Digraph v l -> [v]
```

<Description>{`Get the vertices of the graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphVertices : all v. all l. Digraph v l -> [v] =
  lam g. mapKeys g.adj
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphCountVertices" kind="let">

```mc
let digraphCountVertices g : all v. all l. Digraph v l -> Int
```

<Description>{`Get the number of vertices in graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphCountVertices : all v. all l. Digraph v l -> Int =
  lam g. mapSize g.adj
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphEdges" kind="let">

```mc
let digraphEdges g : all v. all l. Digraph v l -> [DigraphEdge v l]
```

<Description>{`Get the edges of the graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphEdges : all v. all l. Digraph v l -> [DigraphEdge v l] = lam g.
  foldl (lam acc. lam b : (v, [(v,l)]).
    concat acc (map (lam t : (v, l). (b.0, t.0, t.1)) b.1))
    [] (mapBindings g.adj)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphCountEdges" kind="let">

```mc
let digraphCountEdges g : all v. all l. Digraph v l -> Int
```

<Description>{`Get the edges of the graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphCountEdges : all v. all l. Digraph v l -> Int = lam g.
  foldl (lam acc. lam es. addi acc (length es)) 0 (mapValues g.adj)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphEdgesFrom" kind="let">

```mc
let digraphEdgesFrom v g : all v. all l. v -> Digraph v l -> [DigraphEdge v l]
```

<Description>{`Get the outgoing edges from vertex v in graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphEdgesFrom : all v. all l. v -> Digraph v l -> [DigraphEdge v l] =
  lam v. lam g.
  map (lam t : (v, l). (v, t.0, t.1))
    (mapLookupOrElse (lam. dprint v; error "Lookup failed") v g.adj)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphEdgesTo" kind="let">

```mc
let digraphEdgesTo v g : all v. all l. v -> Digraph v l -> [DigraphEdge v l]
```

<Description>{`Get the incoming edges to vertex v in graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphEdgesTo : all v. all l. v -> Digraph v l -> [DigraphEdge v l] =
  lam v. lam g.
  let allEdges = digraphEdges g in
  filter (lam tup : DigraphEdge v l. eqi (digraphCmpv g v tup.1) 0) allEdges
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphEdgesBetween" kind="let">

```mc
let digraphEdgesBetween v1 v2 g : all v. all l. v -> v -> Digraph v l -> [DigraphEdge v l]
```

<Description>{`Get all edges from v1 to v2 in graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphEdgesBetween : all v. all l. v -> v -> Digraph v l -> [DigraphEdge v l] =
  lam v1. lam v2. lam g.
  let fromV1 = digraphEdgesFrom v1 g in
  filter (lam t : DigraphEdge v l. eqi (digraphCmpv g v2 t.1) 0) fromV1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphLabels" kind="let">

```mc
let digraphLabels v1 v2 g : all v. all l. v -> v -> Digraph v l -> [l]
```

<Description>{`Get all labels between v1 and v2 in graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphLabels : all v. all l. v -> v -> Digraph v l -> [l] = lam v1. lam v2. lam g.
  let from_v1_to_v2 =
    filter (lam tup : DigraphEdge v l. eqi (digraphCmpv g tup.1 v2) 0)
      (digraphEdgesFrom v1 g) in
  map (lam tup : DigraphEdge v l. tup.2) from_v1_to_v2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphHasVertex" kind="let">

```mc
let digraphHasVertex v g : all v. all l. v -> Digraph v l -> Bool
```

<Description>{`Check whether g has vertex v.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphHasVertex : all v. all l. v -> Digraph v l -> Bool = lam v. lam g.
  mapMem v g.adj
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphHasVertices" kind="let">

```mc
let digraphHasVertices vs g : all a. all l. [a] -> Digraph a l -> Bool
```

<Description>{`Check whether g has all the vertices vs.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphHasVertices = lam vs. lam g.
  forAll (lam v. digraphHasVertex v g) vs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphEdgeEq" kind="let">

```mc
let digraphEdgeEq g e1 e2 : all v. all l. Digraph v l -> DigraphEdge v l -> DigraphEdge v l -> Bool
```

<Description>{`Check whether edges e1 and e2 are equal in graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphEdgeEq : all v. all l.
  Digraph v l -> DigraphEdge v l -> DigraphEdge v l -> Bool =
  lam g. lam e1. lam e2.
  and (and (eqi (digraphCmpv g e1.0 e2.0) 0)
           (eqi (digraphCmpv g e1.1 e2.1) 0))
      (g.eql e1.2 e2.2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphHasEdge" kind="let">

```mc
let digraphHasEdge e g : all v. all l. DigraphEdge v l -> Digraph v l -> Bool
```

<Description>{`Check whether g has edge e.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphHasEdge : all v. all l. DigraphEdge v l -> Digraph v l -> Bool =
  lam e. lam g.
  match e with (from, to, lbl) in
  match mapLookup from g.adj with Some edgesFrom then
    any (lam t : (v, l).
      if eqi 0 (digraphCmpv g t.0 to) then
        g.eql t.1 lbl
      else false
    ) edgesFrom
  else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphHasEdges" kind="let">

```mc
let digraphHasEdges es g : all v. all l. [DigraphEdge v l] -> Digraph v l -> Bool
```

<Description>{`Check whether graph g has all the edges in es.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphHasEdges = lam es. lam g.
  forAll (lam e. digraphHasEdge e g) es
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphGraphEq" kind="let">

```mc
let digraphGraphEq g1 g2 : all v. all l. Digraph v l -> Digraph v l -> Bool
```

<Description>{`Check whether graph g1 is equal to graph g2.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphGraphEq : all v. all l. Digraph v l -> Digraph v l -> Bool =
  lam g1. lam g2.
    if eqi (digraphCountEdges g1) (digraphCountEdges g2) then
      if eqi (digraphCountVertices g1) (digraphCountVertices g2) then
        mapEq (lam ds1. lam ds2.
          let m1 = mapEmpty (digraphCmpv g1) in
          let m1 = foldl (lam acc. lam d:(v,l).
                        let vals = mapLookupOrElse (lam. []) d.0 acc in
                        mapInsert d.0 (cons d.1 vals) acc) m1 ds1 in
          let m2 = mapEmpty (digraphCmpv g2) in
          let m2 = foldl (lam acc. lam d:(v,l).
                        let vals = mapLookupOrElse (lam. []) d.0 acc in
                        mapInsert d.0 (cons d.1 vals) acc) m2 ds2 in
          mapEq (lam d1. lam d2. eqsetEqual (lam dx1. lam dx2. digraphEql g1 dx1 dx2) d1 d2) m1 m2) g1.adj g2.adj
      else false
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphSuccessors" kind="let">

```mc
let digraphSuccessors v g : all v. all l. v -> Digraph v l -> [v]
```

<Description>{`Get successor nodes of v.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphSuccessors : all v. all l. v -> Digraph v l -> [v] = lam v. lam g.
  let outgoing = digraphEdgesFrom v g in
  let successors = map (lam t : DigraphEdge v l. t.1) outgoing in
  setToSeq (setOfSeq (digraphCmpv g) successors)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphPredeccessors" kind="let">

```mc
let digraphPredeccessors v g : all v. all l. v -> Digraph v l -> [v]
```

<Description>{`Get predecessor nodes of v.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphPredeccessors : all v. all l. v -> Digraph v l -> [v] = lam v. lam g.
  distinct (lam v1. lam v2. eqi (digraphCmpv g v1 v2) 0)
    (map (lam tup : DigraphEdge v l. tup.0) (digraphEdgesTo v g))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphIsSuccessor" kind="let">

```mc
let digraphIsSuccessor v1 v2 g : all v. all l. v -> v -> Digraph v l -> Bool
```

<Description>{`Check whether vertex v1 is a successor of vertex v2 in graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphIsSuccessor : all v. all l. v -> v -> Digraph v l -> Bool =
  lam v1. lam v2. lam g.
  let outgoing = mapLookupOrElse (lam. error "Lookup failed") v2 g.adj in
  let successors = map (lam t : (v, l). t.0) outgoing in
  let successors = setOfSeq (digraphCmpv g) successors in
  let res = setMem v1 successors in
  res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphSuccessorLabel" kind="let">

```mc
let digraphSuccessorLabel v lbl g : all v. all l. v -> l -> Digraph v l -> Option v
```

<Description>{`Get the successor vertex of 'v' with edge label 'lbl', if it exists.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphSuccessorLabel: all v. all l. v -> l -> Digraph v l -> Option v =
  lam v. lam lbl. lam g.
    optionMap (lam e. e.1) (find (lam e. g.eql e.2 lbl) (digraphEdgesFrom v g))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphAddVertexCheck" kind="let">

```mc
let digraphAddVertexCheck v g check : all v. all l. v -> Digraph v l -> Bool -> Digraph v l
```

<Description>{`Add vertex v to graph g if it doesn't already exist in g.  
If v exists in g and check is true, an error is thrown.  
If v exist in g and check is false, g stays unchanged.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphAddVertexCheck : all v. all l. v -> Digraph v l -> Bool -> Digraph v l =
  lam v. lam g. lam check.
  if digraphHasVertex v g then
    if check then error "vertex already exists" else g
  else
    {g with adj = mapInsert v [] g.adj}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphAddVertex" kind="let">

```mc
let digraphAddVertex v g : all a. all l. a -> Digraph a l -> Digraph a l
```

<Description>{`Add a vertex to graph g. Throws an error if v already exists in g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphAddVertex = lam v. lam g.
  digraphAddVertexCheck v g true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphMaybeAddVertex" kind="let">

```mc
let digraphMaybeAddVertex v g : all a. all l. a -> Digraph a l -> Digraph a l
```

<Description>{`Maybe add a vertex v to g. Graph stays unchanged if v already exists in g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphMaybeAddVertex = lam v. lam g.
  digraphAddVertexCheck v g false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphAddUpdateVertex" kind="let">

```mc
let digraphAddUpdateVertex v g : all v. all l. v -> Digraph v l -> Digraph v l
```

<Description>{`Add a vertex v to g. Updates the vertex v in graph g if v already exists in g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphAddUpdateVertex : all v. all l. v -> Digraph v l -> Digraph v l =
  lam v. lam g.
  if digraphHasVertex v g then
    let edgeList = mapLookupOrElse (lam. error "Lookup failed") v g.adj in
    let m = mapRemove v g.adj in
    let m = foldl (lam acc. lam v2.
            let edgeLst = mapLookupOrElse (lam. error "Lookup failed") v2 acc in
            let newEdgeLst = map (lam e:(v,l). if (digraphEqv g) v e.0 then (v,e.1) else e) edgeLst in
            mapInsert v2 newEdgeLst acc) m (mapKeys m) in
    {g with adj = mapInsert v edgeList m}
  else
    {g with adj = mapInsert v [] g.adj}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphRemoveVertex" kind="let">

```mc
let digraphRemoveVertex v g : all v. all l. v -> Digraph v l -> Digraph v l
```



<ToggleWrapper text="Code..">
```mc
let digraphRemoveVertex : all v. all l. v -> Digraph v l -> Digraph v l = lam v. lam g.
  utest digraphHasVertex v g with true in
    let m = mapRemove v g.adj in
    let m = foldl (lam acc. lam v2.
            let edgeLst = mapLookupOrElse (lam. error "Lookup failed") v2 acc in
            let newEdgeLst = filter (lam e:(v,l). not ((digraphEqv g) v e.0) ) edgeLst in
            mapInsert v2 newEdgeLst (mapRemove v2 acc)) m (mapKeys m) in
    {g with adj = m}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphAddEdge" kind="let">

```mc
let digraphAddEdge v1 v2 l g : all v. all l. v -> v -> l -> Digraph v l -> Digraph v l
```

<Description>{`Add edge e=\(v1,v2,l\) to g. Checks invariants iff utests are enabled.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphAddEdge : all v. all l. v -> v -> l -> Digraph v l -> Digraph v l =
  lam v1. lam v2. lam l. lam g.
  utest digraphHasVertex v1 g with true in
  utest digraphHasVertex v2 g with true in
  utest
    any (g.eql l) (digraphLabels v1 v2 g)
  with false in
  let oldEdgeList =
    mapLookupOrElse (lam. error "Vertex not found") v1 g.adj
  in
  {g with adj = mapInsert v1 (snoc oldEdgeList (v2, l)) g.adj}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphMaybeAddEdge" kind="let">

```mc
let digraphMaybeAddEdge v1 v2 l g : all v. all l. v -> v -> l -> Digraph v l -> Digraph v l
```

<Description>{`Add edge e=\(v1,v2,l\) to g. Graph stays unchanged if e already exists in g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphMaybeAddEdge : all v. all l. v -> v -> l -> Digraph v l -> Digraph v l =
  lam v1. lam v2. lam l. lam g.
  if digraphHasEdge (v1,v2,l) g then g
  else
    let oldEdgeList =
    mapLookupOrElse (lam. error "Vertex not found") v1 g.adj
  in
    {g with adj = mapInsert v1 (snoc oldEdgeList (v2, l)) g.adj}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphMaybeAddEdges" kind="let">

```mc
let digraphMaybeAddEdges es g : all v. all l. [DigraphEdge v l] -> Digraph v l -> Digraph v l
```

<Description>{`Add a list of edges to a graph g using the digraphMaybeAddEdge.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphMaybeAddEdges : all v. all l. [DigraphEdge v l] -> Digraph v l -> Digraph v l =
  lam es. lam g.
  foldl (lam g. lam e : DigraphEdge v l. digraphMaybeAddEdge e.0 e.1 e.2 g) g es
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphAddVertices" kind="let">

```mc
let digraphAddVertices vs g : all b. all l. [b] -> Digraph b l -> Digraph b l
```

<Description>{`Add a list of vertices to a graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphAddVertices = lam vs. lam g.
  foldl (lam g. lam v. digraphAddVertex v g) g vs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphAddEdges" kind="let">

```mc
let digraphAddEdges es g : all v. all l. [DigraphEdge v l] -> Digraph v l -> Digraph v l
```

<Description>{`Add a list of edges to a graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphAddEdges : all v. all l. [DigraphEdge v l] -> Digraph v l -> Digraph v l =
  lam es. lam g.
  foldl (lam g. lam e : DigraphEdge v l. digraphAddEdge e.0 e.1 e.2 g) g es
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphReverse" kind="let">

```mc
let digraphReverse g : all v. all l. Digraph v l -> Digraph v l
```

<Description>{`Reverse the direction of graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphReverse : all v. all l. Digraph v l -> Digraph v l = lam g.
  let edgesReversed = map (lam e : DigraphEdge v l. (e.1, e.0, e.2)) (digraphEdges g) in
  let vs = digraphVertices g in
  digraphAddEdges edgesReversed
    (digraphAddVertices vs (digraphEmpty (digraphCmpv g) g.eql))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphRemoveEdge" kind="let">

```mc
let digraphRemoveEdge from to l g : all v. all l. v -> v -> l -> Digraph v l -> Digraph v l
```

<Description>{`Remove an edge from the graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphRemoveEdge : all v. all l. v -> v -> l -> Digraph v l -> Digraph v l =
  lam from. lam to. lam l. lam g.
  utest (digraphHasEdge (from, to, l) g) with true in
  let outgoing = mapFindExn from g.adj in
  let newOutgoing = filter (lam o : (v, l). or (not (g.eql l o.1)) (not ((digraphEqv g) o.0 to))) outgoing in
  {g with adj = mapInsert from newOutgoing g.adj}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphRemoveEdges" kind="let">

```mc
let digraphRemoveEdges g : all v. all l. Digraph v l -> Digraph v l
```

<Description>{`Removes all edges in the graph g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphRemoveEdges : all v. all l. Digraph v l -> Digraph v l =
  lam g. { g with adj = mapMap (lam. []) g.adj }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphBFS" kind="let">

```mc
let digraphBFS source g : all v. all l. v -> Digraph v l -> Map v Int
```

<Description>{`Breadth\-first search. Marks all reachable vertices from the source with the  
distance to the source.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphBFS : all v. all l. v -> Digraph v l -> Map v Int = lam source. lam g.
  recursive let work = lam fs. lam level. lam dist : Map v Int.
    if null fs then dist else
    match
      foldl (lam acc : ([v], Map v Int). lam f.
        foldl (lam acc : ([v], Map v Int). lam v.
          if mapMem v acc.1 then acc
          else (cons v acc.0, mapInsert v level acc.1)
        ) acc (digraphSuccessors f g)
      ) ([], dist) fs
    with (ns, dist) then
      work ns (addi level 1) dist
    else never
  in
  work [source] 1 (mapInsert source 0 (mapEmpty (digraphCmpv g)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphTarjan" kind="let">

```mc
let digraphTarjan g : all v. all l. Digraph v l -> [[v]]
```

<Description>{`Strongly connected components of g.  
From the paper: Depth\-First Search and Linear Graph Algorithms, Tarjan 72.  
https://doi.org/10.1137/0201010`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphTarjan : all v. all l. Digraph v l -> [[v]] =
lam g.
  let cmpv = digraphCmpv g in
  let eqv = lam x. lam y. eqi (cmpv x y) 0 in
  let mapFind = mapFindExn in
  let and = lam x. lam y. if not x then false else y in

  recursive let strongConnect = lam s : Successors v. lam v.
    let traverseSuccessors = lam s : Successors v. lam w.
      if not (mapMem w s.number) then
        let s : Successors v = strongConnect s w in
        let n = mini (mapFind v s.lowlink) (mapFind w s.lowlink) in
        {s with lowlink = mapInsert v n s.lowlink}
      else if lti (mapFind w s.number) (mapFind v s.number) then
        if any (eqv w) s.stack then
          let n = mini (mapFind v s.lowlink) (mapFind w s.number) in
          {s with lowlink = mapInsert v n s.lowlink}
        else s
      else s
    in

    let popStackIntoComp = lam s : Successors v.
      let vn = mapFind v s.number in
      recursive let work = lam comp. lam stack.
        match stack with [] then (comp, stack)
        else match stack with [w] ++ ws then
          if lti (mapFind w s.number) vn then (comp, stack)
          else work (snoc comp w) ws
        else never
      in
      let t = work [] s.stack in
      {{s with comps = snoc s.comps t.0}
          with stack = t.1}
    in

    let s = {{{{s with number = mapInsert v s.i s.number}
                  with lowlink = mapInsert v s.i s.lowlink}
                  with stack = cons v s.stack}
                  with i = addi s.i 1}
    in

    let s : Successors v =
      foldl traverseSuccessors s (digraphSuccessors v g)
    in

    if eqi (mapFind v s.lowlink) (mapFind v s.number)
    then popStackIntoComp s else s
  in

  let s : Successors v =
    foldl
      (lam s : Successors v. lam v.
        if not (mapMem v s.number) then strongConnect s v else s)
      {
        i = 0,
        number = mapEmpty cmpv,
        lowlink = mapEmpty cmpv,
        stack = [],
        comps = []
      }
      (digraphVertices g)
  in s.comps
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphStrongConnects" kind="let">

```mc
let digraphStrongConnects g : all v. all l. Digraph v l -> [[v]]
```

<Description>{`Strongly connected components of g.`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphStrongConnects = lam g. digraphTarjan g
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphTopologicalOrder" kind="let">

```mc
let digraphTopologicalOrder g : all v. all l. Digraph v l -> [v]
```

<Description>{`Kahn's algorithm: Topological sorting of large networks  
https://dl.acm.org/doi/10.1145/368996.369025  
Returns a list of sorted vertices`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphTopologicalOrder : all v. all l. Digraph v l -> [v] = lam g.
  let indegrees = foldl (lam acc. lam v. mapInsert v (length (digraphEdgesTo v g)) acc) (mapEmpty (digraphCmpv g)) (digraphVertices g) in
  let rootnodes = filter (lam v. eqi (length (digraphEdgesTo v g)) 0) (digraphVertices g) in
  recursive
    let order = lam ordering. lam indegrees. lam rootnodes.
      if null rootnodes then ordering
      else
        let cnode = head rootnodes in
        let successors = digraphSuccessors cnode g in
        let indegrees = foldl (lam acc. lam v. mapInsert v (subi (mapFindExn v acc) 1) acc) indegrees successors in
        let newroots = filter (lam s. eqi (mapFindExn s indegrees) 0) successors in
        let rootnodes = concat (tail rootnodes) newroots in
        order (cons cnode ordering) indegrees rootnodes
  in
  let res = order [] indegrees rootnodes in
  if eqi (length res) (length (digraphVertices g)) then reverse res
  else error "Cycle detected! Topological order only applies to DAG"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digraphToDot" kind="let">

```mc
let digraphToDot v2str l2str g : all v. all l. (v -> String) -> (l -> String) -> Digraph v l -> String
```

<Description>{`Returns a string representation of the graph in dot format`}</Description>


<ToggleWrapper text="Code..">
```mc
let digraphToDot : all v. all l. (v -> String) -> (l -> String) -> Digraph v l -> String
  = lam v2str. lam l2str. lam g.
    join [
      "digraph {\n",
      strJoin "\n"
        (map (lam e.
          join
            ["  ", v2str e.0, " -> ", v2str e.1, " [label=\"", l2str e.2, "\"];"])
           (digraphEdges g)),
      "\n}\n"
    ]
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

let l1 = gensym () in
let l2 = gensym () in
let l3 = gensym () in
let l4 = gensym () in
let l5 = gensym () in

let empty = digraphEmpty subi eqsym in

utest digraphVertices empty with [] using eqSeq eqi in
utest digraphEdges empty with [] in
utest digraphCountVertices empty with 0 in
utest digraphCountEdges empty with 0 in

let g = digraphAddVertex 1 empty in

utest digraphCountVertices g with 1 in
utest digraphVertices g with [1] in
utest digraphEdges g with [] in
utest digraphHasVertex 1 g with true in
utest digraphHasVertex 2 g with false in

let g = digraphAddVertex 3 (digraphAddVertex 2 (digraphAddVertex 1 empty)) in

utest digraphHasVertex 1 g with true in
utest digraphHasVertex 2 g with true in
utest digraphHasVertex 3 g with true in
utest digraphHasVertices [1, 2, 3] g with true in
utest digraphHasVertices [3, 2] g with true in
utest digraphHasVertices [1, 2, 3, 4] g with false in

let g = digraphAddEdge 1 2 l2 (digraphAddEdge 1 2 l1 g) in

utest
  match digraphEdges g with [(1,2,l1),(1,2,l2)] | [(1,2,l2),(1,2,l1)]
  then true else false with true
in
utest digraphHasEdges [(1, 2, l1), (1, 2, l2)] g with true in
utest digraphHasEdges [(1, 2, l2)] g with true in
utest digraphHasEdges [(1, 2, l1)] g with true in

utest digraphSuccessors 1 g with [2] in
utest digraphPredeccessors 1 g with [] using eqSeq eqi in
utest digraphIsSuccessor 2 1 g with true in
utest
  match digraphLabels 1 2 g with [l1,l2] | [l2,l1]
  then true else false with true
in

utest digraphSuccessorLabel 1 l2 g with Some 2 in
utest digraphSuccessorLabel 1 l3 g with None () in

let g : Digraph Int Symbol =
  digraphAddEdges [(2,3,l4),(1,3,l3),(1,2,l2),(1,2,l1)] (digraphAddVertices [1,2,3] empty)
in

utest digraphEdgesBetween 1 3 g with [(1,3,l3)]
using eqSeq (digraphEdgeEq g) in

utest
  match digraphEdgesBetween 1 2 g
  with [(1,2,l2),(1,2,l1)] | [(1,2,l1),(1,2,l2)]
  then true else false with true
in
utest match digraphPredeccessors 3 g with [1,2] | [2,1] then true else false with true in

let g = digraphAddEdges [(1,2,l1),(1,3,l2),(3,1,l3)] (digraphAddVertices [1,2,3] empty) in
let gRev = digraphReverse g in

utest digraphHasEdges [(2,1,l1),(3,1,l2),(1,3,l3)] gRev with true in
utest digraphCountVertices gRev with 3 in
utest digraphCountEdges gRev with 3 in

let g = digraphRemoveEdge 1 3 l2 g in
utest digraphCountVertices g with 3 in
utest digraphCountEdges g with 2 in
utest digraphHasEdges [(1,2,l1),(3,1,l3)] g with true in
let g2 = digraphRemoveVertex 3 gRev in
utest digraphCountVertices g2 with 2 in
utest digraphCountEdges g2 with 1 in
let g = digraphAddEdges [(0,1,l1), (0,2,l2), (2,3,l3), (3,4,l4), (0,4,l5)]
  (digraphAddVertices [0,1,2,3,4] empty) in
utest mapBindings (digraphBFS 0 g) with [(0,0), (1,1), (2,1), (3,2), (4,1)] in

-- Test for strongly connected components of g.
let compsEq = eqsetEqual (eqsetEqual eqi) in

utest compsEq (digraphStrongConnects empty) [] with true in

let g = foldr digraphAddVertex empty [1,2,3,4,5,6,7,8] in

let g1 = g in

utest compsEq (digraphStrongConnects g1) [[1],[2],[3],[4],[5],[6],[7],[8]]
with true in

let g2 = digraphAddEdge 1 2 (gensym ()) g in
let g2 = digraphAddEdge 2 3 (gensym ()) g2 in
let g2 = digraphAddEdge 3 1 (gensym ()) g2 in
let g2 = digraphAddEdge 4 5 (gensym ()) g2 in
let g2 = digraphAddEdge 5 4 (gensym ()) g2 in

utest compsEq (digraphStrongConnects g2) [[1,2,3],[4,5],[6],[7],[8]]
with true in

-- Figure 3 from Tarjans original paper.
let g3 = digraphAddEdge 1 2 (gensym ()) g in
let g3 = digraphAddEdge 2 3 (gensym ()) g3 in
let g3 = digraphAddEdge 2 8 (gensym ()) g3 in
let g3 = digraphAddEdge 3 4 (gensym ()) g3 in
let g3 = digraphAddEdge 3 7 (gensym ()) g3 in
let g3 = digraphAddEdge 4 5 (gensym ()) g3 in
let g3 = digraphAddEdge 5 3 (gensym ()) g3 in
let g3 = digraphAddEdge 5 6 (gensym ()) g3 in
let g3 = digraphAddEdge 7 4 (gensym ()) g3 in
let g3 = digraphAddEdge 7 6 (gensym ()) g3 in
let g3 = digraphAddEdge 8 1 (gensym ()) g3 in
let g3 = digraphAddEdge 8 7 (gensym ()) g3 in

utest compsEq (digraphStrongConnects g3) [[1,2,8],[3,4,5,7],[6]] with true in

let g4 = digraphAddEdge 8 7 (gensym ()) g3 in
let g5 = digraphAddEdge 8 2 (gensym ()) g3 in
let g6 = digraphAddVertex 9 g3 in
let g7 = digraphAddVertex 9 g3 in
let g8 = digraphAddVertex 10 g3 in
let sym = gensym () in
let g9 = digraphAddEdge 10 1 sym g8 in
let g9 = digraphAddEdge 10 2 sym g9 in

let g10 = digraphAddEdge 10 2 sym g8 in
let g10 = digraphAddEdge 10 1 sym g10 in
utest digraphGraphEq empty empty with true in
utest digraphGraphEq empty g3 with false in
utest digraphGraphEq g2 g3 with false in
utest digraphGraphEq g2 g2 with true in
utest digraphGraphEq g3 g3 with true in
utest digraphGraphEq g4 g5 with false in
utest digraphGraphEq g6 g7 with true in
utest digraphGraphEq g7 g8 with false in
utest digraphGraphEq g9 g10 with true in

let g10 = digraphAddUpdateVertex 10 g8 in
utest digraphGraphEq g8 g10 with true in
let g2 = digraphAddEdge 1 2 (gensym ()) g in
let g2 = digraphAddEdge 1 3 (gensym ()) g2 in
let g2 = digraphAddEdge 2 4 (gensym ()) g2 in
let g2 = digraphAddEdge 3 4 (gensym ()) g2 in
let g2 = digraphAddEdge 2 5 (gensym ()) g2 in
let g2 = digraphAddEdge 3 6 (gensym ()) g2 in

let tOrder = digraphTopologicalOrder g2 in
utest tOrder with [1,7,8,2,3,5,4,6] in

let sym = gensym () in
let g2 = digraphMaybeAddEdges [(1,2, sym), (1,3,sym), (1,2,sym)] g in
let g3 = digraphAddEdges [(1,2, sym), (1,3,sym)] g in
utest digraphGraphEq g2 g3 with true in

let g2 = digraphAddUpdateVertex 1 g in
let g2 = digraphAddUpdateVertex 14 g2 in
utest digraphVertices g2 with [1,2,3,4,5,6,7,8,14] in

let g = digraphAddVertex 3 (digraphAddVertex 2 (digraphAddVertex 1 empty)) in
let g = digraphAddEdge 1 2 l2 (digraphAddEdge 1 2 l1 (digraphAddEdge 1 3 l3 g)) in
utest digraphEdges (digraphRemoveEdges g) with [] in

()
```
</ToggleWrapper>
</DocBlock>

