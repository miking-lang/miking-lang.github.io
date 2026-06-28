import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPExprArray2dPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPExpr" kind="sem">

```mc
sem pprintCOPExpr : PprintEnv -> COPAst_COPExpr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPExpr env =
  | COPExprArray2d { array = array } ->
    match mapAccumL (lam env. lam inner.
        match mapAccumL (lam env. lam e. pprintCOPExpr env e) env inner
        with (env, inner) in
        (env, strJoin "," inner)
      ) env array
    with (env, array) in
    (env, join ["[|", strJoin "|" array, "|]"])
```
</ToggleWrapper>
</DocBlock>

