import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprBuildPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="_pprintOCamlTops" kind="sem">

```mc
sem _pprintOCamlTops : [OCamlTopAst_Top] -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _pprintOCamlTops =
  | tops ->
    use OCamlPrettyPrint in
    pprintOcamlTops tops
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_pprintCAst" kind="sem">

```mc
sem _pprintCAst : CProgAst_CProg -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _pprintCAst =
  | cProg ->
    use CPrettyPrint in
    use CProgPrettyPrint in
    printCProg [] cProg
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_pprintFutharkAst" kind="sem">

```mc
sem _pprintFutharkAst : FutharkAst_FutProg -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _pprintFutharkAst =
  | futProg ->
    use FutharkPrettyPrint in
    printFutProg futProg
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_pprintCudaAst" kind="sem">

```mc
sem _pprintCudaAst : CudaAst_CudaProg -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _pprintCudaAst =
  | cudaAst ->
    use CudaPrettyPrint in
    printCudaProg cCompilerNames cudaAst
```
</ToggleWrapper>
</DocBlock>

