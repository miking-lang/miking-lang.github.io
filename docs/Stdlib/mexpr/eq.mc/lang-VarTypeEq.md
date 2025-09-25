import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarTypeEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : {tyVarEnv: [(Name, Name)]} -> {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]} -> Ast_Type -> Ast_Type -> Option EqTypeFreeEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyVar r ->
    match lhs with TyVar l then
      optionMap
        (lam freeTyVars. {free with freeTyVars = freeTyVars})
        (_eqCheck l.ident r.ident typeEnv.tyVarEnv free.freeTyVars)
    else None ()
```
</ToggleWrapper>
</DocBlock>

