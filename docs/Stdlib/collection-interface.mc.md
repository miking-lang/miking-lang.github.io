import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# collection-interface.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/basic-types.mc"} style={S.link}>basic-types.mc</a>  
  
## Types  
  

          <DocBlock title="UColl" kind="type">

```mc
type UColl
```



<ToggleWrapper text="Code..">
```mc
type UColl p x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Repr" kind="type">

```mc
type Repr
```



<ToggleWrapper text="Code..">
```mc
type Repr x -- TODO(vipa, 2023-12-06): Remove when reprs are added for real
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Coll" kind="type">

```mc
type Coll
```

<Description>{`TODO\(vipa, 2023\-12\-06\): Remove when reprs are added for real`}</Description>


<ToggleWrapper text="Code..">
```mc
type Coll p x = Repr (UColl p x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KeepAll" kind="type">

```mc
type KeepAll
```

<Description>{`KeepAll indicates to keep all values in the insertion history.  
Seen as a filtering function, this is the identity.`}</Description>


<ToggleWrapper text="Code..">
```mc
type KeepAll
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KeepLast" kind="type">

```mc
type KeepLast
```

<Description>{`KeepLast indicates to only keep the last occurrence of duplicate  
values.`}</Description>


<ToggleWrapper text="Code..">
```mc
type KeepLast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KeepLastKey" kind="type">

```mc
type KeepLastKey
```

<Description>{`KeepLastKey applies to collections of key\-value pairs \`\(k, v\)\`, and  
indicates to only keep the last occurrence whenever two pairs have  
the same keys.`}</Description>


<ToggleWrapper text="Code..">
```mc
type KeepLastKey
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqOrder" kind="type">

```mc
type SeqOrder
```

<Description>{`SeqOrder arranges the values in the order they were originally  
inserted. Seen as a permutation, this is the identity.`}</Description>


<ToggleWrapper text="Code..">
```mc
type SeqOrder
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SortedOrder" kind="type">

```mc
type SortedOrder
```

<Description>{`SortedOrder arranges the values in sorted order.`}</Description>


<ToggleWrapper text="Code..">
```mc
type SortedOrder
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SortedKeyOrder" kind="type">

```mc
type SortedKeyOrder
```

<Description>{`SortedKeyOrder applies to collections of key\-value pairs \`\(k, v\)\`,  
and arranges them in order sortedy by the keys.`}</Description>


<ToggleWrapper text="Code..">
```mc
type SortedKeyOrder
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Phantom" kind="type">

```mc
type Phantom
```



<ToggleWrapper text="Code..">
```mc
type Phantom a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Seq" kind="type">

```mc
type Seq
```



<ToggleWrapper text="Code..">
```mc
type Seq a = Coll (KeepAll, SeqOrder) a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OrderedSet" kind="type">

```mc
type OrderedSet
```

<Description>{`type Set a = Coll \(KeepLast, \_\) a  \-\- TODO\(vipa, 2023\-12\-06\): Uncomment when reprs are supported`}</Description>


<ToggleWrapper text="Code..">
```mc
type OrderedSet a = Coll (KeepLast, SortedOrder) a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OrderedMap" kind="type">

```mc
type OrderedMap
```

<Description>{`type Map k v = Coll \(KeepLastKey, \_\) \(k, v\)  \-\- TODO\(vipa, 2023\-12\-06\): Uncomment when reprs are supported`}</Description>


<ToggleWrapper text="Code..">
```mc
type OrderedMap k v = Coll (KeepLastKey, SortedKeyOrder) (k, v)
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="Phantom" kind="con">

```mc
con Phantom : all a . () -> Phantom a
```



<ToggleWrapper text="Code..">
```mc
con Phantom : all a. () -> Phantom a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="orderSem" kind="let">

```mc
let orderSem  : all o. all a. Phantom o -> [a] -> [Int]
```



<ToggleWrapper text="Code..">
```mc
let orderSem : all o. all a. Phantom o -> [a] -> [Int] = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="selectSem" kind="let">

```mc
let selectSem  : all s. all a. Phantom s -> [a] -> a -> [a] -> Bool
```



<ToggleWrapper text="Code..">
```mc
let selectSem : all s. all a. Phantom s -> [a] -> a -> [a] -> Bool = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="empty" kind="let">

```mc
let empty  : all p. all a. Coll p a
```

<Description>{`\`empty\` denotes an empty collection with any properties.`}</Description>


<ToggleWrapper text="Code..">
```mc
let empty : all p. all a. Coll p a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="append_op" kind="let">

```mc
let append_op  : all p1. all p2. all a. Coll p1 a -> a -> Coll p2 a
```

<Description>{`\`append\_op c a\` appends \`a\` to the elements of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let append_op
  : all p1. all p2. all a
  .  Coll p1 a
  -> a
  -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="append" kind="let">

```mc
let append  : all p. all a. Coll p a -> a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let append : all p. all a. Coll p a -> a -> Coll p a = append_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prepend_op" kind="let">

```mc
let prepend_op  : all p1. all p2. all a. a -> Coll p1 a -> Coll p2 a
```

<Description>{`\`prepend\_op a c\` prepends \`a\` to the elements of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let prepend_op
  : all p1. all p2. all a
  .  a
  -> Coll p1 a
  -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prepend" kind="let">

```mc
let prepend  : all p. all a. a -> Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let prepend : all p. all a. a -> Coll p a -> Coll p a = prepend_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldl" kind="let">

```mc
let foldl  : all p. all a. all acc. (acc -> a -> acc) -> acc -> Coll p a -> acc
```

<Description>{`\`foldl f acc c\` gives \`f \(... \(f \(f acc x0\) x1\) ...\) xn\`, where  
\`x0, x1, ..., xn\` are the elements of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let foldl
  : all p. all a. all acc
  . (acc -> a -> acc)
  -> acc
  -> Coll p a
  -> acc
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldr" kind="let">

```mc
let foldr  : all p. all a. all acc. (a -> acc -> acc) -> acc -> Coll p a -> acc
```

<Description>{`\`foldr f acc c\` gives \`f x0 \(... \(f xn\-1 \(f xn acc\)\) ...\)\`, where  
\`x0, x1, ..., xn\` are the elements of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let foldr
  : all p. all a. all acc
  . (a -> acc -> acc)
  -> acc
  -> Coll p a
  -> acc
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collFromSeq" kind="let">

```mc
let collFromSeq  : all p. all a. [a] -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let collFromSeq
  : all p. all a
  . [a]
  -> Coll p a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="q" kind="let">

```mc
let q  : all p. all a. [a] -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let q
  : all p. all a
  . [a]
  -> Coll p a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="seqFromColl" kind="let">

```mc
let seqFromColl  : all p. all a. Coll p a -> [a]
```



<ToggleWrapper text="Code..">
```mc
let seqFromColl
  : all p. all a
  . Coll p a
  -> [a]
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="view" kind="let">

```mc
let view  : all p1. all p2. all a. Coll p1 a -> Coll p2 a
```

<Description>{`\`view c\` creates a new collection from the elements of \`c\`, with  
any properties.  If \`p1 = p2\`, then we should have \`view c = c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let view
  : all p1. all p2. all a
  .  Coll p1 a
  -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="singleton" kind="let">

```mc
let singleton  : all p. all a. a -> Coll p a
```

<Description>{`\`singleton a\` is a singleton collection with element \`a\`, with any properties.`}</Description>


<ToggleWrapper text="Code..">
```mc
let singleton : all p. all a. a -> Coll p a = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="concat_op" kind="let">

```mc
let concat_op  : all p1. all p2. all p3. all a. Coll p1 a -> Coll p2 a -> Coll p3 a
```

<Description>{`\`concat\_op c1 c2\` creates a new collection whose elements are are  
the elements of \`c1\` followed by the elements of \`c2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let concat_op
  : all p1. all p2. all p3. all a
  .  Coll p1 a
  -> Coll p2 a
  -> Coll p3 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="concat" kind="let">

```mc
let concat  : all p. all a. Coll p a -> Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let concat
  : all p. all a
  .  Coll p a
  -> Coll p a
  -> Coll p a
  = concat_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="into" kind="let">

```mc
let into  : all p1. all p2. all a. Coll p1 a -> Coll p2 a -> Coll p1 a
```



<ToggleWrapper text="Code..">
```mc
let into
  : all p1. all p2. all a
  .  Coll p1 a
  -> Coll p2 a
  -> Coll p1 a
  = concat_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldl1" kind="let">

```mc
let foldl1  : all p. all a. (a -> a -> a) -> Coll p a -> a
```

<Description>{`\`foldl1 f c\` behaves as \`foldl f \(first c\) \(tail c\)\`.  
WARNING: Errors on empty input.`}</Description>


<ToggleWrapper text="Code..">
```mc
let foldl1
  : all p. all a
  . (a -> a -> a)
  -> Coll p a
  -> a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldr1" kind="let">

```mc
let foldr1  : all p. all a. (a -> a -> a) -> Coll p a -> a
```

<Description>{`\`foldr1 f c\` behaves as \`foldr f \(last c\) \(init c\)\`.  
WARNING: Errors on empty input.`}</Description>


