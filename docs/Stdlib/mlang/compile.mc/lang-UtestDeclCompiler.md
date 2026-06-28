import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileDecl" kind="sem">

```mc
sem compileDecl : CompilationContext -> Ast_Decl -> CompilationResult
```



<ToggleWrapper text="Code..">
```mc
sem compileDecl ctx =
  | DeclUtest d -> result.ok (
    withDecl ctx (DeclUtest {test = d.test,
                           expected = d.expected,
                           tusing = d.tusing,
                           tonfail = None (),
                           info = d.info}))
```
</ToggleWrapper>
</DocBlock>

