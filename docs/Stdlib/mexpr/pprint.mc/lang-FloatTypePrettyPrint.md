import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env: PprintEnv) =
  | TyFloat _ -> (env,"Float")
```
</ToggleWrapper>
</DocBlock>

