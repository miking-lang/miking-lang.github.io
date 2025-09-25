import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# matrix.mc  
  

Matrix functions

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/ext/matrix-ext.mc"} style={S.link}>ext/matrix-ext.mc</a>  
  
## Variables  
  

          <DocBlock title="matrixCreate" kind="let">

```mc
let matrixCreate  : [Int] -> [Float] -> Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let matrixCreate: [Int] -> [Float] -> Tensor[Float] =
  tensorOfSeqExn tensorCreateCArrayFloat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rvecCreate" kind="let">

```mc
let rvecCreate dim : Int -> [Float] -> Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let rvecCreate: Int -> [Float] -> Tensor[Float] = lam dim. matrixCreate [1,dim]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cvecCreate" kind="let">

```mc
let cvecCreate dim : Int -> [Float] -> Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let cvecCreate: Int -> [Float] -> Tensor[Float] = lam dim. matrixCreate [dim,1]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="vecToSeqExn" kind="let">

```mc
let vecToSeqExn t : all a. Tensor[a] -> [a]
```



<ToggleWrapper text="Code..">
```mc
let vecToSeqExn: all a. Tensor[a] -> [a] = lam t.
  let sh = tensorShape t in
  let n =
    match tensorShape t with [1,n] | [n,1] then n
    else error "Not a vector in vecToSeqExn"
  in
  tensorToSeqExn (tensorReshapeExn t [n])
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
let _m13 = _m [1,3] in
let _m31 = _m [3,1] in
let _eqf = lam f1. lam f2. eqi 0 (cmpfApprox 0.01 f1 f2) in
let _eqm = tensorEq _eqf in

utest vecToSeqExn (_m13 [1., 2., 3.]) with [1., 2., 3.] using eqSeq eqf in
utest vecToSeqExn (_m31 [1., 2., 3.]) with [1., 2., 3.] using eqSeq eqf in

()
```
</ToggleWrapper>
</DocBlock>

