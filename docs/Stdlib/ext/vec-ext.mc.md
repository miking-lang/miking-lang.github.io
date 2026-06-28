import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# vec-ext.mc  
  

High\-level vector library.



  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/either.mc"} style={S.link}>either.mc</a>, <a href={"/docs/Stdlib/ext/arr-ext.mc"} style={S.link}>arr-ext.mc</a>, <a href={"/docs/Stdlib/ext/cblas-ext.mc"} style={S.link}>cblas-ext.mc</a>  
  
## Types  
  

          <DocBlock title="VecError" kind="type">

```mc
type VecError
```

<Description>{`Enumerates vector operation errors.`}</Description>


<ToggleWrapper text="Code..">
```mc
type VecError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Vec" kind="type">

```mc
type Vec
```



<ToggleWrapper text="Code..">
```mc
type Vec a = ExtArr a
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="LengthMismatch" kind="con">

```mc
con LengthMismatch : () -> VecError
```



<ToggleWrapper text="Code..">
```mc
con LengthMismatch : () -> VecError
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="vecErrorToString" kind="let">

```mc
let vecErrorToString err : VecError -> String
```

<Description>{`String representation of a matrix error.`}</Description>


<ToggleWrapper text="Code..">
```mc
let vecErrorToString : VecError -> String
  = lam err.
    switch err
    case LengthMismatch _ then "Length mismatch"
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="vecHasSameLength" kind="let">

```mc
let vecHasSameLength a b : all a. all b. Vec a -> Vec b -> Bool
```

<Description>{`Vectors has same length.`}</Description>


<ToggleWrapper text="Code..">
```mc
let vecHasSameLength : all a. all b. Vec a -> Vec b -> Bool
  = lam a. lam b.
    eqi (extArrLength a) (extArrLength b)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="vecAdd" kind="let">

```mc
let vecAdd a b : Vec Float -> Vec Float -> Either VecError (Vec Float)
```

<Description>{`Adds two vectors. Returns a fresh vector.`}</Description>


<ToggleWrapper text="Code..">
```mc
let vecAdd : Vec Float -> Vec Float -> Either VecError (Vec Float)
  = lam a. lam b.
    if vecHasSameLength a b then
      let n = extArrLength a in
      let c = extArrMakeUninit (externalExtArrKind b) n in
      externalCblasCopy n b 1 c 1;
      externalCblasAxpy n 1. a 1 c 1;
      Right c
    else Left (LengthMismatch ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="vecAddExn" kind="let">

```mc
let vecAddExn a b : Vec Float -> Vec Float -> Vec Float
```



<ToggleWrapper text="Code..">
```mc
let vecAddExn : Vec Float -> Vec Float -> Vec Float
  = lam a. lam b.
    eitherEither (lam err. error (vecErrorToString err)) (lam x. x) (vecAdd a b)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="vecScale" kind="let">

```mc
let vecScale s a : Float -> Vec Float -> Vec Float
```

<Description>{`Scales vector. Returns a fresh vector.`}</Description>


<ToggleWrapper text="Code..">
```mc
let vecScale : Float -> Vec Float -> Vec Float
  = lam s. lam a.
    let n = extArrLength a in
    let b = extArrMakeUninit (externalExtArrKind a) n in
    externalCblasCopy n a 1 b 1;
    externalCblasScal n s b 1;
    b
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let test = lam kind.
    let toSeq = extArrToSeq in
    let randVec = lam n.
      extArrOfSeq kind (create n (lam. int2float (randIntU 0 10)))
    in
    utest vecAdd (randVec 1) (randVec 2) with Left (LengthMismatch ()) in
    let zeroVec = lam n. extArrMake kind n 0. in
    -- Assert the vector space axioms
    -- (https://en.wikipedia.org/wiki/Vector_space).
    repeat (lam.
      let n = randIntU 0 100 in
      let a = int2float (randIntU 0 10) in
      let b = int2float (randIntU 0 10) in
      let u = randVec n in
      let v = randVec n in
      let w = randVec n in
      -- Associativity of vector addition.
      utest toSeq (vecAddExn u (vecAddExn v w))
        with toSeq (vecAddExn (vecAddExn u v) w)
      in
      -- Commutativity of vector addition.
      utest toSeq (vecAddExn u v) with toSeq (vecAddExn v u) in
      -- Identity element of vector addition.
      utest toSeq (vecAddExn (zeroVec n) v) with toSeq v in
      -- Inverse elements of vector addition.
      utest toSeq (vecAddExn v (vecScale -1. v)) with toSeq (zeroVec n) in
      -- Compatibility of scalar multiplication with field multiplication.
      utest toSeq (vecScale a (vecScale b v))
        with toSeq (vecScale (mulf a b) v)
      in
      -- Identity element of scalar multiplication.
      utest toSeq (vecScale 1. v) with toSeq v in
      -- Distributivity of scalar multiplication with respect to vector addition.
      utest toSeq (vecScale a (vecAddExn u v))
        with toSeq (vecAddExn (vecScale a u) (vecScale a v))
      in
      -- Distributivity of scalar multiplication with respect to field addition.
      utest toSeq (vecScale (addf a b) v)
        with toSeq (vecAddExn (vecScale a v) (vecScale b v))
      in
      ())
      100
  in
  test extArrKindFloat32;
  test extArrKindFloat64;
  () with ()
```
</ToggleWrapper>
</DocBlock>

