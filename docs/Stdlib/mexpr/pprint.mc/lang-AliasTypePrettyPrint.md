import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AliasTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="typePrecedence" kind="sem">

```mc
sem typePrecedence : Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem typePrecedence =
  | TyAlias t -> typePrecedence t.display
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> _a
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env : PprintEnv) =
  | TyAlias t -> getTypeStringCode indent env t.display
```
</ToggleWrapper>
</DocBlock>

