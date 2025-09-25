import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# eqset.mc  
  

A simple library that defines set operations over sequences.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>  
  
## Variables  
  

          <DocBlock title="eqsetIsSet" kind="let">

```mc
let eqsetIsSet eq seq : all a. (a -> a -> Bool) -> [a] -> Bool
```

<Description>{`True if seq represents a set with equality defined by eq. Otherwise false.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqsetIsSet = lam eq. lam seq.
  eqi (length (distinct eq seq)) (length seq)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqsetMem" kind="let">

```mc
let eqsetMem eq x seq : all a. all a1. (a -> a1 -> Bool) -> a -> [a1] -> Bool
```

<Description>{`True if x is a member of seq, where equality is defined by eq. Otherwise  
false.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqsetMem = lam eq. lam x. lam seq.
  any (eq x) seq
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setIsSubsetEq" kind="let">

```mc
let setIsSubsetEq eq seq1 seq2 : all a. all a1. (a -> a1 -> Bool) -> [a] -> [a1] -> Bool
```

<Description>{`True if seq1 is a subset or equal to seq2 as defined by eq. Otherwise false.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setIsSubsetEq = lam eq. lam seq1. lam seq2.
  if gti (length seq1) (length seq1) then false
  else forAll (lam x. eqsetMem eq x seq2) seq1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqsetEqual" kind="let">

```mc
let eqsetEqual eq seq1 seq2 : all a. all a1. (a -> a1 -> Bool) -> [a] -> [a1] -> Bool
```

<Description>{`True if the seq1 and seq2 are of the same length and contains the same  
elements as defined by eq. Otherwise false.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqsetEqual = lam eq. lam seq1. lam seq2.
  if neqi (length seq1) (length seq2) then false
  else setIsSubsetEq eq seq1 seq2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqsetDiff" kind="let">

```mc
let eqsetDiff eq seq1 seq2 : all a. all a1. (a -> a1 -> Bool) -> [a] -> [a1] -> [a]
```

<Description>{`The elements of seq1 that are not in seq2, where equality is defined by eq.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqsetDiff = lam eq. lam seq1. lam seq2.
  filter (lam x1. not (eqsetMem eq x1 seq2)) seq1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqsetInsert" kind="let">

```mc
let eqsetInsert eq x seq : all a. (a -> a -> Bool) -> a -> [a] -> [a]
```

<Description>{`Inserts element x into seq if x not already in seq,  
where equality is defined by eq.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqsetInsert = lam eq. lam x. lam seq.
  if eqsetMem eq x seq then seq else snoc seq x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqsetUnion" kind="let">

```mc
let eqsetUnion eq seq1 seq2 : all b. (b -> b -> Bool) -> [b] -> [b] -> [b]
```

<Description>{`The union of seq1 and seq2, where equality is defined by eq.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqsetUnion = lam eq. lam seq1. lam seq2.
  foldr (eqsetInsert eq) seq1 seq2
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

let equal = eqsetEqual eqi in
let diff = eqsetDiff eqi in
let add = eqsetInsert eqi in
let union = eqsetUnion eqi in
let mem = eqsetMem eqi in
let isSubsetEq = setIsSubsetEq eqi in

utest eqsetIsSet eqi [1,2,3] with true in
utest eqsetIsSet eqi [1,2,3,2] with false in

utest isSubsetEq [1,2] [1,2] with true in
utest isSubsetEq [2,1] [1,2] with true in
utest isSubsetEq [1,2] [1,2,3] with true in
utest isSubsetEq [1,2,3] [1,2] with false in
utest isSubsetEq [1,2] [1,3] with false in
utest isSubsetEq [1,3] [1,2] with false in

utest equal [1,2] [1,2] with true in
utest equal [2,1] [1,2] with true in
utest equal [1,2] [1,2,3] with false in
utest equal [1,2,3] [1,2] with false in
utest equal [1,2] [1,3] with false in
utest equal [1,3] [1,2] with false in

utest equal (diff [1,2] [1,2]) [] with true in
utest equal (diff [1,2] [1,2,3]) [] with true in
utest equal (diff [1,2,3] [1,2]) [3] with true in
utest equal (diff [1,2] [1,3]) [2] with true in
utest equal (diff [1,3] [1,2]) [3] with true in

utest equal (add 1 [1,2]) [1,2] with true in
utest equal (add 2 [1,2]) [1,2] with true in
utest equal (add 3 [1,2]) [1,2,3] with true in

utest equal (union [1,2] [1,2]) [1,2] with true in
utest equal (union [1,2,3] [1,2]) [1,2,3] with true in
utest equal (union [1,2] [1,2,3]) [1,2,3] with true in
utest equal (union [1,2,3] [1,2,4]) [1,2,3,4] with true in

utest mem 1 [1,2] with true in
utest mem 2 [1,2] with true in
utest mem 3 [1,2] with false in

()
```
</ToggleWrapper>
</DocBlock>

