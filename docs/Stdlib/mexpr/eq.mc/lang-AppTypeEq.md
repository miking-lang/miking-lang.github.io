import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppTypeEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : {tyVarEnv: [(Name, Name)]} -> {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]} -> Ast_Type -> Ast_Type -> Option {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyApp r ->
    match unwrapType lhs with TyApp l then
      match eqTypeH typeEnv free l.lhs r.lhs with Some free then
        eqTypeH typeEnv free l.rhs r.rhs
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

