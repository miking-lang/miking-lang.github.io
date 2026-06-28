import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SynProdDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileSynProd" kind="sem">

```mc
sem compileSynProd : String -> CompilationContext -> Ast_Decl -> CompilationContext
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileSynProd langStr ctx =
  | SynDeclProdExt s ->
    match mapLookup (langStr, nameGetStr s.ident) ctx.compositionCheckEnv.baseMap
    with Some baseIdent in

    -- Compile indiv ext
    let compileExt = lam ctx. lam ext.
      match ext with {ident = ident, tyIdent = tyIdent} in
      match mapLookup ident ctx.conToExtType with Some recIdent in
      match tyIdent with TyRecord rec in
      let work = lam acc. lam sid. lam ty.
          let label = sidToString sid in
          let tyIdent = tyarrow_ (ntycon_ recIdent) ty in
          withDecl acc (DeclRecField {label = label,
                                    tyIdent = nstyall_ (head s.params) (data_ recIdent) tyIdent,
                                    info = infoTy ty})
      in
      mapFoldWithKey work ctx rec.fields
    in
    let ctx = foldl compileExt ctx s.individualExts in

    -- Compile global ext
    match s.globalExt with Some globalExt then
      -- Global extension is currently unsupported so we just throw an error
      errorSingle [s.info] "* Global Product Extension is not supported!"
      -- match mapLookup s.ident ctx.baseMap with Some baseIdent in
      -- match mapLookup baseIdent ctx.baseToCons with Some allConstructors in
      -- let explicitConstructors = setOfSeq nameCmp (map (lam e. e.ident) s.individualExts) in

      -- let relevantCons = setSubtract allConstructors explicitConstructors in

      -- match globalExt with TyRecord rec in

      -- let compileGlobalExt = lam ctx. lam ident.
      --   match mapLookup ident ctx.conToExtType with Some recIdent in
      --   let work = lam acc. lam sid. lam ty.
      --     let label = sidToString sid in
      --     let tyIdent = tyarrow_ (ntycon_ recIdent) ty in
      --       withDecl acc (TmRecField {label = label,
      --                                 tyIdent = nstyall_ mapParamIdent (data_ s.ident) tyIdent,
      --                                 inexpr = uunit_,
      --                                 ty = tyunknown_,
      --                                 info = infoTy ty})
      --   in
      --   mapFoldWithKey work ctx rec.fields
      -- in

      -- let ctx = setFold compileGlobalExt ctx relevantCons in

      -- let newGlobalExt = mergeRecordTypes
      --   (mapLookupOrElse (lam. tyrecord_ []) baseIdent ctx.globalFields)
      --   globalExt in

      -- {ctx with globalFields = mapInsert baseIdent newGlobalExt ctx.globalFields}
    else
      ctx
```
</ToggleWrapper>
</DocBlock>

