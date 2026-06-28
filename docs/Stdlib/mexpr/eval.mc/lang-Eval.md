import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Eval  
  

  
  
  
## Types  
  

          <DocBlock title="EvalEnv" kind="type">

```mc
type EvalEnv : List (Name, Expr)
```



<ToggleWrapper text="Code..">
```mc
type EvalEnv = List (Name, Expr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="EvalCtx" kind="type">

```mc
type EvalCtx : { env: EvalEnv }
```



<ToggleWrapper text="Code..">
```mc
type EvalCtx = { env : EvalEnv }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="evalEnvEmpty" kind="sem">

```mc
sem evalEnvEmpty : () -> Eval_EvalEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem evalEnvEmpty =| _ -> listEmpty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalEnvLookup" kind="sem">

```mc
sem evalEnvLookup : Name -> Eval_EvalEnv -> Option Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem evalEnvLookup id =| env ->
    let p = lam entry. nameEqSymUnsafe id entry.0 in
    match listFind p env with Some (_, e) then Some e else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalEnvInsert" kind="sem">

```mc
sem evalEnvInsert : Name -> Ast_Expr -> Eval_EvalEnv -> Eval_EvalEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem evalEnvInsert id e =| env -> listCons (id, e) env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalEnvAll" kind="sem">

```mc
sem evalEnvAll : ((Name, Ast_Expr) -> Bool) -> Eval_EvalEnv -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem evalEnvAll p =| env -> listAll p env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalEnvFilter" kind="sem">

```mc
sem evalEnvFilter : ((Name, Ast_Expr) -> Bool) -> Eval_EvalEnv -> Eval_EvalEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem evalEnvFilter p =| env -> listFilter p env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalEnvConcat" kind="sem">

```mc
sem evalEnvConcat : Eval_EvalEnv -> Eval_EvalEnv -> Eval_EvalEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem evalEnvConcat lhs =| rhs -> listConcat lhs rhs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalEnvIsEmpty" kind="sem">

```mc
sem evalEnvIsEmpty : Eval_EvalEnv -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem evalEnvIsEmpty =| env -> listNil env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalCtxEmpty" kind="sem">

```mc
sem evalCtxEmpty : () -> Eval_EvalCtx
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem evalCtxEmpty =| _ -> { env = evalEnvEmpty () }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eval ctx =| _ ->
    error "Unsupported Expr in eval!"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalDecl" kind="sem">

```mc
sem evalDecl : Eval_EvalCtx -> Ast_Decl -> Eval_EvalCtx
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem evalDecl ctx =| _ ->
    error "Unsupported Decl in eval!"
```
</ToggleWrapper>
</DocBlock>

