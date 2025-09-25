import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateProgram" kind="sem">

```mc
sem generateProgram : Set Name -> Ast_Expr -> FutharkAst_FutProg
```



<ToggleWrapper text="Code..">
```mc
sem generateProgram (entryPoints : Set Name) =
  | prog ->
    let emptyEnv = {
      entryPoints = entryPoints,
      boundNames = mapEmpty nameCmp
    } in
    FProg {decls = generateToplevel emptyEnv prog}
```
</ToggleWrapper>
</DocBlock>

