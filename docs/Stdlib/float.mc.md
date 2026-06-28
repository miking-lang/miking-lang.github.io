import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# float.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/bool.mc"} style={S.link}>bool.mc</a>  
  
## Variables  
  

          <DocBlock title="inf" kind="let">

```mc
let inf  : Float
```

<Description>{`Infinity`}</Description>


<ToggleWrapper text="Code..">
```mc
let inf: Float = divf 1.0 0.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nan" kind="let">

```mc
let nan  : Float
```

<Description>{`Not a number`}</Description>


<ToggleWrapper text="Code..">
```mc
let nan: Float = mulf 0. inf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isNaN" kind="let">

```mc
let isNaN a : Float -> Bool
```

<Description>{`\`isNaN a\` is \`true\` if \`a\` is \`nan\``}</Description>


<ToggleWrapper text="Code..">
```mc
let isNaN: Float -> Bool = lam a. if eqf a a then false else true
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest isNaN nan with true
utest isNaN inf with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="maxf" kind="let">

```mc
let maxf l r : Float -> Float -> Float
```

<Description>{`\`maxf l r\` returns the maximum of \`l\` and \`r\`. If either is \`nan\` it returns  
\`nan\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let maxf: Float -> Float -> Float = lam l. lam r.
  if or (isNaN l) (isNaN r) then nan
  else
    if gtf l r then l else r
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest maxf 0. 0. with 0.
utest maxf 1. 0. with 1.
utest maxf 0. 1. with 1.
utest isNaN (maxf nan 0.) with true
utest isNaN (maxf 0. nan) with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="minf" kind="let">

```mc
let minf r l : Float -> Float -> Float
```

<Description>{`\`minf l r\` returns the minimum of \`l\` and \`r\`. If either is \`nan\` it returns  
\`nan\`. If \`minf 0. \-0.\` and \`minf \-0. 0.\` returns \`\-0.\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let minf: Float -> Float -> Float = lam r. lam l.
  if or (isNaN l) (isNaN r) then nan
  else
    if ltf r l then r else l
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest minf 0. 0. with 0.
utest minf 1. 0. with 0.
utest minf 0. 1. with 0.
utest isNaN (minf nan 0.) with true
utest isNaN (minf 0. nan) with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absf" kind="let">

```mc
let absf f : Float -> Float
```

<Description>{`\`absf a\` returns the absolute value of \`a\` or \`nan\` if \`a\` is \`nan\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let absf: Float -> Float = lam f. maxf f (negf f)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest absf 0. with 0. using eqf
utest absf 1. with 1. using eqf
utest absf -1. with 1. using eqf
utest absf -0. with 0. using eqf
utest isNaN (absf nan) with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpf" kind="let">

```mc
let cmpf l r : Float -> Float -> Int
```

<Description>{`\`cmpf l r\` compares \`l\` and \`r\`. \`cmpf l r = \-1\` if l \< r, \`cmpf l r = 1\` if  
l \> r, and \`cmpf l r = 0\` if l = r. \`nan\` is considered smaller than negative  
infinity and equal to itself. OPT\(oerikss, 2024\-04\-18\): For a faster \`cmpf\` you  
should create an external to, e.g., OCamls \`Float.compare which\` uses an   
optimized C under the hood. `}</Description>


<ToggleWrapper text="Code..">
```mc
let cmpf: Float -> Float -> Int = lam l. lam r.
  let lIsNaN = isNaN l in
  let rIsNaN = isNaN r in
  if and lIsNaN rIsNaN then 0
  else if lIsNaN then -1
  else if rIsNaN then 1
  else
    if ltf l r then -1 else if gtf l r then 1 else 0
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest cmpf 0. 0. with 0
utest cmpf 1. 0. with 1
utest cmpf 0. 1. with -1
utest cmpf inf inf with 0
utest cmpf (negf inf) (negf inf) with 0
utest cmpf inf inf with 0
utest cmpf (negf inf) 0. with -1
utest cmpf 0. (negf inf) with 1
utest cmpf nan nan with 0
utest cmpf nan (negf inf) with -1
utest cmpf (negf inf) nan with 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqfApprox" kind="let">

```mc
let eqfApprox epsilon l r : Float -> Float -> Float -> Bool
```

<Description>{`\`eqfApprox epsilon l r\` has the same semantics as \`eqf\` but where \`l\` and \`r\`  
are considered equal if l = r or |l \- r| ≤ epsilon. Returns false if  
\`epsilon\` is not a number greater than or equal to zero.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqfApprox = lam epsilon. lam l. lam r.
  if or (ltf epsilon 0.) (isNaN epsilon) then false
  else
    if (eqf l r) then
       -- handles the cases where \\`subf l r\\` is \\`nan\\`.
       true
    else leqf (absf (subf l r)) epsilon
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest 1. with 1.01 using eqfApprox 0.011
utest negf 1.0 with negf 1.009 using eqfApprox 0.01
utest 0.0 with 0.0  using (eqfApprox 0.)
utest eqfApprox 0.01 1.0 1.011 with false
utest 1. with 1.000009 using eqfApprox 0.00001
utest eqfApprox 0.00001 1.0 1.000011 with false
utest eqfApprox 0.01 inf inf with true
utest eqfApprox 0. inf inf with true
utest eqfApprox 0. (negf inf) (negf inf) with true
utest eqfApprox 0. nan 0. with false
utest eqfApprox 0. 0. nan with false
utest eqfApprox 0. nan nan with false
utest eqfApprox inf nan nan with false
utest eqfApprox inf inf 0. with true
utest eqfApprox inf 0. inf with true
utest eqfApprox inf inf (negf inf) with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpfApprox" kind="let">

```mc
let cmpfApprox epsilon l r : Float -> Float -> Float -> Int
```

<Description>{`\`cmpfApprox epsilon l r\` has the same semantics as \`cmpf\` but where \`l\` and  
\`r\` are considered equal if l = r or |l \- r| ≤ epsilon. Gives an error if  
\`epsilon\` is not a number greater than or equal to zero.`}</Description>


<ToggleWrapper text="Code..">
```mc
let cmpfApprox : Float -> Float -> Float -> Int =
  lam epsilon. lam l. lam r.
  if or (ltf epsilon 0.) (isNaN epsilon) then
    error "eqfApprox: Invalid input, epsilon must be a number greater than or equal to zero."
  else
    let lIsNaN = isNaN l in
    let rIsNaN = isNaN r in
    if and lIsNaN rIsNaN then 0
    else if lIsNaN then -1
    else if rIsNaN then 1
    else
      if eqfApprox epsilon l r then 0
      else if ltf l r then -1
      else 1
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest cmpfApprox 0.01 0. 0. with 0
utest cmpfApprox 0.01 1. 0. with 1
utest cmpfApprox 0.01 0. 1. with -1
utest cmpfApprox 0.01 inf inf with 0
utest cmpfApprox 0.01 (negf inf) (negf inf) with 0
utest cmpfApprox 0.01 inf inf with 0
utest cmpfApprox 0.01 (negf inf) 0. with -1
utest cmpfApprox 0.01 0. (negf inf) with 1
utest cmpfApprox 0.01 nan nan with 0
utest cmpfApprox 0.01 nan (negf inf) with -1
utest cmpfApprox 0.01 (negf inf) nan with 1
```
</ToggleWrapper>
</DocBlock>

