import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OverloadedOpAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Op" kind="syn">

```mc
syn Op
```



<ToggleWrapper text="Code..">
```mc
syn Op =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmOverloadedOp {info: Info, op: Op, ty: Type}
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
  | TmOverloadedOp x -> x.info
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
  | TmOverloadedOp x -> TmOverloadedOp {x with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm =
  | TmOverloadedOp x -> x.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType ty =
  | TmOverloadedOp x -> TmOverloadedOp {x with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkOp" kind="sem">

```mc
sem mkOp : Info -> OverloadedOpAst_Op -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mkOp info = | op -> TmOverloadedOp
  { info = info
  , op = op
  , ty = tyunknown_
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="opMkTypes" kind="sem">

```mc
sem opMkTypes : Info -> TCEnv -> OverloadedOpAst_Op -> {params: [Ast_Type], return: Ast_Type}
```



<ToggleWrapper text="Code..">
```mc
sem opMkTypes : Info -> TCEnv -> Op -> {params: [Type], return: Type}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="resolveOp" kind="sem">

```mc
sem resolveOp : Info -> {op: OverloadedOpAst_Op, params: [Ast_Type], return: Ast_Type} -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem resolveOp info =
  | _ -> errorSingle [info] "Unable to resolve the type of the operator"
```
</ToggleWrapper>
</DocBlock>

