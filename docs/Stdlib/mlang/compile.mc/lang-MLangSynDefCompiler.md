import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangSynDefCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileMLangSynDefs" kind="sem">

```mc
sem compileMLangSynDefs : String -> CompilationContext -> Ast_Decl -> CompilationContext
```



<ToggleWrapper text="Code..">
```mc
sem compileMLangSynDefs langStr ctx =
  | DeclSyn s ->
    match mapLookup (langStr, nameGetStr s.ident) ctx.compositionCheckEnv.baseMap
    with Some baseIdent in

    -- Wrap a type in a tyall for each parameter
    let forallWrapper = lam ty. foldr ntyall_ ty s.params in

    -- Apply the type variables to the type constructor on the rhs of tyIdent
    let rhs = foldl (lam ty. lam n. tyapp_ ty (ntyvar_ n)) (ntycon_ baseIdent) s.params in

    let compileDef = lam ctx. lam def.
      withDecl ctx (DeclConDef {ident = def.ident,
                              tyIdent = forallWrapper (tyarrow_ def.tyIdent rhs),
                              info = s.info}) in

    foldl compileDef ctx s.defs
```
</ToggleWrapper>
</DocBlock>

