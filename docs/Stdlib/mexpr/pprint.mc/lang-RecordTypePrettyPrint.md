import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env: PprintEnv) =
  | (TyRecord t) & ty ->
    if mapIsEmpty t.fields then (env,"()") else
      let orderedFields = tyRecordOrderedFields ty in
      let tuple =
        let seq = map (lam b : (SID,Type). (sidToString b.0, b.1)) orderedFields in
        if forAll (lam t : (String,Type). stringIsInt t.0) seq then
          let seq = map (lam t : (String,Type). (string2int t.0, t.1)) seq in
          let seq : [(Int,Type)] = sort (lam l : (Int,Type). lam r : (Int,Type). subi l.0 r.0) seq in
          let fst = lam x: (Int, Type). x.0 in
          let first = fst (head seq) in
          let last = fst (last seq) in
          if eqi first 0 then
            if eqi last (subi (length seq) 1) then
              Some (map (lam t : (Int,Type). t.1) seq)
            else None ()
          else None ()
        else None ()
      in
      match tuple with Some tuple then
        match mapAccumL (getTypeStringCode indent) env tuple with (env, tuple) in
        let singletonComma = match tuple with [_] then "," else "" in
        (env, join ["(", strJoin ", " tuple, singletonComma, ")"])
      else
        let f = lam env. lam field.
          match field with (sid, ty) in
          match getTypeStringCode indent env ty with (env, tyStr) in
          (env, (sid, tyStr))
        in
        match mapAccumL f env orderedFields with (env, fields) in
        let fields =
          map (lam b : (SID,String). (pprintLabelString b.0, b.1)) fields in
        let conventry = lam entry : (String,String). join [entry.0, ": ", entry.1] in
        (env,join ["{", strJoin ", " (map conventry fields), "}"])
```
</ToggleWrapper>
</DocBlock>

