import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# union-find.mc  
  

Implementation of a stateless union\-find data structure of a fixed size.  
This is used to represent a collection of disjoint sets that can be unified.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>  
  
## Types  
  

          <DocBlock title="UnionFindEntry" kind="type">

```mc
type UnionFindEntry : { idx: Int, parent: Int, size: Int }
```



<ToggleWrapper text="Code..">
```mc
type UnionFindEntry = {
  -- The index of the entry, which is always unique.
  idx : Int,

  -- Represents the index of the parent entry. If this value is the same as the
  -- index, this entry is the root node of its set.
  parent : Int,

  -- Used to represent the size of the set. This value is only valid for the
  -- root node of a size.
  size : Int
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UnionFind" kind="type">

```mc
type UnionFind : { entries: Map Int UnionFindEntry, size: Int }
```

<Description>{`NOTE\(larshum, 2021\-12\-01\): We use a map to represent the inner nodes for  
efficiency, as updating a sequence takes linear\-time.`}</Description>


<ToggleWrapper text="Code..">
```mc
type UnionFind = {
  entries : Map Int UnionFindEntry,
  size : Int
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="unionFindInit" kind="let">

```mc
let unionFindInit size : Int -> UnionFind
```

<Description>{`Initializes a union\-find data structure of a given size. In the initial  
state, all entries are the root nodes of the \(disjoint\) sets they represent.`}</Description>


<ToggleWrapper text="Code..">
```mc
let unionFindInit : Int -> UnionFind = lam size.
  let defaultEntry = lam idx. {idx = idx, parent = idx, size = 1} in
  { entries = mapFromSeq subi (create size (lam i. (i, defaultEntry i)))
  , size = size }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_unionFindGetEntry" kind="let">

```mc
let _unionFindGetEntry uf idx : UnionFind -> Int -> UnionFindEntry
```

<Description>{`Look up the entry representing a given index, or produce an error if the  
index is not in the range \[0, sz\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let _unionFindGetEntry : UnionFind -> Int -> UnionFindEntry = lam uf. lam idx.
  optionGetOrElse
    (lam. error "Union-Find failed to find entry for given index")
    (mapLookup idx uf.entries)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unionFindFind" kind="let">

```mc
let unionFindFind uf idx : UnionFind -> Int -> Int
```



<ToggleWrapper text="Code..">
```mc
let unionFindFind : UnionFind -> Int -> Int = lam uf. lam idx.
  let entry : UnionFindEntry = _unionFindGetEntry uf idx in
  if eqi entry.parent idx then idx
  else
    let entry = {entry with parent = unionFindFind uf entry.parent} in
    entry.parent
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unionFindUnion" kind="let">

```mc
let unionFindUnion uf x y : UnionFind -> Int -> Int -> UnionFind
```

<Description>{`Unites the sets represented by the given indices, making one of them the  
root of the other.`}</Description>


<ToggleWrapper text="Code..">
```mc
let unionFindUnion : UnionFind -> Int -> Int -> UnionFind = lam uf. lam x. lam y.
  let unionOfSets : UnionFind -> UnionFindEntry -> UnionFindEntry -> UnionFind =
    lam uf. lam l. lam r.
    let l = {l with parent = r.idx} in
    let r = {r with size = addi l.size r.size} in
    {uf with entries = mapInsert r.idx r (mapInsert l.idx l uf.entries)} in
  let x = unionFindFind uf x in
  let y = unionFindFind uf y in
  if eqi x y then uf
  else
    let xEntry : UnionFindEntry = _unionFindGetEntry uf x in
    let yEntry : UnionFindEntry = _unionFindGetEntry uf y in
    if lti xEntry.size yEntry.size then unionOfSets uf xEntry yEntry
    else unionOfSets uf yEntry xEntry
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unionFindUnited" kind="let">

```mc
let unionFindUnited uf x y : UnionFind -> Int -> Int -> Bool
```

<Description>{`Checks whether the nodes represented by the given indices belong to the same  
set.`}</Description>


<ToggleWrapper text="Code..">
```mc
let unionFindUnited : UnionFind -> Int -> Int -> Bool = lam uf. lam x. lam y.
  let x = unionFindFind uf x in
  let y = unionFindFind uf y in
  eqi x y
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unionFindSetSize" kind="let">

```mc
let unionFindSetSize uf x : UnionFind -> Int -> Int
```

<Description>{`Finds the size of the set that the given node belongs to.`}</Description>


<ToggleWrapper text="Code..">
```mc
let unionFindSetSize : UnionFind -> Int -> Int = lam uf. lam x.
  let entry : UnionFindEntry = _unionFindGetEntry uf x in
  entry.size
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unionFindSetIndices" kind="let">

```mc
let unionFindSetIndices uf : UnionFind -> [Int]
```

<Description>{`Produces indices representing the sets to which each of the nodes in the  
union\-find data structure belongs.`}</Description>


<ToggleWrapper text="Code..">
```mc
let unionFindSetIndices : UnionFind -> [Int] = lam uf.
  create uf.size (lam i. unionFindFind uf i)
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

let uf = unionFindInit 3 in

utest unionFindFind uf 0 with 0 in
utest unionFindFind uf 1 with 1 in
utest unionFindFind uf 2 with 2 in

let uf = unionFindUnion uf 0 2 in

utest unionFindUnited uf 0 1 with false in
utest unionFindUnited uf 0 2 with true in
utest unionFindUnited uf 1 2 with false in
utest unionFindUnited uf 2 0 with true in

utest unionFindSetSize uf 0 with 2 in
utest unionFindSetSize uf 1 with 1 in
utest unionFindSetSize uf 0 with 2 in

utest unionFindSetIndices uf with [0, 1, 0] in

let uf = unionFindInit 4 in

-- NOTE(larshum, 2021-12-01): If the sizes of two sets are equal, the current
-- implementation makes the left argument the root.
let uf = unionFindUnion uf 0 1 in
let uf = unionFindUnion uf 2 3 in
utest unionFindFind uf 0 with 0 in
utest unionFindFind uf 1 with 0 in
utest unionFindFind uf 2 with 2 in
utest unionFindFind uf 3 with 2 in

-- Even if we compute the union of two non-root nodes in disjoint sets, their
-- sets are correctly united to one set.
let uf = unionFindUnion uf 1 3 in
utest unionFindSetIndices uf with [0, 0, 0, 0] in

()
```
</ToggleWrapper>
</DocBlock>

