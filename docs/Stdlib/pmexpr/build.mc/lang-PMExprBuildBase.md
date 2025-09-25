import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprBuildBase  
  

  
  
  
## Types  
  

          <DocBlock title="AcceleratedCode" kind="type">

```mc
type AcceleratedCode : Map Class GpuCompileResult
```



<ToggleWrapper text="Code..">
```mc
type AcceleratedCode = Map Class GpuCompileResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PMExprBuildOptions" kind="type">

```mc
type PMExprBuildOptions : { debugGenerate: Bool, output: Option String, file: String, libs: [String], clibs: [String], ocamlTops: [Top], acceleratedCode: AcceleratedCode }
```



<ToggleWrapper text="Code..">
```mc
type PMExprBuildOptions = {
    debugGenerate : Bool,
    output : Option String,
    file : String,
    libs : [String],
    clibs : [String],
    ocamlTops : [Top],
    acceleratedCode : AcceleratedCode
  }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="GpuCompileResult" kind="syn">

```mc
syn GpuCompileResult
```

<Description>{`TODO\(larshum, 2022\-06\-06\): Move this to separate file defining the  
compilation process \(in standard library\).`}</Description>


<ToggleWrapper text="Code..">
```mc
syn GpuCompileResult =
  | FutharkCompileResult (FutProg, CProg)
  | CudaCompileResult CudaProg
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="hasAcceleratedCuda" kind="sem">

```mc
sem hasAcceleratedCuda : PMExprBuildBase_AcceleratedCode -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem hasAcceleratedCuda =
  | ac -> optionIsSome (mapLookup (Cuda ()) ac)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hasAcceleratedFuthark" kind="sem">

```mc
sem hasAcceleratedFuthark : PMExprBuildBase_AcceleratedCode -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem hasAcceleratedFuthark =
  | ac -> optionIsSome (mapLookup (Futhark ()) ac)
```
</ToggleWrapper>
</DocBlock>

