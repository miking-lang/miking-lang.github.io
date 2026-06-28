import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CInitPrettyPrint  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
C INITIALIZERS \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Semantics  
  

          <DocBlock title="printCInit" kind="sem">

```mc
sem printCInit : PprintEnv -> CInitAst_CInit -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem printCInit (env: PprintEnv) =
  | CIExpr { expr = expr } -> printCExpr env expr

  | CIList { inits = inits } ->
    match mapAccumL printCInit env inits with (env,inits) then
      (env, join ["{", strJoin ", " inits, "}"])
    else never
```
</ToggleWrapper>
</DocBlock>

