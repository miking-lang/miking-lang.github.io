import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CosemDeclAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Decl" kind="syn">

```mc
syn Decl
```



<ToggleWrapper text="Code..">
```mc
syn Decl =
  | DeclCosem {info : Info,
               ident : Name,
               args : [{ident : Name, tyAnnot : Type}],
               cases : [(Copat, Expr)],
               includes : [(String, String)],
               isBase : Bool,
               tyAnnot : Type,
               targetTyIdent : Name}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoDecl" kind="sem">

```mc
sem infoDecl : Ast_Decl -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoDecl =
  | DeclCosem d -> d.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Type" kind="sem">

```mc
sem smapAccumL_Decl_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Type f acc =
  | DeclCosem x ->
    let farg = lam acc. lam arg.
      match f acc arg.tyAnnot with (acc, tyAnnot) in
      (acc, {arg with tyAnnot = tyAnnot}) in
    match f acc x.tyAnnot with (acc, tyAnnot) in
    match mapAccumL farg acc x.args with (acc, args) in
    (acc, DeclCosem {x with args = args, tyAnnot = tyAnnot})
```
</ToggleWrapper>
</DocBlock>

