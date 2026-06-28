import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AVLTreeImpl  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AVL" kind="syn">

```mc
syn AVL
```



<ToggleWrapper text="Code..">
```mc
syn AVL k v =
  | Leaf ()
  | Node {key : k, value : v, l : AVL k v, r : AVL k v, h : Int}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AuxTree" kind="syn">

```mc
syn AuxTree
```

<Description>{`NOTE\(larshum, 2023\-03\-05\): We can represent equivalent AVL trees in  
multiple ways. Therefore, we do not want to compare the structure of the  
trees, but only the values found in these. By making use of this auxiliary  
data structure, we compare the key\-value pairs of the trees in a  
left\-to\-right order.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn AuxTree k v =
  | Cont {key : k, value : v, r : AVL k v, next : AuxTree k v}
  | End ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="avlSize" kind="sem">

```mc
sem avlSize : all k. all v. AVLTreeImpl_AVL k v -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlSize =
  | Leaf _ -> 0
  | Node {l = l, r = r} -> addi (addi (avlSize l) (avlSize r)) 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlHeight" kind="sem">

```mc
sem avlHeight : all k. all v. AVLTreeImpl_AVL k v -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlHeight =
  | Leaf _ -> 0
  | Node {h = h} -> h
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlEmpty" kind="sem">

```mc
sem avlEmpty : all k. all v. () -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlEmpty =
  | () -> Leaf ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlIsEmpty" kind="sem">

```mc
sem avlIsEmpty : all k. all v. AVLTreeImpl_AVL k v -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlIsEmpty =
  | Leaf _ -> true
  | Node _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlCreate" kind="sem">

```mc
sem avlCreate : all k. all v. k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlCreate k v l =
  | r ->
    let lh = avlHeight l in
    let rh = avlHeight r in
    let h = addi (if geqi lh rh then lh else rh) 1 in
    Node {key = k, value = v, l = l, r = r, h = h}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlRotateLeft" kind="sem">

```mc
sem avlRotateLeft : all k. all v. k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`NOTE\(larshum, 2023\-03\-04\): The four rotation functions used for the AVL  
tree are defined below. These take the components of the tree, rather than  
a complete tree, as this avoids an extra allocation. Therefore, in two of  
the rotation functions, we reverse the argument order of the left and  
right subtrees to allow pattern matching on the subtree of interest.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlRotateLeft k v l =
  | Node (rt & {l = rl, r = rr}) ->
    avlCreate rt.key rt.value (avlCreate k v l rl) rr
  | Leaf _ -> error "avlRotateLeft: empty tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlRotateRightLeft" kind="sem">

```mc
sem avlRotateRightLeft : all k. all v. k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlRotateRightLeft k v l =
  | Node (rt & {l = Node rlt, r = rr}) ->
    avlCreate rlt.key rlt.value
      (avlCreate k v l rlt.l)
      (avlCreate rt.key rt.value rlt.r rr)
  | Node _ -> error "avlRotateRightLeft: invalid shape of tree"
  | Leaf _ -> error "avlRotateRightLeft: empty tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlRotateRight" kind="sem">

```mc
sem avlRotateRight : all k. all v. k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlRotateRight k v r =
  | Node (lt & {l = ll, r = lr}) ->
    avlCreate lt.key lt.value ll (avlCreate k v lr r)
  | Leaf _ -> error "avlRotateRight: empty tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlRotateLeftRight" kind="sem">

```mc
sem avlRotateLeftRight : all k. all v. k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlRotateLeftRight k v r =
  | Node (lt & {l = ll, r = Node lrt}) ->
    avlCreate lrt.key lrt.value
      (avlCreate lt.key lt.value ll lrt.l)
      (avlCreate k v lrt.r r)
  | Node _ -> error "avlRotateLeftRight: invalid shape of tree"
  | Leaf _ -> error "avlRotateLeftRight: empty tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlJoin" kind="sem">

