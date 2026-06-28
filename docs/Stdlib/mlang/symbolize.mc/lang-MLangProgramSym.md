import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangProgramSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeMLang" kind="sem">

```mc
sem symbolizeMLang : SymEnv -> MLangTopLevel_MLangProgram -> (SymEnv, MLangTopLevel_MLangProgram)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeMLang env =| prog ->
    match mapAccumL symbolizeDecl env prog.decls with (env, decls) in
    let expr = symbolizeExpr env prog.expr in
    (env, {
      decls = decls,
      expr = expr
    })
```
</ToggleWrapper>
</DocBlock>

