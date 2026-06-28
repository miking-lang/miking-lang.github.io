import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTotPatEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqPat" kind="sem">

```mc
sem eqPat : EqEnv -> EqEnv -> BiNameMap -> Ast_Pat -> Ast_Pat -> Option (EqEnv, BiNameMap)
```



<ToggleWrapper text="Code..">
```mc
sem eqPat (env : EqEnv) (free : EqEnv) (patEnv : BiNameMap) (lhs : Pat) =
  | PatSeqTot {pats = ps2} ->
    match lhs with PatSeqTot {pats = ps1} then
      if eqi (length ps2) (length ps1) then
        let z = zipWith (lam p1. lam p2. (p1,p2)) ps1 ps2 in
        optionFoldlM (lam fpEnv. lam ps : (Pat, Pat).
          match fpEnv with (f,p) then
            eqPat env f p ps.0 ps.1
          else never)
          (free,patEnv) z
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

