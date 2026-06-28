import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlTuple  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | OTmTuple { values : [Expr] }
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
  | OPatTuple { pats : [Pat] }
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
  | OTmTuple t ->
    match mapAccumL f acc t.values with (acc, values) then
      (acc, OTmTuple {t with values = values})
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
  | OPatTuple t ->
    match mapAccumL f acc t.pats with (acc, pats) then
      (acc, OPatTuple {t with pats = pats})
    else never
```
</ToggleWrapper>
</DocBlock>

