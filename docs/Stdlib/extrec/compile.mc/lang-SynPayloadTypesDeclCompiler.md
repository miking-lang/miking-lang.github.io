import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SynPayloadTypesDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileSynPayloadTypes" kind="sem">

```mc
sem compileSynPayloadTypes : CompilationContext -> Ast_Decl -> CompilationContext
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileSynPayloadTypes ctx =
  | DeclSyn s ->
    -- Generate a record type for each definition in the syntax type.
    let work = lam ctx. lam def.
      withDecl ctx (DeclRecType {ident = def.tyName,
                               params = s.params,
                               info = infoTy def.tyIdent}) in
    foldl work ctx s.defs
```
</ToggleWrapper>
</DocBlock>

