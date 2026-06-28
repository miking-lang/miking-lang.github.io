import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NeverEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option EqEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmNever _ -> match lhs with TmNever _ then Some free else None ()
```
</ToggleWrapper>
</DocBlock>

