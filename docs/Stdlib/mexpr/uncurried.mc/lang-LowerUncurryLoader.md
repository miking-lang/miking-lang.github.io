import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LowerUncurryLoader  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Hook" kind="syn">

```mc
syn Hook
```



<ToggleWrapper text="Code..">
```mc
syn Hook =
  | LowerUncurryHook ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="_postTypecheck" kind="sem">

```mc
sem _postTypecheck : MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Hook -> (MCoreLoader_Loader, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem _postTypecheck loader decl = | LowerUncurryHook _ ->
    let decl = smap_Decl_Expr lowerUncurried decl in
    let decl = smap_Decl_Type lowerUncurriedType decl in
    (loader, decl)
```
</ToggleWrapper>
</DocBlock>

