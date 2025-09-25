import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateJsonSerializers  
  

  
  
  
## Types  
  

          <DocBlock title="GJSSerializer" kind="type">

```mc
type GJSSerializer : { serializer: Expr, deserializer: Expr }
```



<ToggleWrapper text="Code..">
```mc
type GJSSerializer = {
    serializer: Expr,
    deserializer: Expr
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GJSRes" kind="type">

```mc
type GJSRes : Map Type GJSSerializer
```



<ToggleWrapper text="Code..">
```mc
type GJSRes = Map Type GJSSerializer
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GJSNamedSerializer" kind="type">

```mc
type GJSNamedSerializer : { serializerName: Name, serializer: Option Expr, deserializerName: Name, deserializer: Option Expr }
```



<ToggleWrapper text="Code..">
```mc
type GJSNamedSerializer = {
    serializerName: Name, serializer: Option Expr,
    deserializerName: Name, deserializer: Option Expr
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GJSAcc" kind="type">

```mc
type GJSAcc : Map Name GJSNamedSerializer
```



<ToggleWrapper text="Code..">
```mc
type GJSAcc = Map Name GJSNamedSerializer -- The keys are only names of TyCon
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GJSEnv" kind="type">

```mc
type GJSEnv : { namedTypes: Map Name { params: [Name], tyIdent: Type }, constructors: Map Name [{ ident: Name, tyIdent: Type }], lib: Expr, varEnv: Map Name GJSSerializer, sBool: Name, dBool: Name, sInt: Name, dInt: Name, sFloat: Name, dFloat: Name, sChar: Name, dChar: Name, sString: Name, dString: Name, sSeq: Name, dSeq: Name, sTensor: Name, dTensorInt: Name, dTensorFloat: Name, dTensorDense: Name, jsonObject: Name, jsonString: Name, mapInsert: Name, mapEmpty: Name, mapLookup: Name, cmpString: Name, some: Name, none: Name }
```



<ToggleWrapper text="Code..">
```mc
type GJSEnv = {

    -- Information from the given program
    namedTypes: Map Name {params : [Name], tyIdent : Type},
    constructors: Map Name [{ident : Name, tyIdent : Type}],

    -- Required libraries for the generation
    lib: Expr,

    -- Type variables currently bound
    varEnv: Map Name GJSSerializer,

    -- For easy access to lib names
    sBool: Name, dBool: Name, sInt: Name, dInt: Name,
    sFloat: Name, dFloat: Name, sChar: Name, dChar: Name,
    sString: Name, dString: Name, sSeq: Name, dSeq: Name,
    sTensor: Name, dTensorInt: Name, dTensorFloat: Name, dTensorDense: Name,
    jsonObject: Name, jsonString: Name,
    mapInsert: Name, mapEmpty: Name, mapLookup: Name,
    cmpString: Name,
    some: Name, none: Name

  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="addJsonSerializers" kind="sem">

```mc
sem addJsonSerializers : [Ast_Type] -> Ast_Expr -> (GenerateJsonSerializers_GJSRes, Ast_Expr, GenerateJsonSerializers_GJSEnv)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addJsonSerializers tys =
  | expr ->
    match generateJsonSerializers tys expr with (acc, res, env) in
    let lib = env.lib in
    let eta = lam expr.
      match expr with TmLam _ then expr
      else let n = nameSym "x" in nulam_ n (app_ expr (nvar_ n))
    in
    let bs = join (map (lam s.
        [(s.serializerName,
          match s.serializer with Some s then eta s else error "Empty serializer"),
         (s.deserializerName,
          match s.deserializer with Some d then eta d else error "Empty deserializer")])
      (mapValues acc))
    in
    let rl = nureclets_ bs in
    never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateJsonSerializers" kind="sem">

```mc
sem generateJsonSerializers : [Ast_Type] -> Ast_Expr -> (GenerateJsonSerializers_GJSAcc, GenerateJsonSerializers_GJSRes, GenerateJsonSerializers_GJSEnv)
```

