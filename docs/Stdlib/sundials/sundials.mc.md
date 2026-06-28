import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# sundials.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/tensor.mc"} style={S.link}>tensor.mc</a>  
  
## Types  
  

          <DocBlock title="NvectorSerial" kind="type">

```mc
type NvectorSerial
```



<ToggleWrapper text="Code..">
```mc
type NvectorSerial
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SundialsMatrixDense" kind="type">

```mc
type SundialsMatrixDense
```



<ToggleWrapper text="Code..">
```mc
type SundialsMatrixDense
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SundialsRealArray" kind="type">

```mc
type SundialsRealArray
```



<ToggleWrapper text="Code..">
```mc
type SundialsRealArray
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SundialsNonlinearSolver" kind="type">

```mc
type SundialsNonlinearSolver
```



<ToggleWrapper text="Code..">
```mc
type SundialsNonlinearSolver

external nvectorSerialWrap : Tensor[Float] -> NvectorSerial
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="nvectorSerialWrap" kind="let">

```mc
let nvectorSerialWrap t : Tensor[Float] -> NvectorSerial
```

<Description>{`\`nvectorSerialWrap t\` wraps tensor \`t\` of rank 1 in a serial NVector.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nvectorSerialWrap = lam t. nvectorSerialWrap t

external nvectorSerialUnwrap : NvectorSerial -> Tensor[Float]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nvectorSerialUnwrap" kind="let">

```mc
let nvectorSerialUnwrap t : NvectorSerial -> Tensor[Float]
```

<Description>{`\`nvectorSerialUnwrap v\` uwraps serial NVector \`v\` to a rank 1 tensor.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nvectorSerialUnwrap = lam t. nvectorSerialUnwrap t

external sundialsMatrixDense : Int -> SundialsMatrixDense
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sundialsMatrixDense" kind="let">

```mc
let sundialsMatrixDense n : Int -> SundialsMatrixDense
```

<Description>{`\`sundialsMatrixDense n\` creates a square dense matrix of size \`n\` for use in  
Sundials linear solvers, e.g. \`idaDlsSolver\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let sundialsMatrixDense = lam n. sundialsMatrixDense n

external sundialsMatrixDenseUnwrap : SundialsMatrixDense -> Tensor[Float]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sundialsMatrixDenseUnwrap" kind="let">

```mc
let sundialsMatrixDenseUnwrap m : SundialsMatrixDense -> Tensor[Float]
```

<Description>{`\`sundialsMatrixDenseUnwrap m\` unwraps the sundials dense matrix \`m\` to a rank  
2 tensor. This tensor will be the transpose of the input matrix \`m\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let sundialsMatrixDenseUnwrap = lam m. sundialsMatrixDenseUnwrap m

external sundialsMatrixDenseGet : SundialsMatrixDense -> Int -> Int -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sundialsMatrixDenseGet" kind="let">

```mc
let sundialsMatrixDenseGet m i j : SundialsMatrixDense -> Int -> Int -> Float
```

<Description>{`\`sundialsMatrixDenseGet m i j\` gets the \`i\`,\`j\`'th element in \`m\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let sundialsMatrixDenseGet = lam m. lam i. lam j. sundialsMatrixDenseGet m i j

external sundialsMatrixDenseSet ! : SundialsMatrixDense -> Int -> Int -> Float -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sundialsMatrixDenseSet" kind="let">

```mc
let sundialsMatrixDenseSet m i j v : SundialsMatrixDense -> Int -> Int -> Float -> ()
```

<Description>{`\`sundialsMatrixDenseSet m i j v\` sets, inplace, the \`i\`,\`j\`'th element in \`m\`  
to the value \`v\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let sundialsMatrixDenseSet = lam m. lam i. lam j. lam v. sundialsMatrixDenseSet m i j v

external sundialsMatrixDenseUpdate !
  : SundialsMatrixDense -> Int -> Int -> (Float -> Float) -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sundialsMatrixDenseUpdate" kind="let">

```mc
let sundialsMatrixDenseUpdate m i j f : SundialsMatrixDense -> Int -> Int -> (Float -> Float) -> ()
```

<Description>{`\`sundialsMatrixDenseUpdate m i j f\` updates, inplace, the \`i\`,\`j\`'th element  
in \`m\` according to the function \`f\`, where the argument to this function is  
the current value at that index in \`m\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let sundialsMatrixDenseUpdate = lam m. lam i. lam j. lam f.
  sundialsMatrixDenseUpdate m i j f

external sundialsNonlinearSolverNewtonMake
  : NvectorSerial -> SundialsNonlinearSolver
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sundialsNonlinearSolverNewtonMake" kind="let">

```mc
let sundialsNonlinearSolverNewtonMake y : NvectorSerial -> SundialsNonlinearSolver
```

<Description>{`\`sundialsNonlinearSolverNewtonMake\` creates a generic nonlinear solver based  
on Newtons method.`}</Description>


<ToggleWrapper text="Code..">
```mc
let sundialsNonlinearSolverNewtonMake =
  lam y. sundialsNonlinearSolverNewtonMake y

external sundialsNonlinearSolverFixedPointMake
  : Int -> NvectorSerial -> SundialsNonlinearSolver
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sundialsNonlinearSolverFixedPointMake" kind="let">

```mc
let sundialsNonlinearSolverFixedPointMake n y : Int -> NvectorSerial -> SundialsNonlinearSolver
```

<Description>{`\`sundialsNonlinearSolverFixedPointMake\` creates a generic nonlinear solver  
for fixed\-point \(functional\) iteration with optional Anderson acceleration.`}</Description>


<ToggleWrapper text="Code..">
```mc
let sundialsNonlinearSolverFixedPointMake =
  lam n. lam y. sundialsNonlinearSolverFixedPointMake n y
```
</ToggleWrapper>
</DocBlock>

