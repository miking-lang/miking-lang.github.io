import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsIndex  
  

  
  
  
## Semantics  
  

          <DocBlock title="indexAdd" kind="sem">

```mc
sem indexAdd : Index_IndexAcc -> Ast_Expr -> Index_IndexAcc
```



<ToggleWrapper text="Code..">
```mc
sem indexAdd (acc: IndexAcc) =
  | TmDecl {decl = DeclRecLets { bindings = bindings }} ->
    foldl (lam acc: IndexAcc. lam b: DeclLetRecord. addKey b.ident acc)
      acc bindings
```
</ToggleWrapper>
</DocBlock>

