import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarCompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="reduceTyVar" kind="sem">

```mc
sem reduceTyVar : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem reduceTyVar =
  | TyVar {info = i} -> TyUnknown {info = i}
```
</ToggleWrapper>
</DocBlock>

