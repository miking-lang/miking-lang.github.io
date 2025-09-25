import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetCSE  
  

  
  
  
## Semantics  
  

          <DocBlock title="cseSearchH" kind="sem">

```mc
sem cseSearchH : ProgramPos -> CSESearchEnv -> Ast_Expr -> CSESearchEnv
```



<ToggleWrapper text="Code..">
```mc
sem cseSearchH (pos : ProgramPos) (env : CSESearchEnv) =
  | TmDecl { decl = DeclLet t, inexpr = inexpr } ->
    let env : CSESearchEnv = cseSearch pos env t.body in
    let inexprPos = snoc pos env.index in
    cseSearch inexprPos env inexpr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cseApplyH" kind="sem">

```mc
sem cseApplyH : CSEApplyEnv -> Ast_Expr -> (CSEApplyEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem cseApplyH (env : CSEApplyEnv) =
  | TmDecl (d & { decl = DeclLet t, inexpr = inexpr }) ->
    match cseApply env t.body with (thnEnv, body) then
      match cseApply thnEnv inexpr with (env, inexpr) then
        let inexpr = insertSubexpressionDeclarations thnEnv inexpr in
        ( env
        , TmDecl {d with decl = DeclLet {t with body = body}, inexpr = inexpr}
        )
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

