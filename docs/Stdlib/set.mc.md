import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# set.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
Defines a set wrapper around the map intrinsics.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>  
  
## Types  
  

          <DocBlock title="Set" kind="type">

```mc
type Set
```



<ToggleWrapper text="Code..">
```mc
type Set a = Map a {}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="setEmpty" kind="let">

```mc
let setEmpty cmp : all a. (a -> a -> Int) -> Set a
```

<Description>{`\`setEmpty cmp\` creates an empty set ordered by \`cmp\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setEmpty : all a. (a -> a -> Int) -> Set a = lam cmp. mapEmpty cmp
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setSize" kind="let">

```mc
let setSize  : all a. Set a -> Int
```

<Description>{`The size of a set.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setSize : all a. Set a -> Int = mapSize
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setIsEmpty" kind="let">

```mc
let setIsEmpty  : all a. Set a -> Bool
```

<Description>{`Is the set empty?`}</Description>


<ToggleWrapper text="Code..">
```mc
let setIsEmpty : all a. Set a -> Bool = mapIsEmpty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setInsert" kind="let">

```mc
let setInsert e s : all a. a -> Set a -> Set a
```

<Description>{`\`setInsert e s\` inserts element \`e\` into set \`s\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setInsert : all a. a -> Set a -> Set a = lam e. lam s. mapInsert e {} s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setRemove" kind="let">

```mc
let setRemove e s : all a. a -> Set a -> Set a
```

<Description>{`\`setRemove e s\` removes element \`e\` from set \`s\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setRemove : all a. a -> Set a -> Set a = lam e. lam s. mapRemove e s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setMem" kind="let">

```mc
let setMem e s : all a. a -> Set a -> Bool
```

<Description>{`Is the element member of the set?`}</Description>


<ToggleWrapper text="Code..">
```mc
let setMem : all a. a -> Set a -> Bool = lam e. lam s. mapMem e s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setSubset" kind="let">

```mc
let setSubset s1 s2 : all a. Set a -> Set a -> Bool
```

<Description>{`Is s1 a subset of s2?`}</Description>


<ToggleWrapper text="Code..">
```mc
let setSubset : all a. Set a -> Set a -> Bool = lam s1. lam s2.
  mapAllWithKey (lam e. lam. mapMem e s2) s1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setUnion" kind="let">

```mc
let setUnion s1 s2 : all a. Set a -> Set a -> Set a
```

<Description>{`\`setUnion s1 s2\` is the union of set \`s1\` and \`s2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setUnion : all a. Set a -> Set a -> Set a = lam s1. lam s2. mapUnion s1 s2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setIntersect" kind="let">

```mc
let setIntersect s1 s2 : all a. Set a -> Set a -> Set a
```

<Description>{`\`setIntersect s1 s2\` is the intersection of set \`s1\` and \`s2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setIntersect : all a. Set a -> Set a -> Set a = lam s1. lam s2.
  mapIntersectWith (lam. lam. ()) s1 s2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setDisjoint" kind="let">

```mc
let setDisjoint s1 s2 : all a. Set a -> Set a -> Bool
```

<Description>{`\`setDisjoint s1 s2\` returns true if \`s1\` and \`s2\` are disjoint,   
false otherwise.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setDisjoint : all a. Set a -> Set a -> Bool = lam s1. lam s2. 
  setIsEmpty (setIntersect s1 s2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setSubtract" kind="let">

```mc
let setSubtract s1 s2 : all a. Set a -> Set a -> Set a
```

<Description>{`\`setSubtract s1 s2\` is the relative complement of set \`s2\` in \`s1\` \(set  
difference, i.e., s1 \- s2\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let setSubtract : all a. Set a -> Set a -> Set a = lam s1. lam s2.
  mapDifference s1 s2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setOfSeq" kind="let">

```mc
let setOfSeq cmp seq : all a. (a -> a -> Int) -> [a] -> Set a
```

<Description>{`\`setOfSeq cmp seq\` construct a set ordered by \`cmp\` from a sequence \`seq\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setOfSeq : all a. (a -> a -> Int) -> [a] -> Set a =
lam cmp. lam seq.
  foldr setInsert (setEmpty cmp) seq
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setSingleton" kind="let">

```mc
let setSingleton cmp x : all a. (a -> a -> Int) -> a -> Set a
```

<Description>{`\`setSingleton cmp x\` creates a set containing only the element x`}</Description>


