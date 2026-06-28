import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqDeclH" kind="sem">

```mc
sem eqDeclH : EqEnv -> EqEnv -> Ast_Decl -> Ast_Decl -> Option (EqEnv, EqEnv)
```



<ToggleWrapper text="Code..">
```mc
sem eqDeclH (env : EqEnv) (free : EqEnv) (lhs : Decl) =
  | DeclUtest {test = t2, expected = e2, tusing = u2, tonfail = o2} ->
    match lhs with
      DeclUtest {test = t1, expected = e1, tusing = u1, tonfail = o1}
    then
      match eqExprH env free t1 t2 with Some free then
        match eqExprH env free e1 e2 with Some free then
          match (u1, u2) with (Some tu1, Some tu2) then
            match eqExprH env free tu1 tu2 with Some free then
              match (o1, o2) with (Some to1, Some to2) then
                match eqExprH env free to1 to2 with Some free then
                  Some (env, free)
                else None ()
              else
                match (o1, o2) with (None (), None ()) then
                  Some (env, free)
                else None ()
            else None ()
          else
            match (u1, u2) with (None (), None ()) then
              match (o1, o2) with (Some to1, Some to2) then
                match eqExprH env free to1 to2 with Some free then
                  Some (env, free)
                else None ()
              else
                match (o1, o2) with (None (), None ()) then
                  Some (env, free)
                else None ()
            else None ()
        else None ()
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