<ToggleWrapper text="Code..">
```mc
let foldr1
  : all p. all a
  . (a -> a -> a)
  -> Coll p a
  -> a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unfoldl" kind="let">

```mc
let unfoldl  : all p. all a. all b. (a -> Option (b, a)) -> a -> Coll p b
```

<Description>{`\`unfoldl f a0\` gives a collection with elements \`xn, x\(n\-1\), ..., x0\`, where  
\`f ai = Some \(xi, a\(i\+1\)\)\` for all \`i\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let unfoldl : all p. all a. all b
  . (a -> Option (b, a))
  -> a
  -> Coll p b
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unfoldr" kind="let">

```mc
let unfoldr  : all p. all a. all b. (a -> Option (b, a)) -> a -> Coll p b
```

<Description>{`\`unfoldr f a0\` gives a collection with elements \`x0, x1, ..., xn\`, where  
\`f ai = Some \(xi, a\(i\+1\)\)\` for all \`i\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let unfoldr : all p. all a. all b
  . (a -> Option (b, a))
  -> a
  -> Coll p b
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldl2_op" kind="let">

```mc
let foldl2_op  : all p1. all p2. all a. all b. all c. (a -> b -> c -> a) -> a -> Coll p1 b -> Coll p2 c -> a
```

<Description>{`\`foldl2\_op f acc c1 c2\` left folds \`f\` over the first \`k\` elements in \`c1\` and  
\`c2\`, accumulating on \`acc\`, where \`k\` is the minimum of the two collections'  
sizes.`}</Description>


<ToggleWrapper text="Code..">
```mc
let foldl2_op
  : all p1. all p2. all a. all b. all c
  . (a -> b -> c -> a)
  -> a
  -> Coll p1 b
  -> Coll p2 c
  -> a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldl2" kind="let">

```mc
let foldl2  : all p. all a. all b. all c. (a -> b -> c -> a) -> a -> Coll p b -> Coll p c -> a
```



<ToggleWrapper text="Code..">
```mc
let foldl2
  : all p. all a. all b. all c
  . (a -> b -> c -> a)
  -> a
  -> Coll p b
  -> Coll p c
  -> a
  = foldl2_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_op" kind="let">

```mc
let map_op  : all p1. all p2. all a. all b. (a -> b) -> Coll p1 a -> Coll p2 b
```

