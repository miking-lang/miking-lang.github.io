import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VariantTypeSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeType" kind="sem">

```mc
sem symbolizeType : SymEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeType env =
  | TyVariant t & ty ->
    if eqi (mapLength t.constrs) 0 then ty
    else errorSingle [t.info] "Symbolizing non-empty variant types not yet supported"
```
</ToggleWrapper>
</DocBlock>

