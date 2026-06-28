import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SynDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | DeclSyn t ->
    match pprintTypeName env t.ident with (env, typeNameStr) in
    match mapAccumL pprintEnvGetStr env t.params with (env, params) in
    let params = join (map (concat " ") params) in
    match
      mapAccumL (lam env. lam syndef.
        match pprintConName env syndef.ident with (env, str) in
        match getTypeStringCode (pprintIncr indent) env syndef.tyIdent
        with (env, ty) in
        (env, join ["| ", str, " ", ty])
      ) env t.defs
    with (env, defStrings) in

    let eqSym = switch t.declKind
      case BaseKind _ then " ="
      case SumExtKind _ then " +="
    end in

    (env, strJoin (pprintNewline indent)
                  (cons (join ["syn ", typeNameStr, params, eqSym]) defStrings))
```
</ToggleWrapper>
</DocBlock>

