import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# arr-ext.mc  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
This file contains a minimal interface to mutable arrays, both internal to  
MCore and shareable with external code.  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>  
  
## Types  
  

          <DocBlock title="Arr" kind="type">

```mc
type Arr
```



<ToggleWrapper text="Code..">
```mc
type Arr a

--------------------------------------------------------------------------------
-- External declarations
--------------------------------------------------------------------------------

external externalArrMake : all a. Int -> a -> Arr a
external externalArrMakeUninitFloat : Int -> Arr Float
external externalArrLength : all a. Arr a -> Int
external externalArrGet : all a. Arr a -> Int -> a
external externalArrSet ! : all a. Arr a -> Int -> a -> ()
external externalArrSub : all a. Arr a -> Int -> Int -> Arr a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExtArrKind" kind="type">

```mc
type ExtArrKind
```



<ToggleWrapper text="Code..">
```mc
type ExtArrKind a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExtArr" kind="type">

```mc
type ExtArr
```



<ToggleWrapper text="Code..">
```mc
type ExtArr a

--------------------------------------------------------------------------------
-- External declarations
--------------------------------------------------------------------------------

external externalExtArrMakeUninit : all a. ExtArrKind a -> Int -> ExtArr a
external externalExtArrKind : all a. ExtArr a -> ExtArrKind a
external externalExtArrLength : all a. ExtArr a -> Int
external externalExtArrGet : all a. ExtArr a -> Int -> a
external externalExtArrSet ! : all a. ExtArr a -> Int -> a -> ()
external externalExtArrCopy : all a. ExtArr a -> ExtArr a
external externalExtArrFill : all a. ExtArr a -> a -> ()

--------------------------------------------------------------------------------
-- ExtArr interface
--------------------------------------------------------------------------------

-- Single precision float kind.
external extArrKindFloat32 : ExtArrKind Float

-- Double precision float kind.
external extArrKindFloat64 : ExtArrKind Float
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="arrMake" kind="let">

```mc
let arrMake n v : all a. Int -> a -> Arr a
```

<Description>{`Creates an array of length \`n\` with all elements set to.`}</Description>


<ToggleWrapper text="Code..">
```mc
let arrMake : all a. Int -> a -> Arr a
  = lam n. lam v. externalArrMake n v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest arrMake 3 0; () with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="arrMakeUninitFloat" kind="let">

```mc
let arrMakeUninitFloat n : Int -> Arr Float
```

<Description>{`Creates a float array of length \`n\` with uninitialized values.`}</Description>


<ToggleWrapper text="Code..">
```mc
let arrMakeUninitFloat : Int -> Arr Float
  = lam n. externalArrMakeUninitFloat n
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest arrMakeUninitFloat 3; () with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="arrLength" kind="let">

```mc
let arrLength a : all a. Arr a -> Int
```

<Description>{`The length of the array.`}</Description>


<ToggleWrapper text="Code..">
```mc
let arrLength : all a. Arr a -> Int
  = lam a. externalArrLength a
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest arrLength (arrMakeUninitFloat 3) with 3
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="arrGetExn" kind="let">

```mc
let arrGetExn a i : all a. Arr a -> Int -> a
```

<Description>{`Gets the \`i\`th element from the array.`}</Description>


<ToggleWrapper text="Code..">
```mc
let arrGetExn : all a. Arr a -> Int -> a
  = lam a. lam i. externalArrGet a i
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest arrGetExn (arrMake 3 1) 0 with 1
utest arrGetExn (arrMake 3 1) 1 with 1
utest arrGetExn (arrMake 3 1) 2 with 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="arrSetExn" kind="let">

```mc
let arrSetExn a i v : all a. Arr a -> Int -> a -> ()
```

<Description>{`Sets the \`i\`th element in the array to the value \`v\` inplace.`}</Description>


<ToggleWrapper text="Code..">
```mc
let arrSetExn : all a. Arr a -> Int -> a -> ()
  = lam a. lam i. lam v. externalArrSet a i v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let a  = arrMakeUninitFloat 3 in
  utest arrSetExn a 0 0. with () in
  utest arrSetExn a 1 1. with () in
  utest arrSetExn a 2 2. with () in
  utest arrGetExn a 0 with 0. in
  utest arrGetExn a 1 with 1. in
  utest arrGetExn a 2 with 2. in

  let a  = arrMake 3 0 in
  utest arrSetExn a 0 0 with () in
  utest arrSetExn a 1 1 with () in
  utest arrSetExn a 2 2 with () in
  utest arrGetExn a 0 with 0 in
  utest arrGetExn a 1 with 1 in
  utest arrGetExn a 2 with 2 in

  ()
  with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="arrSub" kind="let">

```mc
let arrSub a start len : all a. Arr a -> Int -> Int -> Arr a
```

<Description>{`Creates a copy of a subset of the array, starting from \`start\` with length  
\`len\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let arrSub : all a. Arr a -> Int -> Int -> Arr a
  = lam a. lam start. lam len. externalArrSub a start len
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="arrCreate" kind="let">

```mc
let arrCreate n f : all a. Int -> (Int -> a) -> Arr a
```

<Description>{`Creates an array of length \`n\`, where the element at index \`i\` is result of  
the application \`f i\`. Produces an empty array if \`n\` not greater than zero.`}</Description>


