import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithIntConstantFold  
  

  
  
  
## Semantics  
  

          <DocBlock title="constantFoldConstAppConsts" kind="sem">

```mc
sem constantFoldConstAppConsts : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantFoldConstAppConsts =
  | TmApp (r & {
    lhs = TmConst {val = const & (CNegi _)},
    rhs = TmConst {val = CInt {val = n}}
  }) ->
    TmConst { val = CInt { val = negi n }, info = r.info, ty = r.ty }
  | TmApp (r & {
    lhs = TmApp {
      lhs = TmConst {
        val = const & (CAddi _ | CSubi _ | CMuli _ | CDivi _ | CModi _)},
      rhs = TmConst {val = CInt {val = n1}}},
    rhs = TmConst {val = CInt {val = n2}}
  }) ->
    TmConst {
      val = CInt { val = constantFoldConstAppInt2 const n1 n2 },
      info = r.info,
      ty = r.ty
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constantFoldConstAppInt2" kind="sem">

```mc
sem constantFoldConstAppInt2 : ConstAst_Const -> Int -> Int -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constantFoldConstAppInt2 =
  | CAddi _ -> addi
  | CSubi _ -> subi
  | CMuli _ -> muli
  | CDivi _ -> divi
  | CModi _ -> modi
```
</ToggleWrapper>
</DocBlock>

