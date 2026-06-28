import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileDecl" kind="sem">

```mc
sem compileDecl : CompilationContext -> Ast_Decl -> CompilationResult
```



<ToggleWrapper text="Code..">
```mc
sem compileDecl ctx =
  | DeclType d ->
    result.ok (withDecl ctx (DeclType {ident = d.ident,
                                     params = d.params,
                                     tyIdent = d.tyIdent,
                                     info = d.info}))
```
</ToggleWrapper>
</DocBlock>

