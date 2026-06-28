import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileDecl" kind="sem">

```mc
sem compileDecl : CompilationContext -> Ast_Decl -> CompilationResult
```



<ToggleWrapper text="Code..">
```mc
sem compileDecl ctx =
  | DeclLet d -> result.ok (
    withDecl ctx (DeclLet {ident = d.ident,
                         tyAnnot = d.tyAnnot,
                         tyBody = d.tyBody,
                         body = d.body,
                         info = d.info}))
```
</ToggleWrapper>
</DocBlock>

