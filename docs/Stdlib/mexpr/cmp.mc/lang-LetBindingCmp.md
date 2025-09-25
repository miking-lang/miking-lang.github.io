import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetBindingCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpLetBindRec" kind="sem">

```mc
sem cmpLetBindRec : LetDeclAst_DeclLetRecord -> LetDeclAst_DeclLetRecord -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpLetBindRec (lhs : DeclLetRecord) =
  | rhs ->
    let rhs : DeclLetRecord = rhs in
    let identDiff = nameCmp lhs.ident rhs.ident in
    if eqi identDiff 0 then
      cmpExpr lhs.body rhs.body
    else identDiff
```
</ToggleWrapper>
</DocBlock>

