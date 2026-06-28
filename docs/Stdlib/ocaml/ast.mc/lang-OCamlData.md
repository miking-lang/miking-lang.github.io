import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlData  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | OTmConApp { ident : Name, args : [Expr] }
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
  | OPatCon { ident : Name, args : [Pat] }
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
  | OTmConApp t ->
    match mapAccumL f acc t.args with (acc, args) then
      (acc, OTmConApp {t with args = args})
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
  | OPatCon t ->
    match mapAccumL f acc t.args with (acc, args) then
      (acc, OPatCon {t with args = args})
    else never
```
</ToggleWrapper>
</DocBlock>

