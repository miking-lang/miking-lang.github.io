import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppTypeUtils  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeArgs" kind="sem">

```mc
sem getTypeArgs : Ast_Type -> (Ast_Type, [Ast_Type])
```

<Description>{`Return the argument list in a type application`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTypeArgs =
  | ty ->
    match getTypeArgsBase [] ty with (args, tycon) in
    (tycon, args)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTypeArgsBase" kind="sem">

```mc
sem getTypeArgsBase : [Ast_Type] -> Ast_Type -> ([Ast_Type], Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeArgsBase (args : [Type]) =
  | TyApp t -> getTypeArgsBase (cons t.rhs args) t.lhs
  | ty -> rappAccumL_Type_Type getTypeArgsBase args ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkTypeApp" kind="sem">

```mc
sem mkTypeApp : Ast_Type -> [Ast_Type] -> Ast_Type
```

<Description>{`Construct a type application from a type and an argument list`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mkTypeApp ty =
  | args ->
    foldl (lam ty1. lam ty2.
      TyApp {info = mergeInfo (infoTy ty1) (infoTy ty2), lhs = ty1, rhs = ty2})
          ty args
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getConDefType" kind="sem">

```mc
sem getConDefType : Ast_Type -> Ast_Type
```

<Description>{`Return the type \(TyCon\) which a constructor \(TmConDef\) belongs to.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getConDefType =
  | ty ->
    match inspectType ty with TyArrow t then (getTypeArgs t.to).0
    else error "Invalid type in getConDefType"
```
</ToggleWrapper>
</DocBlock>

