import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlExternal  
  

This fragment contains variants of other ocaml constructs where the  
names should appear exactly as specified, intended to be used to  
refer to externally defined names, e.g., in the ocaml standard  
library. Note that these names will not affect other names in any  
way, meaning that these names should be chosen so that they  
\*cannot\* overlap with other names. An easy way to do that is to  
always use fully qualified names, since normal names cannot contain  
dots.

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | OTmVarExt { ident : String }
  | OTmConAppExt { ident : String, args : [Expr] }
  | OTmExprExt { expr : String }
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
  | OPatConExt { ident : String, args : [Pat] }
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
  | OTmConAppExt t ->
    match mapAccumL f acc t.args with (acc, args) then
      (acc, OTmConAppExt {t with args = args})
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
  | OPatConExt t ->
    match mapAccumL f acc t.args with (acc, args) then
      (acc, OPatConExt {t with args = args})
    else never
```
</ToggleWrapper>
</DocBlock>

