import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithFloatConstantFold  
  

  
  
  
## Semantics  
  

          <DocBlock title="constantFoldConstAppConsts" kind="sem">

```mc
sem constantFoldConstAppConsts : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantFoldConstAppConsts =
  | TmApp (r & {
    lhs = TmConst {val = const & (CNegf _)},
    rhs = TmConst {val = CFloat {val = f}}
  }) ->
    TmConst { val = CFloat { val = negf f }, info = r.info, ty = r.ty }
  | TmApp (r & {
    lhs = TmApp {
      lhs = TmConst {
        val = const & (CAddf _ | CSubf _ | CMulf _ | CDivf _)},
      rhs = TmConst {val = CFloat {val = f1}}},
    rhs = TmConst {val = CFloat {val = f2}}
  }) ->
    TmConst {
      val = CFloat { val = constantFoldConstAppFloat2 const f1 f2 },
      info = r.info,
      ty = r.ty
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constantFoldConstAppFloat2" kind="sem">

```mc
sem constantFoldConstAppFloat2 : ConstAst_Const -> Float -> Float -> Float
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constantFoldConstAppFloat2 =
  | CAddf _ -> addf
  | CSubf _ -> subf
  | CMulf _ -> mulf
  | CDivf _ -> divf
```
</ToggleWrapper>
</DocBlock>

