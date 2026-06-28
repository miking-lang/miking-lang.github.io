import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VariantPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="prettyPrintIdH" kind="sem">

```mc
sem prettyPrintIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```



<ToggleWrapper text="Code..">
```mc
sem prettyPrintIdH info env =
  | (TyApp _ | TyCon _) & ty ->
    match mapLookup ty env.pprint with Some id then id
    else
      match collectTypeArguments [] ty with (id, argTypes) in
      nameSym (concat (concat "pp" (nameGetStr id)) (strJoin "" (map type2str argTypes)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generatePrettyPrintBodyH" kind="sem">

```mc
sem generatePrettyPrintBodyH : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generatePrettyPrintBodyH info env =
  | (TyApp _ | TyCon _) & ty ->
    match collectTypeArguments [] ty with (id, tyArgs) in
    if nameEq id (mapFindExn "Symbol" builtinTypeNames) then
      generateSymbolPrettyPrint env ty
    else if nameEq id (mapFindExn "Ref" builtinTypeNames) then
      generateReferencePrettyPrint env ty
    else if nameEq id (mapFindExn "BootParseTree" builtinTypeNames) then
      generateBootParseTreePrettyPrint env ty
    else defaultVariantPrettyPrint info env id tyArgs ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateSymbolPrettyPrint" kind="sem">

```mc
sem generateSymbolPrettyPrint : UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateSymbolPrettyPrint env =
  | ty ->
    let target = nameSym "s" in
    let ppInt = _var (ppIntName ()) (_pprintTy _intTy) in
    let symHash =
      _apps (_const (CSym2hash ()) (_tyarrows [ty, _intTy]))
        [_var target ty] in
    _lam target ty
      (_apps _concat
        [ _stringLit "sym ("
        , _apps _concat [_apps ppInt [symHash], _stringLit ")"] ])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateReferencePrettyPrint" kind="sem">

```mc
sem generateReferencePrettyPrint : UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateReferencePrettyPrint env =
  | ty -> _lam (nameNoSym "") ty (_stringLit "<ref>")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateBootParseTreePrettyPrint" kind="sem">

```mc
sem generateBootParseTreePrettyPrint : UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateBootParseTreePrettyPrint env =
  | ty -> _lam (nameNoSym "") ty (_stringLit "<boot parse tree>")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultVariantPrettyPrint" kind="sem">

```mc
sem defaultVariantPrettyPrint : Info -> UtestBase_UtestEnv -> Name -> [Ast_Type] -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem defaultVariantPrettyPrint info env id tyArgs =
  | ty ->
    let constrs = lookupVariant id env info in
    let constrArgTypes = mapMapWithKey (specializeConstructorArgument tyArgs) constrs in
    let target = nameSym "a" in
    let constrPprint = lam acc. lam constrId. lam constrArgTy.
      match getPrettyPrintExpr info env constrArgTy with (_, ppExpr) in
      let innerId = nameSym "x" in
      let thn =
        _apps _concat
          [ _stringLit (concat (nameGetStr constrId) " ")
          , _apps ppExpr [_var innerId constrArgTy] ]
      in
      _match (_var target ty)
        (_patCon constrId (_patVar innerId constrArgTy) ty)
        thn acc _stringTy
    in
    let body = mapFoldWithKey constrPprint (_never _stringTy) constrArgTypes in
    _lam target ty body
```
</ToggleWrapper>
</DocBlock>

