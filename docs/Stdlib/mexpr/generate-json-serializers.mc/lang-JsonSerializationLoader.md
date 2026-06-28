import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# JsonSerializationLoader  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Hook" kind="syn">

```mc
syn Hook
```



<ToggleWrapper text="Code..">
```mc
syn Hook =
  | JsonSerializationHook
    { gjsAcc : Ref (Map Name GJSNamedSerializer) -- No implementations, only names (implementations have already been inserted in the program)
    , baseEnv : GJSEnv -- Only the library names matter, everything else is populated later
    }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="enableJsonSerialization" kind="sem">

```mc
sem enableJsonSerialization : MCoreLoader_Loader -> MCoreLoader_Loader
```

<Description>{`Makes the given loader capable of generating json serializers and  
deserializers upon requestNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem enableJsonSerialization = | loader ->
    if hasHook (lam x. match x with JsonSerializationHook _ then true else false) loader then loader else

    match includeFileExn "." "stdlib::json.mc" loader with (jsonEnv, loader) in
    match includeFileExn "." "stdlib::map.mc" loader with (mapEnv, loader) in
    match includeFileExn "." "stdlib::string.mc" loader with (stringEnv, loader) in
    match includeFileExn "." "stdlib::basic-types.mc" loader with (optionEnv, loader) in

    let baseEnv =
      let v = lam env. lam str. _getVarExn str env in
      let c = lam env. lam str. _getConExn str env in
      { namedTypes = mapEmpty nameCmp
      , constructors = mapEmpty nameCmp
      , lib = unit_
      , varEnv = mapEmpty nameCmp

      , sBool = v jsonEnv "jsonSerializeBool", dBool = v jsonEnv "jsonDeserializeBool"
      , sInt = v jsonEnv "jsonSerializeInt", dInt = v jsonEnv "jsonDeserializeInt"
      , sFloat = v jsonEnv "jsonSerializeFloat", dFloat = v jsonEnv "jsonDeserializeFloat"
      , sChar = v jsonEnv "jsonSerializeChar", dChar = v jsonEnv "jsonDeserializeChar"

      , sString = v jsonEnv "jsonSerializeString", dString = v jsonEnv "jsonDeserializeString"
      , sSeq = v jsonEnv "jsonSerializeSeq", dSeq = v jsonEnv "jsonDeserializeSeq"

      , sTensor = v jsonEnv "jsonSerializeTensor"
      , dTensorInt = v jsonEnv "jsonDeserializeTensorCArrayInt"
      , dTensorFloat = v jsonEnv "jsonDeserializeTensorCArrayFloat"
      , dTensorDense = v jsonEnv "jsonDeserializeTensorDense"

      , jsonObject = c jsonEnv "JsonObject"
      , jsonString = c jsonEnv "JsonString"

      , mapInsert = v mapEnv "mapInsert"
      , mapEmpty = v mapEnv "mapEmpty"
      , mapLookup = v mapEnv "mapLookup"

      , cmpString = v stringEnv "cmpString"

      , some = c optionEnv "Some", none = c optionEnv "None"
      } in

    let hook = JsonSerializationHook
      { baseEnv = baseEnv
      , gjsAcc = ref (mapEmpty nameCmp)
      } in
    addHook loader hook
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_registerCustomJsonSerializer" kind="sem">

```mc
sem _registerCustomJsonSerializer : Name -> GenerateJsonSerializers_GJSSerializer -> MCoreLoader_Loader -> MCoreLoader_Hook -> Option (MCoreLoader_Loader, ())
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _registerCustomJsonSerializer tyConName pair loader =
  | _ -> None ()
  | JsonSerializationHook hook ->
    match
      match pair.serializer with TmVar x then (loader, x.ident) else
      let serName = nameSym (concat "serialize" (nameGetStr tyConName)) in
      let loader = _addDeclExn loader (nulet_ serName pair.serializer) in
      (loader, serName)
    with (loader, serName) in
    match
      match pair.deserializer with TmVar x then (loader, x.ident) else
      let deserName = nameSym (concat "deserialize" (nameGetStr tyConName)) in
      let loader = _addDeclExn loader (nulet_ deserName pair.deserializer) in
      (loader, deserName)
    with (loader, deserName) in
    let named =
      { serializerName = serName, deserializerName = deserName
      , serializer = None (), deserializer = None ()
      } in
    Some (loader, modref hook.gjsAcc (mapInsert tyConName named (deref hook.gjsAcc)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="registerCustomJsonSerializer" kind="sem">

```mc
sem registerCustomJsonSerializer : Name -> GenerateJsonSerializers_GJSSerializer -> MCoreLoader_Loader -> MCoreLoader_Loader
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem registerCustomJsonSerializer tyConName pair = | loader ->
    (withHookState (_registerCustomJsonSerializer tyConName pair) loader).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_serializationPairsFor" kind="sem">

```mc
sem _serializationPairsFor : [Ast_Type] -> MCoreLoader_Loader -> MCoreLoader_Hook -> Option (MCoreLoader_Loader, [GenerateJsonSerializers_GJSSerializer])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _serializationPairsFor tys loader =
  | _ -> None ()
  | JsonSerializationHook hook ->
    let tcEnv = _getTCEnv loader in
    -- OPT(vipa, 2024-12-13): This reconstruction for each request is
    -- potentially a bit expensive
    let namedTypes = mapMap (lam x. {params = x.1, tyIdent = x.2}) tcEnv.tyConEnv in
    let constructors = mapMap
      (lam cs. mapValues
        (mapIntersectWithKey (lam c. lam. lam x. {ident = c, tyIdent = x.1}) cs tcEnv.conEnv))
      tcEnv.conDeps in
    let env = {hook.baseEnv with namedTypes = namedTypes, constructors = constructors} in
    match mapAccumL (_generateType env) (deref hook.gjsAcc) tys with (gjsAcc, tys) in

    let f = lam bindings. lam. lam namedSer.
      match namedSer with {serializer = Some serializer, deserializer = Some deserializer} then
        let eta = lam tm. match tm with TmLam _
          then tm
          else let n = nameSym "x" in nulam_ n (app_ tm (nvar_ n)) in
        ( concat bindings
          [ (namedSer.serializerName, eta serializer)
          , (namedSer.deserializerName, eta deserializer)
          ]
        , {namedSer with serializer = None (), deserializer = None ()}
        )
      else (bindings, namedSer) in
    match mapMapAccum f [] gjsAcc with (bindings, gjsAcc) in
    modref hook.gjsAcc gjsAcc;
    if null bindings then Some (loader, tys) else
    let decl = nureclets_ bindings in
    Some (_addSymbolizedDeclExn loader decl, tys)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="serializationPairsFor" kind="sem">

```mc
sem serializationPairsFor : [Ast_Type] -> MCoreLoader_Loader -> (MCoreLoader_Loader, [GenerateJsonSerializers_GJSSerializer])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem serializationPairsFor tys = | loader ->
    withHookState (_serializationPairsFor tys) loader
```
</ToggleWrapper>
</DocBlock>

