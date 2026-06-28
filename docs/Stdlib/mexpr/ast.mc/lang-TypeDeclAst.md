import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeDeclAst  
  

DeclType \-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="Decl" kind="syn">

```mc
syn Decl
```



<ToggleWrapper text="Code..">
```mc
syn Decl =
  | DeclType {ident : Name,
              params : [Name],
              tyIdent : Type,
              info : Info}
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
  | DeclType d -> d.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declWithInfo" kind="sem">

```mc
sem declWithInfo : Info -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
sem declWithInfo info =
  | DeclType d -> DeclType {d with info = info}
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
  | DeclType x ->
    match f acc x.tyIdent with (acc, tyIdent) in
    (acc, DeclType {x with tyIdent = tyIdent})
```
</ToggleWrapper>
</DocBlock>

