import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ReprTypeSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl env =
  | DeclRepr x ->
    match setSymbol env.currentEnv.reprEnv x.ident with (reprEnv, ident) in
    match mapAccumL setSymbol env.currentEnv.tyVarEnv x.vars with (tyVarEnv, vars) in
    let rhsEnv = (symbolizeUpdateTyVarEnv env tyVarEnv) in
    let pat = symbolizeType rhsEnv x.pat in
    let repr = symbolizeType rhsEnv x.repr in
    ( symbolizeUpdateReprEnv env reprEnv
    , DeclRepr {x with ident = ident, pat = pat, repr = repr, vars = vars}
    )
```
</ToggleWrapper>
</DocBlock>

