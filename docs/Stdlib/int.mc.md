import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# int.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/bool.mc"} style={S.link}>bool.mc</a>  
  
## Variables  
  

          <DocBlock title="maxi" kind="let">

```mc
let maxi a b : Int -> Int -> Int
```



<ToggleWrapper text="Code..">
```mc
let maxi = lam a. lam b. if gti a b then a else b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mini" kind="let">

```mc
let mini a b : Int -> Int -> Int
```



<ToggleWrapper text="Code..">
```mc
let mini = lam a. lam b. if lti a b then a else b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absi" kind="let">

```mc
let absi i : Int -> Int
```



<ToggleWrapper text="Code..">
```mc
let absi = lam i. maxi i (negi i)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest maxi 0 0 with 0
utest maxi 1 0 with 1
utest maxi 0 1 with 1

utest mini 0 0 with 0
utest mini 1 0 with 0
utest mini 0 1 with 0

utest absi 0 with 0
utest absi 1 with 1
utest absi (negi 1) with 1

utest addi 1 (negi 1) with 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="succ" kind="let">

```mc
let succ x : Int -> Int
```



<ToggleWrapper text="Code..">
```mc
let succ = lam x. addi x 1
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest succ 0 with 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pred" kind="let">

```mc
let pred x : Int -> Int
```



<ToggleWrapper text="Code..">
```mc
let pred = lam x. subi x 1
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest pred 1 with 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isEven" kind="let">

```mc
let isEven n : Int -> Bool
```

<Description>{`\`isEven n\` returns \`true\` if \`n\` is even and \`false\` otherwise`}</Description>


<ToggleWrapper text="Code..">
```mc
let isEven : Int -> Bool = lam n. eqi (modi n 2) 0
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest isEven (negi 2) with true
utest isEven (negi 1) with false
utest isEven 0 with true
utest isEven 1 with false
utest isEven 2 with true
utest isEven 3 with false
utest isEven 4 with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqSign" kind="let">

```mc
let eqSign a b : Int -> Int -> Bool
```

<Description>{`\`eqSign a b\` returns true iff the sign of both \`a\` and \`b\` are equal`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqSign : Int -> Int -> Bool = lam a. lam b.
  if lti a 0 then lti b 0
  else if gti a 0 then gti b 0
  else eqi b 0
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest eqSign 0 0 with true
utest eqSign 0 2 with false
utest eqSign 3 0 with false
utest eqSign 1 4 with true
utest eqSign 0 (negi 2) with false
utest eqSign (negi 3) 0 with false
utest eqSign (negi 1) (negi 4) with true
utest eqSign 1 (negi 2) with false
utest eqSign (negi 3) 4 with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="neqSign" kind="let">

```mc
let neqSign a b : Int -> Int -> Bool
```

<Description>{`\`neqSign a b\` returns true iff the sign of both \`a\` and \`b\` are different`}</Description>


<ToggleWrapper text="Code..">
```mc
let neqSign : Int -> Int -> Bool = lam a. lam b. not (eqSign a b)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest neqSign 0 0 with false
utest neqSign 0 2 with true
utest neqSign 3 0 with true
utest neqSign 1 4 with false
utest neqSign 0 (negi 2) with true
utest neqSign (negi 3) 0 with true
utest neqSign (negi 1) (negi 4) with false
utest neqSign 1 (negi 2) with true
utest neqSign (negi 3) 4 with true
```
</ToggleWrapper>
</DocBlock>

