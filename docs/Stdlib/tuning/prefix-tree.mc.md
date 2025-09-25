import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# prefix-tree.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>  
  
## Types  
  

          <DocBlock title="PTree" kind="type">

```mc
type PTree
```

<Description>{`The type of a prefix tree. A node has an element, the set of id's rooted in  
that subtree, and a set of children. A leaf has an identifier.`}</Description>


<ToggleWrapper text="Code..">
```mc
type PTree a
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="Node" kind="con">

```mc
con Node : all a . { root: a, ids: [Int], children: Map a (PTree a) } -> PTree a
```



<ToggleWrapper text="Code..">
```mc
con Node : all a. { root : a, ids : [Int], children : Map a (PTree a)} -> PTree a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Leaf" kind="con">

```mc
con Leaf : all a . Int -> PTree a
```



<ToggleWrapper text="Code..">
```mc
con Leaf : all a. Int -> PTree a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="prefixTreeEmpty" kind="let">

```mc
let prefixTreeEmpty cmp sentinel : all a. (a -> a -> Int) -> a -> PTree a
```

<Description>{`'prefixTreeEmpty cmp sentinel' creates an empty prefix tree, where 'sentinel' may  
not be used as value in any string to be added to the tree.`}</Description>


<ToggleWrapper text="Code..">
```mc
let prefixTreeEmpty : all a. (a -> a -> Int) -> a -> PTree a =
  lam cmp : a -> a -> Int. lam sentinel : a.
    Node {root = sentinel, children = mapEmpty cmp, ids = []}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prefixTreeInsert" kind="let">

```mc
let prefixTreeInsert cmp tree id path : all a. (a -> a -> Int) -> PTree a -> Int -> [a] -> PTree a
```

