import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangTopLevelCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="_gatherBaseSemNames" kind="sem">

```mc
sem _gatherBaseSemNames : Set Name -> Ast_Decl -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _gatherBaseSemNames acc =
  | DeclLang d ->
    foldl _gatherBaseSemNames acc d.decls
  | DeclSyn {includes = [], ident = ident} ->
    setInsert ident acc
  | _ -> acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileProg" kind="sem">

```mc
sem compileProg : CompilationContext -> MLangTopLevel_MLangProgram -> Result CompilationWarning CompilationError (CompilationContext, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileProg ctx =
  | prog ->
    let ctx = {ctx with allBaseSyns = foldl _gatherBaseSemNames (setEmpty nameCmp) prog.decls} in

    let res = result.foldlM compileDecl ctx prog.decls in
    result.map (lam ctx. (ctx, prog.expr)) res
```
</ToggleWrapper>
</DocBlock>

