import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# map.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
Defines auxiliary functions for the map intrinsics.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/avl.mc"} style={S.link}>avl.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Types  
  

          <DocBlock title="Map" kind="type">

```mc
type Map
```

<Description>{`NOTE\(larshum, 2023\-03\-05\): Below follows the implementation of the \(as of  
writing\) intrinsic functions of the map data type, making use of the native  
AVL tree implementation.`}</Description>


<ToggleWrapper text="Code..">
```mc
type Map k v = use AVLTreeImpl in {cmp : k -> k -> Int, root : AVL k v}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="mapEmpty" kind="let">

```mc
let mapEmpty cmp : all k. all v. (k -> k -> Int) -> Map k v
```



<ToggleWrapper text="Code..">
```mc
let mapEmpty : all k. all v. (k -> k -> Int) -> Map k v = lam cmp.
  use AVLTreeImpl in
  {cmp = cmp, root = avlEmpty ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapSize" kind="let">

```mc
let mapSize m : all k. all v. Map k v -> Int
```



<ToggleWrapper text="Code..">
```mc
let mapSize : all k. all v. Map k v -> Int = lam m.
  use AVLTreeImpl in
  avlSize m.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapLength" kind="let">

```mc
let mapLength m : all k. all v. Map k v -> Int
```



<ToggleWrapper text="Code..">
```mc
let mapLength : all k. all v. Map k v -> Int = lam m. mapSize m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapIsEmpty" kind="let">

```mc
let mapIsEmpty m : all k. all v. Map k v -> Bool
```



<ToggleWrapper text="Code..">
```mc
let mapIsEmpty : all k. all v. Map k v -> Bool = lam m.
  use AVLTreeImpl in
  avlIsEmpty m.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapRemove" kind="let">

```mc
let mapRemove k m : all k. all v. k -> Map k v -> Map k v
```



<ToggleWrapper text="Code..">
```mc
let mapRemove : all k. all v. k -> Map k v -> Map k v =
  lam k. lam m.
  use AVLTreeImpl in
  {m with root = avlRemove m.cmp k m.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFindExn" kind="let">

```mc
let mapFindExn k m : all k. all v. k -> Map k v -> v
```



<ToggleWrapper text="Code..">
```mc
let mapFindExn : all k. all v. k -> Map k v -> v =
  lam k. lam m.
  use AVLTreeImpl in
  optionGetOrElse
    (lam. error "mapFindExn: key not found")
    (avlLookup m.cmp k m.root)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFindOrElse" kind="let">

```mc
let mapFindOrElse f k m : all k. all v. (() -> v) -> k -> Map k v -> v
```



<ToggleWrapper text="Code..">
```mc
let mapFindOrElse : all k. all v. (() -> v) -> k -> Map k v -> v =
  lam f. lam k. lam m.
  use AVLTreeImpl in
  optionGetOrElse f (avlLookup m.cmp k m.root)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFindApplyOrElse" kind="let">

```mc
let mapFindApplyOrElse fnThn fnEls k m : all k. all v1. all v2. (v1 -> v2) -> (() -> v2) -> k -> Map k v1 -> v2
```



<ToggleWrapper text="Code..">
```mc
let mapFindApplyOrElse : all k. all v1. all v2.
  (v1 -> v2) -> (() -> v2) -> k -> Map k v1 -> v2 =
  lam fnThn. lam fnEls. lam k. lam m.
  use AVLTreeImpl in
  optionMapOrElse fnEls fnThn (avlLookup m.cmp k m.root)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapLookup" kind="let">

```mc
let mapLookup k m : all k. all v. k -> Map k v -> Option v
```



<ToggleWrapper text="Code..">
```mc
let mapLookup : all k. all v. k -> Map k v -> Option v =
  lam k. lam m.
  use AVLTreeImpl in
  avlLookup m.cmp k m.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapLookupOrElse" kind="let">

```mc
let mapLookupOrElse f k m : all k. all v. (() -> v) -> k -> Map k v -> v
```



<ToggleWrapper text="Code..">
```mc
let mapLookupOrElse : all k. all v. (() -> v) -> k -> Map k v -> v =
  lam f. lam k. lam m.
  mapFindOrElse f k m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapLookupApplyOrElse" kind="let">

```mc
let mapLookupApplyOrElse f1 f2 k m : all k. all v1. all v2. (v1 -> v2) -> (() -> v2) -> k -> Map k v1 -> v2
```



<ToggleWrapper text="Code..">
```mc
let mapLookupApplyOrElse : all k. all v1. all v2.
  (v1 -> v2) -> (() -> v2) -> k -> Map k v1 -> v2 =
  lam f1. lam f2. lam k. lam m.
  mapFindApplyOrElse f1 f2 k m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapLookupOr" kind="let">

```mc
let mapLookupOr dv k m : all k. all v. v -> k -> Map k v -> v
```



<ToggleWrapper text="Code..">
```mc
let mapLookupOr : all k. all v. v -> k -> Map k v -> v =
  lam dv. lam k. lam m.
  mapLookupOrElse (lam. dv) k m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFindUpper" kind="let">

```mc
let mapFindUpper k m : all k. all v. k -> Map k v -> Option (k, v)
```

<Description>{`\`mapFindUpper k m\` returns the key\-value pair \(k', v\) in the map \`m\`,  
where k' is the minimum key in \`m\` and k≤k'. Returns \`None \(\)\` if no such key  
k' exists in \`m\`. Time complexity is O\(log n\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapFindUpper : all k. all v. k -> Map k v -> Option (k, v)
  = lam k. lam m. use AVLTreeImpl in avlFindUpper m.cmp k m.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFindLower" kind="let">

```mc
let mapFindLower k m : all k. all v. k -> Map k v -> Option (k, v)
```

<Description>{`\`mapFindLower k m\` returns the key\-value pair \(k', v\) in the map \`m\`,  
where k' is the maximum key in \`m\` and k≥k'. Returns \`None \(\)\` if no such key  
k' exists in \`m\`. Time complexity is O\(log n\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapFindLower : all k. all v. k -> Map k v -> Option (k, v)
  = lam k. lam m. use AVLTreeImpl in avlFindLower m.cmp k m.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapInsert" kind="let">

```mc
let mapInsert k v m : all k. all v. k -> v -> Map k v -> Map k v
```



<ToggleWrapper text="Code..">
```mc
let mapInsert : all k. all v. k -> v -> Map k v -> Map k v =
  lam k. lam v. lam m.
  use AVLTreeImpl in
  {m with root = avlInsert m.cmp k v m.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapInsertWith" kind="let">

```mc
let mapInsertWith f k v m : all k. all v. (v -> v -> v) -> k -> v -> Map k v -> Map k v
```



<ToggleWrapper text="Code..">
```mc
let mapInsertWith : all k. all v. (v -> v -> v) -> k -> v -> Map k v -> Map k v =
  lam f. lam k. lam v. lam m.
    match mapLookup k m with Some prev then
      mapInsert k (f prev v) m
    else mapInsert k v m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapUpdate" kind="let">

```mc
let mapUpdate k f m : all k. all v. k -> (Option v -> Option v) -> Map k v -> Map k v
```

<Description>{`\`mapUpdate k f m\` looks up \`k\` in \`m\` and applies \`f\` to the result of this  
lookup. If the result of this application is \`Some v\`, the binding \`k\` in \`m\`  
is updated to bind to \`v\`. Otherwise, if the result is \`None \_\`, the binding  
\`k\` is removed from \`m\`.  
OPT\(oerikss, 2023\-04\-27\): We might be able to reduce this to one map access  
if we operate directly on the AVLTree.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapUpdate : all k. all v. k -> (Option v -> Option v) -> Map k v -> Map k v
  = lam k. lam f. lam m.
    switch f (mapLookup k m)
    case Some v then mapInsert k v m
    case None _ then mapRemove k m
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapSingleton" kind="let">

```mc
let mapSingleton cmp k v : all k. all v. (k -> k -> Int) -> k -> v -> Map k v
```

<Description>{`\`mapSingleton cmp k v\` creates a singleton map with key\-value \`k, v\` and  
comparision function \`cmp\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapSingleton : all k. all v. (k -> k -> Int) -> k -> v -> Map k v
  = lam cmp. lam k. lam v. mapInsert k v (mapEmpty cmp)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapChoose" kind="let">

```mc
let mapChoose m : all k. all v. Map k v -> Option (k, v)
```

<Description>{`\`mapChoose m\` chooses one binding from \`m\`, giving \`None \(\)\` if \`m\` is  
empty.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapChoose : all k. all v. Map k v -> Option (k, v) = lam m.
  use AVLTreeImpl in
  avlChoose m.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapChooseExn" kind="let">

```mc
let mapChooseExn m : all k. all v. Map k v -> (k, v)
```



<ToggleWrapper text="Code..">
```mc
let mapChooseExn : all k. all v. Map k v -> (k, v) = lam m.
  use AVLTreeImpl in
  optionGetOrElse (lam. error "mapChooseExn: empty map") (avlChoose m.root)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapChooseOrElse" kind="let">

```mc
let mapChooseOrElse f m : all k. all v. (() -> (k, v)) -> Map k v -> (k, v)
```



<ToggleWrapper text="Code..">
```mc
let mapChooseOrElse : all k. all v. (() -> (k, v)) -> Map k v -> (k, v) =
  lam f. lam m.
  use AVLTreeImpl in
  optionGetOrElse f (avlChoose m.root)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMem" kind="let">

```mc
let mapMem k m : all k. all v. k -> Map k v -> Bool
```



<ToggleWrapper text="Code..">
```mc
let mapMem : all k. all v. k -> Map k v -> Bool = lam k. lam m.
  use AVLTreeImpl in
  optionIsSome (avlLookup m.cmp k m.root)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapEq" kind="let">

```mc
let mapEq eqv m1 m2 : all k. all v. (v -> v -> Bool) -> Map k v -> Map k v -> Bool
```



<ToggleWrapper text="Code..">
```mc
let mapEq : all k. all v. (v -> v -> Bool) -> Map k v -> Map k v -> Bool =
  lam eqv. lam m1. lam m2.
  use AVLTreeImpl in
  avlEq m1.cmp eqv m1.root m2.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapCmp" kind="let">

```mc
let mapCmp cmpv m1 m2 : all k. all v. (v -> v -> Int) -> Map k v -> Map k v -> Int
```



<ToggleWrapper text="Code..">
```mc
let mapCmp : all k. all v. (v -> v -> Int) -> Map k v -> Map k v -> Int =
  lam cmpv. lam m1. lam m2.
  use AVLTreeImpl in
  avlCmp m1.cmp cmpv m1.root m2.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapGetCmpFun" kind="let">

```mc
let mapGetCmpFun m : all k. all v. Map k v -> k -> k -> Int
```



<ToggleWrapper text="Code..">
```mc
let mapGetCmpFun : all k. all v. Map k v -> (k -> k -> Int) = lam m. m.cmp
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapBindings" kind="let">

```mc
let mapBindings m : all k. all v. Map k v -> [(k, v)]
```



<ToggleWrapper text="Code..">
```mc
let mapBindings : all k. all v. Map k v -> [(k, v)] = lam m.
  use AVLTreeImpl in
  avlToSeq [] m.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapToSeq" kind="let">

```mc
let mapToSeq m : all k. all v. Map k v -> [(k, v)]
```



<ToggleWrapper text="Code..">
```mc
let mapToSeq : all k. all v. Map k v -> [(k,v)] = lam m.
  mapBindings m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFromSeq" kind="let">

```mc
let mapFromSeq cmp bindings : all k. all v. (k -> k -> Int) -> [(k, v)] -> Map k v
```



<ToggleWrapper text="Code..">
```mc
let mapFromSeq : all k. all v. (k -> k -> Int) -> [(k, v)] -> Map k v =
  lam cmp. lam bindings.
  use AVLTreeImpl in
  {cmp = cmp, root = avlFromSeq cmp bindings}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFoldWithKey" kind="let">

```mc
let mapFoldWithKey f acc m : all k. all v. all a. (a -> k -> v -> a) -> a -> Map k v -> a
```



<ToggleWrapper text="Code..">
```mc
let mapFoldWithKey : all k. all v. all a. (a -> k -> v -> a) -> a -> Map k v -> a =
  lam f. lam acc. lam m.
  use AVLTreeImpl in
  avlFold f acc m.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMapWithKey" kind="let">

```mc
let mapMapWithKey f m : all k. all v1. all v2. (k -> v1 -> v2) -> Map k v1 -> Map k v2
```



<ToggleWrapper text="Code..">
```mc
let mapMapWithKey : all k. all v1. all v2. (k -> v1 -> v2) -> Map k v1 -> Map k v2 =
  lam f. lam m.
  use AVLTreeImpl in
  {cmp = m.cmp, root = avlMap f m.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMap" kind="let">

```mc
let mapMap f m : all k. all v1. all v2. (v1 -> v2) -> Map k v1 -> Map k v2
```



<ToggleWrapper text="Code..">
```mc
let mapMap : all k. all v1. all v2. (v1 -> v2) -> Map k v1 -> Map k v2 =
  lam f. lam m.
  mapMapWithKey (lam. lam v. f v) m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFoldlOption" kind="let">

```mc
let mapFoldlOption f acc m : all k. all v. all acc. (acc -> k -> v -> Option acc) -> acc -> Map k v -> Option acc
```



<ToggleWrapper text="Code..">
```mc
let mapFoldlOption : all k. all v. all acc.
  (acc -> k -> v -> Option acc) -> acc -> Map k v -> Option acc =
  lam f. lam acc. lam m.
    optionFoldlM (lam acc. lam t : (k, v). f acc t.0 t.1) acc (mapBindings m)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMapAccum" kind="let">

```mc
let mapMapAccum f acc m : all k. all v1. all v2. all acc. (acc -> k -> v1 -> (acc, v2)) -> acc -> Map k v1 -> (acc, Map k v2)
```



<ToggleWrapper text="Code..">
```mc
let mapMapAccum : all k. all v1. all v2. all acc.
  (acc -> k -> v1 -> (acc, v2)) -> acc -> Map k v1 -> (acc, Map k v2) =
  lam f. lam acc. lam m.
    mapFoldWithKey
      (lam tacc : (acc, Map k v2). lam k. lam v1.
         let fval : (acc, v2) = f tacc.0 k v1 in
         match fval with (acc, v2) then (acc, mapInsert k v2 tacc.1) else never)
      (acc, mapEmpty (mapGetCmpFun m)) m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMapWithKeyK" kind="let">

```mc
let mapMapWithKeyK f m k : all k. all v1. all v2. all a. (k -> v1 -> (v2 -> a) -> a) -> Map k v1 -> (Map k v2 -> a) -> a
```

<Description>{`\`mapMapWithKeyK f m k\` maps the continuation passing function \`f\` over the  
values of \`m\`, passing the result of the mapping to the continuation \`k\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapMapWithKeyK
  : all k. all v1. all v2. all a.
    (k -> v1 -> (v2 -> a) -> a) -> Map k v1 -> (Map k v2 -> a) -> a
  = lam f. lam m. lam k.
  mapFoldWithKey
    (lam k. lam key. lam val.
      (lam m. f key val (lam val. k (mapInsert key val m))))
    k m (mapEmpty (mapGetCmpFun m))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMapK" kind="let">

```mc
let mapMapK f : all k. all v1. all v2. all a. (v1 -> (v2 -> a) -> a) -> Map k v1 -> (Map k v2 -> a) -> a
```

<Description>{`\`mapMapK f m k\` maps the continuation passing function \`f\` over the values of  
\`m\`, passing the result of the mapping to the continuation \`k\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapMapK
  : all k. all v1. all v2. all a.
    (v1 -> (v2 -> a) -> a) -> Map k v1 -> (Map k v2 -> a) -> a
  = lam f. mapMapWithKeyK (lam. f)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAny" kind="let">

```mc
let mapAny f m : all k. all v. (k -> v -> Bool) -> Map k v -> Bool
```



<ToggleWrapper text="Code..">
```mc
let mapAny : all k. all v. (k -> v -> Bool) -> Map k v -> Bool =
  lam f. lam m.
  use AVLTreeImpl in
  let anyFn = lam acc. lam k. lam v.
    if acc then acc else f k v
  in
  avlFold anyFn false m.root
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAll" kind="let">

```mc
let mapAll f m : all k. all v. (v -> Bool) -> Map k v -> Bool
```



<ToggleWrapper text="Code..">
```mc
let mapAll : all k. all v. (v -> Bool) -> Map k v -> Bool = lam f. lam m.
  mapFoldWithKey (lam acc. lam. lam v. and acc (f v)) true m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAllWithKey" kind="let">

```mc
let mapAllWithKey f m : all k. all v. (k -> v -> Bool) -> Map k v -> Bool
```



<ToggleWrapper text="Code..">
```mc
let mapAllWithKey : all k. all v. (k -> v -> Bool) -> Map k v -> Bool =
  lam f. lam m.
  mapFoldWithKey (lam acc. lam k. lam v. and acc (f k v)) true m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapGetMin" kind="let">

```mc
let mapGetMin m : all k. all v. Map k v -> Option (k, v)
```

<Description>{`\`mapGetMin m\` returns the smallest key\-value pair of \`m\`, or None \(\)  
if the map is empty.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapGetMin : all k. all v. Map k v -> Option (k, v) =
  lam m.
    if mapIsEmpty m then None ()
    else
      use AVLTreeImpl in
      match avlSplitFirst m.root with (k, v, _) in
      Some (k, v)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapKeys" kind="let">

```mc
let mapKeys m : all k. all v. Map k v -> [k]
```



<ToggleWrapper text="Code..">
```mc
let mapKeys : all k. all v. Map k v -> [k] = lam m.
  mapFoldWithKey (lam ks. lam k. lam. snoc ks k) [] m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapValues" kind="let">

```mc
let mapValues m : all k. all v. Map k v -> [v]
```



<ToggleWrapper text="Code..">
```mc
let mapValues : all k. all v. Map k v -> [v] = lam m.
  mapFoldWithKey (lam vs. lam. lam v. snoc vs v) [] m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMerge" kind="let">

```mc
let mapMerge f l r : all k. all a. all b. all c. (Option a -> Option b -> Option c) -> Map k a -> Map k b -> Map k c
```

<Description>{`Generalized merging of two maps. This can be used to express union,  
difference, intersection, etc.; any combination of two maps where  
we do some form of combination and filtering at each key.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapMerge : all k. all a. all b. all c.
  (Option a -> Option b -> Option c) -> Map k a -> Map k b -> Map k c =
  lam f. lam l. lam r.
  use AVLTreeImpl in
  {cmp = l.cmp, root = avlMerge l.cmp f l.root r.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMergeWithKey" kind="let">

```mc
let mapMergeWithKey f l r : all k. all a. all b. all c. (k -> Option a -> Option b -> Option c) -> Map k a -> Map k b -> Map k c
```

<Description>{`This is \`mapMerge\`, except the combination function has access to  
the key being merged.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapMergeWithKey : all k. all a. all b. all c.
  (k -> Option a -> Option b -> Option c) -> Map k a -> Map k b -> Map k c =
  lam f. lam l. lam r.
  use AVLTreeImpl in
  {cmp = l.cmp, root = avlMergeWithKey l.cmp f l.root r.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapUnion" kind="let">

```mc
let mapUnion l r : all k. all v. Map k v -> Map k v -> Map k v
```



<ToggleWrapper text="Code..">
```mc
let mapUnion : all k. all v. Map k v -> Map k v -> Map k v = lam l. lam r.
  use AVLTreeImpl in
  {l with root = avlUnionWith l.cmp (lam. lam rv. rv) l.root r.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapUnionWith" kind="let">

```mc
let mapUnionWith f l r : all k. all v. (v -> v -> v) -> Map k v -> Map k v -> Map k v
```



<ToggleWrapper text="Code..">
```mc
let mapUnionWith : all k. all v. (v -> v -> v) -> Map k v -> Map k v -> Map k v = lam f. lam l. lam r.
  use AVLTreeImpl in
  {l with root = avlUnionWith l.cmp f l.root r.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapIntersectWith" kind="let">

```mc
let mapIntersectWith f l r : all k. all a. all b. all c. (a -> b -> c) -> Map k a -> Map k b -> Map k c
```



<ToggleWrapper text="Code..">
```mc
let mapIntersectWith : all k. all a. all b. all c. (a -> b -> c) -> Map k a -> Map k b -> Map k c =
  lam f. lam l. lam r.
  use AVLTreeImpl in
  {cmp = l.cmp, root = avlIntersectWith l.cmp f l.root r.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapIntersectWithKey" kind="let">

```mc
let mapIntersectWithKey f l r : all k. all a. all b. all c. (k -> a -> b -> c) -> Map k a -> Map k b -> Map k c
```



<ToggleWrapper text="Code..">
```mc
let mapIntersectWithKey : all k. all a. all b. all c. (k -> a -> b -> c) -> Map k a -> Map k b -> Map k c =
  lam f. lam l. lam r.
  use AVLTreeImpl in
  {cmp = l.cmp, root = avlIntersectWithKey l.cmp f l.root r.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapDifference" kind="let">

```mc
let mapDifference l r : all k. all v. all v2. Map k v -> Map k v2 -> Map k v
```



<ToggleWrapper text="Code..">
```mc
let mapDifference : all k. all v. all v2. Map k v -> Map k v2 -> Map k v =
  lam l. lam r.
  use AVLTreeImpl in
  {l with root = avlDifference l.cmp l.root r.root}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMapOptionWithKey" kind="let">

```mc
let mapMapOptionWithKey f m : all k. all a. all b. (k -> a -> Option b) -> Map k a -> Map k b
```

<Description>{`Perform a mapping and filtering at the same time, with access to  
the key.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapMapOptionWithKey : all k. all a. all b. (k -> a -> Option b) -> Map k a -> Map k b
  = lam f. lam m.
  use AVLTreeImpl in
  {root = avlMapOption f m.root, cmp = m.cmp}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapMapOption" kind="let">

```mc
let mapMapOption f m : all k. all a. all b. (a -> Option b) -> Map k a -> Map k b
```

<Description>{`Like \`mapMapOptionWithKey\` but without access to the key.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapMapOption : all k. all a. all b. (a -> Option b) -> Map k a -> Map k b
  = lam f. lam m.
  use AVLTreeImpl in
  {root = avlMapOption (lam. f) m.root, cmp = m.cmp}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFilterWithKey" kind="let">

```mc
let mapFilterWithKey p m : all k. all v. (k -> v -> Bool) -> Map k v -> Map k v
```

<Description>{`\`mapFilterWithKey p m\` filters the map \`m\` with the predicate \`p\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapFilterWithKey : all k. all v. (k -> v -> Bool) -> Map k v -> Map k v
  = lam p. lam m.
  use AVLTreeImpl in
  {root = avlFilter p m.root, cmp = m.cmp}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFilter" kind="let">

```mc
let mapFilter p m : all k. all v. (v -> Bool) -> Map k v -> Map k v
```

<Description>{`\`mapFilter p m\` filters the map \`m\` with the predicate \`p\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapFilter : all k. all v. (v -> Bool) -> Map k v -> Map k v
  = lam p. lam m.
  use AVLTreeImpl in
  {root = avlFilter (lam. p) m.root, cmp = m.cmp}
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

let m = mapEmpty subi in

utest mapChoose m with None () in
utest mapGetMin m with None () in

utest mapLookupOrElse (lam. 2) 1 m with 2 in
utest mapLookupApplyOrElse (lam. 2) (lam. 3) 1 m with 3 in
utest mapLength m with 0 in
utest mapIsEmpty m with true in

utest mapLookup 1 m with None () using optionEq eqi in

let m = mapEmpty subi in

let m = mapInsert 1 "1" m in
let m = mapInsert 2 "2" m in
let m = mapInsert 3 "3" m in

utest mapLength m with 3 in
utest mapIsEmpty m with false in

utest mapLookup 1 m with Some "1" using optionEq eqString in
utest mapLookup 2 m with Some "2" using optionEq eqString in
utest mapLookup 3 m with Some "3" using optionEq eqString in
utest mapLookup 4 m with None () using optionEq eqString in

utest
  match mapChoose m with Some _ then true else false
with true in

let m2 = mapInsert 2 "22" m in
let m2 = mapInsert 4 "44" m2 in
let m2 = mapInsert (negi 1) "-1" m2 in

let merged = mapUnion m m2 in
utest mapLookup 1 merged with Some "1" using optionEq eqString in
utest mapLookup 2 merged with Some "22" using optionEq eqString in
utest mapLookup 3 merged with Some "3" using optionEq eqString in
utest mapLookup 4 merged with Some "44" using optionEq eqString in
utest mapLookup (negi 1) merged with Some "-1" using optionEq eqString in
utest mapLookup 5 merged with None () using optionEq eqString in

let m3 = mapFromSeq subi [(1, "m1"), (4, "m4"), (negi 1, "-1")] in
let mergedWith = mapUnionWith concat m m3 in
utest mapLookup 1 mergedWith with Some "1m1" using optionEq eqString in
utest mapLookup 2 mergedWith with Some "2" using optionEq eqString in
utest mapLookup 3 mergedWith with Some "3" using optionEq eqString in
utest mapLookup 4 mergedWith with Some "m4" using optionEq eqString in
utest mapLookup (negi 1) mergedWith with Some "-1" using optionEq eqString in
utest mapLookup 5 mergedWith with None () using optionEq eqString in

utest mapFoldlOption (lam acc. lam k. lam v. Some v) "0" m
with Some "3" using optionEq eqString in
utest mapFoldlOption
  (lam acc. lam k. lam v. if eqi k acc then None () else Some acc) 3 m
with None () using optionEq eqi in

let m = mapFromSeq subi
  [ (1, "1")
  , (2, "2")
  ] in
utest mapLookup 1 m with Some "1" using optionEq eqString in
utest mapLookup 2 m with Some "2" using optionEq eqString in
utest mapLookup 3 m with None () using optionEq eqString in

let m2 = mapInsertWith concat 1 "blub" m in
utest mapLookup 1 m2 with Some "1blub" using optionEq eqString in
utest mapLookup 2 m2 with mapLookup 2 m using optionEq eqString in
utest mapLookup 3 m2 with mapLookup 3 m using optionEq eqString in

utest mapKeys m2 with [1,2] in
utest mapValues m2 with ["1blub","2"] in
utest mapToSeq m2 with [(1,"1blub"), (2,"2")] in

utest
  match mapMapAccum (lam acc. lam k. lam v. ((addi k acc), concat "x" v)) 0 merged
  with (acc, m)
  then (acc, mapBindings m)
  else never
with (9,[(negi 1,("x-1")),(1,("x1")),(2,("x22")),(3,("x3")),(4,("x44"))]) in

let m = mapFromSeq subi
  [ (1, "1")
  , (2, "2")
  , (123, "123")
  ] in
utest mapAllWithKey (lam i. lam. geqi i 1) m with true in
utest mapAllWithKey (lam i. lam. leqi i 123) m with true in
utest mapAllWithKey (lam i. lam. lti i 123) m with false in
utest mapAll (lam str. geqi (length str) 1) m with true in
utest mapAll (lam str. leqi (length str) 3) m with true in
utest mapAll (lam str. lti (length str) 2) m with false in

let m = mapFromSeq subi
  [ (1, "1")
  , (2, "2")
  , (3, "3")
  ] in
utest
  (mapMapWithKeyK (lam key. lam val. lam k. k (key, val)) m (lam m. mapBindings m))
  with [(1, (1, "1")), (2, (2, "2")), (3, (3, "3"))]
in
utest
  (mapMapK (lam val. lam k. k (join [val, val])) m (lam m. mapBindings m))
  with [(1, "11"), (2, "22"), (3, "33")]
in

let m = mapFromSeq subi [
  (1, "1"),
  (2, "2"),
  (3, "3")
] in
utest mapBindings (mapUpdate 1 (lam. Some "2") m)
  with [(1, "2"), (2, "2"), (3, "3")]
in
utest mapBindings (mapUpdate 4 (lam. Some "4") m)
  with [(1, "1"), (2, "2"), (3, "3"), (4, "4")]
in
utest mapBindings (mapUpdate 1 (lam. None ()) m)
  with [(2, "2"), (3, "3")]
in
utest mapBindings (mapUpdate 4 (lam. None ()) m)
  with [(1, "1"), (2, "2"), (3, "3")]
in
utest
  mapBindings
    (mapUpdate 2
       (lam v. match v with Some v then Some (join [v,v]) else None ())
       m)
  with [(1, "1"), (2, "22"), (3, "3")]
in

utest mapGetMin m with Some (1, "1") in

let m = mapFromSeq subi [
  (1, "1"),
  (2, "2"),
  (3, "3")
] in
utest
  mapBindings (mapFilterWithKey (lam k. lam v. and (gti k 1) (eqString v "3")) m)
  with [(3, "3")]
in

let m = mapFromSeq subi [
  (1, "1"),
  (2, "2"),
  (3, "3")
] in
utest
  mapBindings (mapFilter (lam v. or (eqString v "1") (eqString v "3")) m)
  with [(1, "1"), (3, "3")]
in

let m = mapFromSeq subi [
  (1, "1"),
  (2, "2"),
  (3, "3")
] in
utest
  mapBindings (mapMapOptionWithKey (lam k. lam v. if or (eqString v "1") (eqString v "3") then Some (concat (int2string k) (cons 'x' v)) else None ()) m)
  with [(1, "1x1"), (3, "3x3")]
in

let m = mapFromSeq subi [
  (1, "1"),
  (2, "2"),
  (3, "3")
] in
utest
  mapBindings (mapMapOption (lam v. if or (eqString v "1") (eqString v "3") then Some (cons 'x' v) else None ()) m)
  with [(1, "x1"), (3, "x3")]
in

let cmp = lam a. lam b. if ltf a b then -1 else if gtf a b then 1 else 0 in
let m = mapFromSeq cmp [(0., 0), (1., 1), (2., 2), (3., 3), (4., 4)] in
utest mapFindUpper 4.5 m with None () in
utest mapFindUpper 4. m with Some (4., 4) in
utest mapFindUpper 3.5 m with Some (4., 4) in
utest mapFindUpper 3. m with Some (3., 3) in
utest mapFindUpper 2.5 m with Some (3., 3) in
utest mapFindUpper 2. m with Some (2., 2) in
utest mapFindUpper 1.5 m with Some (2., 2) in
utest mapFindUpper 1. m with Some (1., 1) in
utest mapFindUpper 0.5 m with Some (1., 1) in
utest mapFindUpper 0. m with Some (0., 0) in
utest mapFindLower 4.5 m with Some (4., 4) in
utest mapFindLower 4. m with Some (4., 4) in
utest mapFindLower 3.5 m with Some (3., 3) in
utest mapFindLower 3. m with Some (3., 3) in
utest mapFindLower 2.5 m with Some (2., 2) in
utest mapFindLower 2. m with Some (2., 2) in
utest mapFindLower 1.5 m with Some (1., 1) in
utest mapFindLower 1. m with Some (1., 1) in
utest mapFindLower 0.5 m with Some (0., 0) in
utest mapFindLower 0. m with Some (0., 0) in
utest mapFindLower -1. m with None () in

let m = mapSingleton subi 1 1 in
utest mapSize m with 1 in
utest mapLookup 1 m with Some 1 in

()
```
</ToggleWrapper>
</DocBlock>

