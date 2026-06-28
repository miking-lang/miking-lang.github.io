import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SpecializeInclude  
  

  
  
  
## Semantics  
  

          <DocBlock title="includeSpecializeDeps" kind="sem">

```mc
sem includeSpecializeDeps : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem includeSpecializeDeps =
  | ast ->
    let includes = loadRuntime includesLoc in
    let ast = mergeWithHeader ast includes in
    eliminateDuplicateCode ast
```
</ToggleWrapper>
</DocBlock>

