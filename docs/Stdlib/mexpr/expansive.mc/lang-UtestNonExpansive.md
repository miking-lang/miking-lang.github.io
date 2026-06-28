import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestNonExpansive  
  

  
  
  
## Semantics  
  

          <DocBlock title="nonExpansiveDecl" kind="sem">

```mc
sem nonExpansiveDecl : Ast_Decl -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem nonExpansiveDecl =
  | DeclUtest _ -> true
```
</ToggleWrapper>
</DocBlock>

