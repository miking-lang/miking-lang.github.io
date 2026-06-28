import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllTypeFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesType" kind="sem">

```mc
sem freeNamesType : Set Name -> Ast_Type -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesType free =
  | TyAll x ->
    let free = freeNamesType free x.ty in
    let free = setRemove x.ident free in
    free
```
</ToggleWrapper>
</DocBlock>

