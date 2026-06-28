import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeAbsAppAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode indent env =
  | TyAbsApp t ->
    match getTypeStringCode indent env t.lhs with (env, lhs) in
    match getTypeStringCode indent env t.rhs with (env, rhs) in
    (env, join [lhs, " @ ", rhs])
```
</ToggleWrapper>
</DocBlock>