<ToggleWrapper text="Code..">
```mc
let setSingleton : all a. (a -> a -> Int) -> a -> Set a 
  = lam cmp. lam x.
    setInsert x (setEmpty cmp)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest setSize (setSingleton subi 1) with 1 
utest setMem 1 (setSingleton subi 1) with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setFold" kind="let">

```mc
let setFold f acc s : all a. all acc. (acc -> a -> acc) -> acc -> Set a -> acc
```

<Description>{`\`setFold f acc s\` folds over the values of s with the given function and  
initial accumulator`}</Description>


<ToggleWrapper text="Code..">
```mc
let setFold : all a. all acc. (acc -> a -> acc) -> acc -> Set a -> acc =
  lam f. lam acc. lam s.
    mapFoldWithKey (lam acc. lam k. lam. f acc k) acc s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setEq" kind="let">

```mc
let setEq m1 m2 : all a. Set a -> Set a -> Bool
```

<Description>{`Two sets are equal, where equality is determined by the compare function.  
Both sets are assumed to have the same equality function.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setEq : all a. Set a -> Set a -> Bool = lam m1. lam m2. mapEq (lam. lam. true) m1 m2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setMap" kind="let">

```mc
let setMap cmp f s : all a. all b. (b -> b -> Int) -> (a -> b) -> Set a -> Set b
```

