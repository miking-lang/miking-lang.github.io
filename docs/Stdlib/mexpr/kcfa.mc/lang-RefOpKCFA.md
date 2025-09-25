import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RefOpKCFA  
  

TODO\(dlunde,2021\-11\-11\): Mutability complicates the analysis, but could  
probably be added.

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : Info -> (IName, KCFA_Ctx) -> ConstAst_Const -> [CFABase_Constraint]
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst info ident =
```
</ToggleWrapper>
</DocBlock>

