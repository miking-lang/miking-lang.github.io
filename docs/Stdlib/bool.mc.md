import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# bool.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
Defines intrinsic bool operations. See the utests below each function for  
its truth table.

  
  
  
## Variables  
  

          <DocBlock title="not" kind="let">

```mc
let not a : Bool -> Bool
```

<Description>{`Logical NOT`}</Description>


<ToggleWrapper text="Code..">
```mc
let not: Bool -> Bool =
  lam a. if a then false else true
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest not true with false
utest not false with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="and" kind="let">

```mc
let and a b : Bool -> Bool -> Bool
```

<Description>{`Logical AND`}</Description>


<ToggleWrapper text="Code..">
```mc
let and: Bool -> Bool -> Bool =
  lam a. lam b. if a then b else false
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest and true true with true
utest and true false with false
utest and false true with false
utest and false false with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="allb" kind="let">

```mc
let allb  : [Bool] -> Bool
```

<Description>{`Logical AND of sequence`}</Description>


<ToggleWrapper text="Code..">
```mc
let allb : [Bool] -> Bool = foldl and true
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest allb [true, true, true] with true
utest allb [false, true, true] with false
utest allb [true] with true
utest allb [false] with false
utest allb [] with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="or" kind="let">

```mc
let or a b : Bool -> Bool -> Bool
```

<Description>{`Logical OR`}</Description>


<ToggleWrapper text="Code..">
```mc
let or: Bool -> Bool -> Bool =
  lam a. lam b. if a then true else b
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest or true true with true
utest or true false with true
utest or false true with true
utest or false false with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="someb" kind="let">

```mc
let someb  : [Bool] -> Bool
```

<Description>{`Logical OR of sequence`}</Description>


<ToggleWrapper text="Code..">
```mc
let someb : [Bool] -> Bool = foldl or false
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest someb [false, false, false] with false
utest someb [false, true, true] with true
utest someb [true] with true
utest someb [false] with false
utest someb [] with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="xor" kind="let">

```mc
let xor a b : Bool -> Bool -> Bool
```

<Description>{`Logical XOR`}</Description>


<ToggleWrapper text="Code..">
```mc
let xor: Bool -> Bool -> Bool =
  lam a. lam b. if a then not b else b
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest xor true true with false
utest xor true false with true
utest xor false true with true
utest xor false false with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="xnor" kind="let">

```mc
let xnor a b : Bool -> Bool -> Bool
```

<Description>{`Logical XNOR \(a.k.a. equivalence between boolean variables\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let xnor: Bool -> Bool -> Bool =
  lam a. lam b. not (xor a b)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest xnor true true with true
utest xnor true false with false
utest xnor false true with false
utest xnor false false with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="scand" kind="let">

```mc
let scand a b : (() -> Bool) -> (() -> Bool) -> Bool
```

<Description>{`Short\-circuited Logical AND`}</Description>


<ToggleWrapper text="Code..">
```mc
let scand: (() -> Bool) -> (() -> Bool) -> Bool =
  lam a. lam b. if a () then b () else false
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest scand (lam. true) (lam. true) with true
utest scand (lam. true) (lam. false) with false
utest scand (lam. false) (lam. true) with false
utest scand (lam. false) (lam. false) with false

utest
  let r = ref 0 in
  scand (lam. true) (lam. modref r 1; true);
  deref r
with 1

utest
  let r = ref 0 in
  scand (lam. false) (lam. modref r 1; true);
  deref r
with 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="scallb" kind="let">

```mc
let scallb  : [() -> Bool] -> Bool
```

<Description>{`Short\-circuited Logical AND of sequence`}</Description>


<ToggleWrapper text="Code..">
```mc
let scallb : [() -> Bool] -> Bool =
  foldl (lam acc. lam p. scand (lam. acc) p) true
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest scallb [lam. true, lam. true, lam. true] with true
utest scallb [lam. false, lam. true, lam. true] with false
utest scallb [lam. true] with true
utest scallb [lam. false] with false
utest scallb [] with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="scor" kind="let">

```mc
let scor a b : (() -> Bool) -> (() -> Bool) -> Bool
```

<Description>{`Short\-circuited Logical OR`}</Description>


<ToggleWrapper text="Code..">
```mc
let scor: (() -> Bool) -> (() -> Bool) -> Bool =
  lam a. lam b. if a () then true else b ()
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest scor (lam. true) (lam. true) with true
utest scor (lam. true) (lam. false) with true
utest scor (lam. false) (lam. true) with true
utest scor (lam. false) (lam. false) with false

utest
  let r = ref 0 in
  scor (lam. true) (lam. modref r 1; true);
  deref r
with 0

utest
  let r = ref 0 in
  scor (lam. false) (lam. modref r 1; true);
  deref r
with 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="scsomeb" kind="let">

```mc
let scsomeb  : [() -> Bool] -> Bool
```

<Description>{`Short\-circuited Logical OR of sequence`}</Description>


<ToggleWrapper text="Code..">
```mc
let scsomeb : [(() -> Bool)] -> Bool =
  foldl (lam acc. lam p. scor (lam. acc) p) false
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest scsomeb [lam. false, lam. false, lam. false] with false
utest scsomeb [lam. false, lam. true, lam. true] with true
utest scsomeb [lam. true] with true
utest scsomeb [lam. false] with false
utest scsomeb [] with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqBool" kind="let">

```mc
let eqBool  : Bool -> Bool -> Bool
```

<Description>{`Boolean equality`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqBool: Bool -> Bool -> Bool = xnor
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest eqBool false false with true
utest eqBool false true  with false
utest eqBool true  false with false
utest eqBool true  true  with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpBool" kind="let">

```mc
let cmpBool b1 b2 : Bool -> Bool -> Int
```

<Description>{`Boolean comparison`}</Description>


<ToggleWrapper text="Code..">
```mc
let cmpBool: Bool -> Bool -> Int =
  lam b1: Bool. lam b2: Bool.
  if b1 then if b2 then 0 else 1
  else if b2 then negi 1 else 0
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest cmpBool false false with 0
utest cmpBool false true  with negi 1
utest cmpBool true  false with 1
utest cmpBool true  true  with 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bool2string" kind="let">

```mc
let bool2string b : Bool -> String
```

<Description>{`Boolean to string`}</Description>


<ToggleWrapper text="Code..">
```mc
let bool2string: Bool -> String = lam b.
  if b then "true" else "false"
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest bool2string true with "true"
utest bool2string false with "false"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="string2bool" kind="let">

```mc
let string2bool s : String -> Bool
```

<Description>{`String to Boolean`}</Description>


<ToggleWrapper text="Code..">
```mc
let string2bool: String -> Bool = lam s.
  match s with "true" then true
  else match s with "false" then false
  else error (concat "Cannot convert string " (concat s " to Bool."))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest string2bool "true" with true
utest string2bool "false" with false
```
</ToggleWrapper>
</DocBlock>

