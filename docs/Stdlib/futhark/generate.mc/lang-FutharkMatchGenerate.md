import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkMatchGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="defaultGenerateMatch" kind="sem">

```mc
sem defaultGenerateMatch : FutharkGenerateEnv -> Ast_Expr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
sem defaultGenerateMatch (env : FutharkGenerateEnv) =
  | TmMatch t ->
    errorSingle [t.info] (join ["Match expression not supported by the Futhark backend"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateExpr" kind="sem">

```mc
sem generateExpr : FutharkGenerateEnv -> Ast_Expr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
sem generateExpr (env : FutharkGenerateEnv) =
  | TmMatch ({pat = PatBool {val = true}} & t) ->
    FEIf {cond = generateExpr env t.target, thn = generateExpr env t.thn,
          els = generateExpr env t.els, ty = generateType env t.ty,
          info = t.info}
  | TmMatch ({pat = PatBool {val = false}} & t) ->
    FEIf {cond = generateExpr env t.target, thn = generateExpr env t.els,
          els = generateExpr env t.thn, ty = generateType env t.ty,
          info = t.info}
  | TmMatch ({pat = PatInt _ | PatChar _} & t) ->
    let condInfo = mergeInfo (infoTm t.target) (infoPat t.pat) in
    let resultTy = FTyBool {info = condInfo} in
    let eqiAppTy = FTyArrow {
      from = FTyInt {info = condInfo, sz = I64 ()}, to = resultTy, info = condInfo} in
    let eqiTy = FTyArrow {
      from = FTyInt {info = condInfo, sz = I64 ()}, to = eqiAppTy, info = condInfo} in
    let lhsConstVal =
      match t.pat with PatInt {val = i} then
        FCInt {val = i, sz = Some (I64 ())}
      else match t.pat with PatChar {val = c} then
        FCInt {val = char2int c, sz = Some (I64 ())}
      else never in
    let condExpr = FEApp {
      lhs = FEApp {
        lhs = FEConst {val = FCEq (), ty = eqiTy, info = condInfo},
        rhs = FEConst {val = lhsConstVal, ty = FTyInt {info = condInfo, sz = I64 ()},
                       info = condInfo},
        ty = eqiAppTy, info = condInfo},
      rhs = generateExpr env t.target,
      ty = resultTy, info = condInfo} in
    FEIf {cond = condExpr, thn = generateExpr env t.thn,
          els = generateExpr env t.els, ty = generateType env t.ty,
          info = t.info}
  | TmMatch ({pat = PatNamed {ident = PWildcard _}} & t) -> generateExpr env t.thn
  | TmMatch ({pat = PatNamed {ident = PName n}} & t) ->
    FELet {ident = n, tyBody = generateType env (tyTm t.target),
           body = generateExpr env t.target, inexpr = generateExpr env t.thn,
           ty = generateType env (tyTm t.thn), info = infoTm t.target}
  | TmMatch ({pat = PatRecord {bindings = bindings} & pat, els = TmNever _} & t) ->
    let defaultGenerateRecordMatch = lam.
      FEMatch {
        target = generateExpr env t.target,
        cases = [(generatePattern env (tyTm t.target) pat, generateExpr env t.thn)],
        ty = generateType env t.ty,
        info = t.info} in
    let binds : [(SID, Pat)] = mapBindings bindings in
    match t.thn with TmVar {ident = exprName} then
      match binds with [(fieldLabel, PatNamed {ident = PName patName})] then
        if nameEq patName exprName then
          FEProj {target = generateExpr env t.target, label = fieldLabel,
                  ty = generateType env t.ty, info = t.info}
        else defaultGenerateRecordMatch ()
      else defaultGenerateRecordMatch ()
    else defaultGenerateRecordMatch ()
  | TmMatch ({pat = PatSeqEdge {prefix = [PatNamed {ident = PName head}],
                                middle = PName tail, postfix = []},
              els = TmNever _} & t) ->
    let target = generateExpr env t.target in
    let targetTy = generateType env (tyTm t.target) in
    match targetTy with FTyArray {elem = elemTy} then
      FELet {
        ident = head,
        tyBody = elemTy,
        body = FEApp {
          lhs = FEConst {
            val = FCHead (),
            ty = FTyArrow {from = elemTy, to = targetTy, info = t.info},
            info = t.info},
          rhs = target, ty = elemTy, info = t.info},
        inexpr = FELet {
          ident = tail,
          tyBody = targetTy,
          body = FEApp {
            lhs = FEConst {
              val = FCTail (),
              ty = FTyArrow {from = targetTy, to = targetTy, info = t.info},
              info = t.info},
            rhs = target, ty = targetTy, info = t.info},
          inexpr = generateExpr env t.thn,
          ty = generateType env (tyTm t.thn),
          info = t.info},
        ty = generateType env (tyTm t.thn),
        info = t.info}
    else
      use FutharkTypePrettyPrint in
      match pprintType 0 pprintEnvEmpty targetTy with (_, tyStr) in
      errorSingle [t.info] (join ["Term of non-sequence type '", tyStr,
                                  "' cannot be matched on sequence pattern"])
  | (TmMatch _) & t -> defaultGenerateMatch env t
```
</ToggleWrapper>
</DocBlock>