<Description>{`\`map\_op f c\` creates a new collection with elements  
\`f x0, f x1, ..., f xn\`, where \`x0, x1, ..., xn\` are the elements  
of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let map_op
  : all p1. all p2. all a. all b
  . (a -> b)
  -> Coll p1 a
  -> Coll p2 b
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map" kind="let">

```mc
let map  : all p. all a. all b. (a -> b) -> Coll p a -> Coll p b
```



<ToggleWrapper text="Code..">
```mc
let map
  : all p. all a. all b
  . (a -> b)
  -> Coll p a
  -> Coll p b
  = map_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map2_op" kind="let">

```mc
let map2_op  : all p1. all p2. all p3. all a. all b. all c. (a -> b -> c) -> Coll p1 a -> Coll p2 b -> Coll p3 c
```

<Description>{`\`map2\_op f c1 c2\` gives a new collection with elements  
\`f x0 y0, f x1 y1, ..., f xk yk\`, where k = min\(m, n\),  
\`x0, x1, ..., xn\` are the elements of \`c1\`, and \`y0, y1, ... ym\`  
are the elements of \`c2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let map2_op
  : all p1. all p2. all p3. all a. all b. all c
  . (a -> b -> c)
  -> Coll p1 a
  -> Coll p2 b
  -> Coll p3 c
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map2_nondet_op" kind="let">

```mc
let map2_nondet_op  : all p1. all p2. all p3. all a. all b. all c. (a -> b -> c) -> Coll p1 a -> Coll p2 b -> Coll p3 c
```

<Description>{`\`map2\_nondet\_op f c1 c2\` gives a new collection with elements \`f xi yj\` for  
all j \<= m, i \<= n, where \`x0, x1, ..., xn\` are the elements of \`c1\`, and  
\`y0, y1, ... ym\` are the elements of \`c2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let map2_nondet_op
  : all p1. all p2. all p3. all a. all b. all c
  . (a -> b -> c)
  -> Coll p1 a
  -> Coll p2 b
  -> Coll p3 c
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map2_nondet" kind="let">

```mc
let map2_nondet  : all p. all a. all b. all c. (a -> b -> c) -> Coll p a -> Coll p b -> Coll p c
```



<ToggleWrapper text="Code..">
```mc
let map2_nondet
  : all p. all a. all b. all c
  . (a -> b -> c)
  -> Coll p a
  -> Coll p b
  -> Coll p c
  = map2_nondet_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="concatMap_op" kind="let">

```mc
let concatMap_op  : all p1. all p2. all p3. all a. all b. (a -> Coll p2 b) -> Coll p1 a -> Coll p3 b
```

<Description>{`\`concatMap\_op f c\` constructs a new collection from the  
concatenation of the collections obtained by mapping \`f\` over \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let concatMap_op
  : all p1. all p2. all p3. all a. all b
  . (a -> Coll p2 b)
  -> Coll p1 a
  -> Coll p3 b
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="concatMap" kind="let">

```mc
let concatMap  : all p. all a. all b. (a -> Coll p b) -> Coll p a -> Coll p b
```



<ToggleWrapper text="Code..">
```mc
let concatMap
  : all p. all a. all b
  . (a -> Coll p b)
  -> Coll p a
  -> Coll p b
  = concatMap_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="join_op" kind="let">

```mc
let join_op  : all p1. all p2. all p3. all a. Coll p1 (Coll p2 a) -> Coll p3 a
```

<Description>{`\`join\_op c\` constructs a new collection from the concatenation of  
the collections contained in \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let join_op
  : all p1. all p2. all p3. all a
  .  Coll p1 (Coll p2 a)
  -> Coll p3 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="join" kind="let">

```mc
let join  : all p. all a. Coll p (Coll p a) -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let join
  : all p. all a
  .  Coll p (Coll p a)
  -> Coll p a
  = join_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapM_op" kind="let">

```mc
let mapM_op  : all p1. all p2. all p3. all p4. all a. all b. (a -> Coll p1 b) -> Coll p2 a -> Coll p3 (Coll p4 b)
```



<ToggleWrapper text="Code..">
```mc
let mapM_op
  : all p1. all p2. all p3. all p4. all a. all b
  . (a -> Coll p1 b)
  -> Coll p2 a
  -> Coll p3 (Coll p4 b)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapM" kind="let">

```mc
let mapM  : all p. all a. all b. (a -> Coll p b) -> Coll p a -> Coll p (Coll p b)
```



<ToggleWrapper text="Code..">
```mc
let mapM
  : all p. all a. all b
  . (a -> Coll p b)
  -> Coll p a
  -> Coll p (Coll p b)
  = mapM_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumL_op" kind="let">

```mc
let mapAccumL_op  : all p1. all p2. all a. all b. all c. (a -> b -> (a, c)) -> a -> Coll p1 b -> (a, Coll p2 c)
```

<Description>{`\`mapAccumL\_op f acc0 c\` maps a stateful function over a collection,  
returning the updated collection and the final state.  In other  
words, letting \`x0, x1, ..., xn\` be the elements of \`c\`, the result  
is a tuple \`\(accn, c'\)\`, where \`c'\` has elements \`y0, y1, ..., yn\`  
such that \`\(acc\(i\+1\), yi\) = f acci xi\` for all \`i\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapAccumL_op
  : all p1. all p2. all a. all b. all c
  . (a -> b -> (a, c))
  -> a
  -> Coll p1 b
  -> (a, Coll p2 c)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumL" kind="let">

```mc
let mapAccumL  : all p. all a. all b. all c. (a -> b -> (a, c)) -> a -> Coll p b -> (a, Coll p c)
```



<ToggleWrapper text="Code..">
```mc
let mapAccumL
  : all p. all a. all b. all c
  . (a -> b -> (a, c))
  -> a
  -> Coll p b
  -> (a, Coll p c)
  = mapAccumL_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumR_op" kind="let">

```mc
let mapAccumR_op  : all p1. all p2. all a. all b. all c. (a -> b -> (a, c)) -> a -> Coll p1 b -> (a, Coll p2 c)
```

<Description>{`\`mapAccumR\_op\` is analogous to \`mapAccumL\_op\`, but performs a right fold.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapAccumR_op
  : all p1. all p2. all a. all b. all c
  . (a -> b -> (a, c))
  -> a
  -> Coll p1 b
  -> (a, Coll p2 c)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumR" kind="let">

```mc
let mapAccumR  : all p. all a. all b. all c. (a -> b -> (a, c)) -> a -> Coll p b -> (a, Coll p c)
```



<ToggleWrapper text="Code..">
```mc
let mapAccumR
  : all p. all a. all b. all c
  . (a -> b -> (a, c))
  -> a
  -> Coll p b
  -> (a, Coll p c)
  = mapAccumR_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iter" kind="let">

```mc
let iter  : all p. all a. (a -> ()) -> Coll p a -> ()
```

<Description>{`\`iter f c\` calls \`f\` on each element of \`c\`, returning unit.`}</Description>


<ToggleWrapper text="Code..">
```mc
let iter
  : all p. all a
  . (a -> ())
  -> Coll p a
  -> ()
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iter2" kind="let">

```mc
let iter2  : all p1. all p2. all a. all b. (a -> b -> ()) -> Coll p1 a -> Coll p2 b -> ()
```

<Description>{`\`iter2 f c1 c2\` calls \`f xi yi\` on each pair of elements \`xi\` in \`c1\` and  
\`yi\` in \`c2\`, for all \`i\` less than the minimum of \`c1\` and \`c2\`'s sizes.`}</Description>


<ToggleWrapper text="Code..">
```mc
let iter2
  : all p1. all p2. all a. all b
  . (a -> b -> ())
  -> Coll p1 a
  -> Coll p2 b
  -> ()
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterMap_op" kind="let">

```mc
let filterMap_op  : all p1. all p2. all a. all b. (a -> Option b) -> Coll p1 a -> Coll p2 b
```

<Description>{`\`filterMap\_op f c\` constructs a new collection by mapping \`f\` over  
the elements of \`c\` and discarding \`None \(\)\`\-values.`}</Description>


<ToggleWrapper text="Code..">
```mc
let filterMap_op
  : all p1. all p2. all a. all b
  . (a -> Option b)
  -> Coll p1 a
  -> Coll p2 b
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterMap" kind="let">

```mc
let filterMap  : all p. all a. all b. (a -> Option b) -> Coll p a -> Coll p b
```



<ToggleWrapper text="Code..">
```mc
let filterMap
  : all p. all a. all b
  . (a -> Option b)
  -> Coll p a
  -> Coll p b
  = filterMap_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filter_op" kind="let">

```mc
let filter_op  : all p1. all p2. all a. (a -> Bool) -> Coll p1 a -> Coll p2 a
```

<Description>{`\`filter\_op f c\` constructs a new collection containing those  
elements of \`c\` for which \`f\` returns \`true\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let filter_op
  : all p1. all p2. all a
  . (a -> Bool)
  -> Coll p1 a
  -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filter" kind="let">

```mc
let filter  : all p. all a. (a -> Bool) -> Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let filter
  : all p. all a
  . (a -> Bool)
  -> Coll p a
  -> Coll p a
  = filter_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="any" kind="let">

```mc
let any  : all p. all a. (a -> Bool) -> Coll p a -> Bool
```

<Description>{`\`any f c\` returns \`true\` if \`f\` returns \`true\` for some element of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let any
  : all p. all a
  . (a -> Bool)
  -> Coll p a
  -> Bool
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="every" kind="let">

```mc
let every  : all p. all a. (a -> Bool) -> Coll p a -> Bool
```

<Description>{`\`every f c\` returns \`true\` if \`f\` returns \`true\` for every element of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let every
  : all p. all a
  . (a -> Bool)
  -> Coll p a
  -> Bool
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findMap" kind="let">

```mc
let findMap  : all p. all a. all b. (a -> Option b) -> Coll p a -> Option b
```

<Description>{`\`findMap f c\` returns \`Some y\` for the first element \`x\` of \`c\` such that  
\`f x = Some y\`, or returns \`None \(\)\` if there is no such \`x\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let findMap
  : all p. all a. all b
  . (a -> Option b)
  -> Coll p a
  -> Option b
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="find" kind="let">

```mc
let find  : all p. all a. (a -> Bool) -> Coll p a -> Option a
```

<Description>{`\`find f c\` returns \`Some x\` for the first element \`x\` of \`c\` such that  
\`f x = true\`, or returns \`None \(\)\` if there is no such \`x\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let find
  : all p. all a
  . (a -> Bool)
  -> Coll p a
  -> Option a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="member" kind="let">

```mc
let member  : all p. all a. a -> Coll p a -> Bool
```

<Description>{`\`member x c\` returns \`true\` iff \`x\` is an element of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let member
  : all p. all a
  .  a
  -> Coll p a
  -> Bool
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isSubset" kind="let">

```mc
let isSubset  : all p1. all p2. all a. Coll p1 a -> Coll p2 a -> Bool
```

<Description>{`\`isSubset c1 c2\` returns \`true\` iff every element of \`c1\` is an element of  
\`c2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let isSubset
  : all p1. all p2. all a
  .  Coll p1 a
  -> Coll p2 a
  -> Bool
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="partition_op" kind="let">

```mc
let partition_op  : all p1. all p2. all p3. all a. (a -> Bool) -> Coll p1 a -> (Coll p2 a, Coll p3 a)
```

<Description>{`\`partition\_op f c\` returns a tuple equivalent to  
\`\(filter f c, filter \(compose not f\) c\)\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let partition_op : all p1. all p2. all p3. all a
  . (a -> Bool)
  -> Coll p1 a
  -> (Coll p2 a, Coll p3 a)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="partition" kind="let">

```mc
let partition  : all p. all a. (a -> Bool) -> Coll p a -> (Coll p a, Coll p a)
```



<ToggleWrapper text="Code..">
```mc
let partition : all p. all a
  . (a -> Bool)
  -> Coll p a
  -> (Coll p a, Coll p a)
  = partition_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="distinct_op" kind="let">

```mc
let distinct_op  : all p1. all p2. all a. Coll p1 a -> Coll p2 a
```

<Description>{`\`distinct\_op c\` removes duplicates of \`c\`, with preserved ordering.  Keeps  
first occurrence of an element.`}</Description>


<ToggleWrapper text="Code..">
```mc
let distinct_op
  : all p1. all p2. all a
  .  Coll p1 a
  -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="distinct" kind="let">

```mc
let distinct  : all p. all a. Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let distinct
  : all p. all a
  .  Coll p a
  -> Coll p a
  = distinct_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="size" kind="let">

```mc
let size  : all p. all a. Coll p a -> Int
```

<Description>{`\`size c\` returns the number of elements of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let size : all p. all a. Coll p a -> Int
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="null" kind="let">

```mc
let null  : all p. all a. Coll p a -> Bool
```

<Description>{`\`null c\` returns \`true\` iff \`size c\` returns 0.`}</Description>


<ToggleWrapper text="Code..">
```mc
let null : all p. all a. Coll p a -> Bool
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqColl" kind="let">

```mc
let eqColl  : all p1. all p2. all a. all b. Coll p1 a -> Coll p2 b -> Bool
```

<Description>{`\`eqColl c1 c2\` returns true iff \`xi == yi\` and \`m == n\`, where  
\`x0, x1, ..., xn\` and \`y0, y1, ..., yn\` are the elements of \`c1\` and \`c2\`,  
respectively.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqColl
  : all p1. all p2. all a. all b
  .  Coll p1 a
  -> Coll p2 b
  -> Bool
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpColl" kind="let">

```mc
let cmpColl  : all p1. all p2. all a. Coll p1 a -> Coll p2 a -> Int
```

<Description>{`\`cmpColl c1 c2\` compares collections \`c1\` and \`c2\` by lexical ordering.`}</Description>


<ToggleWrapper text="Code..">
```mc
let cmpColl : all p1. all p2. all a
  .  Coll p1 a
  -> Coll p2 a
  -> Int
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reverse_op" kind="let">

```mc
let reverse_op  : all p1. all p2. all a. Coll p1 a -> Coll p2 a
```

<Description>{`\`reverse\_op c\` creates a collection from \`c\`'s elements in reverse order.`}</Description>


<ToggleWrapper text="Code..">
```mc
let reverse_op : all p1. all p2. all a. Coll p1 a -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reverse" kind="let">

```mc
let reverse  : all p. all a. Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let reverse : all p. all a. Coll p a -> Coll p a
  = reverse_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="splitAt_op" kind="let">

```mc
let splitAt_op  : all p1. all p2. all p3. all a. Coll p1 a -> Int -> (Coll p2 a, Coll p3 a)
```

<Description>{`\`splitAt\_op c i\` returns a tuple \`\(c1, c2\)\`, where \`c1\` has elements  
\`x0, ..., x\(i\-1\)\` and \`c2\` has elements \`xi, ..., xn\`, if  
\`x0, x1, ..., xn\` are the elements of \`c\`.  
WARNING: Errors on \`i\` less than 0 or greater than n.`}</Description>


<ToggleWrapper text="Code..">
```mc
let splitAt_op
  : all p1. all p2. all p3. all a
  .  Coll p1 a
  -> Int
  -> (Coll p2 a, Coll p3 a)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="splitAt" kind="let">

```mc
let splitAt  : all p. all a. Coll p a -> Int -> (Coll p a, Coll p a)
```



<ToggleWrapper text="Code..">
```mc
let splitAt
  : all p. all a
  .  Coll p a
  -> Int
  -> (Coll p a, Coll p a)
  = splitAt_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getAt" kind="let">

```mc
let getAt  : all p. all a. Coll p a -> Int -> a
```

<Description>{`\`getAt\_op c i\` returns \`xi\`, if \`x0, x1, ..., xn\` are the elements of \`c\`.  
WARNING: Errors on \`i\` less than 0 or greater than n.`}</Description>


<ToggleWrapper text="Code..">
```mc
let getAt
  : all p. all a
  .  Coll p a
  -> Int
  -> a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setAt_op" kind="let">

```mc
let setAt_op  : all p1. all p2. all a. Coll p1 a -> Int -> a -> Coll p2 a
```

<Description>{`\`setAt\_op c i a\` constructs a collection from \`c\`, with \`xi\` replaced by  
\`a\`, if \`x0, x1, ..., xn\` are the elements of \`c\`.  
WARNING: Errors on \`i\` less than 0 or greater than n\-1.`}</Description>


<ToggleWrapper text="Code..">
```mc
let setAt_op
  : all p1. all p2. all a
  .  Coll p1 a
  -> Int
  -> a
  -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setAt" kind="let">

```mc
let setAt  : all p. all a. Coll p a -> Int -> a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let setAt
  : all p. all a
  .  Coll p a
  -> Int
  -> a
  -> Coll p a
  = setAt_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="splitFirst_op" kind="let">

```mc
let splitFirst_op  : all p1. all p2. all a. Coll p1 a -> Option (a, Coll p2 a)
```



<ToggleWrapper text="Code..">
```mc
let splitFirst_op
  : all p1. all p2. all a
  . Coll p1 a
  -> Option (a, Coll p2 a)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="splitFirst" kind="let">

```mc
let splitFirst  : all p. all a. Coll p a -> Option (a, Coll p a)
```



<ToggleWrapper text="Code..">
```mc
let splitFirst
  : all p. all a
  . Coll p a
  -> Option (a, Coll p a)
  = splitFirst_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="splitLast_op" kind="let">

```mc
let splitLast_op  : all p1. all p2. all a. Coll p1 a -> Option (Coll p2 a, a)
```



<ToggleWrapper text="Code..">
```mc
let splitLast_op
  : all p1. all p2. all a
  . Coll p1 a
  -> Option (Coll p2 a, a)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="splitLast" kind="let">

```mc
let splitLast  : all p. all a. Coll p a -> Option (Coll p a, a)
```



<ToggleWrapper text="Code..">
```mc
let splitLast
  : all p. all a
  . Coll p a
  -> Option (Coll p a, a)
  = splitLast_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="first" kind="let">

```mc
let first  : all p. all a. Coll p a -> a
```

<Description>{`\`first c\` is equivalent to \`getAt c 0\`.  
WARNING: Errors on empty input.`}</Description>


<ToggleWrapper text="Code..">
```mc
let first : all p. all a. Coll p a -> a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="last" kind="let">

```mc
let last  : all p. all a. Coll p a -> a
```

<Description>{`\`last c\` is equivalent to \`getAt c \(subi n 1\)\`, if \`size c = n\`.  
WARNING: Errors on empty input.`}</Description>


<ToggleWrapper text="Code..">
```mc
let last : all p. all a. Coll p a -> a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tail_op" kind="let">

```mc
let tail_op  : all p1. all p2. all a. Coll p1 a -> Coll p2 a
```

<Description>{`\`tail\_op c\` is equivalent to the second component of \`splitAt\_op c 1\`.  
WARNING: Errors on empty input.`}</Description>


<ToggleWrapper text="Code..">
```mc
let tail_op : all p1. all p2. all a. Coll p1 a -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tail" kind="let">

```mc
let tail  : all p. all a. Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let tail : all p. all a. Coll p a -> Coll p a
  = tail_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="init_op" kind="let">

```mc
let init_op  : all p1. all p2. all a. Coll p1 a -> Coll p2 a
```

<Description>{`\`init\_op c\` is equivalent to the first component of  
\`splitAt\_op c \(subi n 1\)\`, if \`size c = n\`.  
WARNING: Errors on empty input.`}</Description>


<ToggleWrapper text="Code..">
```mc
let init_op : all p1. all p2. all a. Coll p1 a -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="init" kind="let">

```mc
let init  : all p. all a. Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let init : all p. all a. Coll p a -> Coll p a
  = init_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapi_op" kind="let">

```mc
let mapi_op  : all p1. all p2. all a. all b. (Int -> a -> b) -> Coll p1 a -> Coll p2 b
```

<Description>{`\`mapi\_op f c\` creates a new collection with elements  
\`f 0 x0, f 1 x1, ..., f n xn\`, where \`x0, x1, ..., xn\` are the elements  
of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapi_op
  : all p1. all p2. all a. all b
  . (Int -> a -> b)
  -> Coll p1 a
  -> Coll p2 b
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapi" kind="let">

```mc
let mapi  : all p. all a. all b. (Int -> a -> b) -> Coll p a -> Coll p b
```



<ToggleWrapper text="Code..">
```mc
let mapi
  : all p. all a. all b
  . (Int -> a -> b)
  -> Coll p a
  -> Coll p b
  = mapi_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iteri_op" kind="let">

```mc
let iteri_op  : all p1. all p2. all a. (Int -> a -> ()) -> Coll p1 a -> ()
```



<ToggleWrapper text="Code..">
```mc
let iteri_op
  : all p1. all p2. all a
  . (Int -> a -> ())
  -> Coll p1 a
  -> ()
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iteri" kind="let">

```mc
let iteri  : all p. all a. (Int -> a -> ()) -> Coll p a -> ()
```

<Description>{`\`iteri f c\` calls \`f\` on each element of \`c\` along with its index, returning unit.`}</Description>


<ToggleWrapper text="Code..">
```mc
let iteri
  : all p. all a
  . (Int -> a -> ())
  -> Coll p a
  -> ()
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="create" kind="let">

```mc
let create  : all p. all a. Int -> (Int -> a) -> Coll p a
```

<Description>{`\`create n f\` creates a new collection with elements \`f 0, f 1, ..., f \(n \- 1\)\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let create : all p. all a
  .  Int
  -> (Int -> a)
  -> Coll p a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getRange_op" kind="let">

```mc
let getRange_op  : all p1. all p2. all a. Coll p1 a -> Int -> Int -> Coll p2 a
```

<Description>{`\`getRange\_op c i j\` creates a new collection with elements  
\`xi, x\(i\+1\), ..., x\(j\-1\)\` if i \< j, else returning an empty collection.`}</Description>


