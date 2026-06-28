import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangLangDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileDecl" kind="sem">

```mc
sem compileDecl : CompilationContext -> Ast_Decl -> CompilationResult
```



<ToggleWrapper text="Code..">
```mc
sem compileDecl ctx =
  | DeclLang l ->
    let langStr = nameGetStr l.ident in

    let typeDecls = filter isTypeDecl l.decls in
    let synDecls = filter isSynDecl l.decls in
    let semDecls = filter isSemDecl l.decls in

    let nameSeq =  (map (lam s. match s with DeclSem s in (nameGetStr s.ident, s.ident)) semDecls) in
    let semNames = mapFromSeq cmpString nameSeq in

    let ctx = foldl withSemSymbol ctx (map (lam s. match s with DeclSem s in s.ident) semDecls) in

    let ctx = foldl compileSynType ctx synDecls in
    let res = result.foldlM compileDecl ctx typeDecls in
    let res = result.map (lam ctx. foldl (compileMLangSynDefs langStr) ctx synDecls) res in

    let compileSemToResult : CompilationContext -> [Decl] -> CompilationContext
      = lam ctx. lam sems.
        let semBindings = map (compileSem langStr ctx semNames) sems in
        withDecl ctx (DeclRecLets {bindings = semBindings,
                                 info = l.info})
    in
    result.map (lam ctx. compileSemToResult ctx semDecls) res
  | DeclSyn s ->
    error "Unexpected DeclSyn"
  | DeclSem s ->
    error "Unexpected DeclSem!"
```
</ToggleWrapper>
</DocBlock>

