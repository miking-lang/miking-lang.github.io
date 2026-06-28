import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkExprGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateExpr" kind="sem">

```mc
sem generateExpr : FutharkGenerateEnv -> Ast_Expr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
sem generateExpr (env : FutharkGenerateEnv) =
  | TmVar t ->
    -- NOTE(larshum, 2022-08-15): Special-case handling of external functions.
    match mapLookup (nameGetStr t.ident) extMap with Some str then
      FEVarExt {ident = str, ty = generateType env t.ty, info = t.info}
    else FEVar {ident = t.ident, ty = generateType env t.ty, info = t.info}
  | TmRecord t ->
    FERecord {fields = mapMap (generateExpr env) t.bindings,
              ty = generateType env t.ty, info = t.info}
  | TmRecordUpdate t ->
    FERecordUpdate {rec = generateExpr env t.rec, key = t.key,
                    value = generateExpr env t.value,
                    ty = generateType env t.ty, info = t.info}
  | TmSeq t ->
    FEArray {tms = map (generateExpr env) t.tms, ty = generateType env t.ty,
             info = t.info}
  | TmConst t ->
    FEConst {val = generateConst t.info t.val, ty = generateType env t.ty,
             info = t.info}
  | TmLam t ->
    FELam {ident = t.ident, body = generateExpr env t.body,
           ty = generateType env t.ty, info = t.info}
  | TmDecl (x & {decl = DeclLet t}) ->
    let boundNames = mapInsert t.ident t.body env.boundNames in
    let inexprEnv = {env with boundNames = boundNames} in
    FELet {ident = t.ident, tyBody = generateType env t.tyBody,
           body = generateExpr env t.body,
           inexpr = generateExpr inexprEnv x.inexpr,
           ty = generateType env x.ty, info = t.info}
  | TmFlatten t ->
    withTypeFutTm
      (generateType env t.ty)
      (withInfoFutTm t.info (futFlatten_ (generateExpr env t.e)))
  | TmMap2 t ->
    withTypeFutTm
      (generateType env t.ty)
      (withInfoFutTm t.info (futMap2_ (generateExpr env t.f)
                                      (generateExpr env t.as)
                                      (generateExpr env t.bs)))
  | TmParallelReduce t ->
    withTypeFutTm
      (generateType env t.ty)
      (withInfoFutTm t.info (futReduce_ (generateExpr env t.f)
                                        (generateExpr env t.ne)
                                        (generateExpr env t.as)))
  | TmParallelSizeCoercion t ->
    let ty = generateType env t.ty in
    match ty with FTyArray aty then
      FESizeCoercion {
        e = generateExpr env t.e, ty = FTyArray {aty with dim = Some (NamedDim t.size)},
        info = t.info}
    else errorSingle [t.info] (join ["Size coercion could not be generated ",
                                     "due to unexpected type of sequence"])
  | TmParallelSizeEquality t ->
    FESizeEquality {x1 = t.x1, d1 = t.d1, x2 = t.x2, d2 = t.d2,
                    ty = generateType env t.ty, info = t.info}
  | TmDecl {decl = DeclRecLets t} ->
    errorSingle [t.info] "Recursive functions are not supported by the Futhark backend"
  | t ->
    errorSingle [infoTm t] "Term is not supported by the Futhark backend"
```
</ToggleWrapper>
</DocBlock>

