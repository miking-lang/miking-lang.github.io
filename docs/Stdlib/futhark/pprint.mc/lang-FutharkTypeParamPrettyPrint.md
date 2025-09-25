import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkTypeParamPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintTypeParam" kind="sem">

```mc
sem pprintTypeParam : PprintEnv -> FutharkTypeParamAst_FutTypeParam -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintTypeParam env =
  | FPSize {val = n} ->
    match futPprintEnvGetStr env n with (env, n) in
    (env, join ["[", n, "]"])
  | FPType {val = n} ->
    match futPprintEnvGetStr env n with (env, n) in
    (env, cons '\'' n)
```
</ToggleWrapper>
</DocBlock>

