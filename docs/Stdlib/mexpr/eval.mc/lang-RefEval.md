import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RefEval  
  

TODO \(oerikss, 2020\-03\-26\): Eventually, this should be a rank 0 tensor.

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmRef {ref : Ref Expr}
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
  | TmRef r -> TmRef r
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
  | TmRef _ -> NoInfo ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : all a. {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option a
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmRef _ -> error "eqExpr not implemented for TmRef!"
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
  | TmRef _ -> error "isAtomic not implemented for TmRef!"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> _a
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env : PprintEnv) =
  | TmRef _ -> error "pprintCode not implemented for TmRef!"
```
</ToggleWrapper>
</DocBlock>

