import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MetaVarTypeAst  
  

Unification meta variables.  These variables represent some  
specific but as\-of\-yet undetermined type.

  
  
  
## Types  
  

          <DocBlock title="MetaVarRec" kind="type">

```mc
type MetaVarRec : { ident: Name, level: Level, kind: Kind }
```



<ToggleWrapper text="Code..">
```mc
type MetaVarRec = {ident  : Name,
                     level  : Level,
                     -- The level indicates at what depth of let-binding the variable
                     -- was introduced, which is used to determine which variables can
                     -- be generalized and to check that variables stay in their scope.
                     kind   : Kind}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="MetaVar" kind="syn">

```mc
syn MetaVar
```



<ToggleWrapper text="Code..">
```mc
syn MetaVar =
  | Unbound MetaVarRec
  | Link Type
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  -- Meta type variable
  | TyMetaVar {info     : Info,
               contents : Ref MetaVar}
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
sem tyWithInfo (info : Info) =
  | TyMetaVar t ->
    switch deref t.contents
    case Unbound _ then
      TyMetaVar {t with info = info}
    case Link ty then
      tyWithInfo info ty
    end
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
  | TyMetaVar {info = info} -> info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Type_Type" kind="sem">

```mc
sem smapAccumL_Type_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Type -> (acc, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Type_Type (f : acc -> Type -> (acc, Type)) (acc : acc) =
  | TyMetaVar t ->
    switch deref t.contents
    case Unbound r then
      match smapAccumL_Kind_Type f acc r.kind with (acc, kind) in
      modref t.contents (Unbound {r with kind = kind});
      (acc, TyMetaVar t)
    case Link ty then
      f acc ty
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rappAccumL_Type_Type" kind="sem">

```mc
sem rappAccumL_Type_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Type -> (acc, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem rappAccumL_Type_Type (f : acc -> Type -> (acc, Type)) (acc : acc) =
  | TyMetaVar t & ty ->
    recursive let work = lam ty.
      match ty with TyMetaVar x then
        switch deref x.contents
        case Link l then
          let new = work l in
          modref x.contents (Link new);
          new
        case Unbound _ then
          ty
        end
      else ty in
    switch work ty
    case TyMetaVar _ & ty1 then (acc, ty1)
    case ty1 then f acc ty1
    end
```
</ToggleWrapper>
</DocBlock>

