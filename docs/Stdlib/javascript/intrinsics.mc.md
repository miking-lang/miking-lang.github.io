import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# intrinsics.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/const-arity.mc"} style={S.link}>mexpr/const-arity.mc</a>, <a href={"/docs/Stdlib/javascript/ast.mc"} style={S.link}>javascript/ast.mc</a>, <a href={"/docs/Stdlib/stdlib.mc"} style={S.link}>stdlib.mc</a>  
  
## Languages  
  

          <DocBlock title="JSIntrinsic" kind="lang" link="/docs/Stdlib/javascript/intrinsics.mc/lang-JSIntrinsic">

```mc
lang JSIntrinsic
```

<Description>{`Fragments used by the intrinsic functions`}</Description>


<ToggleWrapper text="Code..">
```mc
lang JSIntrinsic = JSExprAst + MExprAst + MExprArity + MExprPrettyPrint

  -- Compile intrinsic function withing the given runtime environment,
  -- identifier name and arguments.
  sem intrinsicFromString : Name -> String -> [JSExpr] -> JSExpr
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

  -- Intrinsic directly from a constant literal
  sem intrinsic : Name -> Const -> [JSExpr] -> JSExpr
  sem intrinsic runtime const =
  | args -> intrinsicFromString runtime (getConstStringCode 0 const) args

  -- Intrinsic with custom name
  sem optimizedIntrinsicWithString : Name -> Const -> String -> [JSExpr] -> ([JSExpr] -> JSExpr) -> JSExpr
  sem optimizedIntrinsicWithString runtime const str args =
  | opFun ->
    -- Check if the arguments is fully applied (have the same length as constArity(const))
    -- If so, then optimize the intrinsic and return an in-place operation
    -- Otherwise, return a partially applied intrinsic
    if eqi (length args) (constArity const) then opFun args
    else intrinsicFromString runtime str args

  -- Intrinsic with same name as the const literal
  sem optimizedIntrinsic : Name -> Const -> [JSExpr] -> ([JSExpr] -> JSExpr) -> JSExpr
  sem optimizedIntrinsic runtime const args =
  | opFun -> optimizedIntrinsicWithString runtime const (getConstStringCode 0 const) args opFun

end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="intrGenNS" kind="let">

```mc
let intrGenNS  : Name
```



<ToggleWrapper text="Code..">
```mc
let intrGenNS   = nameSym "MExpr_JS_Intrinsics"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrWebNS" kind="let">

```mc
let intrWebNS  : Name
```



<ToggleWrapper text="Code..">
```mc
let intrWebNS   = nameSym "MExpr_Web_JS_Intrinsics"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrNodeNS" kind="let">

```mc
let intrNodeNS  : Name
```



<ToggleWrapper text="Code..">
```mc
let intrNodeNS  = nameSym "MExpr_Node_JS_Intrinsics"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrBunNS" kind="let">

```mc
let intrBunNS  : Name
```



<ToggleWrapper text="Code..">
```mc
let intrBunNS   = nameSym "MExpr_Bun_JS_Intrinsics"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsIntrinsicsFile_generic" kind="let">

```mc
let jsIntrinsicsFile_generic  : String
```



<ToggleWrapper text="Code..">
```mc
let jsIntrinsicsFile_generic  = concat stdlibLoc "/javascript/generic/intrinsics.js"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsIntrinsicsFile_web" kind="let">

```mc
let jsIntrinsicsFile_web  : String
```



<ToggleWrapper text="Code..">
```mc
let jsIntrinsicsFile_web      = concat stdlibLoc "/javascript/web/intrinsics.js"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsIntrinsicsFile_node" kind="let">

```mc
let jsIntrinsicsFile_node  : String
```



<ToggleWrapper text="Code..">
```mc
let jsIntrinsicsFile_node     = concat stdlibLoc "/javascript/node/intrinsics.js"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsIntrinsicsFile_bun" kind="let">

```mc
let jsIntrinsicsFile_bun  : String
```



