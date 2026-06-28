import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VariantTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env: PprintEnv) =
  | TyVariant t ->
    if eqi (mapLength t.constrs) 0 then (env,"<>")
    else (env, join ["Variant<", strJoin ", " (map nameGetStr (mapKeys t.constrs)), ">"])
```
</ToggleWrapper>
</DocBlock>