<ToggleWrapper text="Code..">
```mc
let getRange_op : all p1. all p2. all a
  .  Coll p1 a
  -> Int
  -> Int
  -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getRange" kind="let">

```mc
let getRange  : all p. all a. Coll p a -> Int -> Int -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let getRange : all p. all a
  .  Coll p a
  -> Int
  -> Int
  -> Coll p a
  = getRange_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeFirst_op" kind="let">

```mc
let removeFirst_op  : all p1. all p2. all a. a -> Coll p1 a -> Coll p2 a
```

<Description>{`\`removeFirst\_op a c\` removes the first occurrence of \`a\` in \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let removeFirst_op : all p1. all p2. all a
  .  a
  -> Coll p1 a
  -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeFirst" kind="let">

```mc
let removeFirst  : all p. all a. a -> Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let removeFirst : all p. all a
  .  a
  -> Coll p a
  -> Coll p a
  = removeFirst_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isPrefix" kind="let">

```mc
let isPrefix  : all p1. all p2. all a. all b. Coll p1 a -> Coll p2 b -> Bool
```

<Description>{`\`isPrefix c1 c2\` returns true iff the elements of \`c1\` are a prefix of  
those of \`c2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let isPrefix
  : all p1. all p2. all a. all b
  .  Coll p1 a
  -> Coll p2 b
  -> Bool
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isSuffix" kind="let">

```mc
let isSuffix  : all p1. all p2. all a. all b. Coll p1 a -> Coll p2 b -> Bool
```

<Description>{`\`isSuffix c1 c2\` returns true iff the elements of \`c1\` are a suffix of  
those of \`c2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let isSuffix
  : all p1. all p2. all a. all b
  .  Coll p1 a
  -> Coll p2 b
  -> Bool
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sort_op" kind="let">

```mc
let sort_op  : all p1. all p2. all a. Coll p1 a -> Coll p2 a
```

<Description>{`\`sort\_op c\` returns a new collection whose elements are those of \`c\`,  
ordered in ascending order.`}</Description>


<ToggleWrapper text="Code..">
```mc
let sort_op
  : all p1. all p2. all a
  .  Coll p1 a
  -> Coll p2 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sort" kind="let">

```mc
let sort  : all p. all a. Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let sort
  : all p. all a
  .  Coll p a
  -> Coll p a
  = sort_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lookup" kind="let">

```mc
let lookup  : all p. all k. all v. k -> Coll p (k, v) -> Option v
```

<Description>{`\`lookup k c\` returns \`Some v\` for the first element \`\(k', v\)\` in \`c\` s.t.  
\`k\` = \`k'\`, or \`None \(\)\` if no such element exists.`}</Description>


<ToggleWrapper text="Code..">
```mc
let lookup
  : all p. all k. all v
  .  k
  -> Coll p (k, v)
  -> Option v
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeKey_op" kind="let">

```mc
let removeKey_op  : all p1. all p2. all k. all v. k -> Coll p1 (k, v) -> Coll p2 (k, v)
```

<Description>{`\`removeKey\_op k c\` removes the first element \`\(k', v\)\` in \`c\` such that  
\`k\` = \`k'\`, acting like the identity if no such element exists.`}</Description>


