import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# util.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/javascript/ast.mc"} style={S.link}>javascript/ast.mc</a>  
  
## Types  
  

          <DocBlock title="CompileJSTargetPlatform" kind="type">

```mc
type CompileJSTargetPlatform
```

<Description>{`Supported JS runtime targets`}</Description>


<ToggleWrapper text="Code..">
```mc
type CompileJSTargetPlatform
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CompileJSOptions" kind="type">

```mc
type CompileJSOptions : { targetPlatform: CompileJSTargetPlatform, debugMode: Bool, generalOptimizations: Bool, output: Option String, tailCallOptimizations: Bool }
```

<Description>{`JS Compiler options`}</Description>


<ToggleWrapper text="Code..">
```mc
type CompileJSOptions = {
  targetPlatform : CompileJSTargetPlatform,
  debugMode : Bool,
  generalOptimizations : Bool,
  output : Option String,
  tailCallOptimizations: Bool
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecursiveFunctionRegistry" kind="type">

```mc
type RecursiveFunctionRegistry : { map: Map Name Name, suffix: String }
```



<ToggleWrapper text="Code..">
```mc
type RecursiveFunctionRegistry = {
  map: Map Name Name,
  suffix: String
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CompileJSContext" kind="type">

```mc
type CompileJSContext : { options: CompileJSOptions, currentFunction: Option (Name, Info), recursiveFunctions: RecursiveFunctionRegistry, declarations: Set Name }
```



<ToggleWrapper text="Code..">
```mc
type CompileJSContext = {
  options : CompileJSOptions,
  currentFunction: Option (Name, Info),
  recursiveFunctions: RecursiveFunctionRegistry,
  declarations: Set Name -- Block-scoped identifiers that need to be declared/defined
}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="CompileJSTP_Generic" kind="con">

```mc
con CompileJSTP_Generic : () -> CompileJSTargetPlatform
```



<ToggleWrapper text="Code..">
```mc
con CompileJSTP_Generic : () -> CompileJSTargetPlatform
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CompileJSTP_Node" kind="con">

```mc
con CompileJSTP_Node : () -> CompileJSTargetPlatform
```



<ToggleWrapper text="Code..">
```mc
con CompileJSTP_Node    : () -> CompileJSTargetPlatform
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CompileJSTP_Bun" kind="con">

```mc
con CompileJSTP_Bun : () -> CompileJSTargetPlatform
```



<ToggleWrapper text="Code..">
```mc
con CompileJSTP_Bun     : () -> CompileJSTargetPlatform
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CompileJSTP_Web" kind="con">

```mc
con CompileJSTP_Web : () -> CompileJSTargetPlatform
```



<ToggleWrapper text="Code..">
```mc
con CompileJSTP_Web     : () -> CompileJSTargetPlatform
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="emptyRFR" kind="let">

```mc
let emptyRFR suffix : all a. all v. a -> {map: Map Name v, suffix: a}
```



<ToggleWrapper text="Code..">
```mc
let emptyRFR = lam suffix. {
  map = mapEmpty nameCmp,
  suffix = suffix
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setRFR" kind="let">

```mc
let setRFR name rfr : Name -> RecursiveFunctionRegistry -> RecursiveFunctionRegistry
```



<ToggleWrapper text="Code..">
```mc
let setRFR : Name -> RecursiveFunctionRegistry -> RecursiveFunctionRegistry =
  lam name. lam rfr : RecursiveFunctionRegistry.
    let str = nameGetStr name in
    let newName = concat str (rfr.suffix) in
    let recName = nameSym newName in
    { rfr with map = mapInsert name recName rfr.map }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getRFR" kind="let">

```mc
let getRFR name rfr : Name -> RecursiveFunctionRegistry -> Option Name
```



<ToggleWrapper text="Code..">
```mc
let getRFR : Name -> RecursiveFunctionRegistry -> Option Name =
  lam name. lam rfr : RecursiveFunctionRegistry.
  mapLookup name rfr.map
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractRFR" kind="let">

```mc
let extractRFR rfr e : RecursiveFunctionRegistry -> Ast_Expr -> RecursiveFunctionRegistry
```



<ToggleWrapper text="Code..">
```mc
let extractRFR : use Ast in RecursiveFunctionRegistry -> Expr -> RecursiveFunctionRegistry =
  use MExprAst in
  lam rfr : RecursiveFunctionRegistry. lam e.
  match e with TmDecl (x & {decl = DeclRecLets t}) then
    let rfr = foldl (lam rfr: RecursiveFunctionRegistry. lam b: DeclLetRecord.
      match b with { ident = ident, body = body } in
      match body with TmLam _ then (setRFR ident rfr) else rfr
    ) rfr t.bindings in
    extractRFR rfr x.inexpr
  else sfold_Expr_Expr extractRFR rfr e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractRFRctx" kind="let">

```mc
let extractRFRctx ctx e : CompileJSContext -> Ast_Expr -> CompileJSContext
```



<ToggleWrapper text="Code..">
```mc
let extractRFRctx : use Ast in CompileJSContext -> Expr -> CompileJSContext =
  lam ctx : CompileJSContext. lam e.
  { ctx with recursiveFunctions = extractRFR ctx.recursiveFunctions e }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileDeclarations" kind="let">

```mc
let compileDeclarations ctx : CompileJSContext -> (CompileJSContext, JSExprAst_JSExpr)
```



<ToggleWrapper text="Code..">
```mc
let compileDeclarations : use JSExprAst in CompileJSContext -> (CompileJSContext, JSExpr) =
  use JSExprAst in
  lam ctx : CompileJSContext.
  if setIsEmpty (ctx.declarations) then (ctx, JSENop {})
  else
    let ctx2 = { ctx with declarations = setEmpty nameCmp } in
    (ctx2, JSEDec { ids = setToSeq ctx.declarations })
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="combineDeclarations" kind="let">

```mc
let combineDeclarations ctx ctx2 : CompileJSContext -> CompileJSContext -> CompileJSContext
```



<ToggleWrapper text="Code..">
```mc
let combineDeclarations : CompileJSContext -> CompileJSContext -> CompileJSContext =
  lam ctx : CompileJSContext. lam ctx2 : CompileJSContext.
  { ctx with declarations = setUnion ctx.declarations ctx2.declarations }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_isUnitTy" kind="let">

```mc
let _isUnitTy ty : Ast_Type -> Bool
```

<Description>{`Check for unit type`}</Description>


<ToggleWrapper text="Code..">
```mc
let _isUnitTy: use Ast in Type -> Bool = use RecordTypeAst in lam ty: Type.
  match ty with TyRecord { fields = fields } then mapIsEmpty fields else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_isCharSeq" kind="let">

```mc
let _isCharSeq tms : [Ast_Expr] -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _isCharSeq: use Ast in [Expr] -> Bool = use MExprAst in lam tms: [Expr].
  if null tms then false -- Empty list is not a char sequence
  else forAll (
    lam c : Expr.
      match c with TmConst { val = CChar _ } then true else false
  ) tms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_charSeq2String" kind="let">

```mc
let _charSeq2String tms : [Ast_Expr] -> String
```

<Description>{`First, always check if the terms are characters using \_isCharSeq`}</Description>


<ToggleWrapper text="Code..">
```mc
let _charSeq2String: use Ast in [Expr] -> String = use MExprAst in lam tms: [Expr].
  let toChar = lam expr.
    match expr with TmConst { val = CChar { val = val } } in val
  in map toChar tms -- String is a list of characters
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_isCharPatSeq" kind="let">

```mc
let _isCharPatSeq pats : [Ast_Pat] -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _isCharPatSeq: use Ast in [Pat] -> Bool = use MExprAst in lam pats: [Pat].
  if null pats then false -- Empty list is not a char sequence
  else forAll (
    lam c : Pat.
      match c with PatChar _ then true else false
  ) pats
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_charPatSeq2String" kind="let">

```mc
let _charPatSeq2String pats : [Ast_Pat] -> String
```

<Description>{`First, always check if the terms are characters using \_isCharPatSeq`}</Description>


<ToggleWrapper text="Code..">
```mc
let _charPatSeq2String: use Ast in [Pat] -> String = use MExprAst in lam pats: [Pat].
  let toChar = lam pat.
    match pat with PatChar { val = val } in val
  in map toChar pats -- String is a list of characters
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_binOp" kind="let">

```mc
let _binOp op args : JSExprAst_JSBinOp -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let _binOp : use JSExprAst in JSBinOp -> [JSExpr] -> JSExpr = use JSExprAst in
  lam op. lam args. JSEBinOp { op = op, lhs = head args, rhs = last args }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_unOp" kind="let">

```mc
let _unOp op args : JSExprAst_JSUnOp -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let _unOp : use JSExprAst in JSUnOp -> [JSExpr] -> JSExpr = use JSExprAst in
  lam op. lam args. JSEUnOp { op = op, rhs = head args }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_assign" kind="let">

```mc
let _assign lhs rhs : JSExprAst_JSExpr -> JSExprAst_JSExpr -> JSExprAst_JSExpr
```



<ToggleWrapper text="Code..">
```mc
let _assign : use JSExprAst in JSExpr -> JSExpr -> JSExpr = use JSExprAst in
  lam lhs. lam rhs. JSEBinOp { op  = JSOAssign {}, lhs = lhs, rhs = rhs }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_binOpM" kind="let">

```mc
let _binOpM op args : JSExprAst_JSBinOp -> [JSExprAst_JSExpr] -> JSExprAst_JSExpr
```

<Description>{`Multi binary operator folding into nested binary operators.  
Assume length of args is 2 or more.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _binOpM : use JSExprAst in JSBinOp -> [JSExpr] -> JSExpr = use JSExprAst in
  lam op. lam args.
  recursive let f = (lam args : [JSExpr]. lam acc : JSExpr.
    if null args then acc
    else f (tail args) (_binOp op [acc, head args])
  ) in
  f (tail args) (head args)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileJSOptionsEmpty" kind="let">

```mc
let compileJSOptionsEmpty  : CompileJSOptions
```



<ToggleWrapper text="Code..">
```mc
let compileJSOptionsEmpty : CompileJSOptions = {
  targetPlatform = CompileJSTP_Generic (),
  debugMode = false,
  output = None (),
  generalOptimizations = true,
  tailCallOptimizations = true
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileJSCtxEmpty" kind="let">

```mc
let compileJSCtxEmpty  : CompileJSContext
```

<Description>{`Empty compile JS environment`}</Description>


<ToggleWrapper text="Code..">
```mc
let compileJSCtxEmpty : CompileJSContext = {
  options = compileJSOptionsEmpty,
  currentFunction = None (),
  recursiveFunctions = emptyRFR "_rec$",
  declarations = setEmpty nameCmp
}
```
</ToggleWrapper>
</DocBlock>

