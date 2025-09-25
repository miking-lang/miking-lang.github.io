import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SysTypeAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyConstBase d =
  | CExit _ -> mktyall_ "a" (lam a. tyarrow_ tyint_ a)
  | CError _ -> mktyall_ "a" (lam a. tyarrow_ tystr_ a)
  | CArgv _ -> tyseq_ tystr_
  | CCommand _ -> tyarrow_ tystr_ tyint_
```
</ToggleWrapper>
</DocBlock>

