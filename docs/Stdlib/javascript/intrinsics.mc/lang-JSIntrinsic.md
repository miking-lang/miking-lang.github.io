import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# JSIntrinsic  
  

Fragments used by the intrinsic functions

  
  
  
## Semantics  
  

          <DocBlock title="intrinsicFromString" kind="sem">

```mc
sem intrinsicFromString : Name -> String -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```

<Description>{`Compile intrinsic function withing the given runtime environment,  
identifier name and arguments.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem intrinsicFromString runtime name =
  | [] -> JSEMember {
    expr = JSEVar { id = runtime },
    id = name
  }
  | args -> JSEApp {
    fun = JSEMember {
      expr = JSEVar { id = runtime },
      id = name
    },
    args = args,
    curried = true
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsic" kind="sem">

```mc
sem intrinsic : Name -> ConstAst_Const -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```

<Description>{`Intrinsic directly from a constant literalNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem intrinsic runtime const =
  | args -> intrinsicFromString runtime (getConstStringCode 0 const) args
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsicWithString" kind="sem">

```mc
sem optimizedIntrinsicWithString : Name -> ConstAst_Const -> String -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```

<Description>{`Intrinsic with custom nameNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem optimizedIntrinsicWithString runtime const str args =
  | opFun ->
    -- Check if the arguments is fully applied (have the same length as constArity(const))
    -- If so, then optimize the intrinsic and return an in-place operation
    -- Otherwise, return a partially applied intrinsic
    if eqi (length args) (constArity const) then opFun args
    else intrinsicFromString runtime str args
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsic" kind="sem">

```mc
sem optimizedIntrinsic : Name -> ConstAst_Const -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```

<Description>{`Intrinsic with same name as the const literalNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem optimizedIntrinsic runtime const args =
  | opFun -> optimizedIntrinsicWithString runtime const (getConstStringCode 0 const) args opFun
```
</ToggleWrapper>
</DocBlock>

