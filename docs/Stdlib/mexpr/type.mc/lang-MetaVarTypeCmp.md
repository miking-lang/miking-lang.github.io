import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MetaVarTypeCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  | (TyMetaVar l, TyMetaVar r) ->
    -- NOTE(vipa, 2023-04-19): Any non-link TyMetaVar should have been
    -- unwrapped already, thus we can assume \\`Unbound\\` here.
    match (deref l.contents, deref r.contents) with (Unbound l, Unbound r) then
      nameCmp l.ident r.ident
    else error "cmpTypeH reached non-unwrapped MetaVar!"
```
</ToggleWrapper>
</DocBlock>

