import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintExpr" kind="sem">

```mc
sem pprintExpr : Int -> PprintEnv -> FutharkExprAst_FutExpr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintExpr : Int -> PprintEnv -> FutExpr -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintArrayDim" kind="sem">

```mc
sem pprintArrayDim : PprintEnv -> FutharkTypeAst_FutArrayDim -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintArrayDim env =
  | NamedDim id -> futPprintEnvGetStr env id
  | AbsDim n -> (env, int2string n)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintType" kind="sem">

```mc
sem pprintType : Int -> PprintEnv -> FutharkTypeAst_FutType -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintType indent env =
  | FTyUnknown _ -> (env, "")
  | FTyInt t -> (env, pprintIntSize t.sz)
  | FTyFloat t -> (env, pprintFloatSize t.sz)
  | FTyBool _ -> (env, "bool")
  | FTyIdent {ident = ident} -> futPprintEnvGetStr env ident
  | FTyArray {elem = elem, dim = dim} ->
    let pprintDim = lam dim.
      optionMapOrElse (lam. (env, "")) (pprintArrayDim env) dim in
    match pprintDim dim with (env, dimStr) in
    match pprintType indent env elem with (env, elem) in
    (env, join ["[", dimStr, "]", elem])
  | FTyRecord {fields = fields} ->
    let labels = recordOrderedLabels (mapKeys fields) in
    let pprintField = lam env. lam k.
      let ty = mapFindExn k fields in
      match futPprintLabelString env k with (env, str) in
      match pprintType indent env ty with (env, tyStr) in
      (env, join [str, " : ", tyStr])
    in
    match mapAccumL pprintField env labels with (env, fields) in
    (env, join ["{", strJoin "," fields, "}"])
  | FTyProj {target = target, label = label} ->
    match pprintType indent env target with (env, target) in
    match futPprintLabelString env label with (env, label) in
    (env, join [target, ".", label])
  | FTyArrow {from = from, to = to} ->
    match pprintType indent env from with (env, from) in
    match pprintType indent env to with (env, to) in
    (env, join ["(", from, ") -> (", to, ")"])
  | FTyAll {info = info} ->
    errorSingle [info] "Cannot print intermediate TyAll construct"
```
</ToggleWrapper>
</DocBlock>

