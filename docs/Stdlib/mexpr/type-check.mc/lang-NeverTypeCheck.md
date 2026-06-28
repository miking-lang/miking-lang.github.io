import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NeverTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmNever t ->
    if env.disableConstructorTypes then
      TmNever {t with ty = newpolyvar env.currentLvl t.info}
    else
      switch matchesPossible env
      case Left ms then
        match mergeBounds ms with Some m then
          iter
            (lam x.
              let data =
                Data { types =
                         mapMap (lam ks. { lower = setEmpty nameCmp
                                         , upper = Some ks }) x.1 } in
              unify env [t.info]
                (newmetavar data env.currentLvl (infoTy x.0)) x.0)
            (mapBindings m);
          TmNever {t with ty = newpolyvar env.currentLvl t.info}
        else
          let altstr =
            strJoin "* or\n"
              (foldl
                 (lam acc. lam m.
                   match
                     mapFoldWithKey
                       (lam acc. lam ty. lam m.
                         match getTypeStringCode 0 acc.0 ty with (env, tystr) in
                         match
                           mapFoldWithKey
                             (lam acc. lam t. lam ks.
                               match pprintTypeName acc.0 t with (env, tstr) in
                               match mapAccumL pprintConName env (setToSeq ks) with (env, ks) in
                               (env, snoc acc.1 (join [tstr, "[< ", strJoin " " ks, "]"])))
                             (env, []) m
                         with (env, consstr) in
                         (env, join [ acc.1, "*   ", tystr, " :: {", strJoin ", " consstr, "}\n" ]))
                       (acc.0, "") m.1
                   with (env, mstr) in
                   (env, snoc acc.1 mstr))
                 (pprintEnvEmpty, [])
                 ms).1
          in
          let msg = join [
            "* Encountered a live never term.\n",
            "* Could not determine how to make this term unreachable.\n",
            "* The following assignments of constructor sets were inferred as alternatives:\n",
            altstr,
            "* When type checking the expression\n"
          ] in
          errorSingle [t.info] msg
      case Right m then
        let matchstr =
          if mapIsEmpty m then ""
          else
            join [
              "* Variables ", strJoin ", " (map nameGetStr (mapKeys m)),
              " appear in enclosing matches.\n",
              "* An assignment leading to this never term is:\n",
              mapFoldWithKey
                (lam str. lam n. lam p.
                  join [ str
                       , "*   ", nameGetStr n
                       , " = "
                       , (getPatStringCode 0 pprintEnvEmpty (normpatToPat p)).1
                       , "\n" ]) "" m ]
        in
        let msg = join [
          "* Encountered a live never term.\n",
          "* Could not find an expression being exhaustively matched.\n",
          matchstr,
          "* When type checking the expression\n"
        ] in
        errorSingle [t.info] msg
      end
```
</ToggleWrapper>
</DocBlock>

