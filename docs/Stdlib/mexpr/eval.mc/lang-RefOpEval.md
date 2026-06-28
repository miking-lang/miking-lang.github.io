import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RefOpEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CRef _, [arg]) -> TmRef {ref = ref arg}
  | (CModRef _, [TmRef r, arg]) ->
    modref r.ref arg;
    uunit_
  | (CDeRef _, [TmRef r]) -> deref r.ref
```
</ToggleWrapper>
</DocBlock>

