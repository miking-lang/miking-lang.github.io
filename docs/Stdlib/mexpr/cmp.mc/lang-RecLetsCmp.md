import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpDeclH" kind="sem">

```mc
sem cmpDeclH : (Ast_Decl, Ast_Decl) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpDeclH =
  | (DeclRecLets l, DeclRecLets r) ->
    seqCmp cmpLetBindRec l.bindings r.bindings
```
</ToggleWrapper>
</DocBlock>

