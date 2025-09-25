import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# HoleAnnotation  
  

  
  
  
## Semantics  
  

          <DocBlock title="stripTuneAnnotations" kind="sem">

```mc
sem stripTuneAnnotations : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem stripTuneAnnotations =
  | t -> smap_Expr_Expr stripTuneAnnotations t
```
</ToggleWrapper>
</DocBlock>