<ToggleWrapper text="Code..">
```mc
let jsIntrinsicsFile_bun      = concat stdlibLoc "/javascript/bun/intrinsics.js"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicGen" kind="let">

```mc
let intrinsicGen  : ConstAst_Const -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let intrinsicGen  = use JSIntrinsic in intrinsic intrGenNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicWeb" kind="let">

```mc
let intrinsicWeb  : ConstAst_Const -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let intrinsicWeb  = use JSIntrinsic in intrinsic intrWebNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicNode" kind="let">

```mc
let intrinsicNode  : ConstAst_Const -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let intrinsicNode = use JSIntrinsic in intrinsic intrNodeNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicBun" kind="let">

```mc
let intrinsicBun  : ConstAst_Const -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let intrinsicBun = use JSIntrinsic in intrinsic intrBunNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsicGen" kind="let">

```mc
let optimizedIntrinsicGen  : ConstAst_Const -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let optimizedIntrinsicGen   = use JSIntrinsic in optimizedIntrinsic intrGenNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsicWeb" kind="let">

```mc
let optimizedIntrinsicWeb  : ConstAst_Const -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let optimizedIntrinsicWeb   = use JSIntrinsic in optimizedIntrinsic intrWebNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsicNode" kind="let">

```mc
let optimizedIntrinsicNode  : ConstAst_Const -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let optimizedIntrinsicNode  = use JSIntrinsic in optimizedIntrinsic intrNodeNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsicBun" kind="let">

```mc
let optimizedIntrinsicBun  : ConstAst_Const -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let optimizedIntrinsicBun   = use JSIntrinsic in optimizedIntrinsic intrBunNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsicGenStr" kind="let">

```mc
let optimizedIntrinsicGenStr  : ConstAst_Const -> String -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let optimizedIntrinsicGenStr  = use JSIntrinsic in optimizedIntrinsicWithString intrGenNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsicWebStr" kind="let">

```mc
let optimizedIntrinsicWebStr  : ConstAst_Const -> String -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let optimizedIntrinsicWebStr  = use JSIntrinsic in optimizedIntrinsicWithString intrWebNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsicNodeStr" kind="let">

```mc
let optimizedIntrinsicNodeStr  : ConstAst_Const -> String -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let optimizedIntrinsicNodeStr = use JSIntrinsic in optimizedIntrinsicWithString intrNodeNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizedIntrinsicBunStr" kind="let">

```mc
let optimizedIntrinsicBunStr  : ConstAst_Const -> String -> [JSExprAst_JSExpr] -> ([JSExprAst_JSExpr] -> JSExprAst_JSExpr) -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let optimizedIntrinsicBunStr  = use JSIntrinsic in optimizedIntrinsicWithString intrBunNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicStrGen" kind="let">

```mc
let intrinsicStrGen  : String -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let intrinsicStrGen  = use JSIntrinsic in intrinsicFromString intrGenNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicStrWeb" kind="let">

```mc
let intrinsicStrWeb  : String -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let intrinsicStrWeb  = use JSIntrinsic in intrinsicFromString intrWebNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicStrNode" kind="let">

```mc
let intrinsicStrNode  : String -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let intrinsicStrNode = use JSIntrinsic in intrinsicFromString intrNodeNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicStrBun" kind="let">

```mc
let intrinsicStrBun  : String -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let intrinsicStrBun  = use JSIntrinsic in intrinsicFromString intrBunNS
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="externalRefGen" kind="let">

```mc
let externalRefGen n : String -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let externalRefGen  = use JSIntrinsic in lam n. intrinsicStrGen  n []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="externalRefWeb" kind="let">

```mc
let externalRefWeb n : String -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let externalRefWeb  = use JSIntrinsic in lam n. intrinsicStrWeb  n []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="externalRefNode" kind="let">

```mc
let externalRefNode n : String -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let externalRefNode = use JSIntrinsic in lam n. intrinsicStrNode n []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="externalRefBun" kind="let">

```mc
let externalRefBun n : String -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let externalRefBun  = use JSIntrinsic in lam n. intrinsicStrBun  n []
```
</ToggleWrapper>
</DocBlock>

