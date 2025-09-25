import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AliasTypeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  -- An aliased type, treated as content but printed as display.
  | TyAlias {display : Type,
             content : Type}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tyWithInfo" kind="sem">

```mc
sem tyWithInfo : Info -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyWithInfo info =
  | TyAlias t -> TyAlias {t with display = tyWithInfo info t.display}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTy" kind="sem">

```mc
sem infoTy : Ast_Type -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTy =
  | TyAlias t -> infoTy t.display
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Type_Type" kind="sem">

```mc
sem smapAccumL_Type_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Type -> (acc, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Type_Type f acc =
  | TyAlias t ->
    match f acc t.content with (acc, content) in
    match f acc t.display with (acc, display) in
    (acc, TyAlias {t with content = content, display = display})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rappAccumL_Type_Type" kind="sem">

```mc
sem rappAccumL_Type_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Type -> (acc, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem rappAccumL_Type_Type f acc =
  | TyAlias t -> f acc t.content
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="stripTyAll" kind="sem">

```mc
sem stripTyAll : Ast_Type -> ([(Name, Ast_Kind)], Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem stripTyAll =
  | TyAlias t & ty ->
    switch stripTyAll t.content
    case ([], _) then ([], ty)
    case stripped then stripped
    end
```
</ToggleWrapper>
</DocBlock>

