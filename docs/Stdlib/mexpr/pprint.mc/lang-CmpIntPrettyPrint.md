import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpIntPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CEqi _ -> "eqi"
  | CNeqi _ -> "neqi"
  | CLti _ -> "lti"
  | CGti _ -> "gti"
  | CLeqi _ -> "leqi"
  | CGeqi _ -> "geqi"
```
</ToggleWrapper>
</DocBlock>

