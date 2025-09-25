import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqPat" kind="sem">

```mc
sem eqPat : all a. EqEnv -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> [a] -> Ast_Pat -> Ast_Pat -> Option (EqEnv, BiNameMap)
```



<ToggleWrapper text="Code..">
```mc
sem eqPat (env : EqEnv) (free : EqEnv) (patEnv : BiNameMap) (lhs : Pat) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option {conEnv: [(Name, Name)], varEnv: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmMatch {target = t2, pat = p2, thn = thn2, els = els2, ty = ty2} ->
    match lhs with TmMatch {target = t1, pat = p1, thn = thn1, els = els1, ty = ty1} then
      match eqExprH env free t1 t2 with Some free then
        match eqExprH env free els1 els2 with Some free then
          match eqPat env free biEmpty p1 p2 with Some n then
            let n : (EqEnv, BiNameMap) = n in
            match n with (free, patEnv) then
              match env with {varEnv = varEnv} then
                eqExprH {env with varEnv = biMergePreferRight varEnv patEnv}
                  free thn1 thn2
              else never
            else never
          else None ()
        else None ()
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

