import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="prettyPrintIdH" kind="sem">

```mc
sem prettyPrintIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```



<ToggleWrapper text="Code..">
```mc
sem prettyPrintIdH info env =
  | TyRecord _ & ty ->
    match mapLookup ty env.pprint with Some id then id
    else newRecordPprintName ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generatePrettyPrintBodyH" kind="sem">

```mc
sem generatePrettyPrintBodyH : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generatePrettyPrintBodyH info env =
  | TyRecord {fields = fields} & ty ->
    recursive let intersperseComma : [Expr] -> [Expr] = lam strExprs.
      match strExprs with [] | [_] then
        strExprs
      else match strExprs with [expr] ++ strExprs then
        concat [expr, _stringLit ", "] (intersperseComma strExprs)
      else never
    in
    let recordId = nameSym "r" in
    let record = _var recordId ty in
    let printSeq =
      match record2tuple fields with Some types then
        let printTupleField = lam count. lam fieldTy.
          match getPrettyPrintExpr info env fieldTy with (_, ppExpr) in
          let key = stringToSid (int2string count) in
          (addi count 1, _apps ppExpr [_recordproj key fieldTy record])
        in
        match mapAccumL printTupleField 0 types with (_, strs) in
        join [[_stringLit "("], intersperseComma strs, [_stringLit ")"]]
      else
        let printRecordField = lam fields. lam sid. lam fieldTy.
          match getPrettyPrintExpr info env fieldTy with (_, ppExpr) in
          let str =
            _apps _concat
              [ _stringLit (concat (sidToString sid) " = ")
              , _apps ppExpr [_recordproj sid fieldTy record] ]
          in
          snoc fields str
        in
        let strs = mapFoldWithKey printRecordField [] fields in
        join [[_stringLit "{"], intersperseComma strs, [_stringLit "}"]]
    in
    let pprint =
      _apps
        (_var (joinName ()) (_tyarrows [_seqTy _stringTy, _stringTy]))
        [seq_ printSeq]
    in
    _lam recordId ty pprint
```
</ToggleWrapper>
</DocBlock>

