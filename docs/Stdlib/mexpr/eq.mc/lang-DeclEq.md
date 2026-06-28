import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : all a. {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option a
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH env free lhs =
  | TmDecl {decl = d2, inexpr = e2} ->
    match lhs with TmDecl {decl = d1, inexpr = e1} then
      match eqDeclH env free d1 d2 with Some (env, free) then
        eqExprH env free e1 e2
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

