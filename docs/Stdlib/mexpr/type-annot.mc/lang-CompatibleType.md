import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="_pprintType" kind="sem">

```mc
sem _pprintType : all a. a -> String
```



<ToggleWrapper text="Code..">
```mc
sem _pprintType = | ty ->
    match getTypeStringCode 0 pprintEnvEmpty ty with (_,tyStr) then
      tyStr
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compatibleType" kind="sem">

```mc
sem compatibleType : all a. Map Name Ast_Type -> Ast_Type -> Ast_Type -> Option a
```

<Description>{`Given two types that are possibly unknown, this function attempts to find  
a type that is compatible with both given types in the given type  
environment.  It is equivalent to type equality, except that unknown types  
are considered compatible with any other type. If no compatible type can  
be found, \`None\` is returned.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compatibleType (tyEnv : Map Name Type) (ty1: Type) =
  | ty2 ->
    let ty1 = reduceTyVar ty1 in
    let ty2 = reduceTyVar ty2 in
    match compatibleTypeBase tyEnv (ty1, ty2) with Some ty then Some ty

    -- NOTE(dlunde,2021-05-05): Temporary hack to make sure that tyapps are
    -- reduced before tyvars. Not sure why this is needed, but it should not
    -- matter in the end when we have a proper type system.
    else match ty1 with TyApp t1 then
      compatibleType tyEnv t1.lhs ty2
    else match ty2 with TyApp t2 then
      compatibleType tyEnv ty1 t2.lhs
    --------

    else match reduceType tyEnv ty1 with Some ty1 then
      compatibleType tyEnv ty1 ty2
    else match reduceType tyEnv ty2 with Some ty2 then
      compatibleType tyEnv ty1 ty2
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compatibleTypeBase" kind="sem">

```mc
sem compatibleTypeBase : all a. Map Name Ast_Type -> (Ast_Type, Ast_Type) -> Option a
```



<ToggleWrapper text="Code..">
```mc
sem compatibleTypeBase (tyEnv: Map Name Type) =
  | _ -> None () -- Types are not compatible by default
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reduceType" kind="sem">

```mc
sem reduceType : Map Name Ast_Type -> Ast_Type -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem reduceType (tyEnv: Map Name Type) =
  | _ -> None () -- Types cannot be reduced by default
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reduceTyVar" kind="sem">

```mc
sem reduceTyVar : Ast_Type -> Ast_Type
```

<Description>{`NOTE\(aathn,2021\-10\-27\): We convert type variables to TyUnknown using this  
semantic function as a temporary solution to enable typeCheck and typeAnnot  
to be used in tandem.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem reduceTyVar =
  | ty -> ty
```
</ToggleWrapper>
</DocBlock>

