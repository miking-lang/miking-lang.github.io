import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ProgramTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckProgram" kind="sem">

```mc
sem typeCheckProgram : MLangTopLevel_MLangProgram -> MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeCheckProgram =
  | program ->
    match mapAccumL typeCheckDecl typcheckEnvDefault program.decls with (env, decls) in
    let expr = typeCheckExpr env program.expr in
    {decls = decls, expr = expr}
```
</ToggleWrapper>
</DocBlock>

