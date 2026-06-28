import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# maxmatch.mc  
  

Implementation of the Hungarian algorithm using slack variables for maximal  
matching on weighted bipartite graph G=\(U,V,E\). Implementation based off  
https://gist.github.com/KartikTalwar/3158534

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/math.mc"} style={S.link}>math.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>  
  
## Types  
  

          <DocBlock title="Slack" kind="type">

```mc
type Slack : { val: Int, u: Int, v: Int }
```



<ToggleWrapper text="Code..">
```mc
type Slack = {
  val : Int,                    -- value of slack
  u   : Int,                    -- u in U associated with this slack
  v   : Int                     -- v in V associated with this slack
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="State" kind="type">

```mc
type State : { w: [[Int]], n: Int, lus: [Int], lvs: [Int], mus: [Int], mvs: [Int], ss: [Int], vs: [Int], ts: [Bool], slacks: [Slack], preds: [Int] }
```



<ToggleWrapper text="Code..">
```mc
type State = {
  w      : [[Int]],             -- weight matrix
  n      : Int,                 -- problem size
  lus    : [Int],               -- labels for U
  lvs    : [Int],               -- labels for V
  mus    : [Int],               -- matched incidence vector of U, (-1) means unmatched
  mvs    : [Int],               -- matched incidence vector of V, (-1) means unmatched
  ss     : [Int],               -- u's in the vertex cover
  vs     : [Int],               -- V's vertices enumerated
  ts     : [Bool],              -- v's in the vertex cover
  slacks : [Slack],             -- slack variables
  preds  : [Int]                -- predecessors of v in V
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="preliminaries" kind="let">

```mc
let preliminaries w : [[Int]] -> State
```

<Description>{`Costructs initial state from weight\-matrix w.`}</Description>


<ToggleWrapper text="Code..">
```mc
let preliminaries : [[Int]] -> State =
lam w.
  let d = (length w, length (get w 0)) in
  let n = d.0 in
  if neqi d.1 n then error "Expected square weight matrix"
  else
  let vs =
    unfoldr (lam a. if eqi a n then None () else Some (a, addi a 1)) 0
  in
  let negv = make n (negi 1) in
  let zerov = make n 0 in
    {
      w = w,
      n = n,
      -- assign feasible labels, e.g.
      lus = map (maxOrElse (lam. error "undefined") subi) w,
      -- lu[u] + lv[v] => w[u][v] for all v in V, u in U
      lvs = zerov,
      mus = negv,
      mvs = negv,
      ss = [],
      vs = vs,
      ts = make n false,
      slacks = [],
      preds = negv
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="debugShowState" kind="let">

```mc
let debugShowState state : State -> ()
```



<ToggleWrapper text="Code..">
```mc
let debugShowState = lam state : State.
  printLn "===";
  print "\nlus: ";
  dprint state.lus;
  print "\nlvs: ";
  dprint state.lvs;
  print "\nmus: ";
  dprint state.mus;
  print "\nmvs: ";
  dprint state.mvs;
  print "\nss: ";
  dprint state.ss;
  print "\nts: ";
  dprint state.ts;
  print "\nslacks: ";
  dprint state.slacks;
  print "\npreds: ";
  dprint state.preds;
  ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpSlack" kind="let">

```mc
let cmpSlack l r : Slack -> Slack -> Int
```



<ToggleWrapper text="Code..">
```mc
let cmpSlack = lam l : Slack. lam r : Slack. subi l.val r.val
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isMatch" kind="let">

```mc
let isMatch x : Int -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isMatch = lam x. neqi x (negi 1)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isPerfectMatch" kind="let">

```mc
let isPerfectMatch  : [Int] -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isPerfectMatch = forAll isMatch
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findNonCovered" kind="let">

```mc
let findNonCovered x : [Int] -> Int
```



<ToggleWrapper text="Code..">
```mc
let findNonCovered = lam x.
  optionGetOrElse (lam. error "All nodes are covered")
                  (index (lam x. not (isMatch x)) x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="slackVal" kind="let">

```mc
let slackVal u v state : Int -> Int -> State -> Int
```

<Description>{`lu\[u\] \+ lv\[v\] \- w\[u\]\[v\]`}</Description>


<ToggleWrapper text="Code..">
```mc
let slackVal = lam u. lam v. lam state : State.
  subi (addi (get state.lus u) (get state.lvs v)) (get (get state.w u) v)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="emptyT" kind="let">

```mc
let emptyT state : State -> State
```

<Description>{`T \<\- \{\}`}</Description>


<ToggleWrapper text="Code..">
```mc
let emptyT = lam state : State. {state with ts = make state.n false}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="memT" kind="let">

```mc
let memT v state : Int -> State -> Bool
```

<Description>{`v in T`}</Description>


<ToggleWrapper text="Code..">
```mc
let memT = lam v. lam state : State. get state.ts v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="insertT" kind="let">

```mc
let insertT v state : Int -> State -> State
```

<Description>{`T \<\- T union \{v\}`}</Description>


<ToggleWrapper text="Code..">
```mc
let insertT = lam v. lam state : State. {state with ts = set state.ts v true}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="emptyS" kind="let">

```mc
let emptyS state : State -> State
```

<Description>{`S \<\- \{\}`}</Description>


<ToggleWrapper text="Code..">
```mc
let emptyS = lam state : State. {state with ss = []}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="insertS" kind="let">

```mc
let insertS u state : Int -> State -> State
```

<Description>{`S \<\- S union \{u\}`}</Description>


<ToggleWrapper text="Code..">
```mc
let insertS = lam u. lam state : State. {state with ss = cons u state.ss}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="vsNotInT" kind="let">

```mc
let vsNotInT state : State -> [Int]
```

<Description>{`all v not in T`}</Description>


<ToggleWrapper text="Code..">
```mc
let vsNotInT = lam state : State. filter (lam v. not (memT v state)) state.vs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="assign" kind="let">

```mc
let assign u v state : Int -> Int -> State -> State
```

<Description>{`assigns u with v`}</Description>


<ToggleWrapper text="Code..">
```mc
let assign = lam u. lam v. lam state : State.
  {{state with mus = set state.mus u v} with mvs = set state.mvs v u}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateSlack" kind="let">

```mc
let updateSlack v f state : Int -> (Slack -> Slack) -> State -> State
```



<ToggleWrapper text="Code..">
```mc
let updateSlack = lam v. lam f. lam state : State.
  {state with slacks = set state.slacks v (f (get state.slacks v))}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateLu" kind="let">

```mc
let updateLu u f state : Int -> (Int -> Int) -> State -> State
```



<ToggleWrapper text="Code..">
```mc
let updateLu = lam u. lam f. lam state : State.
  {state with lus = set state.lus u (f (get state.lus u))}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateLv" kind="let">

```mc
let updateLv v f state : Int -> (Int -> Int) -> State -> State
```



<ToggleWrapper text="Code..">
```mc
let updateLv = lam v. lam f. lam state : State.
  {state with lvs = set state.lvs v (f (get state.lvs v))}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updatePred" kind="let">

```mc
let updatePred v u state : Int -> Int -> State -> State
```



<ToggleWrapper text="Code..">
```mc
let updatePred = lam v. lam u. lam state : State.
  {state with preds = set state.preds v u}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="improveLabels" kind="let">

```mc
let improveLabels delta state : Int -> State -> State
```

<Description>{`Improve labels and adjusts slack with delta.`}</Description>


<ToggleWrapper text="Code..">
```mc
let improveLabels = lam delta. lam state : State.
  let f = lam state. lam u. updateLu u (lam lu. subi lu delta) state in

  let g = lam state : State. lam v.
    if memT v state then updateLv v (lam lv. addi lv delta) state
    else updateSlack v (lam s : Slack. {s with val = subi s.val delta}) state
  in

  (compose (lam state : State. foldl f state state.ss)
           (lam state : State. foldl g state state.vs)) state
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateSlacks" kind="let">

```mc
let updateSlacks u state : Int -> State -> State
```

<Description>{`Updates slacks according to slackv \<\- min slackv \(slack u v\) for v not in  
T. Applied everytime a new u is inserted in S.`}</Description>


<ToggleWrapper text="Code..">
```mc
let updateSlacks = lam u. lam state : State.
  let f = lam state : State. lam v.
    let s : Slack = get state.slacks v in
    let newVal = slackVal u v state in
    if gti s.val newVal then
      updateSlack v (lam s : Slack. {{s with val = newVal} with u = u}) state
    else state
  in
  foldl f state (vsNotInT state)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="improveMatching" kind="let">

```mc
let improveMatching v state : Int -> State -> State
```

<Description>{`Improves matching by flipping edges in the augmenting path ending in v.`}</Description>


<ToggleWrapper text="Code..">
```mc
let improveMatching = lam v. lam state : State.
    let u = get state.preds v in
    let v1 = get state.mus u in
    let state = assign u v state in
    if not (isMatch v1) then state
    else improveMatching v1 state
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="formatResult" kind="let">

```mc
let formatResult state : State -> {weight: Int, incidenceU: [Int], incidenceV: [Int]}
```



<ToggleWrapper text="Code..">
```mc
let formatResult = lam state : State.
  { incidenceU = state.mus
  , incidenceV = state.mvs
  , weight = foldl1 addi (concat state.lus state.lvs) }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="maxmatchHungarian" kind="let">

```mc
let maxmatchHungarian w : [[Int]] -> {weight: Int, incidenceU: [Int], incidenceV: [Int]}
```

<Description>{`Find a maximum weight matching on weighted bipartite graph encoded by weight  
matrix w. This implementation uses slack variables to ensure sub O\(n^4\) time  
complexity \(assuming O\(log n\) random access to sequences\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let maxmatchHungarian = lam w.
  recursive let work = lam state : State. lam k.
    if isPerfectMatch state.mus then formatResult state
    -- We should find a complete matching in at most n steps.
    else if gti k state.n then error "Failed to find maximal matching"
    else
      let u0 = findNonCovered state.mus in -- Find unmatched u in U.
      let slacks0 =
        -- Initial slack variables.
        map (lam v. {val = slackVal u0 v state, v = v, u = u0}) state.vs
      in
      -- S <- {u} and T <- {}.
      let state = insertS u0 (emptyS (emptyT {state with slacks = slacks0})) in
      work (augment state) (addi k 1) -- Each application improves matching by one.
  in
  work (preliminaries w) 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="maxmatchFindMatch" kind="let">

```mc
let maxmatchFindMatch w : [[Int]] -> {weight: Int, incidenceU: [Int], incidenceV: [Int]}
```

<Description>{`Maximum\-weight matching on the bipartite graph G=\(U,V,E\) encoded by the  
weight\-incidence matrix w. Incidence of U and V after assignment is given by  
incidenceU and incidenceV. The total weight of the assignment is given by  
weight.`}</Description>


<ToggleWrapper text="Code..">
```mc
let maxmatchFindMatch
  : [[Int]] -> {incidenceU : [Int], incidenceV : [Int], weight : Int} =
lam w. maxmatchHungarian w
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

let w = [[1]] in

utest (maxmatchHungarian w).weight with 1 in

let w = [[7, 5, 11],
         [5, 4, 1],
         [9, 3, 2]]
in

utest (maxmatchHungarian w).weight with 24 in


let w = [[1, 2],
         [1, 3]] in

utest (maxmatchHungarian w).weight with 4 in


let neginf = negi 100000 in


let w = [[neginf]] in

utest (maxmatchHungarian w).weight with neginf in


let w = [[2     , neginf, 0]
        ,[neginf, 2     , 0]
        ,[0     , 0     , neginf]]
in

utest (maxmatchHungarian w).weight with 2 in


let w = [[1     , 0     , neginf]
        ,[neginf, 1     , 0]
        ,[0     , neginf, neginf]]
in

utest (maxmatchHungarian w).weight with 0 in


let w = [[0, 0     , neginf, neginf]
        ,[0, 0     , 0     , neginf]
        ,[0, neginf, 1     , 0]
        ,[2, 2     , 2     , 1]]
in

utest (maxmatchHungarian w).weight with 2 in

()
```
</ToggleWrapper>
</DocBlock>

