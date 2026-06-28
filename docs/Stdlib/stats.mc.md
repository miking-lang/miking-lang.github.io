import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# stats.mc  
  

Standard statistics\-related functions

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/math.mc"} style={S.link}>math.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>  
  
## Variables  
  

          <DocBlock title="logSumExp" kind="let">

```mc
let logSumExp vs : [Float] -> Float
```

<Description>{`logSumExp function, using logSumExp\-trick.`}</Description>


<ToggleWrapper text="Code..">
```mc
let logSumExp: [Float] -> Float = lam vs.
  let max =
    foldl (lam acc. lam v. if geqf v acc then v else acc) (negf inf) vs in
  addf max (log (foldl (lam acc. lam v. addf acc (exp (subf v max))) 0. vs))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalizeFloatSeq" kind="let">

```mc
let normalizeFloatSeq vs : [Float] -> [Float]
```

<Description>{`Normalize a flot sequence \(i.e., scale elements so that the sum of all  
elements is 1\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let normalizeFloatSeq: [Float] -> [Float] = lam vs.
  let sum = foldl1 addf vs in
  map (lam v. divf v sum) vs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mean" kind="let">

```mc
let mean vs : [Float] -> Float
```

<Description>{`Standard arithmetic mean.`}</Description>


<ToggleWrapper text="Code..">
```mc
let mean: [Float] -> Float = lam vs.
  let sum = foldl1 addf vs in
  divf sum (int2float (length vs))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="weightedMean" kind="let">

```mc
let weightedMean ws vs : [Float] -> [Float] -> Float
```

<Description>{`Weighted arithmetic mean \(normalizes weights\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let weightedMean: [Float] -> [Float] -> Float = lam ws. lam vs.
  let nws = normalizeFloatSeq ws in
  foldl2 (lam acc. lam w. lam v. addf acc (mulf w v)) 0. nws vs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logWeightedMean" kind="let">

```mc
let logWeightedMean lws vs : [Float] -> [Float] -> Float
```

<Description>{`Numerically stable \(hopefully\) log\-weighted arithmetic mean \(normalizes  
weights\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let logWeightedMean: [Float] -> [Float] -> Float = lam lws. lam vs.
  let l = int2float (length lws) in
  let lse = logSumExp lws in
  let m = subf lse (log l) in
  let nlws = map (lam lw. subf lw m) lws in
  let nws = map exp nlws in -- Normalized weights, weight sum is l = (length lws)
  foldl2 (lam acc. lam nw. lam v. addf acc (divf (mulf nw v) l)) 0. nws vs
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

let eqfe = eqfApprox 1e-10 in

utest logSumExp [log 1., log 2., log 3.] with log 6. using eqfe in
utest logSumExp [log 5., log 6., log 7.] with log 18. using eqfe in
utest logSumExp [log 0.001, log 0.002, log 0.003] with log 0.006 using eqfe in

utest normalizeFloatSeq [2., 3., 5.] with [0.2, 0.3, 0.5] in
utest normalizeFloatSeq [20., 30., 50.] with [0.2, 0.3, 0.5] in

utest mean [1., 2., 3.] with 2. using eqfe in
utest mean [1., 5., 3.] with 3. using eqfe in

utest weightedMean [1., 5., 4.] [1., 2., 8.] with 4.3 using eqfe in
utest weightedMean [2., 3., 5.] [1., 2., 8.] with 4.8 using eqfe in

utest logWeightedMean [log 1., log 5., log 4.] [1., 2., 8.] with 4.3 using eqfe in
utest logWeightedMean [log 2., log 3., log 5.] [1., 2., 8.] with 4.8 using eqfe in

()
```
</ToggleWrapper>
</DocBlock>

