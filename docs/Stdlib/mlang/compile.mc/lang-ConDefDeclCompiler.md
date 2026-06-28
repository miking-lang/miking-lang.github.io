import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConDefDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileDecl" kind="sem">

```mc
sem compileDecl : CompilationContext -> Ast_Decl -> CompilationResult
```



<ToggleWrapper text="Code..">
```mc
sem compileDecl ctx =
  | DeclConDef d -> result.ok (
    withDecl ctx (DeclConDef {ident = d.ident,
                            tyIdent = d.tyIdent,
                            info = d.info}))
```
</ToggleWrapper>
</DocBlock>

