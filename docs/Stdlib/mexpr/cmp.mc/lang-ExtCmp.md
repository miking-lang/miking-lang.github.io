import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpDeclH" kind="sem">

```mc
sem cmpDeclH : (Ast_Decl, Ast_Decl) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpDeclH =
  | (DeclExt l, DeclExt r) ->
    let identDiff = nameCmp l.ident r.ident in
    if eqi identDiff 0 then
      let tyIdentDiff = cmpType l.tyIdent r.tyIdent in
      if eqi tyIdentDiff 0 then
        let leffect = if l.effect then 1 else 0 in
        let reffect = if r.effect then 1 else 0 in
        subi leffect reffect
      else tyIdentDiff
    else identDiff
```
</ToggleWrapper>
</DocBlock>

