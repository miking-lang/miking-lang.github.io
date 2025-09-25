import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsCSE  
  

  
  
  
## Semantics  
  

          <DocBlock title="cseSearchH" kind="sem">

```mc
sem cseSearchH : ProgramPos -> CSESearchEnv -> Ast_Expr -> CSESearchEnv
```



<ToggleWrapper text="Code..">
```mc
sem cseSearchH (pos : ProgramPos) (env : CSESearchEnv) =
  | TmDecl { decl = DeclRecLets t, inexpr = inexpr } ->
    let recursiveIdents =
      foldl
        (lam acc. lam binding : DeclLetRecord. setInsert binding.ident acc)
        env.recursiveIdents
        t.bindings in
    let bindEnv =
      foldl
        (lam acc. lam binding : DeclLetRecord.
          cseSearch pos acc binding.body)
        {env with recursiveIdents = recursiveIdents}
        t.bindings in
    cseSearch pos bindEnv inexpr
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
  | TmDecl (d & {decl = DeclRecLets t, inexpr = inexpr}) ->
    let applyBinding : CSEApplyEnv -> DeclLetRecord
                    -> (CSEApplyEnv, DeclLetRecord) =
      lam env. lam binding.
      match cseApply env binding.body with (env, body) then
        (env, {binding with body = body})
      else never
    in
    match mapAccumL applyBinding env t.bindings with (inexprEnv, bindings) then
      match cseApply inexprEnv inexpr with (env, inexpr) then
        let inexpr = insertSubexpressionDeclarations inexprEnv inexpr in
        ( env
        , TmDecl {d with decl = DeclRecLets {t with bindings = bindings}, inexpr = inexpr}
        )
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