<ToggleWrapper text="Code..">
```mc
let arrCreate : all a. Int -> (Int -> a) -> Arr a
  = lam n. lam f.
      if gti n 0 then
        let a0 = f 0 in
        let a = arrMake n a0 in
        repeati
          (lam i. let i = addi i 1 in arrSetExn a i (f i))
          (subi n 1);
        a
      else
        -- NOTE(oerikss, 2025-01-25): The array is empty so we don't care what
        -- the value is.
        unsafeCoerce arrMake 0 0
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest arrLength (arrCreate 0 (lam i. error "impossible")) with 0
utest arrLength (arrCreate 3 (lam i. i)) with 3
utest
  let a  = arrCreate 3 (lam i. i) in
  utest arrGetExn a 0 with 0 in
  utest arrGetExn a 1 with 1 in
  utest arrGetExn a 2 with 2 in
  ()
  with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrMakeUninit" kind="let">

```mc
let extArrMakeUninit kind n : all a. ExtArrKind a -> Int -> ExtArr a
```

<Description>{`Creates an external array of size \`n\` with uninitialized values.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrMakeUninit : all a. ExtArrKind a -> Int -> ExtArr a
  = lam kind. lam n. externalExtArrMakeUninit kind n
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest extArrMakeUninit extArrKindFloat64 3; () with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrKind" kind="let">

```mc
let extArrKind a : all a. ExtArr a -> ExtArrKind a
```

<Description>{`Returns the array kind.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrKind : all a. ExtArr a -> ExtArrKind a
  = lam a. externalExtArrKind a
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  extArrMakeUninit (extArrKind (extArrMakeUninit extArrKindFloat32 1)) 3; ()
  with ()
utest
  extArrMakeUninit (extArrKind (extArrMakeUninit extArrKindFloat64 1)) 3; ()
with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrLength" kind="let">

```mc
let extArrLength a : all a. ExtArr a -> Int
```

<Description>{`The length of the array.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrLength : all a. ExtArr a -> Int
  = lam a. externalExtArrLength a
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest extArrLength (extArrMakeUninit extArrKindFloat64 3) with 3
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrGetExn" kind="let">

```mc
let extArrGetExn a i : all a. ExtArr a -> Int -> a
```

<Description>{`Gets the \`i\`th element from the array.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrGetExn : all a. ExtArr a -> Int -> a
  = lam a. lam i. externalExtArrGet a i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrSetExn" kind="let">

```mc
let extArrSetExn a i v : all a. ExtArr a -> Int -> a -> ()
```

<Description>{`Sets the \`i\`th element of the array to the value \`v\` inplace.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrSetExn : all a. ExtArr a -> Int -> a -> ()
  = lam a. lam i. lam v. externalExtArrSet a i v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let a  = extArrMakeUninit extArrKindFloat64 3 in
  utest extArrSetExn a 0 0. with () in
  utest extArrSetExn a 1 1. with () in
  utest extArrSetExn a 2 2. with () in
  utest extArrGetExn a 0 with 0. in
  utest extArrGetExn a 1 with 1. in
  utest extArrGetExn a 2 with 2. in
  ()
  with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrOfSeq" kind="let">

```mc
let extArrOfSeq kind seq : all a. ExtArrKind a -> [a] -> ExtArr a
```

<Description>{`Creates an external array from a sequence.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrOfSeq : all a. ExtArrKind a -> [a] -> ExtArr a
  = lam kind. lam seq.
    let a = externalExtArrMakeUninit kind (length seq) in
    iteri (externalExtArrSet a) seq;
    a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrToSeq" kind="let">

```mc
let extArrToSeq a : all a. ExtArr a -> [a]
```

<Description>{`Creates a sequence from an external array.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrToSeq : all a. ExtArr a -> [a]
  = lam a. create (externalExtArrLength a) (externalExtArrGet a)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest extArrToSeq (extArrOfSeq extArrKindFloat64 [1., 2., 3.]) with [1., 2., 3.]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrCopy" kind="let">

```mc
let extArrCopy a : all a. ExtArr a -> ExtArr a
```

<Description>{`Copies external array.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrCopy : all a. ExtArr a -> ExtArr a
  = lam a. externalExtArrCopy a
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest extArrToSeq (extArrCopy (extArrOfSeq extArrKindFloat64 [1., 2., 3.]))
  with [1., 2., 3.]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrFill" kind="let">

```mc
let extArrFill a v : all a. ExtArr a -> a -> ()
```

<Description>{`Fills external array.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrFill : all a . ExtArr a -> a -> ()
  = lam a. lam v. externalExtArrFill a v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let a  = extArrMakeUninit extArrKindFloat64 3 in
  utest extArrFill a 1. with () in
  utest extArrGetExn a 0 with 1. in
  utest extArrGetExn a 1 with 1. in
  utest extArrGetExn a 2 with 1. in
  ()
  with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extArrMake" kind="let">

```mc
let extArrMake kind n v : all a. ExtArrKind a -> Int -> a -> ExtArr a
```

<Description>{`Creates an external array.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extArrMake : all a . ExtArrKind a -> Int -> a -> ExtArr a
  = lam kind. lam n. lam v.
    let a = externalExtArrMakeUninit kind n in
    externalExtArrFill a v;
    a
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let a  = extArrMake extArrKindFloat64 3 1. in
  utest extArrGetExn a 0 with 1. in
  utest extArrGetExn a 1 with 1. in
  utest extArrGetExn a 2 with 1. in
  ()
  with ()
```
</ToggleWrapper>
</DocBlock>

