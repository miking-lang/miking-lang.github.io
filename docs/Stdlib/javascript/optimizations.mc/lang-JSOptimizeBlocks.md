import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# JSOptimizeBlocks  
  

Block Optimizations

  
  
  
## Semantics  
  

          <DocBlock title="flattenBlockHelper" kind="sem">

```mc
sem flattenBlockHelper : JSExprAst_JSExpr -> ([JSExprAst_JSExpr], JSExprAst_JSExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem flattenBlockHelper =
  | JSEBlock { exprs = exprs, ret = ret } ->
    -- If the return value is a block, concat the expressions in that block with the
    -- expressions in the current block and set the return value to the return value
    -- of the current block
    -- For each expression in the current block, if it is a block, flatten it
    let flatExprs : [JSExpr] = filterNops (foldr (
      lam e. lam acc.
        let flatE = flattenBlockHelper e in
        match flatE with ([], e) then cons e acc
        else match flatE with (flatEExprs, flatERet) in
          join [acc, flatEExprs, [flatERet]]
    ) [] exprs) in

    -- Call flattenBlockHelper recursively on the return value
    let flatRet = flattenBlockHelper ret in
    match flatRet with ([], e) then
      -- Normal expressions are returned as is, thus concat them with the expressions
      -- in the current block
      (flatExprs, ret)
    else match flatRet with (retExprs, retRet) in
      (concat flatExprs retExprs, retRet)
  | expr -> ([], expr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="flattenBlock" kind="sem">

```mc
sem flattenBlock : JSExprAst_JSExpr -> JSExprAst_JSExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem flattenBlock =
  | JSEBlock _ & block ->
    match flattenBlockHelper block with (exprs, ret) in
    let exprs = filterDuplicateDeclarations exprs in
    let exprs = filterNops exprs in
    JSEBlock { exprs = exprs, ret = ret }
  | expr -> expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="immediatelyInvokeBlock" kind="sem">

```mc
sem immediatelyInvokeBlock : JSExprAst_JSExpr -> JSExprAst_JSExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem immediatelyInvokeBlock =
  | JSEBlock _ & block -> JSEIIFE { body = block }
  | expr -> expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterNops" kind="sem">

```mc
sem filterNops : [JSExprAst_JSExpr] -> [JSExprAst_JSExpr]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem filterNops =
  | lst -> foldr (
    lam e. lam acc.
      match e with JSENop { } then acc else cons e acc
  ) [] lst
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterDuplicateDeclarations" kind="sem">

```mc
sem filterDuplicateDeclarations : [JSExprAst_JSExpr] -> [JSExprAst_JSExpr]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem filterDuplicateDeclarations =
  | lst ->
    let declAcc = foldl (
      lam acc: (Set Name, [JSExpr]). lam e: JSExpr.
      match acc with (decls, exprs) in
      match e with JSEDec { ids = names } then
        -- If the current expression is a declaration,
        -- check if any of the names in the declaration are already in the set of declarations
        -- If so, remove the name from the list of names in the expression.
        -- Lastly, add the names in the expression to the set of declarations.
        let newNames = foldl (lam acc. lam name. if setMem name decls then acc else cons name acc) [] names in
        -- Create a new set from the list of names and join it with the set of declarations
        let newDecls = setUnion (setOfSeq nameCmp newNames) decls in
        let e = (if null newNames then JSENop { } else JSEDec { ids = newNames}) in
        (newDecls, snoc exprs e)
      else (decls, snoc exprs e)
    ) (setEmpty nameCmp, []) lst in
    match declAcc with (_, exprs) in
    exprs
```
</ToggleWrapper>
</DocBlock>

