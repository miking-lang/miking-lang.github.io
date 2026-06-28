import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PatJSCompile  
  

  
  
  
## Semantics  
  

          <DocBlock title="getPatNameVar" kind="sem">

```mc
sem getPatNameVar : PatName -> JSExprAst_JSExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getPatNameVar =
  | PWildcard _ -> JSEVar {id = nameSym "_"}
  | PName name -> JSEVar {id = name}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="namedPatExpr" kind="sem">

```mc
sem namedPatExpr : Ast_Pat -> JSExprAst_JSExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem namedPatExpr =
  | PatNamed {ident = id} -> getPatNameVar id
  | pat -> errorSingle [infoPat pat] "Expected PatNamed in JS pattern compilation"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compilePattern" kind="sem">

```mc
sem compilePattern : CompileJSContext -> JSExprAst_JSExpr -> Ast_Pat -> (CompileJSContext, JSExprAst_JSExpr)
```

<Description>{`Compiles a pattern match of the provided target and pattern. The resulting  
condition evaluates to true if they match and binds the variables of the  
pattern within the conditional expression.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compilePattern ctx target =
  | PatNamed {ident = PWildcard _} ->
    (ctx, _binOp (JSOEq ()) [target, JSEBool {b = true}])
  | PatNamed {ident = PName name} ->
    -- NOTE(larshum, 2022-12-19): We first assign the target to the variable
    -- defined in the pattern. Then we OR this with true, so that the
    -- conditional always results in true.
    (ctx, _binOp (JSOOr ()) [_assign (JSEVar {id = name}) target, JSEBool {b = true}])
  | PatInt {val = val} ->
    (ctx, _binOp (JSOEq ()) [target, JSEInt {i = val}])
  | PatBool {val = val} ->
    (ctx, _binOp (JSOEq ()) [target, JSEBool {b = val}])
  | PatChar {val = val} ->
    (ctx, _binOp (JSOEq ()) [target, JSEChar {c = val}])
  | PatRecord {bindings = bindings} ->
    let objectFields =
      mapFoldWithKey
        (lam acc. lam id. lam p. cons (sidToString id, namedPatExpr p) acc)
        [] bindings in
    (ctx, _binOp (JSOOr ()) [
      _assign (JSEObject {fields = objectFields}) target, JSEBool {b = true}])
  | PatSeqTot {pats = pats} ->
    let lengthCond = _binOp (JSOEq ()) [
      JSEMember {expr = target, id = "length"}, JSEInt {i = length pats}] in
    let bindingExpr = _assign (JSEArray { exprs = map namedPatExpr pats }) target in
    (ctx, _binOp (JSOAnd ()) [lengthCond, bindingExpr])
  | PatSeqEdge t ->
    let minSeqLength = addi (length t.prefix) (length t.postfix) in
    let lengthCond = _binOp (JSOGe ()) [
      JSEMember {expr = target, id = "length"}, JSEInt {i = minSeqLength}] in
    let prefixExprs = map namedPatExpr t.prefix in
    let middleExpr = getPatNameVar t.middle in
    let postfixExprs = map namedPatExpr t.postfix in
    let bindingExprs = [
      _assign (JSEArray {exprs = snoc prefixExprs (_unOp (JSOSpread ()) [middleExpr])}) target,
      _assign (JSEArray {exprs = reverse postfixExprs}) (reverseExpr middleExpr),
      shortenMiddle (length postfixExprs) middleExpr] in
    (ctx, _binOpM (JSOAnd ()) (cons lengthCond bindingExprs))
  | PatCon t ->
    let ty = JSEMember {expr = target, id = "type"} in
    let strTy = JSEString {s = nameGetStr t.ident} in
    let valueMatch = _binOp (JSOOr ()) [
      _assign (JSEMember {expr = target, id = "value"}) (namedPatExpr t.subpat),
      JSEBool {b = true}] in
    (ctx, _binOp (JSOAnd ()) [_binOp (JSOEq {}) [ty, strTy], valueMatch])
  | pat ->
    dprintLn pat;
    errorSingle [infoPat pat] "Pattern not supported when compiling to JavaScript."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reverseExpr" kind="sem">

```mc
sem reverseExpr : JSExprAst_JSExpr -> JSExprAst_JSExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem reverseExpr =
  | e -> JSEApp {
      fun = JSEMember {
        expr = JSEApp { fun = JSEMember { expr = e, id = "slice" }, args = [], curried = false },
        id = "reverse"
      },
      args = [],
      curried = false
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shortenMiddle" kind="sem">

```mc
sem shortenMiddle : Int -> JSExprAst_JSExpr -> JSExprAst_JSExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem shortenMiddle n =
  | JSEVar _ & t -> _assign t (JSEApp {
      fun = JSEMember { expr = t, id = "slice" },
      args = [JSEInt { i = 0 }, JSEInt { i = negi n }],
      curried = false
    })
```
</ToggleWrapper>
</DocBlock>

