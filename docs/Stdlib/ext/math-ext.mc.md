import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# math-ext.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/float.mc"} style={S.link}>float.mc</a>  
  
## Variables  
  

          <DocBlock title="_eqf" kind="let">

```mc
let _eqf  : Float -> Float -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _eqf = eqfApprox 1e-15

external externalExp : Float -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exp" kind="let">

```mc
let exp x : Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let exp = lam x: Float. externalExp x
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest exp 0. with 1. using eqf

external externalLog : Float -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="log" kind="let">

```mc
let log x : Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let log = lam x: Float. externalLog x
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest log (exp 7.) with 7. using eqf
utest exp (log 7.) with 7. using _eqf

external externalAtan : Float -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atan" kind="let">

```mc
let atan x : Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let atan = lam x : Float. externalAtan x
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest atan 0. with 0. using eqf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pi" kind="let">

```mc
let pi  : Float
```



<ToggleWrapper text="Code..">
```mc
let pi = mulf 4. (atan 1.)

external externalSin : Float -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sin" kind="let">

```mc
let sin x : Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let sin = lam x : Float. externalSin x
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest sin (divf pi 2.) with 1. using eqf
utest sin 0. with 0. using eqf

external externalCos : Float -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cos" kind="let">

```mc
let cos x : Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let cos = lam x : Float. externalCos x
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest cos (divf pi 2.) with 0. using _eqf
utest cos 0. with 1. using eqf

utest addf (mulf (sin 1.) (sin 1.)) (mulf (cos 1.) (cos 1.)) with 1.
using eqf

external externalAtan2 : Float -> Float -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atan2" kind="let">

```mc
let atan2 x y : Float -> Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let atan2 = lam x : Float. lam y : Float. externalAtan2 x y
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest atan2 0. 1. with 0. using eqf

external externalPow : Float -> Float -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pow" kind="let">

```mc
let pow x y : Float -> Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let pow = lam x: Float. lam y: Float. externalPow x y
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest pow 3. 2. with 9. using eqf

external externalSqrt : Float -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sqrt" kind="let">

```mc
let sqrt x : Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let sqrt: Float -> Float = lam x. externalSqrt x
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest sqrt 9. with 3. using eqf

external externalLogGamma : Float -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logGamma" kind="let">

```mc
let logGamma x : Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let logGamma: Float -> Float = lam x. externalLogGamma x
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest logGamma 3. with log 2. using eqf

external externalLogCombination : Int -> Int -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logCombination" kind="let">

```mc
let logCombination n c : Int -> Int -> Float
```



<ToggleWrapper text="Code..">
```mc
let logCombination: Int -> Int -> Float = lam n. lam c. externalLogCombination n c
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest logCombination 4 2 with log 6. using _eqf
```
</ToggleWrapper>
</DocBlock>

