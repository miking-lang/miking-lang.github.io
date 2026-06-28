import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeAbsAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TyAbs {ident : Name,
           kind : Kind,
           body : Type}
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
  | TyAbs _ & t -> t
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
  | TyAbs t ->
    match f acc t.body with (acc, body) in
    (acc, TyAbs {t with body = body})
```
</ToggleWrapper>
</DocBlock>

