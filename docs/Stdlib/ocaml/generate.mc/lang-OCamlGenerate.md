import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="generate" kind="sem">

```mc
sem generate : GenerateEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generate (env : GenerateEnv) =
  | TmSeq {tms = tms} ->
    -- NOTE(vipa, 2021-05-14): Assume that explicit Consts have the same type, since the program wouldn't typecheck otherwise
    let innerGenerate = lam tm.
      let tm = generate env tm in
      match tm with TmConst _ then tm
      else objMagic tm in
    app_
      (objMagic (OTmVarExt {ident = (intrinsicOpSeq "Helpers.of_array")}))
      (OTmArray {tms = map innerGenerate tms})
  | TmRecord t ->
    if mapIsEmpty t.bindings then TmRecord t
    else
      let ty = unwrapType t.ty in
      match ty with TyCon {ident = ident} then
        match mapLookup ident env.constrs with Some (TyRecord {fields = fields} & ty) then
          let fieldTypes = ocamlTypedFields fields in
          match mapLookup fieldTypes env.records with Some id then
            let bindings = mapMap (lam e. objRepr (generate env e)) t.bindings in
            OTmConApp {
              ident = id,
              args = [TmRecord {t with bindings = bindings}]
            }
          else error "Field type lookup failed in generate!"
        else errorSingle [infoTy ty] "env.constrs lookup failed"
      else errorSingle [infoTy ty] "expected TyCon"
  | TmRecordUpdate t & upd->
    recursive let collectNestedUpdates = lam acc. lam rec.
      match rec with TmRecordUpdate t then
        collectNestedUpdates
          (cons (t.key, objRepr (generate env t.value)) acc)
          t.rec
      else (acc, rec)
    in
    let f = lam update.
      match update with (key, value) in
      let id = nameSym "_value" in
      (nulet_ id value, (key, id))
    in
    match collectNestedUpdates [] upd with (updateEntries, rec) in
    let ty = unwrapType t.ty in
    match ty with TyCon {ident = ident} then
      match mapLookup ident env.constrs with Some (TyRecord {fields = fields}) then
        let fieldTypes = ocamlTypedFields fields in
        match mapLookup fieldTypes env.records with Some id then
          let rec = objMagic (generate env rec) in
          let inlineRecordName = nameSym "rec" in
          -- NOTE(larshum, 2022-12-21): To ensure record updates are evaluated
          -- in declaration order, we add bindings for each of the inner values.
          match unzip (map f updateEntries) with (binds, updates) in
          let combinedUpdate = OTmConApp {
            ident = id,
            args = [ OTmRecordUpdate {
              rec = nvar_ inlineRecordName,
              updates = map (lam u. match u with (sid, id) in (sid, nvar_ id)) updates
            } ]
          } in
          let thn = bindall_ binds combinedUpdate in
          _omatch_ rec
            [(OPatCon {ident = id, args = [npvar_ inlineRecordName]}, thn)]
        else
          let msg = join ["No record type could be found in the environment. ",
                          "This was caused by an error in the type-lifting."] in
          errorSingle [t.info] msg
      else
        let msg = join ["Record update was annotated with an invalid type."] in
        errorSingle [t.info] msg
    else
      let msg = join ["Expected type to be a TyCon. ",
                      "This was caused by an error in the type-lifting."] in
      errorSingle [t.info] msg
  | TmConApp t ->
    -- TODO(vipa, 2021-05-11): can env.constrs contain a non-resolved alias? If so this breaks.
    match mapLookup t.ident env.constrs with Some (TyRecord {fields = fields}) then
      -- NOTE(vipa, 2021-05-11): Constructor that takes explicit record, it should be inlined
      if mapIsEmpty fields then
        -- NOTE(vipa, 2021-05-12): Unit record, the OCaml constructor takes 0 arguments
        let value = OTmConApp { ident = t.ident, args = [] } in
        match t.body with TmRecord _ then
          value
        else
          semi_ (generate env t.body) value
      else
        -- NOTE(vipa, 2021-05-12): Non-unit record, the OCaml constructor takes a record with 1 or more fields
        match t.body with TmRecord r then
          -- NOTE(vipa, 2021-05-11): We have an explicit record, use it directly
          OTmConApp {
            ident = t.ident,
            args = [TmRecord {r with bindings = mapMap (lam e. objRepr (generate env e)) r.bindings}]
          }
        else
          -- NOTE(vipa, 2021-05-11): Not an explicit record, pattern match and reconstruct it
          let fieldTypes = ocamlTypedFields fields in
          match mapLookup fieldTypes env.records with Some id then
            let inlineRecordName = nameSym "rec" in
            let fieldNames =
              mapMapWithKey (lam sid. lam. nameSym (sidToString sid)) fields
            in
            let fieldPatterns = mapMap (lam n. npvar_ n) fieldNames in
            let pat = OPatRecord {bindings = fieldPatterns} in
            let reconstructedRecord = TmRecord {
              bindings = mapMap (lam n. nvar_ n) fieldNames,
              ty = tyTm t.body,
              info = infoTm t.body
            } in
            _omatch_ (objMagic (generate env t.body))
              [ ( OPatCon {ident = id, args = [pat]}
                , OTmConApp {ident = t.ident, args = [reconstructedRecord]}
                )
              ]
        else
          let msg = join ["No record type could be found in the environment. ",
                          "This was caused by an error in the type-lifting."] in
          errorSingle [t.info] msg
    else
      -- NOTE(vipa, 2021-05-11): Argument is not an explicit record, it should be \\`repr\\`ed
      OTmConApp {
        ident = t.ident,
        args = [objRepr (generate env t.body)]
      }
  | TmApp (t & {lhs = lhs & !(TmApp _), rhs = rhs}) ->
  -- NOTE(vipa, 2021-05-17): Putting \\`magic\\` around the function in a
  -- function chain makes all the other types flexible, the arguments
  -- can be any type, and the result type can be any type, it's thus
  -- very economical
    TmApp {{t with lhs = objMagic (generate env lhs)}
           with rhs = generate env rhs}
  | TmNever t ->
    let msg = "Reached a never term, which should be impossible in a well-typed program." in
    TmApp {
      lhs = OTmVarExt {ident = "failwith"},
      rhs = OTmString {text = escapeString (infoErrorString t.info msg)},
      ty = t.ty,
      info = NoInfo ()
    }
  -- TmExt Generation
  | TmDecl {decl = DeclExt {ident = ident, tyIdent = tyIdent}, inexpr = inexpr, info = info} ->
    match convertExternalBody env ident tyIdent info with body in
    let inexpr = generate env inexpr in
    TmDecl {
      decl = DeclLet {
        ident = ident,
        tyAnnot = tyIdent,
        tyBody = tyIdent,
        body = body,
        info = info
      },
      inexpr = inexpr,
      ty = TyUnknown {info = info},
      info = info
    }
  | t -> smap_Expr_Expr (generate env) t
```
</ToggleWrapper>
</DocBlock>

