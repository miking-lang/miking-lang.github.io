import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TimeKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : Info -> (IName, KCFA_Ctx) -> ConstAst_Const -> [CFABase_Constraint]
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst info ident =
  | CWallTimeMs _ -> []
  | CSleepMs _ -> []
```
</ToggleWrapper>
</DocBlock>

