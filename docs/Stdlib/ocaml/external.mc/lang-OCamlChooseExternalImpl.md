import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlChooseExternalImpl  
  

  
  
  
## Semantics  
  

          <DocBlock title="chooseExternalImpls" kind="sem">

```mc
sem chooseExternalImpls : Map String [ExternalImpl] -> GenerateEnv -> Ast_Expr -> GenerateEnv
```

<Description>{`\`chooseExternalImpls impls env t\` chooses external definitions from  
\`impls\` for each external in \`t\` and adds these to \`env\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem chooseExternalImpls
    : Map String [ExternalImpl] -> GenerateEnv -> Expr -> GenerateEnv
```
</ToggleWrapper>
</DocBlock>

