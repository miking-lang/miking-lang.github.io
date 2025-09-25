import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RefOpTypeAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyConstBase d =
  | CRef _ -> mktyall_ "a" (lam a. mktyref_ d (lam r. tyarrow_ a (tyapp_ r a)))
  | CModRef _ -> mktyall_ "a" (lam a. mktyref_ d (lam r. tyarrows_ [tyapp_ r a, a, tyunit_]))
  | CDeRef _ -> mktyall_ "a" (lam a. mktyref_ d (lam r. tyarrow_ (tyapp_ r a) a))
```
</ToggleWrapper>
</DocBlock>

