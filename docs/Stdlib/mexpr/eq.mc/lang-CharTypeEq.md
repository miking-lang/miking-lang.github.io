import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharTypeEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : {tyVarEnv: [(Name, Name)]} -> {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]} -> Ast_Type -> Ast_Type -> Option EqTypeFreeEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyChar _ ->
    match unwrapType lhs with TyChar _ then Some free
    else None ()
```
</ToggleWrapper>
</DocBlock>

