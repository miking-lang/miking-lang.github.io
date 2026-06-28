import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprMonomorphizeTest  
  

  
  
  
## Semantics  
  

          <DocBlock title="distinctSymbols" kind="sem">

```mc
sem distinctSymbols : Ast_Expr -> Bool
```

<Description>{`Verifies that all symbols introduced in the provided AST are distinct. We  
use this in our test suite to ensure that monomorphization resymbolizes  
all duplicated definitions.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem distinctSymbols =
  | ast -> distinctSymbolsExpr (setEmpty nameCmp) ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="distinctSymbolsDecl" kind="sem">

```mc
sem distinctSymbolsDecl : Set Name -> Ast_Decl -> Option (Set Name)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem distinctSymbolsDecl syms =
  | DeclLet t ->
    if setMem t.ident syms then None () else
    if distinctSymbolsExpr syms t.body
    then Some (setInsert t.ident syms)
    else None ()
  | DeclRecLets t ->
    if any (lam bind. setMem bind.ident syms) t.bindings then None () else
    let syms = foldl (lam syms. lam bind. setInsert bind.ident syms) syms t.bindings in
    if forAll (lam bind. distinctSymbolsExpr syms bind.body) t.bindings
    then Some syms
    else None ()
  | DeclType t -> if setMem t.ident syms then None () else Some (setInsert t.ident syms)
  | DeclConDef t -> if setMem t.ident syms then None () else Some (setInsert t.ident syms)
  | DeclExt t -> if setMem t.ident syms then None () else Some (setInsert t.ident syms)
  | d ->
    if sfold_Decl_Expr (lam acc. lam tm. if acc then distinctSymbolsExpr syms tm else false) true d
    then Some syms
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="distinctSymbolsExpr" kind="sem">

```mc
sem distinctSymbolsExpr : Set Name -> Ast_Expr -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem distinctSymbolsExpr syms =
  | TmLam t ->
    if setMem t.ident syms then false
    else distinctSymbolsExpr (setInsert t.ident syms) t.body
  | TmDecl x ->
    match distinctSymbolsDecl syms x.decl with Some syms
    then distinctSymbolsExpr syms x.inexpr
    else false
  | t -> sfold_Expr_Expr (lam acc. lam tm. if acc then distinctSymbolsExpr syms tm else acc) true t
```
</ToggleWrapper>
</DocBlock>

