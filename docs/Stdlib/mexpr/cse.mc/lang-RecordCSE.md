import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordCSE  
  

  
  
  
## Semantics  
  

          <DocBlock title="cseSearchH" kind="sem">

```mc
sem cseSearchH : ProgramPos -> CSESearchEnv -> Ast_Expr -> CSESearchEnv
```



<ToggleWrapper text="Code..">
```mc
sem cseSearchH (pos : ProgramPos) (env : CSESearchEnv) =
  | record & (TmRecord _) -> cseCount pos env record
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
  | record & (TmRecord _) -> cseReplace env record
```
</ToggleWrapper>
</DocBlock>

