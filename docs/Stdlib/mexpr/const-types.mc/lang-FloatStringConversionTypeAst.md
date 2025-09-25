import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatStringConversionTypeAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyConstBase d =
  | CStringIsFloat _ -> tyarrow_ tystr_ tybool_
  | CString2float _ -> tyarrow_ tystr_ tyfloat_
  | CFloat2string _ -> tyarrow_ tyfloat_ tystr_
```
</ToggleWrapper>
</DocBlock>

