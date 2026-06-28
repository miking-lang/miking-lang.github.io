import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkToplevelGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="collectTypeParams" kind="sem">

```mc
sem collectTypeParams : [FutharkTypeParamAst_FutTypeParam] -> FutharkTypeAst_FutType -> [FutharkTypeParamAst_FutTypeParam]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectTypeParams acc =
  | FTyArray {elem = elem, dim = Some (NamedDim id)} ->
    let acc = cons (FPSize {val = id}) acc in
    sfold_FType_FType collectTypeParams acc elem
  | ty ->
    sfold_FType_FType collectTypeParams acc ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_collectParams" kind="sem">

```mc
sem _collectParams : FutharkGenerateEnv -> (FutharkExprAst_FutExpr, FutharkTypeAst_FutType) -> ([(Name, FutharkTypeAst_FutType)], [FutharkTypeParamAst_FutTypeParam])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _collectParams env =
  | (body, ty) ->
    recursive let collectParamIds = lam acc. lam body.
      match body with FELam t then collectParamIds (snoc acc t.ident) t.body
      else acc
    in
    recursive let collectParamTypes = lam ty.
      recursive let work = lam acc. lam ty.
        match ty with FTyArrow {from = from, to = to} then
          work (cons from acc) to
        else cons ty acc
      in
      match ty with FTyAll t then
        collectParamTypes t.ty
      else
        reverse (tail (work [] ty))
    in
    recursive let collectTyAllParams = lam acc. lam ty.
      match ty with FTyAll t then
        collectTyAllParams (cons (FPType {val = t.ident}) acc) t.ty
      else acc
    in
    let paramIds = collectParamIds [] body in
    let paramTypes = collectParamTypes ty in
    let typeParams =
      foldl collectTypeParams (collectTyAllParams [] ty) paramTypes
    in
    (zip paramIds paramTypes, typeParams)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateToplevel" kind="sem">

```mc
sem generateToplevel : FutharkGenerateEnv -> Ast_Expr -> [FutharkAst_FutDecl]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateToplevel env =
  | TmDecl {decl = DeclType _, inexpr = inexpr} ->
    generateToplevel env inexpr
  | TmDecl (x & {decl = DeclLet t}) ->
    recursive let findReturnType = lam params. lam ty.
      if null params then ty
      else
        match ty with TyArrow {to = to} then
          findReturnType (tail params) to
        else
          errorSingle [t.info] (join ["Function takes more parameters than ",
                                      "specified in return type"])
    in
    recursive let stripLambdas = lam e.
      match e with FELam t then stripLambdas t.body else e
    in
    let decl =
      let body = generateExpr env t.body in
      let tyBody = generateType env t.tyBody in
      match _collectParams env (body, tyBody) with (params, typeParams) in
      if null params then
        -- NOTE(larshum, 2021-12-01): The generation currently does not support
        -- type parameters in constant declarations.
        FDeclConst {ident = t.ident, ty = tyBody, val = body, info = t.info}
      else
        let retTy = generateType env (findReturnType params (inspectType t.tyBody)) in
        let entry = setMem t.ident env.entryPoints in
        let typeParams = collectTypeParams typeParams retTy in
        FDeclFun {ident = t.ident, entry = entry, typeParams = typeParams,
                  params = params, ret = retTy,
                  body = stripLambdas body, info = t.info}
    in
    cons decl (generateToplevel env x.inexpr)
  | TmDecl {decl = DeclRecLets t} ->
    errorSingle [t.info] "Recursive functions are not supported by the Futhark backend"
  | TmDecl (x & {decl = DeclExt t}) ->
    match mapLookup (nameGetStr t.ident) extMap with Some str then
      generateToplevel env x.inexpr
    else
      errorSingle [t.info] "External functions are not supported by the Futhark backend"
  | TmDecl {decl = DeclUtest t} ->
    -- NOTE(larshum, 2021-11-25): This case should never be reached, as utests
    -- are removed/replaced in earlier stages of the compilation.
    errorSingle [t.info] "Utests are not supported by the Futhark backend"
  | TmDecl {decl = DeclConDef t} ->
    errorSingle [t.info] "Constructor definitions are not supported by the Futhark backend"
  | _ -> []
```
</ToggleWrapper>
</DocBlock>

