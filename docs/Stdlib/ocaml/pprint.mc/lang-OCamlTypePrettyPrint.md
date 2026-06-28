import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlTypePrettyPrint  
  

Pretty\-printing of MExpr types in OCaml. Due to the obj\-wrapping, we do not  
want to specify the type names in general. Record types are printed in a  
different way because their types must be declared at the top of the program  
in order to use them \(e.g. for pattern matching\). As type\-lifting replaces  
all nested record types with type variables, all fields of a record type  
will be printed as Obj.t.

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env : PprintEnv) =
  | (TyRecord t) & ty ->
    if mapIsEmpty t.fields then (env, "Obj.t")
    else
      let orderedFields = tyRecordOrderedFields ty in
      let f = lam env. lam field : (SID, Type).
        match field with (sid, ty) in
        match getTypeStringCode indent env ty with (env,ty) in
        let str = pprintLabelString sid in
        (env, join [str, ": ", ty])
      in
      match mapAccumL f env orderedFields with (env, fields) in
      (env, join ["{", strJoin ";" fields, "}"])
  | OTyVar {ident = ident} -> pprintVarName env ident
  | OTyVarExt {ident = ident, args = []} -> (env, ident)
  | OTyVarExt {ident = ident, args = [arg]} ->
    match getTypeStringCode indent env arg with (env, arg) in
    (env, join [arg, " ", ident])
  | OTyVarExt {ident = ident, args = args} ->
    match mapAccumL (getTypeStringCode indent) env args with (env, args) in
    (env, join ["(", strJoin ", " args, ") ", ident])
  | _ -> (env, "Obj.t")
```
</ToggleWrapper>
</DocBlock>

