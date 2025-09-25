import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TestLangWithoutLang  
  

  
  
  
## Semantics  
  

          <DocBlock title="isFullySymbolizedDecl" kind="sem">

```mc
sem isFullySymbolizedDecl : Ast_Decl -> () -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedDecl =
  | DeclUse _ -> error "Symbolization should get rid of all occurrences of DeclUse!"
  | DeclLang l ->
    _and (lam. nameHasSym l.ident) (_and
        (lam. forAll nameHasSym l.includes)
        (foldl (_andFold isFullySymbolizedDecl) (lam. true) l.decls)
    )
  | DeclSyn l ->
    _and (lam. nameHasSym l.ident) (_and
        (lam. (forAll nameHasSym l.params))
        (lam. (forAll nameHasSym (map (lam d. d.ident) l.defs)))
    )
  | DeclSem l ->
    let args = optionGetOrElse (lam. []) l.args in
    let argIdents = map (lam a. a.ident) args in
    let argTys = map (lam a. a.tyAnnot) args in
    let casePats = map (lam c. c.pat) l.cases in
    let caseThns = map (lam c. c.thn) l.cases in

    foldl _and (lam. true) [
      lam. nameHasSym l.ident,
      isFullySymbolizedType l.tyAnnot,
      isFullySymbolizedType l.tyBody,
      lam. forAll nameHasSym argIdents,
      foldl (_andFold isFullySymbolizedType) (lam. true) argTys,
      foldl (_andFold isFullySymbolizedPat) (lam. true) casePats,
      foldl (_andFold isFullySymbolizedExpr) (lam. true) caseThns
    ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isFullySymbolizedType" kind="sem">

```mc
sem isFullySymbolizedType : Ast_Type -> () -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedType =
  | TyUse _ -> error "Symbolization should get rid of TyUse!"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isFullySymbolizedProgram" kind="sem">

```mc
sem isFullySymbolizedProgram : MLangTopLevel_MLangProgram -> () -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedProgram =
  | prog ->
    _and
      (isFullySymbolizedExpr prog.expr)
      (foldl (_andFold isFullySymbolizedDecl) (lam. true) prog.decls)
```
</ToggleWrapper>
</DocBlock>

