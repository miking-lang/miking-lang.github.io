import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpImplSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl env =
  | DeclOpImpl x ->
    let ident = getSymbol
      { kind = "variable"
      , info = [x.info]
      , allowFree = env.allowFree
      }
      env.currentEnv.varEnv
      x.ident in
    match symbolizeTyAnnot env x.specType with (tyVarEnv, specType) in
    let body = symbolizeExpr (symbolizeUpdateTyVarEnv env tyVarEnv) x.body in
    (env, DeclOpImpl {x with ident = ident, body = body, specType = specType})
```
</ToggleWrapper>
</DocBlock>

