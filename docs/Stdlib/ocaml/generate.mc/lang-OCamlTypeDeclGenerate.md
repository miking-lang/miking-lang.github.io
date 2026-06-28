import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlTypeDeclGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateTypeDecls" kind="sem">

```mc
sem generateTypeDecls : AssocSeq Name Ast_Type -> (GenerateEnv, [OCamlTopAst_Top])
```



<ToggleWrapper text="Code..">
```mc
sem generateTypeDecls =
  | env ->
    let env : AssocSeq Name Type = env in
    let typeLiftEnvMap = mapFromSeq nameCmp env in
    let topDecls = _makeTypeDeclarations typeLiftEnvMap env in
    match topDecls with (tops, recordFieldsToName) in
      let generateEnv = _typeLiftEnvToGenerateEnv typeLiftEnvMap
                                                  env recordFieldsToName in
      (generateEnv, tops)
```
</ToggleWrapper>
</DocBlock>

