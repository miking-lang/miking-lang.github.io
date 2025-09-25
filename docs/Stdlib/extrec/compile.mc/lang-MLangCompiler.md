import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compile" kind="sem">

```mc
sem compile : CompilationContext -> MLangTopLevel_MLangProgram -> Result CompilationWarning CompilationError Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compile ctx =| prog ->
    match result.consume (compileProg ctx prog) with (_, res) in
    switch res
      case Left err then
        result.err (head err)
      case Right (ctx, expr) then
        result.ok (bindall_ (concat ctx.toplevelDecls ctx.decls) expr)
    end
```
</ToggleWrapper>
</DocBlock>

