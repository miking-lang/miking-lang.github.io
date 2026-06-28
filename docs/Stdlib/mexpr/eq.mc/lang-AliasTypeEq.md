import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AliasTypeEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : all a. {tyVarEnv: [(Name, Name)]} -> {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]} -> Ast_Type -> Ast_Type -> Option a
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyAlias t -> eqTypeH typeEnv free lhs t.content
```
</ToggleWrapper>
</DocBlock>

