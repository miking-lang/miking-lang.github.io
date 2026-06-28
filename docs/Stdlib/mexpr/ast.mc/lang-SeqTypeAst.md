import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTypeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TySeq {info : Info,
           ty   : Type}
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
  | TySeq t -> TySeq {t with info = info}
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
  | TySeq t ->
    match f acc t.ty with (acc, ty) then
      (acc, TySeq {t with ty = ty})
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
  | TySeq r -> r.info
```
</ToggleWrapper>
</DocBlock>

