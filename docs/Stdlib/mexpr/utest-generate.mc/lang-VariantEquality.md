import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VariantEquality  
  

  
  
  
## Semantics  
  

          <DocBlock title="equalityIdH" kind="sem">

```mc
sem equalityIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```



<ToggleWrapper text="Code..">
```mc
sem equalityIdH info env =
  | (TyApp _ | TyCon _) & ty ->
    match mapLookup ty env.eq with Some id then id
    else
      match collectTypeArguments [] ty with (id, argTypes) in
      nameSym (concat (concat "eq" (nameGetStr id)) (strJoin "" (map type2str argTypes)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateEqualityBodyH" kind="sem">

```mc
sem generateEqualityBodyH : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generateEqualityBodyH info env =
  | (TyCon _ | TyApp _) & ty ->
    match collectTypeArguments [] ty with (id, tyArgs) in
    if nameEq id (mapFindExn "Symbol" builtinTypeNames) then
      generateSymbolEquality info env ty
    else if nameEq id (mapFindExn "Ref" builtinTypeNames) then
      generateReferenceEquality info env ty
    else if nameEq id (mapFindExn "BootParseTree" builtinTypeNames) then
      generateBootParseTreeEquality info env ty
    else defaultVariantEq info env id tyArgs ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateSymbolEquality" kind="sem">

```mc
sem generateSymbolEquality : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateSymbolEquality info env =
  | ty ->
    let larg = nameSym "l" in
    let rarg = nameSym "r" in
    let eqsym = _const (CEqsym ()) (_tyarrows [ty, ty, _boolTy]) in
    _lam larg ty (_lam rarg ty (_apps eqsym [_var larg ty, _var rarg ty]))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateReferenceEquality" kind="sem">

```mc
sem generateReferenceEquality : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateReferenceEquality info env =
  | ty ->
    errorSingle [info]
      "A custom equality function must be provided for reference types.\n"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateBootParseTreeEquality" kind="sem">

```mc
sem generateBootParseTreeEquality : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateBootParseTreeEquality info env =
  | ty -> errorSingle [info] "Cannot generate equality for boot parse trees"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultVariantEq" kind="sem">

```mc
sem defaultVariantEq : Info -> UtestBase_UtestEnv -> Name -> [Ast_Type] -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem defaultVariantEq info env id tyArgs =
  | ty ->
    let constrs = lookupVariant id env info in
    let constrArgTypes = mapMapWithKey (specializeConstructorArgument tyArgs) constrs in
    let larg = nameSym "l" in
    let rarg = nameSym "r" in
    let lid = nameSym "lhs" in
    let rid = nameSym "rhs" in
    let constrEq = lam acc. lam constrId. lam constrArgTy.
      match getEqualityExpr info env constrArgTy with (_, argEq) in
      let target = _tuple [_var larg ty, _var rarg ty] (_tupleTy [ty, ty]) in
      let conPat = lam id. lam argTy. _patCon constrId (_patVar id argTy) ty in
      let pat =
        _patTuple [conPat lid constrArgTy, conPat rid constrArgTy]
          (_tupleTy [ty, ty]) in
      let thn = _apps argEq [_var lid constrArgTy, _var rid constrArgTy] in
      _match target pat thn acc _boolTy
    in
    let body = mapFoldWithKey constrEq _false constrArgTypes in
    _lam larg ty (_lam rarg ty body)
```
</ToggleWrapper>
</DocBlock>

