import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CosynDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileCosyn" kind="sem">

```mc
sem compileCosyn : String -> CompilationContext -> Ast_Decl -> CompilationContext
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileCosyn langStr ctx =
  | DeclCosyn s ->
    match mapLookup (langStr, nameGetStr s.ident) ctx.compositionCheckEnv.baseMap
    with Some baseIdent in

    let ctx = if s.isBase
              then withDecl ctx (DeclRecType {ident = s.ident,
                                            params = s.params,
                                            info = s.info})
              else ctx in

    let wrap = lam ty. lam n. nstyall_ n (data_ baseIdent) ty in

    let compileField = lam ctx. lam sid. lam ty.
      let tyIdent = tyarrow_ (ntycon_ baseIdent) ty in
      withDecl ctx (DeclRecField {label = sidToString sid,
                                tyIdent = foldl wrap tyIdent s.params,
                                info = s.info}) in

    match s.ty with TyRecord rec then
      mapFoldWithKey compileField ctx rec.fields
    else
      errorSingle [s.info] (join [
        " * A cosyn can only have record types as their type!"
      ])
```
</ToggleWrapper>
</DocBlock>

