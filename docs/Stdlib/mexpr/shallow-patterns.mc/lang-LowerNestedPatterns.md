import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LowerNestedPatterns  
  

  
  
  
## Semantics  
  

          <DocBlock title="lowerAll" kind="sem">

```mc
sem lowerAll : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lowerAll = | t ->
    let f = lam pair. (pair.0, lowerAll pair.1) in
    match collectBranches t with Some (target, branches, fallthrough)
    then
      match target with Left expr then
        let targetId = nameSym "_target" in
        let elseId = nameSym "_elsBranch" in
        bindall_ [
          nulet_ elseId (ulam_ "" (lowerAll fallthrough)),
          nulet_ targetId (lowerAll expr)]
        (lowerToExpr targetId (map f branches) (app_ (nvar_ elseId) uunit_))
      else match target with Right name then
        lowerToExpr name (map f branches) (lowerAll fallthrough)
      else never
    else smap_Expr_Expr lowerAll t
```
</ToggleWrapper>
</DocBlock>

