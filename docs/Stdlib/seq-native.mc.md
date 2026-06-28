import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# seq-native.mc  
  

MExpr\-native alternative implementations of higher\-order functions over  
sequences. The below versions are slower than their intrisic counterparts.

  
  
  
## Variables  
  

          <DocBlock title="map" kind="let">

```mc
let map f s : all a. all a1. (a -> a1) -> [a] -> [a1]
```



<ToggleWrapper text="Code..">
```mc
let map = lam f. lam s.
  recursive let rec = lam s.
    match s with [] then []
    else match s with [a] then [f a]
    else match s with [a] ++ ss then cons (f a) (rec ss)
    else never
  in rec s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iter" kind="let">

```mc
let iter f s : all a. all a1. (a -> a1) -> [a] -> ()
```



<ToggleWrapper text="Code..">
```mc
let iter = lam f. lam s.  map f s; ()
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest map (lam x. addi x 1) [3,4,8,9,20] with [4,5,9,10,21]
utest map (lam x. addi x 1) [] with []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapi" kind="let">

```mc
let mapi f s : all a. all a1. (Int -> a -> a1) -> [a] -> [a1]
```



<ToggleWrapper text="Code..">
```mc
let mapi = lam f. lam s.
  recursive let rec = lam i. lam s.
    match s with [] then []
    else match s with [a] then [f i a]
    else match s with [a] ++ ss then cons (f i a) (rec (addi i 1) ss)
    else never
  in rec 0 s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iteri" kind="let">

```mc
let iteri f s : all a. all a1. (Int -> a -> a1) -> [a] -> ()
```



<ToggleWrapper text="Code..">
```mc
let iteri = lam f. lam s. mapi f s; ()
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest mapi (lam i. lam x. i) [3,4,8,9,20] with [0,1,2,3,4]
utest mapi (lam i. lam x. i) [] with []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldl" kind="let">

```mc
let foldl f acc s : all a. all a1. (a -> a1 -> a) -> a -> [a1] -> a
```



<ToggleWrapper text="Code..">
```mc
let foldl = lam f. lam acc. lam s.
  recursive let rec = lam acc. lam s.
    match s with [] then acc
    else match s with [a] ++ ss then rec (f acc a) ss
    else never
  in rec acc s
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest foldl addi 0 [1,2,3,4,5] with 15
utest foldl addi 0 [] with 0
utest map (foldl addi 0) [[1,2,3], [], [1,3,5,7]] with [6, 0, 16]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldr" kind="let">

```mc
let foldr f acc s : all a. all a1. (a -> a1 -> a1) -> a1 -> [a] -> a1
```



<ToggleWrapper text="Code..">
```mc
let foldr = lam f. lam acc. lam s.
  recursive let rec = lam acc. lam s.
    match s with [] then acc
    else match s with [a] ++ ss then f a (rec acc ss)
    else never
  in rec acc s
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest foldr (lam x. lam acc. x) 0 [1,2] with 1
utest foldr (lam acc. lam x. x) 0 [] with 0
utest foldr cons [] [1,2,3] with [1,2,3]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="create" kind="let">

```mc
let create l f : all a. Int -> (Int -> a) -> [a]
```



<ToggleWrapper text="Code..">
```mc
let create = lam l. lam f.
  recursive let rec = lam i. lam acc.
    if geqi i 0 then rec (subi i 1) (cons (f i) acc)
    else acc
  in rec (subi l 1) []
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest create 3 (lam. 10) with [10,10,10]
utest create 8 (lam. 'a') with ['a','a','a','a','a','a','a','a']
utest create 4 (lam i. muli 2 i) with [0,2,4,6]
utest create 0 (lam i. i) with []
```
</ToggleWrapper>
</DocBlock>

