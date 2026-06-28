import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppCSE  
  

  
  
  
## Semantics  
  

          <DocBlock title="cseSearchH" kind="sem">

```mc
sem cseSearchH : ProgramPos -> CSESearchEnv -> Ast_Expr -> CSESearchEnv
```



<ToggleWrapper text="Code..">
```mc
sem cseSearchH (pos : ProgramPos) (env : CSESearchEnv) =
  | app & (TmApp t) ->
    match t.ty with TyArrow _ then
      sfold_Expr_Expr (cseSearch pos) env app
    else match t.lhs with TmVar {ident = ident} then
      if mapMem ident env.recursiveIdents then env
      else cseCount pos env app
    else cseCount pos env app
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
  | app & (TmApp _) -> cseReplace env app
```
</ToggleWrapper>
</DocBlock>