<ToggleWrapper text="Code..">
```mc
let removeKey_op
  : all p1. all p2. all k. all v
  .  k
  -> Coll p1 (k, v)
  -> Coll p2 (k, v)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeKey" kind="let">

```mc
let removeKey  : all p. all k. all v. k -> Coll p (k, v) -> Coll p (k, v)
```



<ToggleWrapper text="Code..">
```mc
let removeKey
  : all p. all k. all v
  .  k
  -> Coll p (k, v)
  -> Coll p (k, v)
  = removeKey_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hasKey" kind="let">

```mc
let hasKey  : all p. all k. all v. k -> Coll p (k, v) -> Bool
```

<Description>{`\`hasKey k c\` returns true iff there is an element \`\(k', v\)\` in \`c\` such that  
\`k\` = \`k'\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hasKey
  : all p. all k. all v
  .  k
  -> Coll p (k, v)
  -> Bool
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getKeys" kind="let">

```mc
let getKeys  : all p1. all p2. all k. all v. Coll p1 (k, v) -> Coll p2 k
```

<Description>{`\`getKeys c\` is equivalent to \`map\_op \(lam x. x.0\) c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let getKeys
  : all p1. all p2. all k. all v
  .  Coll p1 (k, v)
  -> Coll p2 k
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getValues" kind="let">

```mc
let getValues  : all p1. all p2. all k. all v. Coll p1 (k, v) -> Coll p2 v
```

<Description>{`\`getValues c\` is equivalent to \`map\_op \(lam x. x.1\) c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let getValues
  : all p1. all p2. all k. all v
  .  Coll p1 (k, v)
  -> Coll p2 v
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intersectKeysWith_op" kind="let">

```mc
let intersectKeysWith_op  : all p1. all p2. all p3. all k. all a. all b. all c. (a -> b -> c) -> Coll p1 (k, a) -> Coll p2 (k, b) -> Coll p3 (k, c)
```

<Description>{`\`intersectKeysWith\_op f c1 c2\` produces a new collection whose keys are the  
intersection of \`c1\`'s and \`c2\`'s.  The value associated with each key will  
be obtained by combining the corresponding values in \`c1\` and \`c2\` using \`f\`.  
If \`c1\` contains duplicates of a key, all will be used; on the other hand,  
if \`c2\` contains duplicates, only the first occurrence is considered.  For  
example, with sequences we expect the following semantics.  
  
\>\> intersectKeysWithOp\_op addi \[\(0, 1\), \(0, 2\)\] \[\(0, 10\), \(0, 20\), \(1, 30\)\]  
  ==\> \[\(0, 11\), \(0, 12\)\]`}</Description>


