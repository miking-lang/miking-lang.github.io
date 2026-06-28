import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmMatch t ->
    let target = typeCheckExpr env t.target in
    match typeCheckPat env (mapEmpty nameCmp) t.pat with (patEnv, pat) in
    unify env [infoTm target, infoPat pat] (tyPat pat) (tyTm target);

    let matchLvl = addi 1 env.matchLvl in
    match
      if env.disableConstructorTypes then ([], [])
      else
        let np = patToNormpat pat in
        (matchNormpat (t.target, np), matchNormpat (t.target, normpatComplement np))
    with
      (posMatches, negMatches)
    in

    let mkMatches =
      lam matches.
        joinMap (lam a.
          (joinMap (lam b.
            let m = mapUnionWith normpatIntersect a b in
            if mapAll (lam np. not (null np)) m then [m] else [])
             env.matches))
          matches
    in
    let mkMatchVars = lam matches.
      foldl
        (mapFoldWithKey (lam acc. lam n. lam. mapInsert n matchLvl acc))
        env.matchVars matches
    in

    let baseEnv = {env with varEnv = mapUnion env.varEnv patEnv,
                            matchLvl = matchLvl} in
    let thnEnv = if env.disableConstructorTypes then baseEnv
                 else {baseEnv with matches = mkMatches posMatches,
                                    matchVars = mkMatchVars posMatches} in
    let elsEnv = if env.disableConstructorTypes then baseEnv
                 else {baseEnv with matches = mkMatches negMatches,
                                    matchVars = mkMatchVars negMatches} in
    let thn = typeCheckExpr thnEnv t.thn in
    let els = typeCheckExpr elsEnv t.els in
    unify env [infoTm thn, infoTm els] (tyTm thn) (tyTm els);
    TmMatch {t with target = target
            , thn = thn
            , els = els
            , ty = tyTm thn
            , pat = pat}
```
</ToggleWrapper>
</DocBlock>

