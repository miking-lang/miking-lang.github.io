import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="prettyPrintIdH" kind="sem">

```mc
sem prettyPrintIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```



<ToggleWrapper text="Code..">
```mc
sem prettyPrintIdH info env =
  | TyFloat _ -> ppFloatName ()
```
</ToggleWrapper>
</DocBlock>

