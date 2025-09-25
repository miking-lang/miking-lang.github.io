import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkAppGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="defaultGenerateApp" kind="sem">

```mc
sem defaultGenerateApp : FutharkGenerateEnv -> Ast_Expr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
sem defaultGenerateApp (env : FutharkGenerateEnv) =
  | TmApp t -> FEApp {lhs = generateExpr env t.lhs, rhs = generateExpr env t.rhs,
                      ty = generateType env t.ty, info = t.info}
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
  | TmApp ({lhs = TmApp {lhs = TmConst {val = CGet _}, rhs = arg1}, rhs = arg2} & t) ->
    FEArrayAccess {
      array = generateExpr env arg1, index = generateExpr env arg2,
      ty = generateType env t.ty, info = t.info}
  | TmApp ({lhs = TmApp {lhs = TmApp {lhs = TmConst {val = CSet _},
                                      rhs = arg1},
                         rhs = arg2},
            rhs = arg3} & t) ->
    let arrayTy = generateType env t.ty in
    -- NOTE(larshum, 2021-09-27): In-place updates in Futhark require that the
    -- array is not aliased. As MExpr performs no alias analysis, we instead
    -- add an explicit copy of the target array.
    let arrayCopy = FEApp {
      lhs = FEConst {
        val = FCCopy (),
        ty = FTyArrow {from = arrayTy, to = arrayTy, info = t.info},
        info = t.info},
      rhs = generateExpr env arg1,
      ty = arrayTy,
      info = t.info} in
    FEArrayUpdate {
      array = arrayCopy, index = generateExpr env arg2,
      value = generateExpr env arg3, ty = arrayTy, info = t.info}
  | TmApp ({lhs = TmApp {lhs = TmConst {val = CCreate _}, rhs = arg1},
            rhs = arg2} & t) ->
    let tryLookupExpr = lam e.
      match e with TmVar t then
        optionGetOrElse
          (lam. e)
          (mapLookup t.ident env.boundNames)
      else e
    in
    let argx1 = tryLookupExpr arg1 in
    let argx2 = tryLookupExpr arg2 in
    let result =
      match argx2 with TmLam {ident = i, body = body} then
        match body with TmVar {ident = id} then
          if nameEq i id then
            match argx1 with TmApp {lhs = TmConst {val = CLength _}, rhs = seq} then
              futIndices_ (generateExpr env seq)
            else futIota_ (generateExpr env arg1)
          else futReplicate_ (generateExpr env arg1) (generateExpr env body)
        else match body with TmConst _ then
          futReplicate_ (generateExpr env arg1) (generateExpr env body)
        else defaultGenerateApp env (TmApp t)
      else defaultGenerateApp env (TmApp t)
    in
    let resultType = generateType env t.ty in
    withTypeFutTm resultType (withInfoFutTm t.info result)
  | TmApp ({lhs = TmApp {lhs = TmApp {lhs = TmConst {val = CSubsequence _},
                                      rhs = arg1},
                         rhs = arg2},
            rhs = arg3} & t) ->
    let startIdx = generateExpr env arg2 in
    let offset = generateExpr env arg3 in
    let info = mergeInfo (infoFutTm startIdx) (infoFutTm offset) in
    let endIdx =
      match startIdx with FEConst {val = FCInt {val = 0}} then offset
      else
        FEApp {
          lhs = FEApp {
            lhs = FEConst {val = FCAdd (), ty = futUnknownTy_, info = info},
            rhs = startIdx,
            ty = FTyArrow {
              from = FTyInt {info = info, sz = I64 ()},
              to = FTyInt {info = info, sz = I64 ()}, info = info},
            info = info
          },
          rhs = offset,
          ty = FTyInt {info = info, sz = I64 ()},
          info = info} in
    FEArraySlice {
      array = generateExpr env arg1, startIdx = startIdx, endIdx = endIdx,
      ty = generateType env t.ty, info = t.info}
  | TmApp {lhs = TmConst {val = CFloorfi _}, rhs = arg, info = info} ->
    FEApp {
      lhs = FEConst {
        val = FCFloat2Int (),
        ty = FTyArrow {from = FTyFloat {info = info, sz = F64 ()},
                       to = FTyInt {info = info, sz = I64 ()}, info = info},
        info = info},
      rhs = FEApp {
        lhs = FEConst {
          val = FCFloatFloor (),
          ty = FTyArrow {from = FTyFloat {info = info, sz = F64 ()},
                         to = FTyFloat {info = info, sz = F64 ()}, info = info},
          info = info},
        rhs = generateExpr env arg,
        ty = FTyFloat {info = info, sz = F64 ()},
        info = info},
      ty = FTyInt {info = info, sz = I64 ()},
      info = info}
  | TmApp ({
      lhs = TmApp {
        lhs = TmApp {
          lhs = TmConst {val = CFoldl _},
          rhs = f},
        rhs = ne},
      rhs = s} & t) ->
    let acc = nameSym "acc" in
    let x = nameSym "x" in
    let funcTy = generateType env (tyTm f) in
    let accTy = generateType env t.ty in
    let seqTy = generateType env (tyTm s) in
    let elemTy =
      match funcTy with FTyArrow {to = FTyArrow {to = elemTy}} then
        elemTy
      else errorSingle [t.info] "Invalid type of function passed to foldl" in
    let param : (FutPat, FutExpr) =
      ( FPNamed {ident = PName acc, ty = accTy, info = t.info},
        generateExpr env ne ) in
    let constructForEach : FutExpr -> Name -> FutExpr = lam body. lam x.
      FEForEach {
        param = param, loopVar = x, seq = generateExpr env s, body = body,
        ty = accTy, info = t.info}
    in
    -- NOTE(larshum, 2021-09-29): If the body consists of lambdas, eliminate
    -- them by substitution. This can only happen because of a pattern
    -- transformation, as lambda lifting would have eliminated it otherwise.
    match f with TmLam {ident = accLam, body = TmLam {ident = x, body = body}} then
      -- Substitute 'acc' with 'ne' in the function body, and use the 'x' bound
      -- in the lambda.
      let subMap = mapFromSeq nameCmp [
        (accLam, lam info. TmVar {ident = acc, ty = t.ty, info = info,
                                  frozen = false})] in
      let body = substituteVariables subMap body in
      let futBody = generateExpr env body in
      constructForEach futBody x
    else
      let forBody =
        FEApp {
          lhs = FEApp {
            lhs = generateExpr env f,
            rhs = FEVar {ident = acc, ty = accTy, info = t.info},
            ty = FTyArrow {from = elemTy, to = accTy, info = t.info},
            info = t.info},
          rhs = FEVar {ident = x, ty = elemTy, info = t.info},
          ty = accTy, info = t.info} in
      constructForEach forBody x
  | (TmApp _) & t -> defaultGenerateApp env t
```
</ToggleWrapper>
</DocBlock>

