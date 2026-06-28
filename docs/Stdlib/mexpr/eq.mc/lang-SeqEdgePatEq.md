import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqPat" kind="sem">

```mc
sem eqPat : EqEnv -> EqEnv -> BiNameMap -> Ast_Pat -> Ast_Pat -> Option (EqEnv, BiNameMap)
```



<ToggleWrapper text="Code..">
```mc
sem eqPat (env : EqEnv) (free : EqEnv) (patEnv : BiNameMap) (lhs : Pat) =
  | PatSeqEdge {prefix = pre2, middle = mid2, postfix = post2} ->
    match lhs with PatSeqEdge {prefix = pre1, middle = mid1, postfix = post1} then
      match _eqpatname patEnv free mid1 mid2 with Some n then
        match n with (f,p) then
          if eqi (length pre1) (length pre2) then
            let z1 = zipWith (lam p1. lam p2. (p1,p2)) pre1 pre2 in
            let z2 = zipWith (lam p1. lam p2. (p1,p2)) post1 post2 in
            let fl = optionFoldlM (lam fpEnv. lam ps : (Pat, Pat).
              match fpEnv with (f,p) then
                eqPat env f p ps.0 ps.1
              else never)
              (free,patEnv) z1 in
            match fl with Some envs then
              if eqi (length post1) (length post2) then
                optionFoldlM (lam fpEnv. lam ps : (Pat, Pat).
                  match fpEnv with (f,p) then
                    eqPat env f p ps.0 ps.1
                  else never)
                  envs z2
              else None ()
            else None ()
          else None ()
        else never
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