```mc
sem avlJoin : all k. all v. k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`NOTE\(larshum, 2023\-03\-04\): Joins two AVL trees where the provided key is  
greater than all keys in the left subtree and less than all keys in the  
right subtree. The resulting tree is balanced according to the balancing  
criteria of AVL trees.  
  
We reverse the argument order \(in avlJoinRight\) to simplify pattern  
matching.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlJoin k v l =
  | r ->
    let lh = avlHeight l in
    let rh = avlHeight r in
    if gti lh (addi rh 1) then avlJoinRight k v r l
    else if gti rh (addi lh 1) then avlJoinLeft k v l r
    else avlCreate k v l r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlJoinLeft" kind="sem">

```mc
sem avlJoinLeft : all k. all v. k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlJoinLeft k v l =
  | Node tr ->
    if leqi (avlHeight tr.l) (addi (avlHeight l) 1) then
      let t = avlCreate k v l tr.l in
      if leqi (avlHeight t) (addi (avlHeight tr.r) 1) then
        avlCreate tr.key tr.value t tr.r
      else
        avlRotateRight tr.key tr.value tr.r (avlRotateLeft k v l tr.l)
    else
      let tx = avlJoinLeft k v l tr.l in
      if leqi (avlHeight tx) (addi (avlHeight tr.r) 1) then
        avlCreate tr.key tr.value tx tr.r
      else
        avlRotateRight tr.key tr.value tr.r tx
  | Leaf _ ->  error "avlJoinLeft: empty tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlJoinRight" kind="sem">

```mc
sem avlJoinRight : all k. all v. k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlJoinRight k v r =
  | Node tl ->
    if leqi (avlHeight tl.r) (addi (avlHeight r) 1) then
      let t = avlCreate k v tl.r r in
      if leqi (avlHeight t) (addi (avlHeight tl.l) 1) then
        avlCreate tl.key tl.value tl.l t
      else
        avlRotateLeft tl.key tl.value tl.l (avlRotateRight k v r tl.r)
    else
      let tx = avlJoinRight k v r tl.r in
      if leqi (avlHeight tx) (addi (avlHeight tl.l) 1) then
        avlCreate tl.key tl.value tl.l tx
      else
        avlRotateLeft tl.key tl.value tl.l tx
  | Leaf _ -> error "avlJoinRight: empty tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlSplit" kind="sem">

```mc
sem avlSplit : all k. all v. (k -> k -> Int) -> k -> AVLTreeImpl_AVL k v -> (AVLTreeImpl_AVL k v, Option v, AVLTreeImpl_AVL k v)
```

