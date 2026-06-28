import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CollectBranches  
  

  
  
  
## Semantics  
  

          <DocBlock title="collectBranches" kind="sem">

```mc
sem collectBranches : Ast_Expr -> Option (Either Ast_Expr Name, [(Ast_Pat, Ast_Expr)], Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectBranches =
  | t & TmMatch (x & {target = TmVar v}) ->
    let scrutinee = v.ident in
    recursive let work = lam acc. lam t.
      match t with TmMatch (x & {target = TmVar v}) then
        if nameEq scrutinee v.ident then
          work (snoc acc (x.pat, x.thn)) x.els
        else (acc, t)
      else (acc, t)
    in
    match work [] t with (branches, fallthrough) in
    let alreadyShallow =
      if geqi (length branches) 2 then false else
      match x.pat with PatAnd _ | PatOr _ | PatNot _ then false else
      let isWild = lam acc. lam sub.
        match (acc, sub) with (true, PatNamed _) then true else false in
      sfold_Pat_Pat isWild true x.pat in
    if alreadyShallow
    then None ()
    else Some (Right scrutinee, branches, fallthrough)
  | TmMatch (t & {target = !TmVar _}) ->
    Some (Left t.target, [(t.pat, t.thn)], t.els)
  | _ -> None ()
```
</ToggleWrapper>
</DocBlock>

