import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtRecTestLang  
  

  
  
  
## Semantics  
  

          <DocBlock title="isFullySymbolizedExpr" kind="sem">

```mc
sem isFullySymbolizedExpr : Ast_Expr -> () -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedExpr =
  | TmExtRecord t ->
    foldl _and (lam. true) [
      lam. nameHasSym t.ident,
      foldl (_andFold isFullySymbolizedExpr) (lam. true) (mapValues t.bindings)
    ]
  | TmExtExtend t ->
    _and (isFullySymbolizedExpr t.e)
         (foldl (_andFold isFullySymbolizedExpr) (lam. true) (mapValues t.bindings))
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
  | TyQualifiedName t ->
    let fullySymbolizedPair = lam p. and (nameHasSym p.0) (nameHasSym p.1) in
    foldl _and (lam. true) [
      lam. nameHasSym t.lhs,
      lam. nameHasSym t.rhs,
      lam. forAll fullySymbolizedPair t.plus,
      lam. forAll fullySymbolizedPair t.minus
    ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isFullySymbolizedCopat" kind="sem">

```mc
sem isFullySymbolizedCopat : CopatAst_Copat -> () -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedCopat =
  | RecordCopat _ -> lam. true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isFullySymbolizedDecl" kind="sem">

```mc
sem isFullySymbolizedDecl : Ast_Decl -> () -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isFullySymbolizedDecl =
  | DeclCosyn s ->
    _and (lam. and (nameHasSym s.ident) (forAll nameHasSym s.params))
         (isFullySymbolizedType s.ty)
  | DeclCosem s ->
    let isFullySymbolizedArg = lam arg.
      _and (lam. nameHasSym arg.ident) (isFullySymbolizedType arg.tyAnnot) in

    let isFullySymbolizedCase = lam cas.
      _and (isFullySymbolizedCopat cas.0) (isFullySymbolizedExpr cas.1) in

    foldl _and (lam. true) [
      lam. nameHasSym s.ident,
      foldl (_andFold isFullySymbolizedArg) (lam. true) s.args,
      foldl (_andFold isFullySymbolizedCase) (lam. true) s.cases
    ]
  | SynDeclProdExt s ->
    let isSymbolizedExt = lam ext.
      _and (lam. nameHasSym ext.ident) (isFullySymbolizedType ext.tyIdent) in

    let isSymbolizedGlobalExt = lam ext.
      optionMapOrElse (lam. lam. true) (isFullySymbolizedType) ext in

    foldl _and (lam. true) [
      lam. nameHasSym s.ident,
      lam. forAll nameHasSym s.params,
      foldl (_andFold isSymbolizedExt) (lam. true) s.individualExts,
      isSymbolizedGlobalExt s.globalExt
    ]
```
</ToggleWrapper>
</DocBlock>

