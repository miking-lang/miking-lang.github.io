import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpDeclH" kind="sem">

```mc
sem cmpDeclH : (Ast_Decl, Ast_Decl) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpDeclH =
  | (DeclType l, DeclType r) ->
    let identDiff = nameCmp l.ident r.ident in
    if eqi identDiff 0 then
      cmpType l.tyIdent r.tyIdent
    else identDiff
```
</ToggleWrapper>
</DocBlock>

