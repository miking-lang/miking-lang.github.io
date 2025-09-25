import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkForEachRecordPattern  
  

  
  
  
## Semantics  
  

          <DocBlock title="useRecordFieldsInBody" kind="sem">

```mc
sem useRecordFieldsInBody : Name -> Map SID (Name, FutharkTypeAst_FutType) -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
sem useRecordFieldsInBody (recId : Name) (fieldData : Map SID (Name, FutType)) =
  | FEVar t ->
    if nameEq recId t.ident then
      let fields : Map SID FutExpr =
        mapMapWithKey
          (lam. lam v : (Name, FutType).
            FEVar {ident = v.0, ty = v.1, info = t.info})
          fieldData in
      FERecord {fields = fields, ty = t.ty, info = t.info}
    else FEVar t
  | FEProj ({target = FEVar {ident = id}} & t) ->
    if nameEq recId id then
      match mapLookup t.label fieldData with Some (fieldId, ty) then
        FEVar {ident = fieldId, ty = ty, info = t.info}
      else FEProj {t with target = useRecordFieldsInBody recId fieldData t.target}
    else FEProj {t with target = useRecordFieldsInBody recId fieldData t.target}
  | FERecordUpdate ({rec = FEVar {ident = id}} & t) ->
    if nameEq recId id then
      let fields : Map SID FutExpr =
        mapMapWithKey
          (lam k : SID. lam v : (Name, FutType).
            if eqSID t.key k then useRecordFieldsInBody recId fieldData t.value
            else FEVar {ident = v.0, ty = v.1, info = t.info})
          fieldData in
      FERecord {fields = fields, ty = t.ty, info = t.info}
    else FERecordUpdate {t with rec = useRecordFieldsInBody recId fieldData t.rec}
  | t -> smap_FExpr_FExpr (useRecordFieldsInBody recId fieldData) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="useRecordPatternInForEachExpr" kind="sem">

```mc
sem useRecordPatternInForEachExpr : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
sem useRecordPatternInForEachExpr =
  | FEForEach t ->
    match t.param with (FPNamed {ident = PName patId}, e) then
      let ty = tyFutTm e in
      match ty with FTyRecord {fields = fields} then
        let fieldData : Map SID (Name, FutType) =
          mapMapWithKey
            (lam k : SID. lam ty : FutType.
              (nameSym (concat (nameGetStr patId) (sidToString k)), ty))
            fields in
        let info = infoFutTm e in
        let binds : Map SID FutPat =
          mapMapWithKey
            (lam. lam param : (Name, FutType).
              FPNamed {ident = PName param.0, ty = param.1, info = info})
            fieldData in
        let pat = FPRecord {bindings = binds, ty = ty, info = info} in
        let body = useRecordFieldsInBody patId fieldData t.body in
        FEForEach {{t with param = (pat, e)}
                      with body = body}
      else FEForEach {t with body = useRecordPatternInForEachExpr t.body}
    else FEForEach {t with body = useRecordPatternInForEachExpr t.body}
  | t -> smap_FExpr_FExpr useRecordPatternInForEachExpr t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="useRecordPatternInForEachDecl" kind="sem">

```mc
sem useRecordPatternInForEachDecl : FutharkAst_FutDecl -> FutharkAst_FutDecl
```



<ToggleWrapper text="Code..">
```mc
sem useRecordPatternInForEachDecl =
  | FDeclFun t -> FDeclFun {t with body = useRecordPatternInForEachExpr t.body}
  | t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="useRecordPatternInForEach" kind="sem">

```mc
sem useRecordPatternInForEach : FutharkAst_FutProg -> FutharkAst_FutProg
```



<ToggleWrapper text="Code..">
```mc
sem useRecordPatternInForEach =
  | FProg t -> FProg {t with decls = map useRecordPatternInForEachDecl t.decls}
```
</ToggleWrapper>
</DocBlock>

