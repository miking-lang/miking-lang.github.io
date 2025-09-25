import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePprintRecord  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getPprintFunction" kind="sem">

```mc
sem _getPprintFunction : GeneratePprint_GPprintEnv -> Ast_Type -> (GeneratePprint_GPprintEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getPprintFunction env =
  | ty & TyRecord x ->
    if mapIsEmpty x.fields then (env, ulam_ "" (str_ "()")) else

    let recName = nameSym "r" in
    let rec = withType ty (nvar_ recName) in

    let genTupElem = lam i. lam ty. lam env.
      match getPprintFunction env ty with (env, printF) in
      (env, app_ printF (tupleproj_ i rec)) in
    let genRecElem = lam acc. lam label. lam ty. snoc acc (lam env.
      match getPprintFunction env ty with (env, printF) in
      let prefix = concat (pprintLabelString label) " = " in
      let label = sidToString label in
      (env, concat_ (str_ prefix) (app_ printF (recordproj_ label rec)))) in
    match
      match record2tuple x.fields with Some tys
      then (true, mapi genTupElem tys)
      else (false, mapFoldWithKey genRecElem [] x.fields)
    with (isTuple, elems) in
    match mapAccumL (lam env. lam f. f env) env elems with (env, rest ++ [last]) in

    let withComma = lam here. lam rest.
      concat_ here (concat_ (str_ ", ") rest) in
    let body = snoc_
      (cons_
        (char_ (if isTuple then '(' else '{'))
        (foldr withComma last rest))
      (char_ (if isTuple then ')' else '}')) in
    (env, nlam_ recName ty body)
```
</ToggleWrapper>
</DocBlock>

