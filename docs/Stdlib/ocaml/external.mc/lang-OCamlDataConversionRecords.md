import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversionRecords  
  

  
  
  
## Semantics  
  

          <DocBlock title="convertDataInner" kind="sem">

```mc
sem convertDataInner : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem convertDataInner info env t =
  | (OTyRecordExt {fields = fields1} & ty1,
    TyCon {ident = ident} & ty2) ->
    match mapLookup ident env.constrs
    with Some (TyRecord {fields = fields2} & ty) then
      let fields1Labels2 =
        map
          (lam f : { label : String, asLabel : String, ty : Type}.
            match f with {label = label, asLabel = asLabel, ty = ty} in
            ((label, ty), stringToSid asLabel))
          fields1
      in
      match unzip fields1Labels2 with (fields1, labels2) in
      let costsTms =
        zipWith
          (lam l2. lam field : (String, Type).
            match field with (l1, ty1) in
            match mapLookup l2 fields2 with Some ty2 then
              convertData
                info env (OTmProject { field = l1, tm = t }) (ty1, ty2)
            else
              errorSingle [info] (join
                  ["Field \"", sidToString l2, "\" not found in record type"]))
          labels2 fields1
      in
      match unzip costsTms with (costs, tms) in
      let ns = create (length labels2) (lam. nameSym "t") in
      match mapLookup (ocamlTypedFields fields2) env.records
      with Some id then
        let bindings =
          zipWith (lam label. lam t. (label, objRepr t)) labels2 tms
        in
        let record =
          TmRecord {
            bindings = mapFromSeq cmpSID bindings,
            ty = ty2,
            info = info
           }
        in
        let t = OTmConApp { ident = id, args = [record] } in
        let cost = addi _recordConversionCost (foldl1 addi costs) in
        (cost, t)
      else errorSingle [info] "impossible"
    else errorSingle [info] "Cannot convert record"
  | (TyCon {ident = ident} & ty1,
    OTyRecordExt {tyident = tyident, fields = fields2} & ty2) ->
    match mapLookup ident env.constrs
    with Some (TyRecord {fields = fields1} & ty) then
      let fields2Labels1 =
        map
          (lam f : {label : String, asLabel : String, ty : Type}.
            match f with {label = label, asLabel = asLabel, ty = ty} in
            ((label, ty), stringToSid asLabel))
          fields2
      in
      match unzip fields2Labels1 with (fields2, labels1) in
      match mapLookup (ocamlTypedFields fields1) env.records
      with Some id then
        let ns = create (length labels1) (lam. nameSym "r") in
        let pvars =
          map
            (lam n.
              PatNamed {
                ident = PName n,
                info = info,
                ty = tyunknown_
              })
            ns
        in
        let rpat =
          OPatRecord { bindings = mapFromSeq cmpSID (zip labels1 pvars) }
        in
        match unzip fields2 with (labels2, tys2) in
        let costsTms =
          zipWith
            (lam ident : Name. lam x : (SID, Type).
              match x with (l1, ty2) in
              match mapLookup l1 fields1 with Some ty1 then
                let var =
                  TmVar {
                    ident = ident,
                    ty = TyUnknown { info = info },
                    info = info,
                    frozen = false
                  }
                in
                convertData info env (objMagic var) (ty1, ty2)
              else
                errorSingle [info] (join
                    ["Field \"", sidToString l1, "\" not found in record type"]))
            ns (zip labels1 tys2)
        in
        match unzip costsTms with (costs, tms) in
        let rec =
          OTmRecord { bindings = zip labels2 tms, tyident = tyident }
        in
        let cpat = OPatCon { ident = id, args = [rpat] } in
        let t = OTmMatch { target = t, arms = [(cpat, rec)] } in
        (foldl1 addi costs, t)
      else errorSingle [info] "impossible"
    else errorSingle [info] "Cannot convert record"
```
</ToggleWrapper>
</DocBlock>