<Description>{`'prefixTreeInsert cmp tree id path' inserts 'path' into the 'tree'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let prefixTreeInsert: all a. (a -> a -> Int) -> PTree a -> Int -> [a] -> PTree a =
  lam cmp. lam tree. lam id : Int. lam path : [a].
  match tree with Node t then
    -- Use sentinel value as leaf key as this will never be used as a key in a
    -- map
    let treeLeafKey = t.root in
    let n = length path in
    recursive let insert = lam children. lam i.
      if eqi i n then
        utest mapMem treeLeafKey children with false in
        mapInsert treeLeafKey (Leaf id) children
      else
        let p = get path i in
        match mapLookup p children with Some c then
          -- equal
          match c with Node {root = root, children = cs, ids = ids} then
            let newNode = Node {root = root, children = insert cs (addi i 1), ids = cons id ids} in
            mapInsert p newNode children
          else never
        else
          let newNode = Node {root = p, ids = [id], children = insert (mapEmpty cmp) (addi i 1)} in
          mapInsert p newNode children
    in Node {{t with children = insert t.children 0} with ids = cons id t.ids}
else error "missing sentinel node"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prefixTreeInsertMany" kind="let">

```mc
let prefixTreeInsertMany cmp tree ids paths : all a. (a -> a -> Int) -> PTree a -> [Int] -> [[a]] -> PTree a
```

<Description>{`'prefixTreeInsertMany cmp tree ids paths' inserts the 'paths' into the 'tree'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let prefixTreeInsertMany: all a. (a -> a -> Int) -> PTree a -> [Int] -> [[a]] -> PTree a =
  lam cmp. lam tree. lam ids : [Int]. lam paths.
  -- Faster zip for Rope implementation
  let zip = lam l. lam r.
    mapi (lam i. lam x. (x, get r i)) l
  in
  utest zip [1,2,3] [4,5,6] with [(1,4),(2,5),(3,6)] in

  let z = zip ids paths in
  foldl (lam acc. lam idPath : (Int, [a]). prefixTreeInsert cmp acc idPath.0 idPath.1) tree z
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prefixTreeGetId" kind="let">

```mc
let prefixTreeGetId tree path : all a. PTree a -> [a] -> Option Int
```

<Description>{`'prefixTreeGetId tree path' returns an option with the id of 'path' in  
'tree' if it exists, otherwise None \(\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let prefixTreeGetId = lam tree. lam path.
  match tree with Node {root = root, children = children} then
    let treeLeafKey = root in
    let n = length path in
    recursive let find = lam children. lam i.
      if eqi i n then
        match mapLookup treeLeafKey children with Some (Leaf id) then Some id
        else None ()
      else
        let p = get path i in
        match mapLookup p children with Some (Node {children = children}) then
          find children (addi i 1)
        else None ()
    in
    find children 0
  else error "missing sentinel node"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prefixTreeGetIds" kind="let">

```mc
let prefixTreeGetIds tree path : all a. PTree a -> [a] -> [Int]
```

<Description>{`'prefixTreeGetIds tree path' returns the id's that are prefixed by 'path'  
in 'tree'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let prefixTreeGetIds
  : all a. PTree a -> [a] -> [Int]
  = lam tree. lam path.
  match tree with Node {root = root, children = children, ids = ids} then
    let treeLeafKey = root in
    let n = length path in
    recursive let find = lam children. lam ids. lam i.
      if eqi i n then ids
      else
        let p = get path i in
        match mapLookup p children with Some (Node {children = children, ids = ids}) then
          find children ids (addi i 1)
        else []
    in
    find children ids 0
  else error "missing sentinel node"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prefixTreeMaybeInsert" kind="let">

```mc
let prefixTreeMaybeInsert cmp tree id path : all a. (a -> a -> Int) -> PTree a -> Int -> [a] -> (Bool, PTree a)
```

<Description>{`'prefixTreeMaybeInsert cmp tree id path' inserts 'path' in 'tree' if it doesn't  
already exist. Returns both the \(updated\) tree and a Boolean representing if  
the insert was done or not \(true if path was inserted, false if it already  
existed\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let prefixTreeMaybeInsert: all a. (a -> a -> Int) -> PTree a -> Int -> [a] -> (Bool, PTree a) =
  lam cmp. lam tree. lam id : Int. lam path : [a].
  match tree with Node t then
    -- Use sentinel value as leaf key as this will never be used as a key in a
    -- map
    let treeLeafKey = t.root in
    let n = length path in
    recursive let insert = lam children. lam i.
      if eqi i n then
        if mapMem treeLeafKey children then (false, children)
        else (true, mapInsert treeLeafKey (Leaf id) children)
      else
        let p = get path i in
        match mapLookup p children with Some c then
          -- equal
          match c with Node {root = root, children = cs, ids = ids} then
            switch insert cs (addi i 1)
            case (true, newChildren) then
              let newNode = Node {root = root, children = newChildren, ids = cons id ids} in
              (true, mapInsert p newNode children)
            case (false, _) then (false, children)
            end
          else never
        else
          switch insert (mapEmpty cmp) (addi i 1)
          case (true, newChildren) then
            let newNode = Node {root = p, ids = [id], children = newChildren} in
            (true, mapInsert p newNode children)
          case (false, _) then error "impossible"
          end
    in
    switch insert t.children 0
    case (true, children) then
      (true, Node {{t with children = children} with ids = cons id t.ids})
    case (false, _) then (false, tree)
    end
  else error "missing sentinel node"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prefixTreeGetPathExn" kind="let">

```mc
let prefixTreeGetPathExn tree id : all a. PTree a -> Int -> [a]
```

<Description>{`'prefixTreeGetPathExn tree id' returns the path with 'id' in 'tree', and  
throws an error if 'id' is not stored in 'tree'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let prefixTreeGetPathExn : all a. PTree a -> Int -> [a] = lam tree. lam id.
  match tree with Node {children = cs, ids = ids} then
    recursive let findPath = lam children. lam ids. lam path.
      -- Is the id among the id's?
      if optionIsSome (find (eqi id) ids) then
        foldl (lam acc. lam prefixChild.
          match prefixChild with (prefix,c) in
          match acc with Some res then Some res
          else
            match c with Leaf i then
              if eqi id i then Some path else None ()
            else match c with Node {children = children, ids = ids} in
            findPath children ids (snoc path prefix)
        ) (None ()) (mapBindings children)
      else None ()
    in
    optionGetOrElse (lam. error (join ["ID ", int2string id, " not found"]))
      (findPath cs ids [])
  else error "missing sentinel node"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prefixTreeBindings" kind="let">

```mc
let prefixTreeBindings tree : all a. PTree a -> [(Int, [a])]
```

<Description>{`'prefixTreeBindings tree' returns the pairs of id\-paths stored in the tree.`}</Description>


<ToggleWrapper text="Code..">
```mc
let prefixTreeBindings : all a. PTree a -> [(Int,[a])] = lam tree.
  let ids = prefixTreeGetIds tree [] in
  foldl (lam acc. lam id.
    let path = prefixTreeGetPathExn tree id in
    cons (id, path) acc) [] ids
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prefixTreeDebug" kind="let">

```mc
let prefixTreeDebug toStr tree : all a. (a -> String) -> PTree a -> ()
```

<Description>{`Debug printing of a prefix tree.`}</Description>


<ToggleWrapper text="Code..">
```mc
let prefixTreeDebug: all a. (a -> String) -> PTree a -> () = lam toStr. lam tree : PTree a.
  match tree with Node {children = cs, ids = ids} in
  recursive let work = lam ind. lam children.
    mapMapWithKey (lam root. lam subtree.
      printLn (join [make ind ' ', "root: ", toStr root]);
      match subtree with Leaf id then
        printLn (join [make ind ' ', "leaf ", int2string id])
      else match subtree with Node {ids = ids, children = children} in
        printLn (join [make ind ' ', "ids: ", strJoin ", " (map int2string ids)]);
        work (addi ind 2) children
    ) children; ()
  in
  work 0 cs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prefixTreeEq" kind="let">

```mc
let prefixTreeEq cmp t1 t2 : all k. all k1. (k -> k1 -> Int) -> PTree k -> PTree k1 -> Bool
```



<ToggleWrapper text="Code..">
```mc
let prefixTreeEq = lam cmp. lam t1. lam t2.
  match (t1, t2) with (Leaf i1, Leaf i2) then eqi i1 i2
  else match (t1, t2) with (Node n1, Node n2) then
    forAll (lam x. x)
      [ eqi 0 (cmp n1.root n2.root)
      , eqSeq eqi n1.ids n2.ids
      , eqSeq (prefixTreeEq cmp) (mapValues n1.children) (mapValues n2.children)
      ]
  else false
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

let empty = prefixTreeEmpty subi 0 in
let treeLeafKey = 0 in

let t = prefixTreeInsert subi empty 0 [] in
utest t
with Node {root = 0, ids = [0], children = mapFromSeq subi [(treeLeafKey, Leaf 0)]}
using prefixTreeEq subi
in

utest prefixTreeGetId t [] with Some 0 in
utest prefixTreeGetIds t [] with [0] in
utest prefixTreeGetId t [1] with None () in
utest prefixTreeGetIds t [1] with [] in
utest prefixTreeGetPathExn t 0 with [] in

utest
  match prefixTreeMaybeInsert subi t 1 [] with (false, _) then true
  else false
with true in

utest
  match prefixTreeMaybeInsert subi t 1 [1] with (true, _) then true
  else false
with true in

utest prefixTreeInsert subi empty 0 [1]
with Node
{ root = 0
, ids = [0]
, children = mapFromSeq subi [(1, Node { root = 1
                                       , ids = [0]
                                       , children = mapFromSeq subi [(treeLeafKey, Leaf 0)]})]}
using prefixTreeEq subi
in

utest prefixTreeInsertMany subi empty [0,1] [[1],[1,2]]
with Node
{ root = 0
, ids = [1,0]
, children =
  mapFromSeq subi [(1,
  Node { root = 1
       , ids = [1,0]
       , children =
         mapFromSeq subi [(treeLeafKey, Leaf 0), (2,
         Node { root = 2
              , ids = [1]
              , children =
                mapFromSeq subi [(treeLeafKey, Leaf 1)]})]})]
}
using prefixTreeEq subi
in

let t = prefixTreeInsertMany subi empty [0,1,2] [[1],[1,2],[3]] in
utest t
with Node
{ root = 0
, ids = [2,1,0]
, children =
  mapFromSeq subi
  [ (1,
    Node { root = 1
         , ids = [1,0]
         , children =
           mapFromSeq subi [(treeLeafKey, Leaf 0), (2,
           Node { root = 2
                , ids = [1]
                , children =
                  mapFromSeq subi [(treeLeafKey, Leaf 1)]})]})
  , (3, Node { root = 3
             , ids = [2]
             , children =
               mapFromSeq subi [(treeLeafKey, Leaf 2)]
             })
  ]
}
using prefixTreeEq subi
in

utest prefixTreeGetId t [1] with Some 0 in
utest prefixTreeGetId t [1,2] with Some 1 in
utest prefixTreeGetId t [3] with Some 2 in
utest prefixTreeGetId t [3,1] with None () in

utest prefixTreeGetIds t [1] with [1,0] in
utest prefixTreeGetIds t [1,2] with [1] in
utest prefixTreeGetIds t [3] with [2] in
utest prefixTreeGetIds t [3,1] with [] in
utest prefixTreeGetIds t [] with [2,1,0] in

utest prefixTreeGetPathExn t 0 with [1] in
utest prefixTreeGetPathExn t 1 with [1,2] in
utest prefixTreeGetPathExn t 2 with [3] in

utest
  match prefixTreeMaybeInsert subi t 42 [1,2,3] with (true, t) then
    Some (prefixTreeGetIds t [1,2])
  else None ()
with Some [42,1] in

utest prefixTreeBindings t with [(0,[1]),(1,[1,2]),(2,[3])] in

()
```
</ToggleWrapper>
</DocBlock>

