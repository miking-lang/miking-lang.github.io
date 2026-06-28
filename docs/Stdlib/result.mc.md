import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# result.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/either.mc"} style={S.link}>either.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>  
  
## Types  
  

          <DocBlock title="Result" kind="type">

```mc
type Result
```



<ToggleWrapper text="Code..">
```mc
type Result w e a
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="ResultOk" kind="con">

```mc
con ResultOk : all w . all e . all a . { warnings: Map Symbol w, value: a } -> Result w e a
```

<Description>{`NOTE\(vipa, 2022\-01\-21\): These constructors are not intended to be  
public, there are invariants that the outside world is unlikely to  
preserve.`}</Description>


<ToggleWrapper text="Code..">
```mc
con ResultOk : all w. all e. all a.
  { warnings : Map Symbol w, value : a } -> Result w e a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ResultErr" kind="con">

```mc
con ResultErr : all w . all e . all a . { warnings: Map Symbol w, errors: Map Symbol e } -> Result w e a
```



<ToggleWrapper text="Code..">
```mc
con ResultErr : all w. all e. all a.
  { warnings : Map Symbol w, errors : Map Symbol e } -> Result w e a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_emptyMap" kind="let">

```mc
let _emptyMap _ : all x. () -> Map Symbol x
```



<ToggleWrapper text="Code..">
```mc
let _emptyMap
  : all x. () -> Map Symbol x
  -- TODO(aathn, 2022-01-21): Relax value restriction
  -- TODO(vipa, 2022-01-21): This assumes that sym2hash is a perfect
  -- hash, i.e., that there are no collisions, which is presently true
  -- but might not be in the future.
  = lam. mapEmpty (lam l. lam r. subi (sym2hash l) (sym2hash r))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_consume" kind="let">

```mc
let _consume val : all w. all e. all a. Result w e a -> ([w], Either [e] a)
```

