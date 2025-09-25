import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllTypeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TyAll {info  : Info,
           ident : Name,
           kind  : Kind,
           ty    : Type}
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
  | TyAll t -> TyAll {t with info = info}
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
  | TyAll t -> t.info
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
  | TyAll t ->
    match smapAccumL_Kind_Type f acc t.kind with (acc, kind) in
    match f acc t.ty with (acc, ty) in
    (acc, TyAll {t with kind = kind,
                        ty = ty})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inspectType" kind="sem">

```mc
sem inspectType : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem inspectType =
  | TyAll t -> inspectType t.ty
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
  | ty -> stripTyAllBase [] ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="stripTyAllBase" kind="sem">

```mc
sem stripTyAllBase : [(Name, Ast_Kind)] -> Ast_Type -> ([(Name, Ast_Kind)], Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem stripTyAllBase (vars : [(Name, Kind)]) =
  | TyAll t -> stripTyAllBase (snoc vars (t.ident, t.kind)) t.ty
  | ty -> rappAccumL_Type_Type stripTyAllBase vars ty
```
</ToggleWrapper>
</DocBlock>

