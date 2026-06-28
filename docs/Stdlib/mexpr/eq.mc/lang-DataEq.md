import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqDeclH" kind="sem">

```mc
sem eqDeclH : EqEnv -> EqEnv -> Ast_Decl -> Ast_Decl -> Option (EqEnv, EqEnv)
```



<ToggleWrapper text="Code..">
```mc
sem eqDeclH env free lhs =
  | DeclConDef {ident = i2, tyIdent = ty2} ->
    match env with {conEnv = conEnv} then
      match lhs with DeclConDef {ident = i1, tyIdent = ty1} then
        let conEnv = biInsert (i1,i2) conEnv in
        Some ({env with conEnv = conEnv}, free)
      else None ()
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : all a. {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option a
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmConApp {ident = i2, body = b2, ty = ty2} ->
    match lhs with TmConApp {ident = i1, body = b1, ty = ty1} then
      match (env,free) with ({conEnv = conEnv},{conEnv = freeConEnv}) then
        match _eqCheck i1 i2 conEnv freeConEnv with Some freeConEnv then
          eqExprH env {free with conEnv = freeConEnv} b1 b2
        else None ()
      else never
    else None ()
```
</ToggleWrapper>
</DocBlock>

