import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllTypeGeneralize  
  

  
  
  
## Semantics  
  

          <DocBlock title="genBase" kind="sem">

```mc
sem genBase : Level -> Map Name Ast_Kind -> Set Name -> Ast_Type -> [_a]
```



<ToggleWrapper text="Code..">
```mc
sem genBase (lvl : Level) (vs : Map Name Kind) (bound : Set Name) =
  | TyAll t -> genBase lvl vs (setInsert t.ident bound) t.ty
```
</ToggleWrapper>
</DocBlock>

