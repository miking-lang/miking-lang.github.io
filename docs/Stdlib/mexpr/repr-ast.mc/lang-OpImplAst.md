import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpImplAst  
  

  
  
  
## Types  
  

          <DocBlock title="DeclOpImplRec" kind="type">

```mc
type DeclOpImplRec : { ident: Name, implId: ImplId, reprScope: Int, metaLevel: Int, selfCost: OpCost, body: Expr, specType: Type, delayedReprUnifications: [(ReprVar, ReprVar)], info: Info }
```



<ToggleWrapper text="Code..">
```mc
type DeclOpImplRec = use Ast in
    { ident : Name
    , implId : ImplId
    , reprScope : Int
    , metaLevel : Int
    , selfCost : OpCost
    , body : Expr
    , specType : Type
    , delayedReprUnifications : [(ReprVar, ReprVar)]
    , info : Info
    }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Decl" kind="syn">

```mc
syn Decl
```



<ToggleWrapper text="Code..">
```mc
syn Decl =
  | DeclOpImpl DeclOpImplRec
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
  | DeclOpImpl x -> x.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Expr" kind="sem">

```mc
sem smapAccumL_Decl_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Expr f acc =
  | DeclOpImpl x ->
    match f acc x.body with (acc, body) in
    (acc, DeclOpImpl {x with body = body})
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
  | DeclOpImpl x ->
    match f acc x.specType with (acc, specType) in
    (acc, DeclOpImpl {x with specType = specType})
```
</ToggleWrapper>
</DocBlock>

