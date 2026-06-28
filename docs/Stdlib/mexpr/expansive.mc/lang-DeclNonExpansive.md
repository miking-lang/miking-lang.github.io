import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclNonExpansive  
  

  
  
  
## Semantics  
  

          <DocBlock title="nonExpansive" kind="sem">

```mc
sem nonExpansive : NonExpansive_Guarded -> Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem nonExpansive guarded =
  | TmDecl x ->
    if nonExpansiveDecl x.decl
    then nonExpansive guarded x.inexpr
    else false
```
</ToggleWrapper>
</DocBlock>