<ToggleWrapper text="Code..">
```mc
let intersectKeysWith_op
  : all p1. all p2. all p3. all k. all a. all b. all c
  . (a -> b -> c)
  -> Coll p1 (k, a)
  -> Coll p2 (k, b)
  -> Coll p3 (k, c)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intersectKeysWith" kind="let">

```mc
let intersectKeysWith  : all p. all k. all a. all b. all c. (a -> b -> c) -> Coll p (k, a) -> Coll p (k, b) -> Coll p (k, c)
```



<ToggleWrapper text="Code..">
```mc
let intersectKeysWith
  : all p. all k. all a. all b. all c
  . (a -> b -> c)
  -> Coll p (k, a)
  -> Coll p (k, b)
  -> Coll p (k, c)
  = intersectKeysWith_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intersectKeys" kind="let">

```mc
let intersectKeys c1 c2 : all p. all k. all a. all b. Coll p (k, a) -> Coll p (k, b) -> Coll p (k, a)
```



<ToggleWrapper text="Code..">
```mc
let intersectKeys
  : all p. all k. all a. all b
  .  Coll p (k, a)
  -> Coll p (k, b)
  -> Coll p (k, a)
  = lam c1. lam c2.
  intersectKeysWith (lam a. lam. a) c1 c2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unionKeysWith_op" kind="let">

```mc
let unionKeysWith_op  : all p1. all p2. all p3. all k. all a. all b. all c. (a -> a -> a) -> Coll p1 (k, a) -> Coll p2 (k, a) -> Coll p3 (k, a)
```

<Description>{`\`unionKeysWith\_op f c1 c2\` produces a new collection whose keys are the  
union of \`c1\`'s and \`c2\`'s.  If a key exists in both collections, the value  
associated with that key will be obtained by combining the corresponding  
values in \`c1\` and \`c2\` using \`f\`. If \`c1\` contains duplicates of a key, all  
will be used; on the other hand, if \`c2\` contains duplicates, only the first  
occurrence is considered.  For example, with sequences we expect the  
following semantics.  
  
\>\> unionKeysWith\_op addi \[\(0, 1\), \(0, 2\)\] \[\(0, 10\), \(0, 20\), \(1, 30\)\]  
  ==\> \[\(0, 11\), \(0, 12\), \(1, 30\)\]`}</Description>


<ToggleWrapper text="Code..">
```mc
let unionKeysWith_op
  : all p1. all p2. all p3. all k. all a. all b. all c
  . (a -> a -> a)
  -> Coll p1 (k, a)
  -> Coll p2 (k, a)
  -> Coll p3 (k, a)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unionKeysWith" kind="let">

```mc
let unionKeysWith  : all p. all k. all a. all b. all c. (a -> a -> a) -> Coll p (k, a) -> Coll p (k, a) -> Coll p (k, a)
```



<ToggleWrapper text="Code..">
```mc
let unionKeysWith
  : all p. all k. all a. all b. all c
  . (a -> a -> a)
  -> Coll p (k, a)
  -> Coll p (k, a)
  -> Coll p (k, a)
  = unionKeysWith_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unionKeys" kind="let">

```mc
let unionKeys c1 c2 : all p. all k. all a. all b. Coll p (k, a) -> Coll p (k, a) -> Coll p (k, a)
```



