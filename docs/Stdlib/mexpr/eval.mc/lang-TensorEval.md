import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorEval  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmTensor {val : T}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval ctx =
  | TmTensor t -> TmTensor t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | TmTensor _ -> NoInfo ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmTensor _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env : PprintEnv) =
  | TmTensor r ->
    switch r.val
      case TInt t then (env, tensor2string int2string t)
      case TFloat t then (env, tensor2string float2string t)
      case TExpr t1 then
      let t2 = tensorCreateDense (tensorShape t1) (lam. " ") in
      let env =
        tensorFoldi
          (lam env. lam idx. lam e. match pprintCode 0 env e with (env, str) in
                              tensorSetExn t2 idx str; env)
          env t1
      in
      (env, tensor2string (lam x. x) t2)
      end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option {conEnv: [(Name, Name)], varEnv: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmTensor r1 ->
    match lhs with TmTensor r2 then
      switch (r1.val, r2.val)
        case (TInt t1, TInt t2) then
        if tensorEq eqi t1 t2 then Some free
        else None ()
        case (TFloat t1, TFloat t2) then
        if tensorEq eqf t1 t2 then Some free
        else None ()
        case (TExpr t1, TExpr t2) then
        if tensorHasSameShape t1 t2 then
          tensorFoldi
            (lam free. lam idx. lam e1.
              optionBind free
                (lam free. eqExprH env free e1 (tensorGetExn t2 idx)))
            (Some free) t1
        else None ()
        case (_, _) then None ()
      end
    else None ()
```
</ToggleWrapper>
</DocBlock>

