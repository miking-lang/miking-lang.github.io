import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstAppAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmConstApp {
    const : Const,
    args : [Expr],
    info : Info
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | TmConstApp r -> r.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfo" kind="sem">

```mc
sem withInfo : Info -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withInfo info =
  | TmConstApp r -> TmConstApp { r with info = info }
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
  | TmConstApp _ -> true
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
  | TmConstApp _ -> error "eqExpr not implemented for TmConstApp!"
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
  | TmConstApp r ->
    pprintCode indent env (appSeq_ (uconst_ r.const) r.args)
```
</ToggleWrapper>
</DocBlock>