<Description>{`Produce a value to pattern match on from a result, for when we want  
to report errors and warnings instead of perform additional  
computations.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _consume
  : all w. all e. all a. Result w e a -> ([w], Either [e] a)
  = lam val.
    switch val
    case ResultOk r then (mapValues r.warnings, Right r.value)
    case ResultErr r then (mapValues r.warnings, Left (mapValues r.errors))
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_prepTest" kind="let">

```mc
let _prepTest x : all a. Result Char Int a -> (String, Either [Int] a)
```

<Description>{`The order of warnings and errors is not significant, thus we call  
this function on a result to be compared in a utest to get a stable  
ordering.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _prepTest
  : all a. Result Char Int a -> ([Char], Either [Int] a)
  = lam x.
    match _consume x with (w, r) in
    (sort cmpChar w, eitherBiMap (sort subi) identity r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_ok" kind="let">

```mc
let _ok value : all w. all e. all a. a -> Result w e a
```

<Description>{`Produce a single value without any warnings or errors. Also known  
as \`pure\` or \`return\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _ok
  : all w. all e. all a. a -> Result w e a
  = lam value. ResultOk { warnings = _emptyMap (), value = value }
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest _prepTest (_ok 1) with ([], Right 1)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_err" kind="let">

```mc
let _err err : all w. all e. all a. e -> Result w e a
```

<Description>{`Produce a single error. Note that this function is not  
referentially transparent, different invocations produce distinct  
errors.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _err
  : all w. all e. all a. e -> Result w e a
  = lam err.
    let id = gensym () in
    ResultErr { warnings = _emptyMap (), errors = mapInsert id err (_emptyMap ()) }
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest match _prepTest (_err 1) with ([], Left [1]) then true else false
with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_warn" kind="let">

```mc
let _warn warn : all w. all e. w -> Result w e ()
```

<Description>{`Produce a single warning. Note that this function is not  
referentially transparent, different invocations produce distinct  
warnings.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _warn
  : all w. all e. w -> Result w e ()
  = lam warn.
    let id = gensym () in
    ResultOk { warnings = mapInsert id warn (_emptyMap ()), value = () }
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest _prepTest (_warn 'a') with (['a'], Right ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_warns" kind="let">

```mc
let _warns warns val : all w. all e. all a. Map Symbol w -> Result w e a -> Result w e a
```

<Description>{`Internal. Attach multiple warnings at once to a result.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _warns
  : all w. all e. all a. Map Symbol w -> Result w e a -> Result w e a
  = lam warns. lam val.
    switch val
    case ResultOk r then ResultOk {r with warnings = mapUnion r.warnings warns}
    case ResultErr r then ResultErr {r with warnings = mapUnion r.warnings warns}
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_asError" kind="let">

```mc
let _asError start : all w. all e. all a. Result w e a -> {errors: Map Symbol e, warnings: Map Symbol w}
```

<Description>{`Internal. Takes a result, pretends that it's a \`ResultErr\`, and returns the  
contained record. Note that the \`errors\` field can be empty, even  
though that's not possible for \`ResultErr\` normally.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _asError
  : all w. all e. all a. Result w e a -> { warnings : Map Symbol w, errors : Map Symbol e }
  = lam start.
    switch start
    case ResultOk r then { warnings = r.warnings, errors = (_emptyMap ()) }
    case ResultErr r then r
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_mergeErrors" kind="let">

```mc
let _mergeErrors a b : all w. all e. {errors: Map Symbol e, warnings: Map Symbol w} -> {errors: Map Symbol e, warnings: Map Symbol w} -> {errors: Map Symbol e, warnings: Map Symbol w}
```

<Description>{`Internal. Merge the contents of multiple errors together.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _mergeErrors
  : all w. all e.
  { warnings : Map Symbol w, errors : Map Symbol e } ->
  { warnings : Map Symbol w, errors : Map Symbol e } ->
  { warnings : Map Symbol w, errors : Map Symbol e }
  = lam a. lam b.
    { warnings = mapUnion a.warnings b.warnings, errors = mapUnion a.errors b.errors }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_map" kind="let">

```mc
let _map f start : all w. all e. all a. all b. (a -> b) -> Result w e a -> Result w e b
```

<Description>{`Update the value, if any, inside the \`Result\`. Preserves all errors  
and warnings.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _map
  : all w. all e. all a. all b. (a -> b) -> Result w e a -> Result w e b
  = lam f. lam start.
    switch start
    case ResultOk {warnings = w, value = v} then ResultOk {warnings = w, value = f v}
    case ResultErr r then ResultErr r
    end
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest _prepTest (_map (addi 1) (_ok 3)) with ([], Right 4)
utest _prepTest (_map (addi 1) (_err 3)) with ([], Left [3])
utest _prepTest (_map (addi 1) (_map (lam. 3) (_warn 'a'))) with (['a'], Right 4)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_apply" kind="let">

```mc
let _apply f a : all w. all e. all a. all b. Result w e (a -> b) -> Result w e a -> Result w e b
```

<Description>{`Apply a function in a \`Result\` to a value in another  
\`Result\`. Preserves all errors and warnings.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _apply
  : all w. all e. all a. all b. Result w e (a -> b) -> Result w e a -> Result w e b
  = lam f. lam a.
    match (f, a) with (ResultOk f, ResultOk a) then
      ResultOk { warnings = mapUnion f.warnings a.warnings, value = f.value a.value }
    else
      ResultErr (_mergeErrors (_asError f) (_asError a))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest _prepTest (_apply (_ok (addi 1)) (_ok 2)) with ([], Right 3)
utest _prepTest (_apply (_map (lam. lam x. x) (_warn 'a')) (_warn 'b')) with (['a', 'b'], Right ())
utest _prepTest (_apply (_map (lam. addi 1) (_warn 'b')) (_ok 2)) with (['b'], Right 3)
utest match _prepTest (_apply (_err 7) (_ok 8)) with ([], Left [7]) then true else false
with true
utest match _prepTest (_apply (_err 7) (_warn 'c')) with (['c'], Left [7]) then true else false
with true
utest _prepTest (_apply (_ok (addi 1)) (_err 8)) with ([], Left [8])
utest match _prepTest (_apply (_err 7) (_err 8)) with ([], Left [7, 8]) then true else false
with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_map2" kind="let">

```mc
let _map2 f a b : all w. all e. all a1. all a2. all b. (a1 -> a2 -> b) -> Result w e a1 -> Result w e a2 -> Result w e b
```

<Description>{`Perform a computation on the values present in two \`Results\` if  
neither is an error. Preserves the errors and warnings of both  
inputs.  
Semantically equivalent with:  
let map2 = lam f. lam a. lam b. apply \(map f a\) b`}</Description>


<ToggleWrapper text="Code..">
```mc
let _map2
  : all w. all e. all a1. all a2. all b. (a1 -> a2 -> b) -> Result w e a1 -> Result w e a2 -> Result w e b
  = lam f. lam a. lam b.
    match (a, b) with (ResultOk a, ResultOk b) then
      ResultOk { warnings = mapUnion a.warnings b.warnings, value = f a.value b.value }
    else
      ResultErr (_mergeErrors (_asError a) (_asError b))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let semantics = lam f. lam a. lam b. _apply (_map f a) b in
  let errs = [_err 1, _err 2, _err 3] in
  let f = lam a. lam b. (a, b) in
  let eqPair : (Int, Int) -> (Int, Int) -> Bool = lam a. lam b. and (eqi a.0 b.0) (eqi a.1 b.1) in
  let eq : Result Char Int (Int, Int) -> Result Char Int (Int, Int) -> Bool = lam l. lam r.
    let l = _prepTest l in
    let r = _prepTest r in
    and (eqSeq eqChar l.0 r.0) (eitherEq (eqSeq eqi) eqPair l.1 r.1) in
  for_ (cons (_ok 1) errs)
    (lam a. for_ (cons (_ok 2) errs)
      (lam b. utest _map2 f a b with semantics f a b using eq in ()))
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_withAnnotations" kind="let">

```mc
let _withAnnotations r1 r2 : all w. all e. all a. all b. Result w e a -> Result w e b -> Result w e b
```

<Description>{`Take all warnings and errors from both inputs, but only the value  
in the second input \(if neither input has an error\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let _withAnnotations
  : all w. all e. all a. all b. Result w e a -> Result w e b -> Result w e b
  = lam r1. lam r2. _map2 (lam. lam b. b) r1 r2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_map3" kind="let">

```mc
let _map3 f a b c : all w. all e. all a1. all a2. all a3. all b. (a1 -> a2 -> a3 -> b) -> Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e b
```

<Description>{`Perform a computation on the values present in three \`Results\` if  
none is an error. Preserves the errors and warnings of all inputs.  
Semantically equivalent with:  
let map3 = lam f. lam a. lam b. lam c. apply \(apply \(map f a\) b\) c`}</Description>


<ToggleWrapper text="Code..">
```mc
let _map3
  : all w. all e. all a1. all a2. all a3. all b. (a1 -> a2 -> a3 -> b) -> Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e b
  = lam f. lam a. lam b. lam c.
    match (a, b, c) with (ResultOk a, ResultOk b, ResultOk c) then
      ResultOk { warnings = mapUnion (mapUnion a.warnings b.warnings) c.warnings, value = f a.value b.value c.value }
    else
      ResultErr (_mergeErrors (_mergeErrors (_asError a) (_asError b)) (_asError c))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let semantics = lam f. lam a. lam b. lam c. _apply (_apply (_map f a) b) c in
  let errs = [_err 1, _err 2, _err 3] in
  let f = lam a. lam b. lam c. (a, b, c) in
  let eqPair : (Int, Int, Int) -> (Int, Int, Int) -> Bool = lam a. lam b. and (and (eqi a.0 b.0) (eqi a.1 b.1)) (eqi a.2 b.2) in
  let eq : Result Char Int (Int, Int, Int) -> Result Char Int (Int, Int, Int) -> Bool = lam l. lam r.
    let l = _prepTest l in
    let r = _prepTest r in
    and (eqSeq eqChar l.0 r.0) (eitherEq (eqSeq eqi) eqPair l.1 r.1) in
  for_ (cons (_ok 1) errs)
    (lam a. for_ (cons (_ok 2) errs)
      (lam b. for_ (cons (_ok 3) errs)
        (lam c. utest _map3 f a b c with semantics f a b c using eq in ())))
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_map4" kind="let">

```mc
let _map4 f a b c d : all w. all e. all a1. all a2. all a3. all a4. all b. (a1 -> a2 -> a3 -> a4 -> b) -> Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e a4 -> Result w e b
```

<Description>{`Perform a computation on the values present in three \`Results\` if  
none is an error. Preserves the errors and warnings of all inputs.  
Semantically equivalent with:  
let map4 = lam f. lam a. lam b. lam c. lam d. apply \(apply \(apply \(map f a\) b\) c\) d`}</Description>


<ToggleWrapper text="Code..">
```mc
let _map4
  : all w. all e. all a1. all a2. all a3. all a4. all b. (a1 -> a2 -> a3 -> a4 -> b) -> Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e a4 -> Result w e b
  = lam f. lam a. lam b. lam c. lam d.
    match (a, b, c, d) with (ResultOk a, ResultOk b, ResultOk c, ResultOk d) then
      ResultOk { warnings = mapUnion (mapUnion (mapUnion a.warnings b.warnings) c.warnings) d.warnings, value = f a.value b.value c.value d.value }
    else
      ResultErr (_mergeErrors (_mergeErrors (_mergeErrors (_asError a) (_asError b)) (_asError c)) (_asError d))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let semantics = lam f. lam a. lam b. lam c. lam d. _apply (_apply (_apply (_map f a) b) c) d in
  let errs = [_err 1, _err 2, _err 3] in
  let f = lam a. lam b. lam c. lam d. (a, b, c, d) in
  let eqPair : (Int, Int, Int, Int) -> (Int, Int, Int, Int) -> Bool = lam a. lam b. and (and (and (eqi a.0 b.0) (eqi a.1 b.1)) (eqi a.2 b.2)) (eqi a.3 b.3) in
  let eq : Result Char Int (Int, Int, Int, Int) -> Result Char Int (Int, Int, Int, Int) -> Bool = lam l. lam r.
    let l = _prepTest l in
    let r = _prepTest r in
    and (eqSeq eqChar l.0 r.0) (eitherEq (eqSeq eqi) eqPair l.1 r.1) in
  for_ (cons (_ok 1) errs)
    (lam a. for_ (cons (_ok 2) errs)
      (lam b. for_ (cons (_ok 3) errs)
        (lam c. for_ (cons (_ok 4) errs)
          (lam d. utest _map4 f a b c d with semantics f a b c d using eq in ()))))
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_map5" kind="let">

```mc
let _map5 f a b c d e : all w. all e. all a1. all a2. all a3. all a4. all a5. all b. (a1 -> a2 -> a3 -> a4 -> a5 -> b) -> Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e a4 -> Result w e a5 -> Result w e b
```

<Description>{`Perform a computation on the values present in three \`Results\` if  
none is an error. Preserves the errors and warnings of all inputs.  
Semantically equivalent with:  
let map5 = lam f. lam a. lam b. lam c. lam d. lam e. apply \(apply \(apply \(apply \(map f a\) b\) c\) d\) e`}</Description>


<ToggleWrapper text="Code..">
```mc
let _map5
  : all w. all e. all a1. all a2. all a3. all a4. all a5. all b. (a1 -> a2 -> a3 -> a4 -> a5 -> b) -> Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e a4 -> Result w e a5 -> Result w e b
  = lam f. lam a. lam b. lam c. lam d. lam e.
    match (a, b, c, d, e) with (ResultOk a, ResultOk b, ResultOk c, ResultOk d, ResultOk e) then
      ResultOk { warnings = mapUnion (mapUnion (mapUnion (mapUnion a.warnings b.warnings) c.warnings) d.warnings) e.warnings, value = f a.value b.value c.value d.value e.value }
    else
      ResultErr (_mergeErrors (_mergeErrors (_mergeErrors (_mergeErrors (_asError a) (_asError b)) (_asError c)) (_asError d)) (_asError e))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let semantics = lam f. lam a. lam b. lam c. lam d. lam e. _apply (_apply (_apply (_apply (_map f a) b) c) d) e in
  let errs = [_err 1, _err 2, _err 3] in
  let f = lam a. lam b. lam c. lam d. lam e. (a, b, c, d, e) in
  let eqPair : (Int, Int, Int, Int, Int) -> (Int, Int, Int, Int, Int) -> Bool = lam a. lam b. and (and (and (and (eqi a.0 b.0) (eqi a.1 b.1)) (eqi a.2 b.2)) (eqi a.3 b.3)) (eqi a.4 b.4) in
  let eq : Result Char Int (Int, Int, Int, Int, Int) -> Result Char Int (Int, Int, Int, Int, Int) -> Bool = lam l. lam r.
    let l = _prepTest l in
    let r = _prepTest r in
    and (eqSeq eqChar l.0 r.0) (eitherEq (eqSeq eqi) eqPair l.1 r.1) in
  for_ (cons (_ok 1) errs)
    (lam a. for_ (cons (_ok 2) errs)
      (lam b. for_ (cons (_ok 3) errs)
        (lam c. for_ (cons (_ok 4) errs)
          (lam d. for_ (cons (_ok 5) errs)
            (lam e. utest _map5 f a b c d e with semantics f a b c d e using eq in ())))))
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_mapM" kind="let">

```mc
let _mapM f : all w. all e. all a. all b. (a -> Result w e b) -> [a] -> Result w e [b]
```

<Description>{`Perform a computation on the values of a sequence. Produces a non\-error only  
if all individual computations produce a non\-error. Preserves all errors and  
warnings.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _mapM
  : all w. all e. all a. all b. (a -> Result w e b) -> [a] -> Result w e [b]
  = lam f.
    recursive
      let workOk
        : Map Symbol w -> [b] -> [a] -> Result w e [b]
        = lam accWarn. lam acc. lam list.
          match list with [a] ++ list then
            switch f a
            case ResultOk r then workOk (mapUnion accWarn r.warnings) (snoc acc r.value) list
            case ResultErr r then workErr {r with warnings = mapUnion accWarn r.warnings} list
            end
          else
            ResultOk { warnings = accWarn, value = acc }
      let workErr
        : { warnings : Map Symbol w, errors : Map Symbol e } -> [a] -> Result w e [b]
        = lam acc. lam list.
          match list with [a] ++ list then
            workErr (_mergeErrors acc (_asError (f a))) list
          else
            ResultErr acc
    in workOk (_emptyMap ()) []
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  -- Multiply by 10, error 0 on negative, warn 'a' on 0.
  let work : Int -> Result Char Int Int = lam x.
    if lti x 0 then _err 0 else
    let res = _ok (muli x 10) in
    if eqi x 0 then _withAnnotations (_warn 'a') res else res in
  utest _prepTest (_mapM work [0, 1, 2]) with (['a'], Right [0, 10, 20]) in
  utest _prepTest (_mapM work [0, 1, 2, 0]) with (['a', 'a'], Right [0, 10, 20, 0]) in
  utest _prepTest (_mapM work [0, negi 1, 2]) with (['a'], Left [0]) in
  utest _prepTest (_mapM work [0, negi 1, negi 2]) with (['a'], Left [0, 0]) in
  ()
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_foldlM" kind="let">

```mc
let _foldlM f acc : all w. all e. all a. all b. (a -> b -> Result w e a) -> a -> [b] -> Result w e a
```



<ToggleWrapper text="Code..">
```mc
let _foldlM : all w. all e. all a. all b.
  (a -> b -> (Result w e a)) -> a -> [b] -> Result w e a
  = lam f. lam acc.
    recursive
      let workOK : Map Symbol w -> a -> [b] -> Result w e a
        = lam accWarn. lam acc. lam seq.
          match seq with [hd] ++ tl then
            switch f acc hd
            case ResultOk c then
              workOK (mapUnion accWarn c.warnings) (c.value) tl
            case ResultErr c then
              ResultErr {c with warnings = mapUnion accWarn c.warnings }
            end
          else
            ResultOk { warnings = accWarn, value = acc }
    in workOK (_emptyMap ()) acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_mapAccumLM" kind="let">

```mc
let _mapAccumLM f acc : all w. all e. all a. all b. all c. (a -> b -> (a, Result w e c)) -> a -> [b] -> (a, Result w e [c])
```

<Description>{`Perform a computation on the values of a sequence while simultaneously  
folding an accumulator over the sequence from the left. Produces a non\-error  
only if all individual computations produce a non\-error. All errors and  
warnings are preserved.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _mapAccumLM : all w. all e. all a. all b. all c.
  (a -> b -> (a, Result w e c)) -> a -> [b] -> (a, Result w e [c])
  = lam f. lam acc.
    recursive
      let workOK : Map Symbol w -> (a, [c]) -> [b] -> (a, Result w e [c])
        = lam accWarn. lam acc. lam seq.
          match acc with (a, cs) in
          match seq with [b] ++ seq then
            switch f a b
            case (a, ResultOk c) then
              workOK (mapUnion accWarn c.warnings) (a, snoc cs c.value) seq
            case (a, ResultErr c) then
              workErr { c with warnings = mapUnion accWarn c.warnings } a seq
            end
          else
            (a, ResultOk { warnings = accWarn, value = cs })
      let workErr
        : { warnings : Map Symbol w, errors : Map Symbol e }
          -> a
            -> [b]
              -> (a, Result w e [c])
        = lam accErr. lam a. lam seq.
          match seq with [b] ++ seq then
            match f a b with (a, c) in
            workErr (_mergeErrors accErr (_asError c)) a seq
          else
            (a, ResultErr accErr)
    in workOK (_emptyMap ()) (acc, [])
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  -- Multiply by 10 and reverse the sequence. Produces error 0 on negative and
  -- warn 'a' on 0.
  let work : [Int] -> Int -> ([Int], Result Char Int Int)
    = lam acc. lam x.
      let acc = cons x acc in
      let x = if lti x 0 then _err 0 else
        let res = _ok (muli x 10) in
        if eqi x 0 then _withAnnotations (_warn 'a') res else res in
      (acc, x) in
  let _prepTest = lam p. (p.0, _prepTest p.1) in
  utest _prepTest (_mapAccumLM work [] [0, 1, 2]) with
    ([2, 1, 0], (['a'], Right [0, 10, 20])) in
  utest _prepTest (_mapAccumLM work [] [0, negi 1, 2, 0]) with
    ([0, 2, negi 1 ,0], (['a', 'a'], Left [0])) in
  utest _prepTest (_mapAccumLM work [] [0, negi 1, negi 2]) with
    ([negi 2, negi 1 ,0], (['a'], Left [0, 0])) in
  utest _prepTest (_mapAccumLM work [] [0, 0, negi 2]) with
    ([negi 2, 0 ,0], (['a', 'a'], Left [0])) in
  ()
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_toOption" kind="let">

```mc
let _toOption r : all w. all e. all a. Result w e a -> Option a
```

<Description>{`Convert a Result to an Option, discarding any information present  
about warnings or a potential error.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _toOption
  : all w. all e. all a. Result w e a -> Option a
  = lam r.
    match r with ResultOk x then Some x.value else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_bind" kind="let">

```mc
let _bind start f : all w. all e. all a. all b. Result w e a -> (a -> Result w e b) -> Result w e b
```

<Description>{`Perform a computation only if its input is error free. Preserves  
warnings and errors, but if the input is an error then the action  
won't run, thus any errors or warnings it would have been produced  
are not present in the result.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _bind
  : all w. all e. all a. all b. Result w e a -> (a -> Result w e b) -> Result w e b
  = lam start. lam f.
    switch start
    case ResultOk r then _warns r.warnings (f r.value)
    case ResultErr r then ResultErr r
    end
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest match _prepTest (_bind (_err 0) (lam. _err 1)) with ([], Left [0]) then true else false
with true
utest match _prepTest (_bind (_ok 0) (lam. _err 1)) with ([], Left [1]) then true else false
with true
utest match _prepTest (_bind (_withAnnotations (_warn 'a') (_ok 0)) (lam. _err 1)) with (['a'], Left [1]) then true else false
with true
utest _prepTest (_bind (_withAnnotations (_warn 'a') (_ok 0)) (lam x. _ok (addi x 1))) with (['a'], Right 1)
utest _prepTest (_bind (_withAnnotations (_warn 'a') (_ok 0)) (lam x. _withAnnotations (_warn 'b') (_ok (addi x 1)))) with (['a', 'b'], Right 1)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_bind2" kind="let">

```mc
let _bind2 a b f : all w. all e. all a1. all a2. all b. Result w e a1 -> Result w e a2 -> (a1 -> a2 -> Result w e b) -> Result w e b
```

<Description>{`Perform a computation only if its inputs are error free. Preserves  
warnings and errors, but if the inputs have an error then the  
action won't run, thus any errors or warnings it would have been  
produced are not present in the result.  
Semantically equivalent with:  
let bind2 = lam a. lam b. lam f. bind \(map2 \(lam a. lam b. \(a, b\)\) a b\) \(lam x. f x.0 x.1\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let _bind2
  : all w. all e. all a1. all a2. all b. Result w e a1 -> Result w e a2 -> (a1 -> a2 -> Result w e b) -> Result w e b
  = lam a. lam b. lam f.
    match (a, b) with (ResultOk a, ResultOk b) then
      _warns (mapUnion a.warnings b.warnings) (f a.value b.value)
    else
      ResultErr (_mergeErrors (_asError a) (_asError b))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let semantics = lam a. lam b. lam f. _bind (_map2 (lam a. lam b. (a, b)) a b) (lam x: (Int, Int). f x.0 x.1) in
  let errs = [_err 1, _err 2, _err 3] in
  let f = lam a. lam b. _withAnnotations (_warn 'a') (_ok (a, b)) in
  let eqPair : (Int, Int) -> (Int, Int) -> Bool = lam a. lam b. and (eqi a.0 b.0) (eqi a.1 b.1) in
  let eq : Result Char Int (Int, Int) -> Result Char Int (Int, Int) -> Bool = lam l. lam r.
    let l = _prepTest l in
    let r = _prepTest r in
    and (eqSeq eqChar l.0 r.0) (eitherEq (eqSeq eqi) eqPair l.1 r.1) in
  for_ (cons (_ok 1) errs)
    (lam a. for_ (cons (_ok 2) errs)
      (lam b. utest _bind2 a b f with semantics a b f using eq in ()))
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_bind3" kind="let">

```mc
let _bind3 a b c f : all w. all e. all a1. all a2. all a3. all b. Result w e a1 -> Result w e a2 -> Result w e a3 -> (a1 -> a2 -> a3 -> Result w e b) -> Result w e b
```

<Description>{`Perform a computation only if its inputs are error free. Preserves  
warnings and errors, but if the inputs have an error then the  
action won't run, thus any errors or warnings it would have been  
produced are not present in the result.  
Semantically equivalent with:  
let bind3 = lam a. lam b. lam c. lam f. bind \(map3 \(lam a. lam b. lam c. \(a, b, c\)\) a b c\) \(lam x. f x.0 x.1 x.2\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let _bind3
  : all w. all e. all a1. all a2. all a3. all b. Result w e a1 -> Result w e a2 -> Result w e a3 -> (a1 -> a2 -> a3 -> Result w e b) -> Result w e b
  = lam a. lam b. lam c. lam f.
    match (a, b, c) with (ResultOk a, ResultOk b, ResultOk c) then
      _warns (mapUnion (mapUnion a.warnings b.warnings) c.warnings) (f a.value b.value c.value)
    else
      ResultErr (_mergeErrors (_mergeErrors (_asError a) (_asError b)) (_asError c))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let semantics = lam a. lam b. lam c. lam f. _bind (_map3 (lam a. lam b. lam c. (a, b, c)) a b c) (lam x: (Int, Int, Int). f x.0 x.1 x.2) in
  let errs = [_err 1, _err 2, _err 3] in
  let f = lam a. lam b. lam c. _withAnnotations (_warn 'a') (_ok (a, b, c)) in
  let eqPair : (Int, Int, Int) -> (Int, Int, Int) -> Bool = lam a. lam b. and (and (eqi a.0 b.0) (eqi a.1 b.1)) (eqi a.2 b.2) in
  let eq : Result Char Int (Int, Int, Int) -> Result Char Int (Int, Int, Int) -> Bool = lam l. lam r.
    let l = _prepTest l in
    let r = _prepTest r in
    and (eqSeq eqChar l.0 r.0) (eitherEq (eqSeq eqi) eqPair l.1 r.1) in
  for_ (cons (_ok 1) errs)
    (lam a. for_ (cons (_ok 2) errs)
      (lam b. for_ (cons (_ok 3) errs)
        (lam c. utest _bind3 a b c f with semantics a b c f using eq in ())))
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_bind4" kind="let">

```mc
let _bind4 a b c d f : all w. all e. all a1. all a2. all a3. all a4. all b. Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e a4 -> (a1 -> a2 -> a3 -> a4 -> Result w e b) -> Result w e b
```

<Description>{`Perform a computation only if its inputs are error free. Preserves  
warnings and errors, but if the inputs have an error then the  
action won't run, thus any errors or warnings it would have been  
produced are not present in the result.  
Semantically equivalent with:  
let bind4 = lam a. lam b. lam c. lam d. lam f. bind \(map4 \(lam a. lam b. lam c. lam d. \(a, b, c, d\)\) a b c d\) \(lam x. f x.0 x.1 x.2 x.3\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let _bind4
  : all w. all e. all a1. all a2. all a3. all a4. all b. Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e a4 -> (a1 -> a2 -> a3 -> a4 -> Result w e b) -> Result w e b
  = lam a. lam b. lam c. lam d. lam f.
    match (a, b, c, d) with (ResultOk a, ResultOk b, ResultOk c, ResultOk d) then
      _warns (mapUnion (mapUnion (mapUnion a.warnings b.warnings) c.warnings) d.warnings) (f a.value b.value c.value d.value)
    else
      ResultErr (_mergeErrors (_mergeErrors (_mergeErrors (_asError a) (_asError b)) (_asError c)) (_asError d))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let semantics = lam a. lam b. lam c. lam d. lam f. _bind (_map4 (lam a. lam b. lam c. lam d. (a, b, c, d)) a b c d) (lam x: (Int, Int, Int, Int). f x.0 x.1 x.2 x.3) in
  let errs = [_err 1, _err 2, _err 3] in
  let f = lam a. lam b. lam c. lam d. _withAnnotations (_warn 'a') (_ok (a, b, c, d)) in
  let eqPair : (Int, Int, Int, Int) -> (Int, Int, Int, Int) -> Bool = lam a. lam b. and (and (and (eqi a.0 b.0) (eqi a.1 b.1)) (eqi a.2 b.2)) (eqi a.3 b.3) in
  let eq : Result Char Int (Int, Int, Int, Int) -> Result Char Int (Int, Int, Int, Int) -> Bool = lam l. lam r.
    let l = _prepTest l in
    let r = _prepTest r in
    and (eqSeq eqChar l.0 r.0) (eitherEq (eqSeq eqi) eqPair l.1 r.1) in
  for_ (cons (_ok 1) errs)
    (lam a. for_ (cons (_ok 2) errs)
      (lam b. for_ (cons (_ok 3) errs)
        (lam c. for_ (cons (_ok 4) errs)
          (lam d. utest _bind4 a b c d f with semantics a b c d f using eq in ()))))
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_bind5" kind="let">

```mc
let _bind5 a b c d e f : all w. all e. all a1. all a2. all a3. all a4. all a5. all b. Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e a4 -> Result w e a5 -> (a1 -> a2 -> a3 -> a4 -> a5 -> Result w e b) -> Result w e b
```

<Description>{`Perform a computation only if its inputs are error free. Preserves  
warnings and errors, but if the inputs have an error then the  
action won't run, thus any errors or warnings it would have been  
produced are not present in the result.  
Semantically equivalent with:  
let bind5 = lam a. lam b. lam c. lam d. lam e. lam f. bind \(map5 \(lam a. lam b. lam c. lam d. lam e. \(a, b, c, d, e\)\) a b c d e\) \(lam x. f x.0 x.1 x.2 x.3 x.4\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let _bind5
  : all w. all e. all a1. all a2. all a3. all a4. all a5. all b. Result w e a1 -> Result w e a2 -> Result w e a3 -> Result w e a4 -> Result w e a5 -> (a1 -> a2 -> a3 -> a4 -> a5 -> Result w e b) -> Result w e b
  = lam a. lam b. lam c. lam d. lam e. lam f.
    match (a, b, c, d, e) with (ResultOk a, ResultOk b, ResultOk c, ResultOk d, ResultOk e) then
      _warns (mapUnion (mapUnion (mapUnion (mapUnion a.warnings b.warnings) c.warnings) d.warnings) e.warnings) (f a.value b.value c.value d.value e.value)
    else
      ResultErr (_mergeErrors (_mergeErrors (_mergeErrors (_mergeErrors (_asError a) (_asError b)) (_asError c)) (_asError d)) (_asError e))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let semantics = lam a. lam b. lam c. lam d. lam e. lam f. _bind (_map5 (lam a. lam b. lam c. lam d. lam e. (a, b, c, d, e)) a b c d e) (lam x: (Int, Int, Int, Int, Int). f x.0 x.1 x.2 x.3 x.4) in
  let errs = [_err 1, _err 2, _err 3] in
  let f = lam a. lam b. lam c. lam d. lam e. _withAnnotations (_warn 'a') (_ok (a, b, c, d, e)) in
  let eqPair : (Int, Int, Int, Int, Int) -> (Int, Int, Int, Int, Int) -> Bool = lam a. lam b. and (and (and (and (eqi a.0 b.0) (eqi a.1 b.1)) (eqi a.2 b.2)) (eqi a.3 b.3)) (eqi a.4 b.4) in
  let eq : Result Char Int (Int, Int, Int, Int, Int) -> Result Char Int (Int, Int, Int, Int, Int) -> Bool = lam l. lam r.
    let l = _prepTest l in
    let r = _prepTest r in
    and (eqSeq eqChar l.0 r.0) (eitherEq (eqSeq eqi) eqPair l.1 r.1) in
  for_ (cons (_ok 1) errs)
    (lam a. for_ (cons (_ok 2) errs)
      (lam b. for_ (cons (_ok 3) errs)
        (lam c. for_ (cons (_ok 4) errs)
          (lam d. for_ (cons (_ok 5) errs)
            (lam e. utest _bind5 a b c d e f with semantics a b c d e f using eq in ())))))
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_bindParallel2" kind="let">

```mc
let _bindParallel2 p f : all w1. all e1. all w2. all e2. all a1. all a2. all b1. all b2. (Result w1 e1 a1, Result w2 e2 a2) -> (a1 -> a2 -> (Result w1 e1 b1, Result w2 e2 b2)) -> (Result w1 e1 b1, Result w2 e2 b2)
```

<Description>{`Perform a computation only if both elements in the input are error  
free. Preserves warnings and errors, element\-wise, but if the input have an  
error then the action won't run, thus any errors or warnings it would have  
been produced are not present in the result.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _bindParallel2
  : all w1. all e1. all w2. all e2. all a1. all a2. all b1. all b2.
    (Result w1 e1 a1, Result w2 e2 a2)
      -> (a1 -> a2 -> (Result w1 e1 b1, Result w2 e2 b2))
         -> (Result w1 e1 b1, Result w2 e2 b2)
  = lam p. lam f.
    switch p
    case (ResultOk a1, ResultOk a2) then
      match f a1.value a2.value with (b1, b2) in
      (_warns a1.warnings b1, _warns a2.warnings b2)
    case (a1, a2) then
      (ResultErr (_asError a1), ResultErr (_asError a2))
    end
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let flip = lam x. lam y. (_ok y, _ok x) in
  let _prepTest = lam p. (_prepTest p.0, _prepTest p.1) in

  let r1 = _withAnnotations (_warn 'a') (_ok 1) in
  let r2 = _withAnnotations (_warn 'b') (_ok 2) in
  utest _prepTest (_bindParallel2 (r1, r2) flip) with
    ((['a'], Right 2), (['b'], Right 1))
  in

  let r1 = _withAnnotations (_warn 'a') (_ok 1) in
  let r2 = _withAnnotations (_warn 'b') (_err 2) in
  utest _prepTest (_bindParallel2 (r1, r2) flip) with
    ((['a'], Left []), (['b'], Left [2]))
  in

  let r1 = _withAnnotations (_warn 'a') (_err 1) in
  let r2 = _withAnnotations (_warn 'b') (_ok 2) in
  utest _prepTest (_bindParallel2 (r1, r2) flip) with
    ((['a'], Left [1]), (['b'], Left []))
  in

  let r1 : Result Char Int Int = _withAnnotations (_warn 'a') (_err 1) in
  let r2 = _withAnnotations (_warn 'b') (_err 2) in
  utest _prepTest (_bindParallel2 (r1, r2) flip) with
    ((['a'], Left [1]), (['b'], Left [2]))
  in
  ()
  with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_orElse" kind="let">

```mc
let _orElse f r : all w. all e. all a. (() -> Result w e a) -> Result w e a -> Result w e a
```

<Description>{`Selects \`r\` if it is error free, otherwise selects \`f\` applied to \`\(\)\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _orElse : all w. all e. all a. (() -> Result w e a) -> Result w e a -> Result w e a
  = lam f. lam r.
    match r with ResultOk _ then r else f ()
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let r1 = _withAnnotations (_warn 'a') (_ok 1) in
  let r2 = _withAnnotations (_warn 'b') (_ok 2) in
  utest _prepTest (_orElse (lam. r2) r1) with (['a'], Right 1) in

  let r1 = _withAnnotations (_warn 'a') (_ok 1) in
  let r2 = _withAnnotations (_warn 'b') (_err 2) in
  utest _prepTest (_orElse (lam. r2) r1) with (['a'], Right 1) in

  let r1 = _withAnnotations (_warn 'a') (_err 1) in
  let r2 = _withAnnotations (_warn 'b') (_ok 2) in
  utest _prepTest (_orElse (lam. r2) r1) with (['b'], Right 2) in

  let r1 : Result Char Int Int = _withAnnotations (_warn 'a') (_err 1) in
  let r2 = _withAnnotations (_warn 'b') (_err 2) in
  utest _prepTest (_orElse (lam. r2) r1) with (['b'], Left [2]) in
  ()
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_or" kind="let">

```mc
let _or r1 r2 : all w. all e. all a. Result w e a -> Result w e a -> Result w e a
```

<Description>{`Selects \`r1\` if it is error free, selects \`r2\` if it is error free and \`r1\`  
contains errors. If both \`r1\` and \`r2\` contains errors, these are merged. In  
all cases, warnings are propagated between \`r1\` and \`r2\`.  
NOTE\(oerikss, 2023\-05\-10\): We might not want to keep the semantics of the last  
sentence. On the other\-hand, you can use orElse of you do not want share data  
between \`r1\` and \`r2\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _or : all w. all e. all a. Result w e a -> Result w e a -> Result w e a
  = lam r1. lam r2.
    switch (r1, r2)
    case (ResultOk _, ResultOk r2) then _warns r2.warnings r1
    case (ResultOk _, ResultErr r2) then _warns r2.warnings r1
    case (ResultErr r1, ResultOk _) then _warns r1.warnings r2
    case (ResultErr r1, ResultErr r2) then ResultErr (_mergeErrors r1 r2)
    end
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let r1 = _withAnnotations (_warn 'a') (_ok 1) in
  let r2 = _withAnnotations (_warn 'b') (_ok 2) in
  utest _prepTest (_or r1 r2) with (['a', 'b'], Right 1) in

  let r1 = _withAnnotations (_warn 'a') (_ok 1) in
  let r2 = _withAnnotations (_warn 'b') (_err 2) in
  utest _prepTest (_or r1 r2) with (['a', 'b'], Right 1) in

  let r1 = _withAnnotations (_warn 'a') (_err 1) in
  let r2 = _withAnnotations (_warn 'b') (_ok 2) in
  utest _prepTest (_or r1 r2) with (['a', 'b'], Right 2) in

  let r1 : Result Char Int Int = _withAnnotations (_warn 'a') (_err 1) in
  let r2 = _withAnnotations (_warn 'b') (_err 2) in
  utest _prepTest (_or r1 r2) with (['a', 'b'], Left [1, 2]) in
  ()
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="result" kind="let">

```mc
let result  : all e. all w. all a. all w1. all e1. all a1. all b. all a2. all w2. all e2. all w3. all e3. all a3. all w4. all e4. all a4. all b1. all w5. all e5. all a5. all a6. all b2. all w6. all e6. all a11. all a21. all b3. all w7. all e7. all a12. all a22. all a31. all b4. all w8. all e8. all a13. all a23. all a32. all a41. all b5. all w9. all e9. all a14. all a24. all a33. all a42. all a51. all b6. all w10. all e10. all a7. all w11. all e11. all b7. all w12. all e12. all w13. all e13. all a8. all b8. all w14. all e14. all a15. all a25. all b9. all w15. all e15. all a16. all a26. all a34. all b10. all w16. all e16. all a17. all a27. all a35. all a43. all b11. all w17. all e17. all a18. all a28. all a36. all a44. all a52. all b12. all a9. all b13. all w18. all e18. all w19. all e19. all a10. all w20. all e20. all a19. all a20. all b14. all w21. all e21. all c. all w110. all e110. all a110. all w22. all e22. all a29. all b15. all b21. {ok: a2 -> Result w2 e2 a2, or: Result w5 e5 a5 -> Result w5 e5 a5 -> Result w5 e5 a5, err: e -> Result w e a, map: (a6 -> b2) -> Result w6 e6 a6 -> Result w6 e6 b2, bind: Result w4 e4 a4 -> (a4 -> Result w4 e4 b1) -> Result w4 e4 b1, map2: (a11 -> a21 -> b3) -> Result w7 e7 a11 -> Result w7 e7 a21 -> Result w7 e7 b3, map3: (a12 -> a22 -> a31 -> b4) -> Result w8 e8 a12 -> Result w8 e8 a22 -> Result w8 e8 a31 -> Result w8 e8 b4, map4: (a13 -> a23 -> a32 -> a41 -> b5) -> Result w9 e9 a13 -> Result w9 e9 a23 -> Result w9 e9 a32 -> Result w9 e9 a41 -> Result w9 e9 b5, map5: (a14 -> a24 -> a33 -> a42 -> a51 -> b6) -> Result w10 e10 a14 -> Result w10 e10 a24 -> Result w10 e10 a33 -> Result w10 e10 a42 -> Result w10 e10 a51 -> Result w10 e10 b6, mapM: (a7 -> Result w11 e11 b7) -> [a7] -> Result w11 e11 [b7], warn: w12 -> Result w12 e12 (), apply: Result w13 e13 (a8 -> b8) -> Result w13 e13 a8 -> Result w13 e13 b8, bind2: Result w14 e14 a15 -> Result w14 e14 a25 -> (a15 -> a25 -> Result w14 e14 b9) -> Result w14 e14 b9, bind3: Result w15 e15 a16 -> Result w15 e15 a26 -> Result w15 e15 a34 -> (a16 -> a26 -> a34 -> Result w15 e15 b10) -> Result w15 e15 b10, bind4: Result w16 e16 a17 -> Result w16 e16 a27 -> Result w16 e16 a35 -> Result w16 e16 a43 -> (a17 -> a27 -> a35 -> a43 -> Result w16 e16 b11) -> Result w16 e16 b11, bind5: Result w17 e17 a18 -> Result w17 e17 a28 -> Result w17 e17 a36 -> Result w17 e17 a44 -> Result w17 e17 a52 -> (a18 -> a28 -> a36 -> a44 -> a52 -> Result w17 e17 b12) -> Result w17 e17 b12, foldlM: (a9 -> b13 -> Result w18 e18 a9) -> a9 -> [b13] -> Result w18 e18 a9, orElse: (() -> Result w19 e19 a10) -> Result w19 e19 a10 -> Result w19 e19 a10, consume: Result w3 e3 a3 -> ([w3], Either [e3] a3), toOption: Result w20 e20 a19 -> Option a19, mapAccumLM: (a20 -> b14 -> (a20, Result w21 e21 c)) -> a20 -> [b14] -> (a20, Result w21 e21 [c]), bindParallel2: (Result w110 e110 a110, Result w22 e22 a29) -> (a110 -> a29 -> (Result w110 e110 b15, Result w22 e22 b21)) -> (Result w110 e110 b15, Result w22 e22 b21), withAnnotations: Result w1 e1 a1 -> Result w1 e1 b -> Result w1 e1 b}
```



<ToggleWrapper text="Code..">
```mc
let result =
  -- Constructors
  { ok = _ok
  , err = _err
  , warn = _warn
  -- Destructors
  , consume = _consume
  , toOption = _toOption
  -- Mapping, action produces no new errors or warnings
  , map = _map
  , map2 = _map2
  , map3 = _map3
  , map4 = _map4
  , map5 = _map5
  , apply = _apply
  , withAnnotations = _withAnnotations
  -- Mapping, action can produce new errors and/or warnings
  , bind = _bind
  , bind2 = _bind2
  , bind3 = _bind3
  , bind4 = _bind4
  , bind5 = _bind5
  , bindParallel2 = _bindParallel2
  , mapM = _mapM
  , mapAccumLM = _mapAccumLM
  , foldlM = _foldlM
  -- Conditionals
  , orElse = _orElse
  , or = _or
  }
```
</ToggleWrapper>
</DocBlock>

