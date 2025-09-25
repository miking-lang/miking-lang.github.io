import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarTypeFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesType" kind="sem">

```mc
sem freeNamesType : Set Name -> Ast_Type -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesType free =
  | TyVar x -> setInsert x.ident free
```
</ToggleWrapper>
</DocBlock>

