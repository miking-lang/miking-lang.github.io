import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SynTypeDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileSynType" kind="sem">

```mc
sem compileSynType : CompilationContext -> Ast_Decl -> CompilationContext
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileSynType ctx =
  | DeclSyn s ->
    -- We only include a type definition if this is the base declaration of
    -- a syntax type. To check that something is a base syn definition,
    -- we check that it does not include any other definitions.
    if null s.includes then
      withTopLevelDecl ctx (DeclType {ident = s.ident,
                                    params = s.params,
                                    tyIdent = tyvariant_ [],
                                    info = s.info})
    else
      ctx
```
</ToggleWrapper>
</DocBlock>

