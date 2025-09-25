import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LambdaLiftFindFreeVariablesPat  
  

  
  
  
## Semantics  
  

          <DocBlock title="getFreeVariablePatName" kind="sem">

```mc
sem getFreeVariablePatName : Ast_Type -> LambdaLiftState -> PatName -> LambdaLiftState
```



<ToggleWrapper text="Code..">
```mc
sem getFreeVariablePatName ty (state : LambdaLiftState) =
  | PName id -> {state with vars = mapInsert id ty state.vars}
  | PWildcard _ -> state
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findFreeVariablesPat" kind="sem">

```mc
sem findFreeVariablesPat : LambdaLiftState -> Ast_Pat -> LambdaLiftState
```



<ToggleWrapper text="Code..">
```mc
sem findFreeVariablesPat (state : LambdaLiftState) =
  | PatNamed t -> getFreeVariablePatName t.ty state t.ident
  | PatSeqEdge t ->
    let state = foldl findFreeVariablesPat state t.prefix in
    let state = getFreeVariablePatName t.ty state t.middle in
    foldl findFreeVariablesPat state t.postfix
  | p -> sfold_Pat_Pat findFreeVariablesPat state p
```
</ToggleWrapper>
</DocBlock>

