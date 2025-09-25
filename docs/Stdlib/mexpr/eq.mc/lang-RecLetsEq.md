import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqDeclH" kind="sem">

```mc
sem eqDeclH : EqEnv -> EqEnv -> Ast_Decl -> Ast_Decl -> Option (EqEnv, EqEnv)
```



<ToggleWrapper text="Code..">
```mc
sem eqDeclH (env : EqEnv) (free : EqEnv) (lhs : Decl) =
  | DeclRecLets {bindings = bs2} ->
    -- NOTE(dlunde,2020-09-25): This requires the bindings to occur in the same
    -- order. Do we want to allow equality of differently ordered (but equal)
    -- bindings as well?
    match env with {varEnv = varEnv} then
      match lhs with DeclRecLets {bindings = bs1} then
        if eqi (length bs1) (length bs2) then
          let bszip = zipWith (lam b1. lam b2. (b1, b2)) bs1 bs2 in
          let varEnv =
            foldl
              (lam varEnv. lam t : (DeclLetRecord, DeclLetRecord).
                 biInsert ((t.0).ident,(t.1).ident) varEnv)
              varEnv bszip
          in
          let env = {env with varEnv = varEnv} in
          match optionFoldlM
            (lam free. lam t : (DeclLetRecord, DeclLetRecord).
              eqExprH env free (t.0).body (t.1).body)
            free bszip
          with Some free then
            Some (env, free)
          else None ()
        else None ()
      else None ()
    else never
```
</ToggleWrapper>
</DocBlock>

