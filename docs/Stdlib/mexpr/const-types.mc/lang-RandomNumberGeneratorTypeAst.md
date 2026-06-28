import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RandomNumberGeneratorTypeAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyConstBase d =
  | CRandIntU _ -> tyarrows_ [tyint_, tyint_, tyint_]
  | CRandSetSeed _ -> tyarrow_ tyint_ tyunit_
```
</ToggleWrapper>
</DocBlock>