<Description>{`NOTE\(larshum, 2023\-03\-04\): Splits an AVL into two parts based on a  
provided key. Returns two trees consisting of all keys less than and  
greater than the provided key respectively. If the provided tree contains  
an entry for the given key, it also returns the value associated with that  
key.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlSplit cmp k =
  | Leaf _ -> (Leaf (), None (), Leaf ())
  | Node t ->
    let d = cmp k t.key in
    if lti d 0 then
      match avlSplit cmp k t.l with (ll, v, lr) in
      (ll, v, avlJoin t.key t.value lr t.r)
    else if gti d 0 then
      match avlSplit cmp k t.r with (rl, v, rr) in
      (avlJoin t.key t.value t.l rl, v, rr)
    else
      (t.l, Some t.value, t.r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlJoin2" kind="sem">

```mc
sem avlJoin2 : all k. all v. AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`NOTE\(larshum, 2023\-03\-04\): Joins two subtrees where all keys in the left  
subtree are less than those in the right subtree, without a provided key  
and value. We split out the minimum element of the right subtree and use  
that key\-value pair in the standard join function.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlJoin2 l =
  | r ->
    switch (l, r)
    case (_, Leaf _) then l
    case (Leaf _, _) then r
    case _ then
      match avlSplitFirst r with (rk, rv, r) in
      avlJoin rk rv l r
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlSplitFirst" kind="sem">

```mc
sem avlSplitFirst : all k. all v. AVLTreeImpl_AVL k v -> (k, v, AVLTreeImpl_AVL k v)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlSplitFirst =
  | Node (t & {l = Leaf _}) -> (t.key, t.value, t.r)
  | Node t ->
    match avlSplitFirst t.l with (k, v, l) in
    let hd = subi (avlHeight l) (avlHeight t.r) in
    if lti hd (negi 1) then (k, v, avlBalanceRight t.key t.value l t.r)
    else (k, v, avlCreate t.key t.value l t.r)
  | Leaf _ -> error "avlSplitLast: empty tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlBalanceRight" kind="sem">

```mc
sem avlBalanceRight : all k. all v. k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlBalanceRight k v l =
  | r & (Node rt) ->
    if geqi (avlHeight rt.r) (avlHeight rt.l) then avlRotateLeft k v l r
    else avlRotateRightLeft k v l r
  | Leaf _ -> error "avlBalanceRight: empty tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlInsert" kind="sem">

```mc
sem avlInsert : all k. all v. (k -> k -> Int) -> k -> v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`NOTE\(larshum, 2023\-03\-04\): We use a join\-based implementation, where the  
insertion and deletion operations are defined in terms of the join  
function above.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlInsert cmp k v =
  | Leaf _ ->
    Node {key = k, value = v, l = Leaf (), r = Leaf (), h = 1}
  | Node t ->
    let d = cmp k t.key in
    if lti d 0 then avlJoin t.key t.value (avlInsert cmp k v t.l) t.r
    else if gti d 0 then avlJoin t.key t.value t.l (avlInsert cmp k v t.r)
    else Node {t with value = v}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlRemove" kind="sem">

```mc
sem avlRemove : all k. all v. (k -> k -> Int) -> k -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlRemove cmp k =
  | Leaf _ ->
    Leaf ()
  | Node t ->
    let d = cmp k t.key in
    if lti d 0 then avlJoin t.key t.value (avlRemove cmp k t.l) t.r
    else if gti d 0 then avlJoin t.key t.value t.l (avlRemove cmp k t.r)
    else avlJoin2 t.l t.r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlLookup" kind="sem">

```mc
sem avlLookup : all k. all v. (k -> k -> Int) -> k -> AVLTreeImpl_AVL k v -> Option v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlLookup cmp k =
  | Leaf _ ->
    None ()
  | Node t ->
    let d = cmp k t.key in
    if lti d 0 then avlLookup cmp k t.l
    else if gti d 0 then avlLookup cmp k t.r
    else Some t.value
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlFindUpper" kind="sem">

```mc
sem avlFindUpper : all k. all v. (k -> k -> Int) -> k -> AVLTreeImpl_AVL k v -> Option (k, v)
```

<Description>{`\`avlFindUpper cmp k t\` returns \(k', v\) in the tree \`t\`, where k' is the  
minimum key in the tree and k≤k', according to \`cmp\`. Returns \`None \(\)\` if  
no such key k' exists in the tree.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlFindUpper cmp k =
  | Node t ->
    let d = cmp k t.key in
    if gti d 0 then avlFindUpper cmp k t.r
    else
      switch avlFindUpper cmp k t.l
        case None _ then Some (t.key, t.value)
        case value then value
      end
  | Leaf _ -> None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlFindLower" kind="sem">

```mc
sem avlFindLower : all k. all v. (k -> k -> Int) -> k -> AVLTreeImpl_AVL k v -> Option (k, v)
```

<Description>{`\`avlFindLower cmp k t\` returns \(k', v\) in the tree \`t\`, where k' is the  
maximum key in the tree and k≥k', according to \`cmp\`. Returns \`None \(\)\` if  
no such key k' exists in the tree.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlFindLower cmp k =
  | Node t ->
    let d = cmp k t.key in
    if lti d 0 then avlFindLower cmp k t.l
    else
      switch avlFindLower cmp k t.r
        case None _ then Some (t.key, t.value)
        case value then value
      end
  | Leaf _ -> None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlChoose" kind="sem">

```mc
sem avlChoose : all k. all v. AVLTreeImpl_AVL k v -> Option (k, v)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlChoose =
  | Leaf _ -> None ()
  | Node t -> Some (t.key, t.value)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlMap" kind="sem">

```mc
sem avlMap : all k. all a. all b. (k -> a -> b) -> AVLTreeImpl_AVL k a -> AVLTreeImpl_AVL k b
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlMap f =
  | Leaf _ ->
    Leaf ()
  | Node t ->
    Node { key = t.key, value = f t.key t.value,
           l = avlMap f t.l, r = avlMap f t.r, h = t.h }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlFold" kind="sem">

```mc
sem avlFold : all a. all k. all v. (a -> k -> v -> a) -> a -> AVLTreeImpl_AVL k v -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlFold f acc =
  | Leaf _ ->
    acc
  | Node t ->
    let acc = avlFold f acc t.l in
    let acc = f acc t.key t.value in
    avlFold f acc t.r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlToSeq" kind="sem">

```mc
sem avlToSeq : all k. all v. [(k, v)] -> AVLTreeImpl_AVL k v -> [(k, v)]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlToSeq acc =
  | Leaf _ ->
    acc
  | Node t ->
    let acc = avlToSeq acc t.r in
    let acc = cons (t.key, t.value) acc in
    avlToSeq acc t.l
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlFromSeq" kind="sem">

```mc
sem avlFromSeq : all k. all v. (k -> k -> Int) -> [(k, v)] -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlFromSeq cmp =
  | [] ->
    Leaf ()
  | [(k, v)] ->
    Node {key = k, value = v, l = Leaf (), r = Leaf (), h = 1}
  | s ->
    let mid = divi (length s) 2 in
    match splitAt s mid with (lhs, rhs) in
    let l = avlFromSeq cmp lhs in
    let r = avlFromSeq cmp rhs in
    avlUnionWith cmp (lam. lam rv. rv) l r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlToAux" kind="sem">

```mc
sem avlToAux : all k. all v. AVLTreeImpl_AuxTree k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AuxTree k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlToAux acc =
  | Node t ->
    avlToAux (Cont {key = t.key, value = t.value, r = t.r, next = acc}) t.l
  | Leaf _ ->
    acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlEq" kind="sem">

```mc
sem avlEq : all k. all v. (k -> k -> Int) -> (v -> v -> Bool) -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlEq cmpk eqv l =
  | r -> avlEqH cmpk eqv (avlToAux (End ()) l, avlToAux (End ()) r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlEqH" kind="sem">

```mc
sem avlEqH : all k. all v. (k -> k -> Int) -> (v -> v -> Bool) -> (AVLTreeImpl_AuxTree k v, AVLTreeImpl_AuxTree k v) -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlEqH cmpk eqv =
  | (End _, End _) -> true
  | (End _, Cont _) -> false
  | (Cont _, End _) -> false
  | (Cont l, Cont r) ->
    if eqi (cmpk l.key r.key) 0 then
      if eqv l.value r.value then
        avlEqH cmpk eqv (avlToAux l.next l.r, avlToAux r.next r.r)
      else false
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlCmp" kind="sem">

```mc
sem avlCmp : all k. all v. (k -> k -> Int) -> (v -> v -> Int) -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlCmp cmpk cmpv l =
  | r -> avlCmpH cmpk cmpv (avlToAux (End ()) l, avlToAux (End ()) r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlCmpH" kind="sem">

```mc
sem avlCmpH : all k. all v. (k -> k -> Int) -> (v -> v -> Int) -> (AVLTreeImpl_AuxTree k v, AVLTreeImpl_AuxTree k v) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlCmpH cmpk cmpv =
  | (End _, End _) -> 0
  | (End _, Cont _) -> negi 1
  | (Cont _, End _) -> 1
  | (Cont l, Cont r) ->
    let dk = cmpk l.key r.key in
    if neqi dk 0 then dk else
    let dv = cmpv l.value r.value in
    if neqi dv 0 then dv else
    avlCmpH cmpk cmpv (avlToAux l.next l.r, avlToAux r.next r.r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlMerge" kind="sem">

```mc
sem avlMerge : all k. all a. all b. all c. (k -> k -> Int) -> (Option a -> Option b -> Option c) -> AVLTreeImpl_AVL k a -> AVLTreeImpl_AVL k b -> AVLTreeImpl_AVL k c
```

<Description>{`NOTE\(larshum, 2023\-03\-04\): Efficient operations for general merging of  
maps, as well as specialized versions for union, intersection, and  
difference.  
OPT\(larshum, 2023\-03\-04\): Many of the functions below are trivially  
parallelizable, but such functions cannot be used from the boot  
interpreter so they are left sequential for now.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlMerge cmp f l = | r -> avlMergeWithKey cmp (lam. f) l r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlMergeWithKey" kind="sem">

```mc
sem avlMergeWithKey : all k. all a. all b. all c. (k -> k -> Int) -> (k -> Option a -> Option b -> Option c) -> AVLTreeImpl_AVL k a -> AVLTreeImpl_AVL k b -> AVLTreeImpl_AVL k c
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlMergeWithKey cmp f l =
  | r ->
    match (l, r) with (Leaf _, Leaf _) then Leaf ()
    else if geqi (avlHeight l) (avlHeight r) then
      match l with Node lt then
        match avlSplit cmp lt.key r with (rl, rv, rr) in
        let lhs = avlMergeWithKey cmp f lt.l rl in
        let rhs = avlMergeWithKey cmp f lt.r rr in
        match f lt.key (Some lt.value) rv with Some v then avlJoin lt.key v lhs rhs
        else avlJoin2 lhs rhs
      else error "avlMergeWithKey: empty left tree"
    else
      match r with Node rt then
        match avlSplit cmp rt.key l with (ll, lv, lr) in
        let lhs = avlMergeWithKey cmp f ll rt.l in
        let rhs = avlMergeWithKey cmp f lr rt.r in
        match f rt.key lv (Some rt.value) with Some v then avlJoin rt.key v lhs rhs
        else avlJoin2 lhs rhs
      else error "avlMergeWithKey: empty right tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlUnionWith" kind="sem">

```mc
sem avlUnionWith : all k. all v. (k -> k -> Int) -> (v -> v -> v) -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlUnionWith cmp f l =
  | r ->
    match l with Leaf _ then r
    else match r with Leaf _ then l
    else if geqi (avlHeight l) (avlHeight r) then
      match l with Node lt then
        match avlSplit cmp lt.key r with (rl, rv, rr) in
        let lhs = avlUnionWith cmp f lt.l rl in
        let rhs = avlUnionWith cmp f lt.r rr in
        let value = match rv with Some x then f lt.value x else lt.value in
        avlJoin lt.key value lhs rhs
      else error "avlUnionWith: empty left tree"
    else
      match r with Node rt then
        match avlSplit cmp rt.key l with (ll, lv, lr) in
        let lhs = avlUnionWith cmp f ll rt.l in
        let rhs = avlUnionWith cmp f lr rt.r in
        let value = match lv with Some x then f x rt.value else rt.value in
        avlJoin rt.key value lhs rhs
      else error "avlUnionWith: empty right tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlIntersectWith" kind="sem">

```mc
sem avlIntersectWith : all k. all a. all b. all c. (k -> k -> Int) -> (a -> b -> c) -> AVLTreeImpl_AVL k a -> AVLTreeImpl_AVL k b -> AVLTreeImpl_AVL k c
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlIntersectWith cmp f l =
  | r ->
    avlIntersectWithKey cmp (lam k. f) l r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlIntersectWithKey" kind="sem">

```mc
sem avlIntersectWithKey : all k. all a. all b. all c. (k -> k -> Int) -> (k -> a -> b -> c) -> AVLTreeImpl_AVL k a -> AVLTreeImpl_AVL k b -> AVLTreeImpl_AVL k c
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlIntersectWithKey cmp f l =
  | r ->
    match l with Leaf _ then Leaf ()
    else match r with Leaf _ then Leaf ()
    else if geqi (avlHeight l) (avlHeight r) then
      match l with Node lt then
        match avlSplit cmp lt.key r with (rl, rv, rr) in
        let lhs = avlIntersectWithKey cmp f lt.l rl in
        let rhs = avlIntersectWithKey cmp f lt.r rr in
        match rv with Some x then
          avlJoin lt.key (f lt.key lt.value x) lhs rhs
        else
          avlJoin2 lhs rhs
      else error "avlIntersectWithKey: empty left tree"
    else
      match r with Node rt then
        match avlSplit cmp rt.key l with (ll, lv, lr) in
        let lhs = avlIntersectWithKey cmp f ll rt.l in
        let rhs = avlIntersectWithKey cmp f lr rt.r in
        match lv with Some x then
          avlJoin rt.key (f rt.key x rt.value) lhs rhs
        else
          avlJoin2 lhs rhs
      else error "avlIntersectWithKey: empty right tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlDifference" kind="sem">

```mc
sem avlDifference : all k. all a. all b. (k -> k -> Int) -> AVLTreeImpl_AVL k a -> AVLTreeImpl_AVL k b -> AVLTreeImpl_AVL k a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlDifference cmp l =
  | r ->
    match l with Leaf _ then Leaf ()
    else match r with Leaf _ then l
    else
      match l with Node lt then
        match avlSplit cmp lt.key r with (rl, rv, rr) in
        let lhs = avlDifference cmp lt.l rl in
        let rhs = avlDifference cmp lt.r rr in
        match rv with Some x then
          avlJoin2 lhs rhs
        else
          avlJoin lt.key lt.value lhs rhs
      else error "avlDifference: empty left tree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlMapOption" kind="sem">

```mc
sem avlMapOption : all k. all a. all b. (k -> a -> Option b) -> AVLTreeImpl_AVL k a -> AVLTreeImpl_AVL k b
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlMapOption f =
  | Node t ->
    let lhs = avlMapOption f t.l in
    let rhs = avlMapOption f t.r in
    match f t.key t.value with Some value then avlJoin t.key value lhs rhs
    else avlJoin2 lhs rhs
  | Leaf _ ->
    Leaf ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlFilter" kind="sem">

```mc
sem avlFilter : all k. all v. (k -> v -> Bool) -> AVLTreeImpl_AVL k v -> AVLTreeImpl_AVL k v
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlFilter p =
  | Node t ->
    let lhs = avlFilter p t.l in
    let rhs = avlFilter p t.r in
    if p t.key t.value then avlJoin t.key t.value lhs rhs
    else avlJoin2 lhs rhs
  | Leaf _ ->
    Leaf ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlValidate" kind="sem">

```mc
sem avlValidate : all k. all v. (k -> k -> Int) -> AVLTreeImpl_AVL k v -> Bool
```

<Description>{`NOTE\(larshum, 2023\-03\-05\): Validates the provided AVL tree by:  
1. For each node in the tree, ensuring that the height of its left and  
   right subtrees differ by at most one.  
2. Ensuring that the keys are in sorted order.  
  
The function returns true if the AVL tree is found to be valid, and false  
otherwise.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlValidate cmp =
  | t ->
    if avlValidateHeight t then
      let keys = avlFold (lam acc. lam k. lam. snoc acc k) [] t in
      eqSeq (lam l. lam r. eqi (cmp l r) 0) keys (sort cmp keys)
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="avlValidateHeight" kind="sem">

```mc
sem avlValidateHeight : all k. all v. AVLTreeImpl_AVL k v -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem avlValidateHeight =
  | Node t ->
    let lh = avlHeight t.l in
    let rh = avlHeight t.r in
    if or (gti lh (addi rh 1)) (gti rh (addi lh 1)) then false
    else and (avlValidateHeight t.l) (avlValidateHeight t.r)
  | Leaf _ ->
    true
```
</ToggleWrapper>
</DocBlock>

