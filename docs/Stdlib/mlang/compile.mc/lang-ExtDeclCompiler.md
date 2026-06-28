import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileDecl" kind="sem">

```mc
sem compileDecl : CompilationContext -> Ast_Decl -> CompilationResult
```



<ToggleWrapper text="Code..">
```mc
sem compileDecl ctx =
  -- TODO(voorberg, 2024-04-23): Add test case for the compilation of externals.
  | DeclExt d -> result.ok (
    withDecl ctx (DeclExt {ident = d.ident,
                         tyIdent = d.tyIdent,
                         effect = d.effect,
                         info = d.info}))
```
</ToggleWrapper>
</DocBlock>

