import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# QualifiedNamePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env : PprintEnv) =
  | TyQualifiedName t ->
    let prefix = if t.pos then "< " else "> " in
    match pprintLangName env t.lhs with (env, lhs) in
    match pprintTypeName env t.rhs with (env, rhs) in

    if and (null t.plus) (null t.minus) then
      (env, join [prefix, lhs, "::", rhs])
    else
      let pprintList = lam env. lam pairs.
        mapAccumL (lam env. lam pair.
          match pair with (t, c) in
          match pprintTypeName env t with (env, t) in
          match pprintTypeName env c with (env, c) in
          (env, join [t, "::", c])
        ) env pairs
      in

      let plus = if null t.plus then "" else
        match pprintList env t.plus with (env, plus) in
        concat " + " (strJoin ", " plus) in

      let minus = if null t.minus then "" else
        match pprintList env t.minus with (env, minus) in
        concat " - " (strJoin ", " minus) in

      (env, join [prefix, "(", lhs, "::", rhs, plus, minus, ")"])
```
</ToggleWrapper>
</DocBlock>

