import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclType x ->
    match pprintTypeName env x.ident with (env,identStr) in
    match mapAccumL pprintEnvGetStr env x.params with (env, paramsStr) in
    let paramStr = strJoin " " (cons "" paramsStr) in
    match x.tyIdent with TyVariant _ then
      (env, join ["type ", identStr, paramStr])
    else
      match getTypeStringCode indent env x.tyIdent with (env, tyIdentStr) in
      (env, join ["type ", identStr, paramStr, " =",
                pprintNewline (pprintIncr indent),
                tyIdentStr])
```
</ToggleWrapper>
</DocBlock>

