import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlMatch  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | OTmMatch
    { target : Expr
    , arms : [(Pat, Expr)]
    }
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
  | OTmMatch t ->
    let armsFunc = lam acc. lam arm : (Pat, Expr).
      match f acc arm.1 with (acc, expr) then
        (acc, (arm.0, expr))
      else never in
    match f acc t.target with (acc, target) then
      match mapAccumL armsFunc acc t.arms with (acc, arms) then
        (acc, OTmMatch {{t with target = target}
                           with arms = arms})
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

