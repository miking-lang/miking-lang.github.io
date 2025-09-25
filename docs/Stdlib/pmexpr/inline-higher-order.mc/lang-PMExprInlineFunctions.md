import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprInlineFunctions  
  

  
  
  
## Types  
  

          <DocBlock title="PMExprInlineMap" kind="type">

```mc
type PMExprInlineMap : Map Name (Expr, Int)
```



<ToggleWrapper text="Code..">
```mc
type PMExprInlineMap = Map Name (Expr, Int)
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="_incrementUseCount" kind="sem">

```mc
sem _incrementUseCount : PMExprInlineFunctions_PMExprInlineMap -> Name -> PMExprInlineFunctions_PMExprInlineMap
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _incrementUseCount useCount =
  | id ->
    -- NOTE(larshum, 2022-08-17): Only increment count of variables bound in
    -- let-expressions, where we know the expression bound to the variable.
    match mapLookup id useCount with Some (expr, count) then
      mapInsert id (expr, addi count 1) useCount
    else useCount
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectBindingUseCount" kind="sem">

```mc
sem collectBindingUseCount : PMExprInlineFunctions_PMExprInlineMap -> Ast_Expr -> PMExprInlineFunctions_PMExprInlineMap
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectBindingUseCount useCount =
  | TmVar t -> _incrementUseCount useCount t.ident
  | TmDecl (x & {decl = DeclLet t}) ->
    let useCount = mapInsert t.ident (t.body, 0) useCount in
    let useCount = collectBindingUseCount useCount t.body in
    collectBindingUseCount useCount x.inexpr
  | t -> sfold_Expr_Expr collectBindingUseCount useCount t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_repeatInline" kind="sem">

```mc
sem _repeatInline : PMExprInlineFunctions_PMExprInlineMap -> Set Name -> Ast_Expr -> (Set Name, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _repeatInline useCount inlined =
  | var & (TmVar {ident = id}) ->
    match mapLookup id useCount with Some (body, 1) then
      let inlined = setInsert id inlined in
      _repeatInline useCount inlined body
    else (inlined, var)
  | app & (TmApp t) ->
    recursive let inlineAppFunction = lam inlined. lam app.
      match app with TmApp t then
        match inlineAppFunction inlined t.lhs with (inlined, lhs) in
        (inlined, TmApp {t with lhs = lhs})
      else _repeatInline useCount inlined app in
    inlineAppFunction inlined app
  | t -> (inlined, t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_applyLambdas" kind="sem">

```mc
sem _applyLambdas : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _applyLambdas =
  | app ->
    recursive let work = lam subMap. lam app.
      match app with TmApp (t & {rhs = TmVar {ident = id}}) then
        match work subMap t.lhs with (subMap, lhs) in
        match lhs with TmLam l then
          let infoFn = lam info.
            TmVar {ident = id, ty = tyTm t.rhs, info = info,
                   frozen = false} in
          (mapInsert l.ident infoFn subMap, l.body)
        else (subMap, lhs)
      else (subMap, app)
    in
    match work (mapEmpty nameCmp) app with (subMap, body) in
    substituteVariables subMap body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inlineBindingUses" kind="sem">

```mc
sem inlineBindingUses : PMExprInlineFunctions_PMExprInlineMap -> Set Name -> Ast_Expr -> (Set Name, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inlineBindingUses useCount inlined =
  | TmApp (t & {lhs = TmConst {val = CFoldl _}, rhs = rhs}) ->
    match _repeatInline useCount inlined rhs with (inlined, rhs) in
    (inlined, TmApp {t with rhs = _applyLambdas rhs})
  | t -> smapAccumL_Expr_Expr (inlineBindingUses useCount) inlined t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeInlinedFunctions" kind="sem">

```mc
sem removeInlinedFunctions : Set Name -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem removeInlinedFunctions inlined =
  | TmDecl (x & {decl = DeclLet t}) ->
    if setMem t.ident inlined then removeInlinedFunctions inlined x.inexpr
    else TmDecl {x with inexpr = removeInlinedFunctions inlined x.inexpr}
  | t -> smap_Expr_Expr (removeInlinedFunctions inlined) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inlineHigherOrderFunctions" kind="sem">

```mc
sem inlineHigherOrderFunctions : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inlineHigherOrderFunctions =
  | e ->
    let inlineMap = collectBindingUseCount (mapEmpty nameCmp) e in
    match inlineBindingUses inlineMap (setEmpty nameCmp) e with (inlined, e) in
    let e = removeInlinedFunctions inlined e in
    e
```
</ToggleWrapper>
</DocBlock>

