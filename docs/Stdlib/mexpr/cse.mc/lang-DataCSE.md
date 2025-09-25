import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataCSE  
  

  
  
  
## Semantics  
  

          <DocBlock title="cseSearchH" kind="sem">

```mc
sem cseSearchH : ProgramPos -> CSESearchEnv -> Ast_Expr -> CSESearchEnv
```



<ToggleWrapper text="Code..">
```mc
sem cseSearchH (pos : ProgramPos) (env : CSESearchEnv) =
  | conApp & (TmConApp _) -> cseCount pos env conApp
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
  | conApp & (TmConApp _) -> cseReplace env conApp
```
</ToggleWrapper>
</DocBlock>

