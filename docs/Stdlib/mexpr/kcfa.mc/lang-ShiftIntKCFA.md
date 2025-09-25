import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShiftIntKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : Info -> (IName, KCFA_Ctx) -> ConstAst_Const -> [CFABase_Constraint]
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst info ident =
  | CSlli _ -> []
  | CSrli _ -> []
  | CSrai _ -> []
```
</ToggleWrapper>
</DocBlock>

