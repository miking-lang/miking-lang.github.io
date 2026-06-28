import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpDeclH" kind="sem">

```mc
sem cmpDeclH : (Ast_Decl, Ast_Decl) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpDeclH =
  | (DeclUtest l, DeclUtest r) ->
    let testDiff = cmpExpr l.test r.test in
    if eqi testDiff 0 then
      let expectedDiff = cmpExpr l.expected r.expected in
      if eqi expectedDiff 0 then
        let usingDiff =
          switch (l.tusing, r.tusing)
          case (Some a, Some b) then cmpExpr a b
          case (Some _, None _) then 1
          case (None _, Some _) then negi 1
          case _ then 0
          end
        in
        if eqi usingDiff 0 then
          switch (l.tonfail, r.tonfail)
          case (Some a, Some b) then cmpExpr a b
          case (Some _, None _) then 1
          case (None _, Some _) then negi 1
          case _ then 0
          end
        else usingDiff
      else expectedDiff
    else testDiff
```
</ToggleWrapper>
</DocBlock>