<Description>{`Generate JSON serializers and deserializers. Returns an accumulator of  
generated functions and a map from types to serializers/deserializersNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateJsonSerializers tys =
  | expr ->
    let lib = _lib () in
    match findNamesOfStringsExn [
        "jsonSerializeBool", "jsonDeserializeBool",
        "jsonSerializeInt", "jsonDeserializeInt",
        "jsonSerializeFloat", "jsonDeserializeFloat",
        "jsonSerializeChar", "jsonDeserializeChar",
        "jsonSerializeString", "jsonDeserializeString",
        "jsonSerializeSeq", "jsonDeserializeSeq",
        "jsonSerializeTensor",
        "jsonDeserializeTensorCArrayInt","jsonDeserializeTensorCArrayFloat",
        "jsonDeserializeTensorDense",
        "JsonObject", "JsonString",
        "mapInsert", "mapEmpty", "mapLookup",
        "cmpString",
        "Some", "None"
      ] lib with [
        sb, db,
        si, di,
        sf, df,
        sc, dc,
        ss, ds,
        ssq, dsq,
        st, dti, dtf, dtd,
        jo, js,
        mi,me,ml,
        cs,
        s,n
      ] in
    let env: GJSEnv = {
      namedTypes = mapEmpty nameCmp, constructors = mapEmpty nameCmp,
      lib = lib,
      varEnv = mapEmpty nameCmp,
      sBool = sb, dBool = db, sInt = si, dInt = di,
      sFloat = sf, dFloat = df, sChar = sc, dChar = dc,
      sString = ss, dString = ds, sSeq = ssq, dSeq = dsq,
      sTensor = st, dTensorInt = dti, dTensorFloat = dtf, dTensorDense = dtd,
      jsonObject = jo, jsonString = js,
      mapInsert = mi, mapEmpty = me, mapLookup = ml,
      cmpString = cs,
      some = s, none = n
    } in
    let env: GJSEnv = foldPre_Expr_Expr _addType env expr in
    let acc: GJSAcc = mapEmpty nameCmp in
    let r: (GJSAcc, GJSRes) =
      foldl (lam t. lam ty.
          match _generateType env t.0 ty with (acc,s) in
          (acc, mapInsert ty s t.1)
        ) (acc, mapEmpty cmpType) tys
    in
    (r.0, r.1, env)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addType" kind="sem">

```mc
sem _addType : GenerateJsonSerializers_GJSEnv -> Ast_Expr -> GenerateJsonSerializers_GJSEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _addType env =
  | TmDecl {decl = DeclType r} & t ->
    { env with namedTypes = mapInsert r.ident {params = r.params, tyIdent = r.tyIdent} env.namedTypes }
  | TmDecl {decl = DeclConDef r} & t ->
    match getConDefType r.tyIdent with TyCon c then
      { env with constructors = mapInsertWith concat c.ident [{ident = r.ident, tyIdent = r.tyIdent}] env.constructors }
    else error "Not a TyCon at RHS of TmConDef type"
  | _ -> env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateType" kind="sem">

```mc
sem _generateType : GenerateJsonSerializers_GJSEnv -> GenerateJsonSerializers_GJSAcc -> Ast_Type -> (GenerateJsonSerializers_GJSAcc, GenerateJsonSerializers_GJSSerializer)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateType env acc =

  -- Basic types
  | TyBool _ ->
    let s = { serializer = nvar_ env.sBool, deserializer = nvar_ env.dBool } in
    (acc, s)
  | TyInt _ ->
    let s = { serializer = nvar_ env.sInt, deserializer = nvar_ env.dInt } in
    (acc, s)
  | TyFloat _ ->
    let s = { serializer = nvar_ env.sFloat, deserializer = nvar_ env.dFloat } in
    (acc, s)
  | TyChar _ ->
    let s = { serializer = nvar_ env.sChar, deserializer = nvar_ env.dChar } in
    (acc, s)
  | TySeq { ty = TyChar _ } ->
    let s = { serializer = nvar_ env.sString, deserializer = nvar_ env.dString } in
    (acc, s)

  -- Builtin type constructors
  | TySeq { ty = ! TyChar _ & tyi } & ty->
    match _generateType env acc tyi with (acc, si) in
    let serializer = appf1_ (nvar_ env.sSeq) si.serializer in
    let deserializer = appf1_ (nvar_ env.dSeq) si.deserializer in
    let s = { serializer = serializer, deserializer = deserializer } in
    (acc, s)
  | TyTensor { ty = tyi } & ty ->
    match _generateType env acc tyi with (acc, si) in
    let serializer = appf1_ (nvar_ env.sTensor) si.serializer in
    let dTensor =
      switch tyi
      case TyInt _ then env.dTensorInt
      case TyFloat _ then env.dTensorFloat
      case _ then env.dTensorDense
      end
    in
    let deserializer = appf1_ (nvar_ dTensor) si.deserializer in
    let s = { serializer = serializer, deserializer = deserializer } in
    (acc, s)

  -- Records
  | TyRecord t ->
    match mapMapAccum (lam acc. lam k. _generateType env acc) acc t.fields
    with (acc,iss) in
    let sarg = nameSym "r" in
    let m = nameSym "m" in
    let serializer =
      nulam_ sarg (
        (nconapp_ env.jsonObject
          (mapFoldWithKey (lam acc. lam k. lam s.
               let k = sidToString k in
               (appf3_ (nvar_ env.mapInsert)
                  (str_ k)
                  (app_ s.serializer (recordproj_ k (nvar_ sarg)))
                  acc))
             (app_ (nvar_ env.mapEmpty) (nvar_ env.cmpString)) iss)))
    in
    let darg = nameSym "jr" in
    let m = nameSym "m" in
    let iss = mapMap (lam s. (s,nameSym "rv")) iss in
    let inner = nconapp_ env.some
      (urecord_ (map (lam t. (sidToString t.0, (nvar_ (t.1).1))) (mapToSeq iss))) in
    let none = nconapp_ env.none unit_ in
    let deserializer =
      nulam_ darg (
          match_
            (nvar_ darg)
            (npcon_ env.jsonObject (npvar_ m))
            (mapFoldWithKey (lam acc. lam k. lam v.
                let k = sidToString k in
                let jrv = nameSym "jrv" in
                match_
                  (appf2_ (nvar_ env.mapLookup) (str_ k) (nvar_ m))
                  (npcon_ env.some (npvar_ jrv))
                  (match_
                    (app_ (v.0).deserializer (nvar_ jrv))
                    (npcon_ env.some (npvar_ v.1))
                    acc
                    none)
                  none)
              inner iss)
            none)
    in
    let s = { serializer = serializer, deserializer = deserializer } in
    (acc, s)

  | TyVar t ->
    match mapLookup t.ident env.varEnv with Some s then (acc,s)
    else error (join ["Type variable not found in environment: ", nameGetStr t.ident])
  | TyCon t ->
    match mapLookup t.ident acc with Some s then
      (acc, { serializer = nvar_ s.serializerName,
              deserializer = nvar_ s.deserializerName })
    else
      match mapLookup t.ident env.namedTypes with Some tt then

        -- Variant type case
        match tt.tyIdent with TyVariant _ then
          match mapLookup t.ident env.constructors with Some tmConDefs then
            let pss =
              map (lam p. { sf = nameSym "sf", df = nameSym "df" }) tt.params
            in
            let serializerName = nameSym (join ["serialize", nameGetStr t.ident]) in
            let deserializerName = nameSym (join ["deserialize", nameGetStr t.ident]) in
            let acc = mapInsert t.ident {
                serializerName = serializerName,
                deserializerName = deserializerName,
                serializer = None (),
                deserializer = None ()
              } acc
            in
            match mapAccumL (lam acc. lam tcd.
                match stripTyAll tcd.tyIdent with (tyalls,tyIdent) in
                let varEnv = foldl2 (lam varEnv. lam ta. lam ps.
                    match ta with (n,_) in
                    mapInsert n { serializer = nvar_ ps.sf,
                                  deserializer = nvar_ ps.df } varEnv
                  ) env.varEnv tyalls pss in
                let env = { env with varEnv = varEnv } in
                match tyIdent with TyArrow t then
                  match _generateType env acc t.from with (acc, s) in
                  (acc, { name = tcd.ident, p = nameSym "d", s = s })
                else error "Not an arrow type in TmConDef"
              ) acc tmConDefs
            with (acc, conDefs) in
            let sarg = nameSym "c" in
            let serializer = nulams_ (map (lam ps. ps.sf) pss) (
                nulam_ sarg (
                  foldl (lam acc. lam cd.
                    match_
                      (nvar_ sarg)
                      (npcon_ cd.name (npvar_ cd.p))
                      (nconapp_ env.jsonObject
                        (appf3_ (nvar_ env.mapInsert)
                           (str_ constructorKey)
                           (nconapp_ env.jsonString (str_ (nameGetStr cd.name)))
                           (appf3_ (nvar_ env.mapInsert)
                              (str_ dataKey)
                              (app_ (cd.s).serializer (nvar_ cd.p))
                              (app_ (nvar_ env.mapEmpty) (nvar_ env.cmpString)))))
                      acc) never_ conDefs
                ))
            in
            let darg = nameSym "jc" in
            let none = nconapp_ env.none unit_ in
            let mv = nameSym "m" in
            let cv = nameSym "con" in
            let deserializer = nulams_ (map (lam ps. ps.df) pss) (
                nulam_ darg (
                  match_
                    (nvar_ darg)
                    (npcon_ env.jsonObject (npvar_ mv))
                    (match_
                      (appf2_ (nvar_ env.mapLookup) (str_ constructorKey) (nvar_ mv))
                      (npcon_ env.some (npcon_ env.jsonString (npvar_ cv)))
                      (foldl (lam acc. lam cd.
                         match_
                           (nvar_ cv)
                           (pstr_ (nameGetStr cd.name))
                           (let dv = nameSym "data" in
                            match_
                              (appf2_ (nvar_ env.mapLookup) (str_ dataKey) (nvar_ mv))
                              (npcon_ env.some (npvar_ dv))
                              (let d = nameSym "d" in
                               match_
                                 (app_ (cd.s).deserializer (nvar_ dv))
                                 (npcon_ env.some (npvar_ d))
                                 (nconapp_ env.some (nconapp_ cd.name (nvar_ d)))
                                 none)
                               none)
                           acc) none conDefs)
                      none)
                    none))
            in
            let acc = mapInsert t.ident {
                serializerName = serializerName,
                serializer = Some serializer,
                deserializerName = deserializerName,
                deserializer = Some deserializer
              } acc in
            let s = { serializer = nvar_ serializerName,
                      deserializer = nvar_ deserializerName } in
            (acc, s)

          else error (join ["Incorrect variant type: ", nameGetStr t.ident])

        -- Other types (cannot be self-recursive)
        else
          let params = map (lam p. { sf = nameSym "sf", df = nameSym "df", p = p })
                         tt.params in
          let varEnv = foldl (lam env. lam p.
              mapInsert p.p { serializer = nvar_ p.sf, deserializer = nvar_ p.df }
                env
            ) env.varEnv params
          in
          match _generateType {env with varEnv = varEnv } acc tt.tyIdent
          with (acc, si) in
          let serializer = foldl (lam s. lam p. nulam_ p.sf s) si.serializer params in
          let deserializer = foldl (lam d. lam p. nulam_ p.df d) si.deserializer params in
          let acc = mapInsert t.ident {
              serializerName = nameSym (join ["serialize", nameGetStr t.ident]),
              serializer = Some serializer,
              deserializerName = nameSym (join ["deserialize", nameGetStr t.ident]),
              deserializer = Some deserializer
            } acc in
          let s = { serializer = serializer, deserializer = deserializer } in
          (acc, s)

      else error (join ["Unknown type: ", nameGetStr t.ident])

  | TyApp t ->
    match _generateType env acc t.lhs with (acc, sl) in
    match _generateType env acc t.rhs with (acc, sr) in
    let s = { serializer = app_ sl.serializer sr.serializer,
              deserializer = app_ sl.deserializer sr.deserializer } in
    (acc, s)

  | TyAlias x ->
    _generateType env acc x.content

  | ty & ( TyUnknown _ | TyArrow _ | TyAll _ | TyVariant _ ) ->
    error "Not supported when generating JSON serializers"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_lib" kind="sem">

```mc
sem _lib : () -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _lib =
  | _ ->
    let parse = parseMCoreFile {
      defaultBootParserParseMCoreFileArg with
        eliminateDeadCode = false,
        keepUtests = false
    } in
    let ast = parse (join [stdlibLoc, "/", "json.mc"]) in
    symbolize ast
```
</ToggleWrapper>
</DocBlock>

