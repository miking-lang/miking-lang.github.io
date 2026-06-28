import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ClosAst  
  

  
  
  
## Types  
  

          <DocBlock title="Lazy" kind="type">

```mc
type Lazy
```



<ToggleWrapper text="Code..">
```mc
type Lazy a = () -> a
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmClos {ident : Name, body : Expr, env : Lazy EvalEnv, info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmClos _ -> true
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
  | TmClos r -> r.info
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
  | TmClos r -> TmClos { r with info = info }
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
  | TmClos r ->
    match pprintVarName env r.ident with (env,ident) in
    match pprintCode (pprintIncr indent) env r.body with (env,body) in
   (env,
    join [
      "Clos{lam ", ident, ".",
      pprintNewline (pprintIncr indent), body,
      "}"
    ])
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
  | TmClos _ -> error "eqExpr not implemented for TmClos!"
```
</ToggleWrapper>
</DocBlock>

