import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlRecord  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | OTmRecord {bindings : [(String, Expr)], tyident : Type}
  | OTmProject {field : String, tm : Expr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Pat" kind="syn">

```mc
syn Pat
```



<ToggleWrapper text="Code..">
```mc
syn Pat =
  | OPatRecord {bindings : Map SID Pat}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_Expr_Expr" kind="sem">

```mc
sem smapAccumL_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Expr f acc =
  | OTmRecord t ->
    let bindFunc = lam acc. lam bind : (String, Expr).
      match f acc bind.1 with (acc, expr) then
        (acc, (bind.0, expr))
      else never in
    match mapAccumL bindFunc acc t.bindings with (acc, bindings) then
      (acc, OTmRecord {t with bindings = bindings})
    else never
  | OTmProject t ->
    match f acc t.tm with (acc, tm) then
      (acc, OTmProject {t with tm = tm})
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Pat_Pat" kind="sem">

```mc
sem smapAccumL_Pat_Pat : all acc. (acc -> Ast_Pat -> (acc, Ast_Pat)) -> acc -> Ast_Pat -> (acc, Ast_Pat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Pat_Pat f acc =
  | OPatRecord t ->
    match mapMapAccum (lam acc. lam. lam p. f acc p) acc t.bindings
    with (acc, bindings) then
      (acc, OPatRecord {t with bindings = bindings})
    else never
```
</ToggleWrapper>
</DocBlock>

