import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AliasTypeCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TyAlias t1, ty2) -> cmpTypeH (t1.content, ty2)
  | (ty1 & !TyAlias _, TyAlias t2) -> cmpTypeH (ty1, t2.content)
```
</ToggleWrapper>
</DocBlock>

