import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordEquality  
  

  
  
  
## Semantics  
  

          <DocBlock title="equalityIdH" kind="sem">

```mc
sem equalityIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```



<ToggleWrapper text="Code..">
```mc
sem equalityIdH info env =
  | TyRecord _ & ty ->
    match mapLookup ty env.eq with Some id then id
    else newRecordEqualityName ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateEqualityBodyH" kind="sem">

```mc
sem generateEqualityBodyH : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generateEqualityBodyH info env =
  | TyRecord {fields = fields} & ty ->
    let larg = nameSym "l" in
    let rarg = nameSym "r" in
    let fieldEqual = lam acc. lam fieldSid. lam fieldTy.
      match getEqualityExpr info env fieldTy with (_, eqExpr) in
      let l = _recordproj fieldSid fieldTy (_var larg ty) in
      let r = _recordproj fieldSid fieldTy (_var rarg ty) in
      let cond = _apps eqExpr [l, r] in
      let truePat = PatBool {val = true, ty = _boolTy, info = _utestInfo} in
      _match cond truePat acc _false _boolTy
    in
    let body = mapFoldWithKey fieldEqual _true fields in
    _lam larg ty (_lam rarg ty body)
```
</ToggleWrapper>
</DocBlock>

