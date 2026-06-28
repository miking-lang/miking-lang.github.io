import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqDeclH" kind="sem">

```mc
sem eqDeclH : EqEnv -> EqEnv -> Ast_Decl -> Ast_Decl -> Option (EqEnv, EqEnv)
```



<ToggleWrapper text="Code..">
```mc
sem eqDeclH (env : EqEnv) (free : EqEnv) (lhs : Decl) =
  | DeclExt {ident = i2} ->
    match lhs with DeclExt {ident = i1} then
      match env with {varEnv = varEnv} in
      if nameEqStr i1 i2 then -- Externals are a bit special, as the string component of their names are required to be identical
        let varEnv = biInsert (i1,i2) varEnv in
        Some ({env with varEnv = varEnv}, free)
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

