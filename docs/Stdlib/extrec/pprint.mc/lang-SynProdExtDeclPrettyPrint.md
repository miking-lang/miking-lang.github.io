import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SynProdExtDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | SynDeclProdExt t ->
    match pprintTypeName env t.ident with (env, typeNameStr) in
    match mapAccumL pprintEnvGetStr env t.params with (env, params) in
    let params = join (map (concat " ") params) in
    match
      mapAccumL (lam env. lam indivExt.
        match pprintConName env indivExt.ident with (env, str) in
        match getTypeStringCode (pprintIncr indent) env indivExt.tyIdent
        with (env, ty) in
        (env, join ["| ", str, " ", ty])
      ) env t.individualExts
    with (env, indivExtStr) in

    match
      match t.globalExt with Some ext then
        match getTypeStringCode (pprintIncr indent) env ext
        with (env, str) in (env, str)
      else
        (env, "")
    with (env, globExtStr) in

    (env, strJoin (pprintNewline indent)
                  (cons (join ["syn ", typeNameStr, params, " *= ", globExtStr]) indivExtStr))
```
</ToggleWrapper>
</DocBlock>

