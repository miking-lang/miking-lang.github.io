import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharEquality  
  

  
  
  
## Semantics  
  

          <DocBlock title="equalityIdH" kind="sem">

```mc
sem equalityIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```



<ToggleWrapper text="Code..">
```mc
sem equalityIdH info env =
  | TyChar _ -> eqCharName ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateEqualityBodyH" kind="sem">

```mc
sem generateEqualityBodyH : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generateEqualityBodyH info env =
  | TyChar _ -> _unit
```
</ToggleWrapper>
</DocBlock>

