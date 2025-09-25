import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SemDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | DeclSem t ->
    match pprintEnvGetStr env t.ident with (env, baseStr) in
    match
      match t.tyAnnot with !TyUnknown _ then
        -- sem typedecl
        match getTypeStringCode indent env t.tyAnnot with (env, tyStr) in
        (env, Some (join ["sem ", baseStr, " : ", tyStr]))
      else (env, None ())
    with (env, mDecl) in
    match
      match (t.args, t.cases) with !(None _, []) then
        -- sem impl
        match
          match t.args with Some args in
          mapAccumL (lam env. lam arg.
            match pprintEnvGetStr env arg.ident with (env, baseStr) in
            match arg.tyAnnot with TyUnknown _ then
              (env, baseStr)
            else
              match getTypeStringCode indent env arg.tyAnnot with (env, tyStr) in
              (env, join ["(", baseStr, " : ", tyStr, ")"])
          ) env args
        with (env, argStrs) in
        match
          mapAccumL (lam env. lam semcase.
            match getPatStringCode (pprintIncr indent) env semcase.pat
            with (env, patStr) in
            match pprintCode (pprintIncr indent) env semcase.thn
            with (env, exprStr) in
            (env, join ["| ", patStr, " ->", pprintNewline (pprintIncr indent), exprStr])
          ) env t.cases
        with (arg, caseStrs) in

        let eqSym = switch t.declKind
          case BaseKind _ then " ="
          case SumExtKind _ then " +="
          case _ then "?"
        end in

        let final = strJoin (pprintNewline indent) (
                cons (join ["sem ", baseStr, strJoin " " (cons "" argStrs), eqSym])
                     caseStrs) in
        (env, Some final)
      else (env, None ())
    with (env, mImpl) in
    (env, strJoin "\n" (mapOption identity [mDecl, mImpl]))
```
</ToggleWrapper>
</DocBlock>

