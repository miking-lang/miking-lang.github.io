import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqDeclH" kind="sem">

```mc
sem eqDeclH : EqEnv -> EqEnv -> Ast_Decl -> Ast_Decl -> Option (EqEnv, EqEnv)
```



<ToggleWrapper text="Code..">
```mc
sem eqDeclH (env : EqEnv) (free : EqEnv) lhs =
  | DeclLet {ident = i2, body = b2} ->
    match lhs with DeclLet {ident = i1, body = b1} then
      match eqExprH env free b1 b2 with Some free then
        Some ({env with varEnv = biInsert (i1,i2) env.varEnv}, free)
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

