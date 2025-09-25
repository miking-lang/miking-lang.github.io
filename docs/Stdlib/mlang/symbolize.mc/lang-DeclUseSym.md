import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclUseSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr env =
  | TmDecl {decl = d & DeclUse _, inexpr = inexpr} ->
    match symbolizeDecl env d with (env, _) in
    symbolizeExpr env inexpr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl env =
  | d & DeclUse t ->
    -- TODO: Prevent TmUse <lang> in that specific lang.
    match mapLookup (nameGetStr t.ident) env.langEnv with Some langEnv
      then
        (updateEnv env langEnv, d)
      else
        symLookupError
          env.langEnv
          {kind = "language", info = [t.info], allowFree = false}
          t.ident
```
</ToggleWrapper>
</DocBlock>

