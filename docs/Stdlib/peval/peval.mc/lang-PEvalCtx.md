import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PEvalCtx  
  

  
  
  
## Types  
  

          <DocBlock title="PEvalCtx" kind="type">

```mc
type PEvalCtx : { env: EvalEnv, freeVar: Set Name, effectEnv: SideEffectEnv, maxRecDepth: Int, recFlag: Bool }
```



<ToggleWrapper text="Code..">
```mc
type PEvalCtx = {
    env : EvalEnv,
    freeVar : Set Name,
    effectEnv : SideEffectEnv,
    maxRecDepth : Int,
    recFlag : Bool
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="pevalCtxEmpty" kind="sem">

```mc
sem pevalCtxEmpty : () -> PEvalCtx_PEvalCtx
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalCtxEmpty =| _ -> {
    env = evalEnvEmpty (),
    freeVar = setEmpty nameCmp,
    effectEnv = sideEffectEnvEmpty (),
    maxRecDepth = 1000,
    recFlag = true
  }
```
</ToggleWrapper>
</DocBlock>

