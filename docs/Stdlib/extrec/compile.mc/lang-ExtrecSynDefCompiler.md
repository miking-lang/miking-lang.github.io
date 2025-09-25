import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtrecSynDefCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileSynConstructors" kind="sem">

```mc
sem compileSynConstructors : String -> CompilationContext -> Ast_Decl -> CompilationContext
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileSynConstructors langStr ctx =
  | DeclSyn s ->
    match mapLookup (langStr, nameGetStr s.ident) ctx.compositionCheckEnv.baseMap
    with Some baseIdent in

    let forallWrapper : Type -> Type =
      lam ty.
        let ty = foldl (lam ty. lam n. ntyall_ n ty) ty (tail s.params) in
        nstyall_ (head s.params) (data_ baseIdent) ty
    in

    let conappWrapper : Type -> Type = lam ty.
      foldl tyapp_ ty (map ntyvar_ (tail s.params)) in

    let tyconApp = TyCon {info = s.info, ident = baseIdent, data = intyvar_ s.info (head s.params)} in
    -- let tyconApp = foldl (lam acc. lam n. tyapp_ acc (intyvar_ s.info n)) (ntycon_ baseIdent) s.params in

    let compileDef = lam ctx. lam def : {ident : Name, tyIdent : Type, tyName : Name}.
      match def.tyIdent with TyRecord _ then
        let tyIdent = mergeRecordTypes
          def.tyIdent
          (mapLookupOrElse (lam. tyrecord_ []) baseIdent ctx.globalFields) in
        match tyIdent with TyRecord rec in

        let recIdent = def.tyName in
        let ctx = {ctx with conToExtType = mapInsert def.ident recIdent ctx.conToExtType} in

        let work = lam ctx. lam sid. lam ty.
          let label = sidToString sid in
          let tyIdent = tyarrow_ (conappWrapper (ntycon_ recIdent)) ty in
          withDecl ctx (DeclRecField {label = label,
                                    tyIdent = forallWrapper tyIdent,
                                    info = infoTy ty}) in
        let ctx = mapFoldWithKey work ctx rec.fields in
        let lhs = TyCon {info = infoTy def.tyIdent,
                         ident = recIdent,
                         data = intyvar_ s.info (head s.params)} in
        withDecl ctx (DeclConDef {ident = def.ident,
                                tyIdent = forallWrapper (tyarrow_ (conappWrapper lhs) (conappWrapper tyconApp)),
                                info = s.info})
      else
        withDecl ctx (DeclConDef {ident = def.ident,
                                tyIdent = forallWrapper (tyarrow_ def.tyIdent tyconApp),
                                info = s.info})
    in
    let ctx = foldl compileDef ctx s.defs in

    -- Update baseToCons map
    let newSet = foldr
      setInsert
      (mapLookupOrElse (lam. setEmpty nameCmp) baseIdent ctx.baseToCons)
      (map (lam d. d.ident) s.defs) in
    let ctx = {ctx with baseToCons = mapInsert baseIdent newSet ctx.baseToCons} in

    ctx
```
</ToggleWrapper>
</DocBlock>

