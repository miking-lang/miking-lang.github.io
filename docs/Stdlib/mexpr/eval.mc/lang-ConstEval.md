import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (const, args) ->
    if lti (length args) (constArity const) then
      TmConstApp {const = const, args = args, info = info}
    else errorSingle [info]
           (join [
             "Invalid application\n",
             expr2str (TmConstApp {const = const, args = args, info = info})
           ])
```
</ToggleWrapper>
</DocBlock>

