import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : all a. all a1. {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeAnnot" kind="sem">

```mc
sem typeAnnot : all a. all a1. a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnot =
  | expr ->
    let env = _typeEnvEmpty in
    typeAnnotExpr env expr
```
</ToggleWrapper>
</DocBlock>

