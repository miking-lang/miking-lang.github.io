import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PropagateTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateTyAnnot" kind="sem">

```mc
sem propagateTyAnnot : (Ast_Expr, Ast_Type) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem propagateTyAnnot =
  | (tm, TyAll a) -> propagateTyAnnot (tm, a.ty)
  | (TmLam l, TyArrow a) ->
    let body = propagateTyAnnot (l.body, a.to) in
    let ty = optionGetOr a.from (sremoveUnknown l.tyAnnot) in
    TmLam {l with body = body, tyAnnot = ty}
  | (tm, ty) -> tm
```
</ToggleWrapper>
</DocBlock>

