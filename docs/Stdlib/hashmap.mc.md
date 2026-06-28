import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# hashmap.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
A simple generic hashmap library.  
  
TODO\(johnwikman, 2020\-08\-05\): Resizing of buckets.  
  
NOTE\(johnwikman, 2020\-10\-01\): All hashmap functions have the trait argument  
applied to them, even if they never use it. This is to ensure a more stable  
API, in case a hashmap trait might be applied for the sake of optimization  
in a case where it was previously unused.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/math.mc"} style={S.link}>math.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Types  
  

          <DocBlock title="HashMapEntry" kind="type">

```mc
type HashMapEntry
```

<Description>{`The base type of a HashMap object.  
  k: Polymorphic key type  
  v: Polymorphic value type`}</Description>


<ToggleWrapper text="Code..">
```mc
type HashMapEntry k v = {hash : Int, key : k, value : v}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="HashMap" kind="type">

```mc
type HashMap
```



<ToggleWrapper text="Code..">
```mc
type HashMap k v = {
  buckets : [[HashMapEntry k v]],
  nelems : Int
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="HashMapTraits" kind="type">

```mc
type HashMapTraits
```



<ToggleWrapper text="Code..">
```mc
type HashMapTraits k = {
  eq : k -> k -> Bool,
  hashfn : k -> Int
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_hashmapDefaultBucketCount" kind="let">

```mc
let _hashmapDefaultBucketCount  : Int
```

<Description>{`Private definitions`}</Description>


<ToggleWrapper text="Code..">
```mc
let _hashmapDefaultBucketCount = 100
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_hashmapBucketIdx" kind="let">

```mc
let _hashmapBucketIdx hash hm : all k. all v. Int -> HashMap k v -> Int
```



<ToggleWrapper text="Code..">
```mc
let _hashmapBucketIdx : all k. all v. Int -> HashMap k v -> Int =
  lam hash. lam hm : HashMap k v.
  modi (absi hash) (length hm.buckets)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapEmpty" kind="let">

```mc
let hashmapEmpty _ : all k. all v. () -> HashMap k v
```

<Description>{`'hashmapEmpty' is an empty hashmap with a default number of buckets.  
TODO\(aathn, 2023\-05\-07\): Relax value restriction`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapEmpty : all k. all v. () -> HashMap k v = lam.
  {buckets = make _hashmapDefaultBucketCount [],
   nelems = 0}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmap2seq" kind="let">

```mc
let hashmap2seq hm : all k. all v. HashMap k v -> [(k, v)]
```

<Description>{`'hashmap2seq hm' converts the hashmap 'hm' to a sequence of tuples.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmap2seq : all k. all v. HashMap k v -> [(k,v)] = lam hm : HashMap k v.
  join (map (lam bucket. map (lam e : HashMapEntry k v. (e.key, e.value)) bucket)
            hm.buckets)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapStrTraits" kind="let">

```mc
let hashmapStrTraits  : HashMapTraits String
```

<Description>{`'hashmapStrTraits' is traits for a hashmap with strings as keys.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapStrTraits : HashMapTraits String =
  -- An implementation of the djb2 hash function (http://www.cse.yorku.ca/~oz/hash.html)
  recursive let djb2 = lam hash. lam s.
    if null s then
      hash
    else
      let newhash = addi (addi (muli hash 32) hash) (char2int (head s)) in
      djb2 newhash (tail s)
  in
  {eq = eqString, hashfn = djb2 5381}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapCount" kind="let">

```mc
let hashmapCount traits hm : all k. all v. HashMapTraits k -> HashMap k v -> Int
```

<Description>{`'hashmapCount traits hm' returns the number of elements in a hashmap.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapCount : all k. all v. HashMapTraits k -> HashMap k v -> Int =
  lam traits. lam hm : HashMap k v. hm.nelems
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapInsert" kind="let">

```mc
let hashmapInsert traits key value hm : all k. all v. HashMapTraits k -> k -> v -> HashMap k v -> HashMap k v
```

<Description>{`'hashmapInsert traits k v hm' returns a new hashmap, where the key\-value pair  
\('k', 'v'\) is stored. If 'k' is already a key in 'hm', its old value will be  
overwritten.  
\[NOTE\(?,?\)\]  
  The insertion uses a recursion that is not tail\-recursive.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapInsert : all k. all v. HashMapTraits k -> k -> v -> HashMap k v -> HashMap k v =
  lam traits : HashMapTraits k. lam key. lam value. lam hm : HashMap k v.
    let hash = traits.hashfn key in
    let idx = _hashmapBucketIdx hash hm in
    let bucket = get hm.buckets idx in
    let newEntry = {hash = hash, key = key, value = value} in
    recursive let inserter = lam seq.
      if null seq then
        [newEntry]
      else
        let entry : HashMapEntry k v = head seq in
        if neqi hash entry.hash then
          cons entry (inserter (tail seq))
        else if traits.eq key entry.key then
          cons newEntry (tail seq)
        else
          cons entry (inserter (tail seq))
    in
    let newBucket = inserter bucket in
    -- If lengths differ, then an element has been inserted and we increment nelems
    {{hm with nelems = addi hm.nelems (subi (length newBucket) (length bucket))}
         with buckets = set hm.buckets idx newBucket}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapRemove" kind="let">

```mc
let hashmapRemove traits key hm : all k. all v. HashMapTraits k -> k -> HashMap k v -> HashMap k v
```

<Description>{`'hashmapRemove traits k hm' returns a new hashmap, where 'k' is not a key. If  
'k' is not a key in 'hm', the map remains unchanged after the operation.  
\[NOTE\(?,?\)\]  
  The removal uses a recursion that is not tail\-recursive.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapRemove : all k. all v. HashMapTraits k -> k -> HashMap k v -> HashMap k v =
  lam traits : HashMapTraits k. lam key. lam hm : HashMap k v.
    let hash = traits.hashfn key in
    let idx = _hashmapBucketIdx hash hm in
    let bucket = get hm.buckets idx in
    recursive let remover = lam seq.
      if null seq then
        seq
      else
        let entry : HashMapEntry k v = head seq in
        if neqi hash entry.hash then
          cons entry (remover (tail seq))
        else if traits.eq key entry.key then
          tail seq
        else
          cons entry (remover (tail seq))
    in
    let newBucket = remover bucket in
    let newSize = subi hm.nelems (subi (length bucket) (length newBucket)) in
    {{hm with buckets = set hm.buckets idx newBucket}
         with nelems = newSize}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapLookup" kind="let">

```mc
let hashmapLookup traits key hm : all k. all v. HashMapTraits k -> k -> HashMap k v -> Option v
```

<Description>{`'hashmapLookup traits k hm' looks up the key 'k' in 'hm', returning an  
Option type.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapLookup : all k. all v. HashMapTraits k -> k -> HashMap k v -> Option v =
  lam traits : HashMapTraits k. lam key. lam hm : HashMap k v.
    let hash = traits.hashfn key in
    let idx = _hashmapBucketIdx hash hm in
    recursive let finder = lam seq.
      if null seq then
        None ()
      else
        let entry : HashMapEntry k v = head seq in
        if neqi hash entry.hash then
          finder (tail seq)
        else if traits.eq key entry.key then
          Some (entry.value)
        else
          finder (tail seq)
    in
    finder (get hm.buckets idx)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapLookupOrElse" kind="let">

```mc
let hashmapLookupOrElse traits d key hm : all k. all v. HashMapTraits k -> (() -> v) -> k -> HashMap k v -> v
```

<Description>{`'hashmapLookupOrElse traits d key hm': like hashmapLookup, but returns the  
result of 'd \(\)' if no element was found.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapLookupOrElse : all k. all v. HashMapTraits k -> (() -> v) -> k -> HashMap k v -> v =
  lam traits. lam d. lam key. lam hm.
    optionGetOrElse d (hashmapLookup traits key hm)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapLookupOr" kind="let">

```mc
let hashmapLookupOr traits default key hm : all k. all v. HashMapTraits k -> v -> k -> HashMap k v -> v
```

<Description>{`'hashmapLookupOr traits default key hm': like hashmapLookupOrElse, but returns  
'default' if no element was found.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapLookupOr : all k. all v. HashMapTraits k -> v -> k -> HashMap k v -> v =
  lam traits. lam default. lam key. lam hm.
    hashmapLookupOrElse traits (lam. default) key hm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapLookupPred" kind="let">

```mc
let hashmapLookupPred traits p hm : all k. all v. HashMapTraits k -> (k -> Bool) -> HashMap k v -> Option v
```

<Description>{`'hashmapLookupPred p hm' returns the value of a key that satisfies the  
predicate 'p'. If several keys satisfies 'p', the one that happens to be  
found first is returned.  
\[NOTE\(?,?\)\]  
  Linear complexity.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapLookupPred : all k. all v. HashMapTraits k -> (k -> Bool) -> HashMap k v -> Option v =
  lam traits. lam p. lam hm : HashMap k v.
    let flatBuckets = foldr1 concat hm.buckets in
    optionMapOr (None ())
                (lam r : HashMapEntry k v. Some (r.value))
                (find (lam r : HashMapEntry k v. p r.key) flatBuckets)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapMem" kind="let">

```mc
let hashmapMem traits key hm : all k. all v. HashMapTraits k -> k -> HashMap k v -> Bool
```

<Description>{`'hashmapMem traits k hm' returns true if 'k' is a key in 'hm', else false.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapMem : all k. all v. HashMapTraits k -> k -> HashMap k v -> Bool =
  lam traits. lam key. lam hm.
    optionIsSome (hashmapLookup traits key hm)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapAny" kind="let">

```mc
let hashmapAny traits p hm : all k. all v. HashMapTraits k -> (k -> v -> Bool) -> HashMap k v -> Bool
```

<Description>{`'hashmapAny traits p hm' returns true if at least one entry in the hashmap matches the predicate`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapAny : all k. all v. HashMapTraits k -> (k -> v -> Bool) -> HashMap k v -> Bool =
  lam traits. lam p. lam hm : HashMap k v.
    any (any (lam r : HashMapEntry k v. p r.key r.value)) hm.buckets
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapAll" kind="let">

```mc
let hashmapAll traits p hm : all k. all v. HashMapTraits k -> (k -> v -> Bool) -> HashMap k v -> Bool
```

<Description>{`'hashmapAll traits p hm' returns true iff all entries in the hashmap matches the predicate`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapAll : all k. all v. HashMapTraits k -> (k -> v -> Bool) -> HashMap k v -> Bool =
  lam traits. lam p. lam hm : HashMap k v.
    forAll (forAll (lam r : HashMapEntry k v. p r.key r.value)) hm.buckets
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapMap" kind="let">

```mc
let hashmapMap traits fn hm : all k. all v1. all v2. HashMapTraits k -> (v1 -> v2) -> HashMap k v1 -> HashMap k v2
```

<Description>{`'hashmapMap' maps the provided functions on all values in the hashmap`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapMap : all k. all v1. all v2.
  HashMapTraits k -> (v1 -> v2) -> HashMap k v1 -> HashMap k v2 =
  lam traits. lam fn. lam hm : HashMap k v1.
    {buckets = map (map (lam r : HashMapEntry k v1. {hash = r.hash, key = r.key, value = fn r.value})) hm.buckets,
     nelems = hm.nelems}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapFilter" kind="let">

```mc
let hashmapFilter traits p hm : all k. all v. HashMapTraits k -> (k -> v -> Bool) -> HashMap k v -> HashMap k v
```

<Description>{`'hashmapFilter p hm' returns a new hashmap with only the key\-value pairs in  
'hm' that satisfies 'p'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapFilter : all k. all v.
  HashMapTraits k -> (k -> v -> Bool) -> HashMap k v -> HashMap k v =
  lam traits. lam p. lam hm : HashMap k v.
    let ret : ([[HashMapEntry k v]], Int)= foldl (lam acc : ([[HashMapEntry k v]], Int). lam bucket.
        -- NOTE(johnwikman, 2020-10-01): Using snoc here ensures that order of
        -- the buckets are the same, and that hashing index of all entries remain
        -- valid.
        let newBucket = filter (lam r : HashMapEntry k v. p r.key r.value) bucket in
        (snoc acc.0 newBucket, addi acc.1 (length newBucket))
      ) ([], 0) hm.buckets
    in
    {buckets = ret.0, nelems = ret.1}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapFilterKeys" kind="let">

```mc
let hashmapFilterKeys traits p hm : all k. all v. HashMapTraits k -> (k -> Bool) -> HashMap k v -> [k]
```

<Description>{`'hashmapFilterKeys p hm' returns a list of all keys in 'hm' that satisfies 'p'`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapFilterKeys : all k. all v. HashMapTraits k -> (k -> Bool) -> HashMap k v -> [k] =
  lam traits. lam p. lam hm : HashMap k v.
    foldl (lam keys. lam bucket.
      concat (map (lam r : HashMapEntry k v. r.key)
                  (filter (lam r : HashMapEntry k v. p r.key) bucket))
             keys
    ) [] hm.buckets
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapFilterValues" kind="let">

```mc
let hashmapFilterValues traits p hm : all k. all v. HashMapTraits k -> (v -> Bool) -> HashMap k v -> [v]
```

<Description>{`'hashmapFilterValues traits p hm' returns a list of all values in 'hm' that satisfies 'p'`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapFilterValues : all k. all v. HashMapTraits k -> (v -> Bool) -> HashMap k v -> [v] =
  lam traits. lam p. lam hm : HashMap k v.
    foldl (lam values. lam bucket.
      concat (map (lam r : HashMapEntry k v. r.value)
                  (filter (lam r : HashMapEntry k v. p r.value) bucket))
             values
    ) [] hm.buckets
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapKeys" kind="let">

```mc
let hashmapKeys traits hm : all k. all v. HashMapTraits k -> HashMap k v -> [k]
```

<Description>{`'hashmapKeys hm' returns a list of all keys stored in 'hm'`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapKeys : all k. all v. HashMapTraits k -> HashMap k v -> [k] =
  lam traits. lam hm.
    hashmapFilterKeys traits (lam. true) hm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hashmapValues" kind="let">

```mc
let hashmapValues traits hm : all k. all v. HashMapTraits k -> HashMap k v -> [v]
```

<Description>{`'hashmapValues hm' returns a list of all values stored in 'hm'`}</Description>


<ToggleWrapper text="Code..">
```mc
let hashmapValues : all k. all v. HashMapTraits k -> HashMap k v -> [v] =
  lam traits. lam hm.
    hashmapFilterValues traits (lam. true) hm
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

let empty = hashmapEmpty in
let traits = hashmapStrTraits in
let mem = lam x. hashmapMem traits x in
let any = lam x. hashmapAny traits x in
let forAll = lam x. hashmapAll traits x in
let map = lam x. hashmapMap traits x in
let filter = lam x. hashmapFilter traits x in
let filterKeys = lam x. hashmapFilterKeys traits x in
let filterValues = lam x. hashmapFilterValues traits x in
let lookupOrElse = lam x. hashmapLookupOrElse traits x in
let lookupOr = lam x. hashmapLookupOr traits x in
let lookup = lam x. hashmapLookup traits x in
let lookupPred = lam x. hashmapLookupPred traits x in
let count = lam x. hashmapCount traits x in
let insert = lam x. hashmapInsert traits x in
let remove = lam x. hashmapRemove traits x in
let keys = lam x. hashmapKeys traits x in
let values = lam x. hashmapValues traits x in

let m = empty () in

utest count m with 0 in
utest mem "foo" m with false in
utest lookup "foo" m with None () using optionEq eqString in

let m = insert "foo" "aaa" m in

utest count m with 1 in
utest mem "foo" m with true in
utest lookup "foo" m with Some ("aaa") using optionEq eqString in
utest lookupOrElse (lam. "bbb") "foo" m with "aaa" in

let m = insert "bar" "bbb" m in

utest count m with 2 in
utest mem "bar" m with true in
utest any (lam. lam b. eqString "BBB" (str2upper b)) m with true in
utest any (lam a. lam. eqString "FOO" (str2upper a)) m with true in
utest any (lam a. lam b. eqString a b) m with false in
utest any (lam a. lam. eqString "bar" a) m with true in
utest forAll (lam a. lam. eqString "bar" a) m with false in
utest forAll (lam a. lam. eqi (length a) 3) m with true in
utest forAll (lam. lam b. eqi (length b) 3) m with true in
utest lookup "bar" m with Some ("bbb") using optionEq eqString in
utest lookupOrElse (lam. "BABAR") "bar" m with "bbb" in
utest lookupOr "bananas" "bar42" m with "bananas" in
utest lookupPred (eqString "bar") m with Some "bbb" using optionEq eqString in
utest
  match keys m with ["foo", "bar"] | ["bar", "foo"]
  then true else false
with true in
utest
  match values m with ["aaa", "bbb"] | ["bbb", "aaa"]
  then true else false
with true in
utest
  match hashmap2seq m with [("foo", "aaa"), ("bar", "bbb")] | [("bar", "bbb"), ("foo", "aaa")]
  then true else false
with true in
utest count (filter (eqString) m) with 0 in

utest hashmap2seq (filter (lam a. lam. eqString "foo" a) m) with [("foo", "aaa")] in
utest hashmap2seq (filter (lam. lam b. eqString "bbb" b) m) with [("bar", "bbb")] in
utest filterKeys (lam a. optionIsSome (strIndex 'o' a)) m with ["foo"] in
utest filterValues (lam a. optionIsSome (strIndex 'b' a)) m with ["bbb"] in


-- Test map all values
let mMapped = map (cons '?') m in
utest lookup "foo" mMapped with Some ("?aaa") using optionEq eqString in
utest lookup "bar" mMapped with Some ("?bbb") using optionEq eqString in


let m = insert "foo" "ccc" m in

utest count m with 2 in
utest mem "foo" m with true in
utest lookup "foo" m with Some ("ccc") using optionEq eqString in
utest lookupOrElse (lam. "bbb") "foo" m with "ccc" in
utest lookupOrElse (lam. "bbb") "abc" m with "bbb" in

let m = remove "foo" m in

utest count m with 1 in
utest mem "foo" m with false in
utest lookup "foo" m with None () using optionEq eqString in

let m = remove "foo" m in

utest count m with 1 in
utest mem "foo" m with false in
utest lookup "foo" m with None () using optionEq eqString in

let m = remove "babar" m in

utest count m with 1 in
utest mem "babar" m with false in
utest lookup "babar" m with None () using optionEq eqString in

let m = insert "" "ddd" m in

utest count m with 2 in
utest mem "" m with true in
utest lookup "" m with Some ("ddd") using optionEq eqString in
utest lookupOrElse (lam. "bbb") "" m with "ddd" in

-- Test with collisions
let n = addi _hashmapDefaultBucketCount 10 in

recursive let populate = lam hm. lam i.
  if geqi i n then
    hm
  else
    let key = cons 'a' (int2string i) in
    utest lookup key hm with None () using optionEq eqi in
    populate (insert key i hm)
             (addi i 1)
in
let m = populate (empty ()) 0 in

utest count m with n in

recursive let checkmem = lam i.
  if geqi i n then
    ()
  else
    let key = cons 'a' (int2string i) in
    utest lookup key m with Some (i) using optionEq eqi in
    checkmem (addi i 1)
in
checkmem 0;

recursive let removeall = lam i. lam hm.
  if geqi i n then
    hm
  else
    let key = cons 'a' (int2string i) in
    let newHm = remove key hm in
    utest lookup key newHm with None () using optionEq eqi in
    removeall (addi i 1) newHm
in
let m = removeall 0 m in

utest count m with 0 in

()
```
</ToggleWrapper>
</DocBlock>

