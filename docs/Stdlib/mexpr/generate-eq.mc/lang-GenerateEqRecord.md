import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateEqRecord  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getEqFunction" kind="sem">

```mc
sem _getEqFunction : GenerateEq_GEqEnv -> Ast_Type -> (GenerateEq_GEqEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getEqFunction env =
  | ty & TyRecord x ->
    if mapIsEmpty x.fields then (env, ulam_ "" (ulam_ "" true_)) else

    let lName = nameSym "l" in
    let l = withType ty (nvar_ lName) in
    let rName = nameSym "r" in
    let r = withType ty (nvar_ rName) in

    let genRecElem = lam acc. lam label. lam ty. snoc acc (lam env.
      match getEqFunction env ty with (env, eqF) in
      let label = sidToString label in
      (env, appf2_ eqF (recordproj_ label l) (recordproj_ label r))) in
    let elems = mapFoldWithKey genRecElem [] x.fields in
    match mapAccumL (lam env. lam f. f env) env elems with (env, [first] ++ elems) in

    let f = lam acc. lam elem. if_ elem acc false_ in
    (env, nlam_ lName ty (nlam_ rName ty (foldl f first elems)))
```
</ToggleWrapper>
</DocBlock>

