import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstantFold  
  

  
  
  
## Semantics  
  

          <DocBlock title="constantFold" kind="sem">

```mc
sem constantFold : Ast_Expr -> Ast_Expr
```

<Description>{`Entry point for constant folding and constant propagation over a programNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constantFold =| t ->
    readback (constantFoldExpr (evalCtxEmpty ()) t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constantFoldExpr" kind="sem">

```mc
sem constantFoldExpr : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```

<Description>{`Language framents should extend this semantic function. Note that the  
evaluation environment should, at all time, only contain values that are  
constants. See \`isConstant\` for the definition of a constant.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constantFoldExpr ctx =| t -> smap_Expr_Expr (constantFoldExpr ctx) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isConstant" kind="sem">

```mc
sem isConstant : Ast_Expr -> Bool
```

<Description>{`This semantic function restricts what is considered constants.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isConstant =| _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="doPropagate" kind="sem">

```mc
sem doPropagate : Ast_Expr -> Bool
```

<Description>{`This semantic function restricts what we propagate.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem doPropagate =| t ->
    and (isConstant t) (lti (countNodes t) constantFoldCountMax)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="readback" kind="sem">

```mc
sem readback : Ast_Expr -> Ast_Expr
```

<Description>{`Constant folding may produce additional evaluation terms such as partial  
applications of constants. This semantic function reads those back to  
standard terms.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem readback =| t -> smap_Expr_Expr readback t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countNodes" kind="sem">

```mc
sem countNodes : Ast_Expr -> Int
```

<Description>{`Counts the number of expression nodes.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem countNodes =| t -> countNodesH 0 t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countNodesH" kind="sem">

```mc
sem countNodesH : Int -> Ast_Expr -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem countNodesH n =| t ->
    let n = addi n 1 in sfold_Expr_Expr countNodesH n t
```
</ToggleWrapper>
</DocBlock>

