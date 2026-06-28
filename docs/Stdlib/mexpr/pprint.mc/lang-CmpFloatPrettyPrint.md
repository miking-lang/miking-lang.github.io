import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpFloatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CEqf _ -> "eqf"
  | CLtf _ -> "ltf"
  | CLeqf _ -> "leqf"
  | CGtf _ -> "gtf"
  | CGeqf _ -> "geqf"
  | CNeqf _ -> "neqf"
```
</ToggleWrapper>
</DocBlock>

