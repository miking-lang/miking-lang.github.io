import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqDeclH" kind="sem">

```mc
sem eqDeclH : EqEnv -> EqEnv -> Ast_Decl -> Ast_Decl -> Option (EqEnv, EqEnv)
```



<ToggleWrapper text="Code..">
```mc
sem eqDeclH (env : EqEnv) (free : EqEnv) (lhs : Decl) =
  | DeclType _ -> error "eqDecl not implemented for DeclType!"
```
</ToggleWrapper>
</DocBlock>

