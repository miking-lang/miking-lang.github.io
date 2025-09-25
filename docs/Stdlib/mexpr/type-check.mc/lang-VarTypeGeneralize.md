import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarTypeGeneralize  
  

  
  
  
## Semantics  
  

          <DocBlock title="genBase" kind="sem">

```mc
sem genBase : Level -> Map Name Ast_Kind -> Set Name -> Ast_Type -> [(Name, Ast_Kind)]
```



<ToggleWrapper text="Code..">
```mc
sem genBase (lvl : Level) (vs : Map Name Kind) (bound : Set Name) =
  | TyVar t ->
    match mapLookup t.ident vs with Some kind then
      if not (setMem t.ident bound) then [(t.ident, kind)]
      else []
    else []
```
</ToggleWrapper>
</DocBlock>

