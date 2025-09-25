import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# matrix-ext.mc  
  

External \(float\) matrix functions, where we represent matrices using tensors.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/math.mc"} style={S.link}>math.mc</a>, <a href={"/docs/Stdlib/tensor.mc"} style={S.link}>tensor.mc</a>  
  
## Variables  
  

          <DocBlock title="matrixExponential" kind="let">

```mc
let matrixExponential m : Tensor[Float] -> Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let matrixExponential = lam m. externalMatrixExponential m

external externalMatrixTranspose : Tensor[Float] -> Tensor[Float]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matrixTranspose" kind="let">

```mc
let matrixTranspose m : Tensor[Float] -> Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let matrixTranspose = lam m. externalMatrixTranspose m

external externalMatrixMulFloat : Float -> Tensor[Float] -> Tensor[Float]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matrixMulFloat" kind="let">

```mc
let matrixMulFloat f m : Float -> Tensor[Float] -> Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let matrixMulFloat = lam f. lam m. externalMatrixMulFloat f m

external externalMatrixMul : Tensor[Float] -> Tensor[Float] -> Tensor[Float]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matrixMul" kind="let">

```mc
let matrixMul m1 m2 : Tensor[Float] -> Tensor[Float] -> Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let matrixMul = lam m1. lam m2. externalMatrixMul m1 m2

external externalMatrixElemMul : Tensor[Float] -> Tensor[Float] -> Tensor[Float]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matrixElemMul" kind="let">

```mc
let matrixElemMul m1 m2 : Tensor[Float] -> Tensor[Float] -> Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let matrixElemMul = lam m1. lam m2. externalMatrixElemMul m1 m2

-- New functionality for element-wise addition
external externalMatrixElemAdd : Tensor[Float] -> Tensor[Float] -> Tensor[Float]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matrixElemAdd" kind="let">

```mc
let matrixElemAdd m1 m2 : Tensor[Float] -> Tensor[Float] -> Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let matrixElemAdd = lam m1. lam m2. externalMatrixElemAdd m1 m2
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

let _m = tensorOfSeqExn tensorCreateCArrayFloat in
let _m33 = _m [3,3] in
let _m13 = _m [1,3] in
let _m31 = _m [3,1] in
let _eqf = lam f1. lam f2. eqi 0 (cmpfApprox 0.01 f1 f2) in
let _eqm = tensorEq _eqf in

let t = tensorCreateCArrayFloat [3,3] (lam. 1.) in
utest matrixExponential t with
  let d = 7.36185 in
  let o = 6.36185 in
  _m33 [d, o, o,
      o, d, o,
      o, o, d]
using _eqm in

utest matrixTranspose
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
with
   (_m33 [1., 4., 7.,
          2., 5., 8.,
          3., 6., 9.])
using _eqm in

utest matrixMulFloat
   2.0
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
with
   (_m33 [2., 4., 6.,
          8., 10., 12.,
          14., 16., 18.])
using _eqm in

utest matrixMul
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
with
   (_m33 [30.,  36.,  42.,
          66.,  81.,  96.,
          102., 126., 150.])
using _eqm in

utest matrixMul
   (_m13 [1., 2., 3.])
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
with
   (_m13 [30.,  36.,  42.])
using _eqm in

utest matrixMul
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
   (_m31 [1.,
          2.,
          3.])
with
   (_m31 [14.,
          32.,
          50.])
using _eqm in

utest matrixElemMul
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
with
   (_m33 [1.,  4.,  9.,
          16., 25., 36.,
          49., 64., 81.])
using _eqm in

utest matrixElemAdd
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
   (_m33 [1., 2., 3.,
          4., 5., 6.,
          7., 8., 9.])
with
   (_m33 [2., 4., 6.,
          8., 10., 12.,
          14., 16., 18.])
using _eqm in

()
```
</ToggleWrapper>
</DocBlock>

