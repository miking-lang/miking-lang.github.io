import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeLift  
  

  
  
  
## Semantics  
  

          <DocBlock title="addRecordToEnv" kind="sem">

```mc
sem addRecordToEnv : all a. all a1. a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem addRecordToEnv (env : TypeLiftEnv) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeLiftExpr" kind="sem">

```mc
sem typeLiftExpr : TypeLiftBase_TypeLiftEnv -> Ast_Expr -> (TypeLiftBase_TypeLiftEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftExpr (env : TypeLiftEnv) =
  | t ->
    -- Lift all sub-expressions
    match smapAccumL_Expr_Expr typeLiftExpr env t with (env, t) in
    -- Lift the contained types
    match smapAccumL_Expr_Type typeLiftType env t with (env, t) in
    -- Lift the annotated types
    smapAccumL_Expr_TypeLabel typeLiftType env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeLiftType" kind="sem">

```mc
sem typeLiftType : TypeLiftBase_TypeLiftEnv -> Ast_Type -> (TypeLiftBase_TypeLiftEnv, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftType (env : TypeLiftEnv) =
  | t -> smapAccumL_Type_Type typeLiftType env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeLiftPat" kind="sem">

```mc
sem typeLiftPat : TypeLiftBase_TypeLiftEnv -> Ast_Pat -> (TypeLiftBase_TypeLiftEnv, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftPat (env : TypeLiftEnv) =
  | t ->
    match smapAccumL_Pat_Pat typeLiftPat env t with (env, t) then
      match typeLiftType env (tyPat t) with (env, ty) then
        (env, withTypePat ty t)
      else never
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeLift" kind="sem">

```mc
sem typeLift : Ast_Expr -> (AssocSeq Name Ast_Type, Ast_Expr)
```

<Description>{`Lifts all records, variants and type aliases from the given expression  
\`e\`. The result is returned as an environment containing tuples of names  
and their corresponding types, together with a modified version of the  
expression \`e\` where:  
\* \`TmType\`s and \`TmConDef\`s have been removed.  
\* \`TyRecord\`s have been replaced with a \`TyCon\` whose name is  
  contained in the resulting environment.  
\* The constructor names and argument types have been added to the  
  \`TyVariant\`s.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeLift = -- Expr -> (AssocSeq Name Type, Expr)
  | e ->

    let emptyTypeLiftEnv : TypeLiftEnv = {
      typeEnv = [],
      records = mapEmpty (mapCmp cmpType),
      seqs = mapEmpty cmpType,
      tensors = mapEmpty cmpType,
      variants = mapEmpty nameCmp
    } in

    match typeLiftExpr emptyTypeLiftEnv e with (env, t) then
      let typeEnv = _replaceVariantNamesInTypeEnv env in
      (typeEnv, t)
    else never
```
</ToggleWrapper>
</DocBlock>

