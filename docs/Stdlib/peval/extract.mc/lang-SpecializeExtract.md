import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SpecializeExtract  
  

  
  
  
## Types  
  

          <DocBlock title="SpecializeData" kind="type">

```mc
type SpecializeData : AccelerateData
```



<ToggleWrapper text="Code..">
```mc
type SpecializeData = AccelerateData
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AddIdentifierSpecializeEnv" kind="type">

```mc
type AddIdentifierSpecializeEnv : AddIdentifierAccelerateEnv
```



<ToggleWrapper text="Code..">
```mc
type AddIdentifierSpecializeEnv = AddIdentifierAccelerateEnv
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="addIdentifierToSpecializeTerms" kind="sem">

```mc
sem addIdentifierToSpecializeTerms : Ast_Expr -> (Map Name PMExprExtractAccelerate_AccelerateData, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem addIdentifierToSpecializeTerms =
  | t ->
    let env = {
      functions = mapEmpty nameCmp,
      programIdentifiers = setEmpty cmpSID
    } in
    let env = collectProgramIdentifiers env t in
    match addIdentifierToSpecializeTermsH env t with (env, t) in
    let env : AddIdentifierSpecializeEnv = env in
    (env.functions, t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addIdentifierToSpecializeTermsH" kind="sem">

```mc
sem addIdentifierToSpecializeTermsH : PMExprExtractAccelerate_AddIdentifierAccelerateEnv -> Ast_Expr -> (SpecializeExtract_AddIdentifierSpecializeEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem addIdentifierToSpecializeTermsH (env : AddIdentifierSpecializeEnv) =
  | TmSpecialize t -> replaceTermWithLet env {e=t.e, info = t.info, ty = tyTm t.e}
  | t -> smapAccumL_Expr_Expr addIdentifierToSpecializeTermsH env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractSpecializeTerms" kind="sem">

```mc
sem extractSpecializeTerms : Set Name -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem extractSpecializeTerms ids =
  | ast -> extractAst ids ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractSeparate" kind="sem">

```mc
sem extractSeparate : [Name] -> Ast_Expr -> Map Name Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem extractSeparate ids =| ast ->
    foldl (lam m. lam id.
      let idset = setOfSeq nameCmp [id] in
      let extracted = extractSpecializeTerms idset ast in
      mapInsert id extracted m
    ) (mapEmpty nameCmp) ids
```
</ToggleWrapper>
</DocBlock>

