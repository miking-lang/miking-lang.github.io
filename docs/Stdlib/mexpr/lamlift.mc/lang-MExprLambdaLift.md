import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprLambdaLift  
  

  
  
  
## Semantics  
  

          <DocBlock title="liftLambdas" kind="sem">

```mc
sem liftLambdas : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem liftLambdas =
  | t -> match liftLambdasWithSolutions t with (_, t) in t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="liftLambdasWithSolutions" kind="sem">

```mc
sem liftLambdasWithSolutions : Ast_Expr -> (Map Name FinalOrderedLamLiftSolution, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem liftLambdasWithSolutions =
  | t ->
    let t = nameAnonymousLambdas t in
    let state = findFreeVariables emptyLambdaLiftState t in
    let t = insertFreeVariables state.sols t in
    let t = liftGlobal t in
    replaceCapturedParameters state.sols t
```
</ToggleWrapper>
</DocBlock>

