import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# heap.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/list.mc"} style={S.link}>list.mc</a>  
  
## Types  
  

          <DocBlock title="Heap" kind="type">

```mc
type Heap
```



<ToggleWrapper text="Code..">
```mc
type Heap a
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="HNil" kind="con">

```mc
con HNil : all a . () -> Heap a
```



<ToggleWrapper text="Code..">
```mc
con HNil : all a. () -> Heap a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="HNode" kind="con">

```mc
con HNode : all a . (a, [Heap a]) -> Heap a
```



<ToggleWrapper text="Code..">
```mc
con HNode : all a. (a, [Heap a]) -> Heap a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_treefold" kind="let">

```mc
let _treefold f zero l : all a. (a -> a -> a) -> a -> [a] -> a
```



<ToggleWrapper text="Code..">
```mc
let _treefold = lam f. lam zero. lam l.
  recursive let pairfold = lam l.
    match l with [x, y] ++ l
    then cons (f x y) (pairfold l)
    else l in
  switch l
  case [x] then
    x
  case [a, b] ++ l then
    _treefold f zero (cons (f a b) (pairfold l))
  case [] then
    zero
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="heapEmpty" kind="let">

```mc
let heapEmpty  : all a. Heap a
```



<ToggleWrapper text="Code..">
```mc
let heapEmpty : all a. Heap a
  = HNil ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="heapSingleton" kind="let">

```mc
let heapSingleton a : all a. a -> Heap a
```



<ToggleWrapper text="Code..">
```mc
let heapSingleton : all a. a -> Heap a
  = lam a. HNode (a, [])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="heapMerge" kind="let">

```mc
let heapMerge cmp heapA heapB : all a. (a -> a -> Int) -> Heap a -> Heap a -> Heap a
```



<ToggleWrapper text="Code..">
```mc
let heapMerge : all a. (a -> a -> Int) -> Heap a -> Heap a -> Heap a
  = lam cmp. lam heapA. lam heapB. switch (heapA, heapB)
    case (x, HNil _) | (HNil _, x) then x
    case (HNode (a, as), HNode (b, bs)) then
      if lti (cmp a b) 0
      then HNode (a, (cons heapB as))
      else HNode (b, (cons heapA bs))
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="heapMergeMany" kind="let">

```mc
let heapMergeMany cmp hs : all a. (a -> a -> Int) -> [Heap a] -> Heap a
```



<ToggleWrapper text="Code..">
```mc
let heapMergeMany : all a. (a -> a -> Int) -> [Heap a] -> Heap a
  = lam cmp. lam hs. _treefold (heapMerge cmp) (HNil ()) hs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="heapAddMany" kind="let">

```mc
let heapAddMany cmp toAdd h : all a. (a -> a -> Int) -> [a] -> Heap a -> Heap a
```



<ToggleWrapper text="Code..">
```mc
let heapAddMany : all a. (a -> a -> Int) -> [a] -> Heap a -> Heap a
  = lam cmp. lam toAdd. lam h.
    heapMerge cmp h (heapMergeMany cmp (map heapSingleton toAdd))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="heapPeek" kind="let">

```mc
let heapPeek h : all a. Heap a -> Option a
```



<ToggleWrapper text="Code..">
```mc
let heapPeek : all a. Heap a -> Option a
  = lam h. match h with HNode (a, _) then Some a else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="heapPop" kind="let">

```mc
let heapPop cmp h : all a. (a -> a -> Int) -> Heap a -> Option (a, Heap a)
```



<ToggleWrapper text="Code..">
```mc
let heapPop : all a. (a -> a -> Int) -> Heap a -> Option (a, Heap a)
  = lam cmp. lam h. switch h
    case HNil _ then None ()
    case HNode (a, hs) then Some (a, heapMergeMany cmp hs)
    end
```
</ToggleWrapper>
</DocBlock>

