import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TyWildPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="typePrecedence" kind="sem">

```mc
sem typePrecedence : Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem typePrecedence =
  | TyWild _ -> 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode indent env =
  | TyWild _ -> (env, "_")
```
</ToggleWrapper>
</DocBlock>

