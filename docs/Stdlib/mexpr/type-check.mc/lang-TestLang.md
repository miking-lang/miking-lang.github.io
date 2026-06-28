import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TestLang  
  

  
  
  
## Semantics  
  

          <DocBlock title="unwrapTypes" kind="sem">

```mc
sem unwrapTypes : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem unwrapTypes =
  | ty ->
    smap_Type_Type unwrapTypes (unwrapType ty)
```
</ToggleWrapper>
</DocBlock>

