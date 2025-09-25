import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SymbTypeAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyConstBase d =
  | CSymb _ -> mktysym_ d (lam s. s)
  | CGensym _ -> mktysym_ d (lam s. tyarrow_ tyunit_ s)
  | CSym2hash _ -> mktysym_ d (lam s. tyarrow_ s tyint_)
```
</ToggleWrapper>
</DocBlock>