<ToggleWrapper text="Code..">
```mc
let unionKeys
  : all p. all k. all a. all b
  .  Coll p (k, a)
  -> Coll p (k, a)
  -> Coll p (k, a)
  = lam c1. lam c2.
  unionKeysWith (lam. lam a. a) c1 c2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="differenceKeys_op" kind="let">

```mc
let differenceKeys_op  : all p1. all p2. all p3. all k. all a. all b. Coll p1 (k, a) -> Coll p2 (k, b) -> Coll p3 (k, a)
```

<Description>{`\`differenceKeys\_op c1 c2\` produces a new collection whose keys are those of  
\`c1\` which do not occur in \`c2\`.  If \`c1\` contains duplicates of a key, both  
will be preserved.`}</Description>


<ToggleWrapper text="Code..">
```mc
let differenceKeys_op
  : all p1. all p2. all p3. all k. all a. all b
  .  Coll p1 (k, a)
  -> Coll p2 (k, b)
  -> Coll p3 (k, a)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="differenceKeys" kind="let">

```mc
let differenceKeys  : all p. all k. all a. all b. Coll p (k, a) -> Coll p (k, b) -> Coll p (k, a)
```



<ToggleWrapper text="Code..">
```mc
let differenceKeys
  : all p. all k. all a. all b
  .  Coll p (k, a)
  -> Coll p (k, b)
  -> Coll p (k, a)
  = differenceKeys_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeKeys_op" kind="let">

```mc
let mergeKeys_op  : all p1. all p2. all p3. all k. all a. all b. all c. (k -> These a b -> Option c) -> Coll p1 (k, a) -> Coll p2 (k, b) -> Coll p3 (k, a)
```

