import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppTypeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TyApp {info : Info,
           lhs  : Type,
           rhs  : Type}
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
  | TyApp t -> TyApp {t with info = info}
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
  | TyApp t ->
    match f acc t.lhs with (acc, lhs) then
      match f acc t.rhs with (acc, rhs) then
        (acc, TyApp {{t with lhs = lhs} with rhs = rhs})
      else never
    else never
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
  | TyApp r -> r.info
```
</ToggleWrapper>
</DocBlock>

