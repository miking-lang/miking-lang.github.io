import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchCSE  
  

  
  
  
## Semantics  
  

          <DocBlock title="cseSearchH" kind="sem">

```mc
sem cseSearchH : ProgramPos -> CSESearchEnv -> Ast_Expr -> CSESearchEnv
```



<ToggleWrapper text="Code..">
```mc
sem cseSearchH (pos : ProgramPos) (env : CSESearchEnv) =
  | TmMatch t ->
    let env : CSESearchEnv = cseSearch pos env t.target in
    let thnPos = snoc pos env.index in
    let env : CSESearchEnv = cseSearch thnPos env t.thn in
    let elsPos = snoc pos env.index in
    cseSearch elsPos env t.els
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
  | TmMatch t ->
    match cseApply env t.target with (thnEnv, target) then
      match cseApply thnEnv t.thn with (elsEnv, thn) then
        let thn = insertSubexpressionDeclarations thnEnv thn in
        match cseApply elsEnv t.els with (env, els) then
          let els = insertSubexpressionDeclarations elsEnv els in
          (env, TmMatch {{{t with target = target}
                             with thn = thn}
                             with els = els})
        else never
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