<Description>{`\`mergeKeys\_op f c1 c2\` produces a new collection similarly to \`unionKeys\` and  
\`intersectKeys\`, but calls \`f\` for every key in \`c1\`, passing it  
\`f k \(This v1\)\`, \`f k \(That v2\)\`, or \`f k \(These \(v1, v2\)\)\` depending on  
whether the key is present in \`c1\`, \`c2\`, or both.  If \`c1\` contains  
duplicates of a key, all will be used; on the other hand, if \`c2\` contains  
duplicates, only the first occurrence is considered.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mergeKeys_op
  : all p1. all p2. all p3. all k. all a. all b. all c
  . (k -> These a b -> Option c)
  -> Coll p1 (k, a)
  -> Coll p2 (k, b)
  -> Coll p3 (k, a)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeKeys" kind="let">

```mc
let mergeKeys  : all p. all k. all a. all b. all c. (k -> These a b -> Option c) -> Coll p (k, a) -> Coll p (k, b) -> Coll p (k, a)
```



<ToggleWrapper text="Code..">
```mc
let mergeKeys
  : all p. all k. all a. all b. all c
  . (k -> These a b -> Option c)
  -> Coll p (k, a)
  -> Coll p (k, b)
  -> Coll p (k, a)
  = mergeKeys_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapWithKey_op" kind="let">

```mc
let mapWithKey_op  : all p1. all p2. all k. all a. all b. (k -> a -> b) -> Coll p1 (k, a) -> Coll p2 (k, b)
```

<Description>{`\`mapWithKey\_op f c\` creates a new collection with elements  
\`f k0 v0, f k1 v1, ..., f kn vn\`, where \`\(k0, v0\), \(k1, v1\), ..., \(kn, vn\)\`  
are the elements of \`c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapWithKey_op
  : all p1. all p2. all k. all a. all b
  . (k -> a -> b)
  -> Coll p1 (k, a)
  -> Coll p2 (k, b)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapWithKey" kind="let">

```mc
let mapWithKey  : all p. all k. all a. all b. (k -> a -> b) -> Coll p (k, a) -> Coll p (k, b)
```



<ToggleWrapper text="Code..">
```mc
let mapWithKey
  : all p. all k. all a. all b
  . (k -> a -> b)
  -> Coll p (k, a)
  -> Coll p (k, b)
  = mapWithKey_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapValues_op" kind="let">

```mc
let mapValues_op  : all p1. all p2. all k. all a. all b. (a -> b) -> Coll p1 (k, a) -> Coll p2 (k, b)
```

<Description>{`\`mapValues\_op f c\` is equivalent to \`mapWithKey\_op \(lam. f\) c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapValues_op
  : all p1. all p2. all k. all a. all b
  . (a -> b)
  -> Coll p1 (k, a)
  -> Coll p2 (k, b)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapValues" kind="let">

```mc
let mapValues  : all p. all k. all a. all b. (a -> b) -> Coll p (k, a) -> Coll p (k, b)
```



<ToggleWrapper text="Code..">
```mc
let mapValues
  : all p. all k. all a. all b
  . (a -> b)
  -> Coll p (k, a)
  -> Coll p (k, b)
  = mapValues_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumLWithKey_op" kind="let">

```mc
let mapAccumLWithKey_op  : all p1. all p2. all k. all a. all b. all c. (a -> k -> b -> (a, c)) -> a -> Coll p1 (k, b) -> (a, Coll p2 (k, c))
```

<Description>{`\`mapAccumLWithKey\_op f acc0 c\` maps a stateful function over a key\-value  
collection, returning the updated collection and the final state.  In other  
words, letting \`\(k0, v0\), \(k1, v1\), ..., \(kn, vn\)\` be the elements of \`c\`,  
the result is a tuple \`\(accn, c'\)\`, where \`c'\` has elements  
\`\(k0, u0\), \(k1, u1\), ..., \(kn, un\)\` such that \`\(acc\(i\+1\), ui\) = f acci ki vi\`  
for all \`i\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapAccumLWithKey_op
  : all p1. all p2. all k. all a. all b. all c
  . (a -> k -> b -> (a, c))
  -> a
  -> Coll p1 (k, b)
  -> (a, Coll p2 (k, c))
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumLWithKey" kind="let">

```mc
let mapAccumLWithKey  : all p. all k. all a. all b. all c. (a -> k -> b -> (a, c)) -> a -> Coll p (k, b) -> (a, Coll p (k, c))
```



<ToggleWrapper text="Code..">
```mc
let mapAccumLWithKey
  : all p. all k. all a. all b. all c
  . (a -> k -> b -> (a, c))
  -> a
  -> Coll p (k, b)
  -> (a, Coll p (k, c))
  = mapAccumLWithKey_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumLValues_op" kind="let">

```mc
let mapAccumLValues_op  : all p1. all p2. all k. all a. all b. all c. (a -> b -> (a, c)) -> a -> Coll p1 (k, b) -> (a, Coll p2 (k, c))
```

<Description>{`\`mapAccumLValues\_op f acc c\` is equivalent to  
\`mapAccumLWithKey\_op \(lam a. lam. lam b. f a b\) acc c\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapAccumLValues_op
  : all p1. all p2. all k. all a. all b. all c
  . (a -> b -> (a, c))
  -> a
  -> Coll p1 (k, b)
  -> (a, Coll p2 (k, c))
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumLValues" kind="let">

```mc
let mapAccumLValues  : all p. all k. all a. all b. all c. (a -> b -> (a, c)) -> a -> Coll p (k, b) -> (a, Coll p (k, c))
```



<ToggleWrapper text="Code..">
```mc
let mapAccumLValues
  : all p. all k. all a. all b. all c
  . (a -> b -> (a, c))
  -> a
  -> Coll p (k, b)
  -> (a, Coll p (k, c))
  = mapAccumLValues_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumRWithKey_op" kind="let">

```mc
let mapAccumRWithKey_op  : all p1. all p2. all k. all a. all b. all c. (a -> k -> b -> (a, c)) -> a -> Coll p1 (k, b) -> (a, Coll p2 (k, c))
```

<Description>{`\`mapAccumRWithKey\_op\` is analogous to \`mapAccumLWithKey\_op\`, but performs a  
right fold.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapAccumRWithKey_op
  : all p1. all p2. all k. all a. all b. all c
  . (a -> k -> b -> (a, c))
  -> a
  -> Coll p1 (k, b)
  -> (a, Coll p2 (k, c))
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumRWithKey" kind="let">

```mc
let mapAccumRWithKey  : all p. all k. all a. all b. all c. (a -> k -> b -> (a, c)) -> a -> Coll p (k, b) -> (a, Coll p (k, c))
```



<ToggleWrapper text="Code..">
```mc
let mapAccumRWithKey
  : all p. all k. all a. all b. all c
  . (a -> k -> b -> (a, c))
  -> a
  -> Coll p (k, b)
  -> (a, Coll p (k, c))
  = mapAccumRWithKey_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumRValues_op" kind="let">

```mc
let mapAccumRValues_op  : all p1. all p2. all k. all a. all b. all c. (a -> b -> (a, c)) -> a -> Coll p1 (k, b) -> (a, Coll p2 (k, c))
```

<Description>{`\`mapAccumRValues\_op\` is analogous to \`mapAccumRValues\_op\`, but performs a  
right fold.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mapAccumRValues_op
  : all p1. all p2. all k. all a. all b. all c
  . (a -> b -> (a, c))
  -> a
  -> Coll p1 (k, b)
  -> (a, Coll p2 (k, c))
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccumRValues" kind="let">

```mc
let mapAccumRValues  : all p. all k. all a. all b. all c. (a -> b -> (a, c)) -> a -> Coll p (k, b) -> (a, Coll p (k, c))
```



<ToggleWrapper text="Code..">
```mc
let mapAccumRValues
  : all p. all k. all a. all b. all c
  . (a -> b -> (a, c))
  -> a
  -> Coll p (k, b)
  -> (a, Coll p (k, c))
  = mapAccumRValues_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterMapValues_op" kind="let">

```mc
let filterMapValues_op  : all p1. all p2. all k. all a. all b. (a -> Option b) -> Coll p1 (k, a) -> Coll p2 (k, b)
```

<Description>{`\`filterMapValues\_op f c\` constructs a new collection of key\-value pairs by  
mapping \`f\` over the values of \`c\` and discarding \`None \(\)\`\-results.`}</Description>


<ToggleWrapper text="Code..">
```mc
let filterMapValues_op
  : all p1. all p2. all k. all a. all b
  . (a -> Option b)
  -> Coll p1 (k, a)
  -> Coll p2 (k, b)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterMapValues" kind="let">

```mc
let filterMapValues  : all p. all k. all a. all b. (a -> Option b) -> Coll p (k, a) -> Coll p (k, b)
```



<ToggleWrapper text="Code..">
```mc
let filterMapValues
  : all p. all k. all a. all b
  . (a -> Option b)
  -> Coll p (k, a)
  -> Coll p (k, b)
  = filterMapValues_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterValues_op" kind="let">

```mc
let filterValues_op  : all p1. all p2. all k. all a. all b. (a -> Bool) -> Coll p1 (k, a) -> Coll p2 (k, a)
```

<Description>{`\`filterValues\_op f c\` constructs a new collection of key\-value pairs  
containing only those elements of \`c\` for which \`f\` returns \`true\` when  
applied to the value component.`}</Description>


<ToggleWrapper text="Code..">
```mc
let filterValues_op
  : all p1. all p2. all k. all a. all b
  . (a -> Bool)
  -> Coll p1 (k, a)
  -> Coll p2 (k, a)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterValues" kind="let">

```mc
let filterValues  : all p. all k. all a. all b. (a -> Bool) -> Coll p (k, a) -> Coll p (k, a)
```



<ToggleWrapper text="Code..">
```mc
let filterValues
  : all p. all k. all a. all b
  . (a -> Bool)
  -> Coll p (k, a)
  -> Coll p (k, a)
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="remove" kind="let">

```mc
let remove  : all p. all a. a -> Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let remove
  : all p. all a
  .  a
  -> Coll p a
  -> Coll p a
  = removeFirst
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="add" kind="let">

```mc
let add  : all p. all a. Coll p a -> a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let add
  : all p. all a
  .  Coll p a
  -> a
  -> Coll p a
  = append
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="difference_op" kind="let">

```mc
let difference_op  : all p1. all p2. all p3. all a. Coll p1 a -> Coll p2 a -> Coll p3 a
```

<Description>{`\`difference\_op c1 c2\` constructs a new collection containing only those  
elements of \`c1\` which do not occur in \`c2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let difference_op
  : all p1. all p2. all p3. all a
  .  Coll p1 a
  -> Coll p2 a
  -> Coll p3 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="difference" kind="let">

```mc
let difference  : all p. all a. Coll p a -> Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let difference
  : all p. all a
  .  Coll p a
  -> Coll p a
  -> Coll p a
  = difference_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intersection_op" kind="let">

```mc
let intersection_op  : all p1. all p2. all p3. all a. Coll p1 a -> Coll p2 a -> Coll p3 a
```

<Description>{`\`intersection\_op c1 c2\` constructs a new collection containing only those  
elements of \`c1\` which also occur in \`c2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let intersection_op
  : all p1. all p2. all p3. all a
  .  Coll p1 a
  -> Coll p2 a
  -> Coll p3 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intersection" kind="let">

```mc
let intersection  : all p. all a. Coll p a -> Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let intersection
  : all p. all a
  .  Coll p a
  -> Coll p a
  -> Coll p a
  = intersection_op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="union_op" kind="let">

```mc
let union_op  : all p1. all p2. all p3. all a. Coll p1 a -> Coll p2 a -> Coll p3 a
```

<Description>{`\`union\_op c1 c2\` constructs a new collection containing the elements of \`c1\`  
along with any elements of \`c2\` not in \`c1\`.  Duplicates of elements in \`c2\`  
are discarded.`}</Description>


<ToggleWrapper text="Code..">
```mc
let union_op
  : all p1. all p2. all p3. all a
  .  Coll p1 a
  -> Coll p2 a
  -> Coll p3 a
  = never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="union" kind="let">

```mc
let union  : all p. all a. Coll p a -> Coll p a -> Coll p a
```



<ToggleWrapper text="Code..">
```mc
let union
  : all p. all a
  .  Coll p a
  -> Coll p a
  -> Coll p a
  = union_op
```
</ToggleWrapper>
</DocBlock>

