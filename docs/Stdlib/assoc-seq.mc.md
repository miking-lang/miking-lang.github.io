import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# assoc-seq.mc  
  

A simple library of functions operating on associative sequences. The  
difference compared to assoc.mc is that the data type contained here is  
ordered. With more recently inserted bindings shadowing previous bindings,  
insertion is O\(1\). This makes this data type suitable for e.g., evaluation  
environments and similar.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>  
  
## Types  
  

          <DocBlock title="AssocSeq" kind="type">

```mc
type AssocSeq
```



<ToggleWrapper text="Code..">
```mc
type AssocSeq k v = [(k, v)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AssocTraits" kind="type">

```mc
type AssocTraits
```



<ToggleWrapper text="Code..">
```mc
type AssocTraits k = {eq: k -> k -> Bool}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="assocSeqInsert" kind="let">

```mc
let assocSeqInsert k v s : all k. all v. k -> v -> AssocSeq k v -> AssocSeq k v
```



<ToggleWrapper text="Code..">
```mc
let assocSeqInsert : all k. all v. k -> v -> AssocSeq k v -> AssocSeq k v =
  lam k. lam v. lam s.
    cons (k,v) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="assocSeqLookup" kind="let">

```mc
let assocSeqLookup traits k s : all k. all v. AssocTraits k -> k -> AssocSeq k v -> Option v
```



<ToggleWrapper text="Code..">
```mc
let assocSeqLookup : all k. all v. AssocTraits k -> k -> AssocSeq k v -> Option v =
  lam traits : {eq : k -> k -> Bool}. lam k. lam s.
    optionMapOr (None ())
                (lam t : (k, v). Some t.1)
                (find (lam t : (k, v). traits.eq k t.0) s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="assocSeqReverseLookup" kind="let">

```mc
let assocSeqReverseLookup revTraits v s : all k. all v. AssocTraits v -> v -> AssocSeq k v -> Option k
```



<ToggleWrapper text="Code..">
```mc
let assocSeqReverseLookup : all k. all v. AssocTraits v -> v -> AssocSeq k v -> Option k =
  lam revTraits : {eq : v -> v -> Bool}. lam v. lam s.
    optionMapOr (None ())
                (lam t : (k, v). Some t.0)
                (find (lam t : (k, v). revTraits.eq v t.1) s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="assocSeqMap" kind="let">

```mc
let assocSeqMap f s : all k. all v1. all v2. (v1 -> v2) -> AssocSeq k v1 -> AssocSeq k v2
```



<ToggleWrapper text="Code..">
```mc
let assocSeqMap : all k. all v1. all v2. (v1 -> v2) -> AssocSeq k v1 -> AssocSeq k v2 =
  lam f. lam s.
    map (lam t : (k, v1). (t.0, f t.1)) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="assocSeqFold" kind="let">

```mc
let assocSeqFold f acc s : all acc. all k. all v. (acc -> k -> v -> acc) -> acc -> AssocSeq k v -> acc
```



<ToggleWrapper text="Code..">
```mc
let assocSeqFold : all acc. all k. all v.
  (acc -> k -> v -> acc) -> acc -> AssocSeq k v -> acc =
  lam f. lam acc. lam s.
    foldl (lam acc. lam kv : (k, v). f acc kv.0 kv.1) acc s
```
</ToggleWrapper>
</DocBlock>

