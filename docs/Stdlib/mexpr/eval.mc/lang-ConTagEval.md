import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConTagEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CConstructorTag _, [TmConApp {ident = id}]) ->
    match nameGetSym id with Some sym then TmConst {
      val = CInt {val = sym2hash sym},
      ty = TyInt {info = NoInfo ()},
      info = NoInfo ()
    }
    else
      TmConst {
        val = CInt {val = 0}, ty = TyInt {info = NoInfo ()}, info = NoInfo ()
      }
```
</ToggleWrapper>
</DocBlock>

