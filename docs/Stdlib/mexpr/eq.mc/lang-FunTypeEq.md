import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FunTypeEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : {tyVarEnv: [(Name, Name)]} -> {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]} -> Ast_Type -> Ast_Type -> Option {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyArrow r ->
    match unwrapType lhs with TyArrow l then
      match eqTypeH typeEnv free l.from r.from with Some free then
        eqTypeH typeEnv free l.to r.to
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