<Description>{`\`setMap cmp f s\` maps over the values of s and creates a new set from the   
results.   
Note that the size of the set can change when multiple 'a's get mapped  
to the same 'b'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setMap : all a. all b. (b -> b -> Int) -> (a -> b) -> Set a -> Set b = 
  lam cmp. lam f. lam s.
    mapFoldWithKey 
      (lam acc. lam k. lam. mapInsert (f k) () acc) 
      (mapEmpty cmp)
      s
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest setFold addi 0 (setMap subi (lam x. muli x 2) (setOfSeq subi [1,2,3])) with 12
utest setMap subi (lam x. x) (setEmpty subi) with setEmpty subi using setEq
utest setMap subi (lam. 0) (setOfSeq subi [1,2,3]) with setSingleton subi 0 using setEq
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setToSeq" kind="let">

```mc
let setToSeq s : all a. Set a -> [a]
```

<Description>{`Transform a set to a sequence.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setToSeq : all a. Set a -> [a] = lam s. mapKeys s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setCmp" kind="let">

```mc
let setCmp m1 m2 : all a. Set a -> Set a -> Int
```

<Description>{`\`setCmp\` provides comparison over sets.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setCmp : all a. Set a -> Set a -> Int = lam m1. lam m2. mapCmp (lam. lam. 0) m1 m2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setChoose" kind="let">

```mc
let setChoose s : all a. Set a -> Option a
```

<Description>{`\`setChoose s\` chooses one element from the set \`s\`, giving \`None \(\)\` if \`s\`  
is empty.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setChoose : all a. Set a -> Option a =
  lam s. match mapChoose s with Some (k, _) then Some k else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setChooseExn" kind="let">

```mc
let setChooseExn s : all a. Set a -> a
```

<Description>{`\`setChooseExn s\` chooses one element from the set \`s\`, giving \`error\` if \`s\`  
is empty.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setChooseExn : all a. Set a -> a =
lam s.
  match mapChooseExn s with (k, _) then k else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setAny" kind="let">

```mc
let setAny p s : all a. (a -> Bool) -> Set a -> Bool
```

<Description>{`\`setAny p s\` returns true if the predicate p returns true for any element in  
s.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setAny: all a. (a -> Bool) -> Set a -> Bool = lam p. lam s.
  mapFoldWithKey (lam acc. lam v. lam. if acc then acc else p v) false s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setOfKeys" kind="let">

```mc
let setOfKeys m : all k. all v. Map k v -> Set k
```

<Description>{`\`setOfKeys m\` returns the keys of \`m\` as a set.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setOfKeys : all k. all v. Map k v -> Set k = lam m. mapMap (lam. ()) m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setFilter" kind="let">

```mc
let setFilter p s : all a. (a -> Bool) -> Set a -> Set a
```

<Description>{`\`setFilter p s\` creates a new set containing exactly those elements in set \`s\`  
that satisfy predicate \`p\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setFilter : all a. (a -> Bool) -> Set a -> Set a = 
  lam p. lam s. 
    mapFilterWithKey (lam k. lam. p k) s
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest setFilter (lam. true) (setOfSeq subi [1,2,3]) with (setOfSeq subi [1,2,3]) using setEq 
utest setIsEmpty (setFilter (lam. false) (setOfSeq subi [1,2,3])) with true 
utest (setFilter (lam x. eqi (modi x 2) 0) (setOfSeq subi [1,2,3,4,5,6])) 
  with (setOfSeq subi [2, 4, 6]) using setEq
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

let s = setEmpty subi in
utest setSize s with 0 in
utest setMem 1 s with false in
utest setChoose s with None () in
utest setIsEmpty s with true in

let s1 = setInsert 1 s in
utest setSize s1 with 1 in
utest setMem 1 s1 with true in
utest setChooseExn s1 with 1 in
utest setChoose s1 with Some 1 in
utest setIsEmpty s1 with false in

let s0 = setRemove 1 s in
utest setSize s0 with 0 in
utest setMem 1 s0 with false in

let s2 = setOfSeq subi [2, 3] in
utest setSize s2 with 2 in
utest setMem 2 s2 with true in
utest setMem 3 s2 with true in

let s3 = setOfSeq subi (setToSeq s2) in
utest setSize s3 with 2 in
utest setMem 2 s3 with true in
utest setMem 3 s3 with true in

let s4 = setUnion s1 s2 in
utest setSize s4 with 3 in
utest setMem 1 s4 with true in
utest setMem 2 s4 with true in
utest setMem 3 s4 with true in

utest setEq s4 s4 with true in
utest setEq s4 s3 with false in

let s5 = setOfSeq subi [1,2,3,4,5] in
let s6 = setOfSeq subi [1,2,3] in
let s7 = setOfSeq subi [1,2,6] in
utest setSubset s5 s5 with true in
utest setSubset s6 s5 with true in
utest setSubset s7 s5 with false in

let sInt1 = setIntersect (setOfSeq subi []) (setOfSeq subi [1]) in
utest setSize sInt1 with 0 in

let sInt2 = setIntersect (setOfSeq subi [1,2]) (setOfSeq subi [2]) in
utest setSize sInt2 with 1 in
utest setMem 2 sInt2 with true in

utest setSubtract s5 (setEmpty subi) with s5 using setEq in
utest setSubtract s5 s6 with setOfSeq subi [4,5] using setEq in

utest setCmp s5 s5 with 0 in
utest setCmp s5 s6 with 1 in
utest setCmp s6 s5 with negi 1 in
utest setCmp s5 s7 with negi 3 in
utest setCmp s7 s5 with 3 in
utest setCmp s6 s7 with negi 3 in

utest setAny (eqi 2) s5 with true in
utest setAny (eqi 0) s5 with false in

let sFold = setOfSeq subi [1,2,3,4,5] in
utest setFold (lam acc. lam v. addi v acc) 0 sFold with 15 in

let m = mapFromSeq subi [(1, "1"), (2, "2"), (3, "3")] in
let s = setOfSeq subi [1, 2, 3] in

utest setEq (setOfKeys m) s with true in

()
```
</ToggleWrapper>
</DocBlock>

