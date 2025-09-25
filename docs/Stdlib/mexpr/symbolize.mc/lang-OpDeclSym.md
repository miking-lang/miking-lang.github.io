import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpDeclSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl env =
  | DeclOp x ->
    let symbolizeReprDecl = lam reprEnv. lam binding.
      match mapAccumL setSymbol env.currentEnv.tyVarEnv binding.1 .vars with (tyVarEnv, vars) in
      let newEnv = (symbolizeUpdateTyVarEnv env tyVarEnv) in
      match setSymbol reprEnv binding.0 with (reprEnv, ident) in
      let res =
        { ident = ident
        , vars = vars
        , pat = symbolizeType newEnv binding.1 .pat
        , repr = symbolizeType newEnv binding.1 .repr
        }
      in (reprEnv, res) in

    match setSymbol env.currentEnv.varEnv x.ident with (varEnv, ident) in
    ( symbolizeUpdateVarEnv env varEnv
    , DeclOp
      { x with ident = ident
      , tyAnnot = symbolizeType env x.tyAnnot
      }
    )
```
</ToggleWrapper>
</DocBlock>

