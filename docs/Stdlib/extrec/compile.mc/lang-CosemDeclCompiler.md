import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CosemDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileCosem" kind="sem">

```mc
sem compileCosem : all a. String -> CompilationContext -> a -> Ast_Decl -> {body: Ast_Expr, info: Info, ident: Name, tyBody: Ast_Type, tyAnnot: Ast_Type}
```



<ToggleWrapper text="Code..">
```mc
sem compileCosem langStr ctx cosemNames =
  | DeclCosem d ->
    match mapLookup (langStr, nameGetStr d.ident) ctx.compositionCheckEnv.cosemCaseMap
    with Some cases in

    if setIsEmpty cases then
      let result = TmExtRecord {ident = d.targetTyIdent,
                                bindings = mapEmpty cmpString,
                                info = d.info,
                                ty = tyunknown_} in
      let body = foldl (lam acc. lam arg. nulam_ arg.ident acc) result d.args in
      {ident = d.ident,
       tyAnnot = d.tyAnnot,
       tyBody = tyunknown_,
       body = body,
       info = d.info}
    else
      let cases = setToSeq cases in

      let syms = mapi (lam i. lam. (nameSym (concat "cosemResult" (int2string i)))) cases in

      let argsIdents = map (lam a. a.ident) d.args in

      let pairs = mapi (lam i. lam c. (get syms i, c)) cases in

      let compileThn = lam acc : Expr. lam pair : (Name, ExtendedCopat).
        match pair with (ident, c) in

        match mapLookup c.orig ctx.compositionCheckEnv.semArgsMap with Some (Some origArgs) in
        let pairs = join [zip origArgs argsIdents,
                          createPairsForSubst ctx c.orig.0 langStr] in
        let subst = mapFromSeq nameCmp pairs in
        let thn = substituteIdentifiersExpr subst c.thn in
        bind_ (nulet_ ident thn) acc in

      let f = lam acc. lam i. lam c.
        match c with {copat = RecordCopat {fields = fields}} in
        let g = lam acc. lam str.
          mapInsert str (recordproj_ str (nvar_ (get syms i))) acc in
        foldl g acc fields
      in
      let bindings = foldli f (mapEmpty cmpString) cases in
      let creator = TmExtRecord {ident = d.targetTyIdent,
                                 bindings = bindings,
                                 info = d.info,
                                 ty = tyunknown_} in

      let expr = foldl compileThn creator pairs in
      let expr = foldl (lam acc. lam arg. nulam_ arg.ident acc) expr (reverse d.args) in

      {ident = d.ident,
       tyAnnot = d.tyAnnot,
       tyBody = tyunknown_,
       body = expr,
       info = d.info}
```
</ToggleWrapper>
</DocBlock>

