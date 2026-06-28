import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# json.mc  
  

Compliant with the specification from  
https://www.json.org/json\-en.html  
Only divergence from the spec is the distinction between floats and integers

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/either.mc"} style={S.link}>either.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/tensor.mc"} style={S.link}>tensor.mc</a>, <a href={"/docs/Stdlib/math.mc"} style={S.link}>math.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>  
  
## Types  
  

          <DocBlock title="JsonValue" kind="type">

```mc
type JsonValue
```



<ToggleWrapper text="Code..">
```mc
type JsonValue
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="JsonObject" kind="con">

```mc
con JsonObject : Map String JsonValue -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
con JsonObject: Map String JsonValue -> JsonValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="JsonArray" kind="con">

```mc
con JsonArray : [JsonValue] -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
con JsonArray: [JsonValue] -> JsonValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="JsonString" kind="con">

```mc
con JsonString : String -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
con JsonString: String -> JsonValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="JsonFloat" kind="con">

```mc
con JsonFloat : Float -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
con JsonFloat: Float -> JsonValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="JsonInt" kind="con">

```mc
con JsonInt : Int -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
con JsonInt: Int -> JsonValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="JsonBool" kind="con">

```mc
con JsonBool : Bool -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
con JsonBool: Bool -> JsonValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="JsonNull" kind="con">

```mc
con JsonNull : () -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
con JsonNull: () -> JsonValue
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="printJsonLn" kind="let">

```mc
let printJsonLn v : JsonValue -> ()
```



<ToggleWrapper text="Code..">
```mc
let printJsonLn : JsonValue -> () = lam v.
  _printJson v;
  printLn ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonErrorString" kind="let">

```mc
let _jsonErrorString pos msg : Int -> String -> String
```



<ToggleWrapper text="Code..">
```mc
let _jsonErrorString: Int -> String -> String =
    lam pos. lam msg.
    join ["Error at position ", int2string pos, ": ", msg]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonError" kind="let">

```mc
let _jsonError pos msg : Int -> String -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonError: Int -> String -> Either (JsonValue, String, Int) String =
    lam pos. lam msg.
    Right (_jsonErrorString pos msg)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonEatWhitespace" kind="let">

```mc
let _jsonEatWhitespace s pos : String -> Int -> (String, Int)
```

<Description>{`Eats whitespaces starting from the provided index`}</Description>


<ToggleWrapper text="Code..">
```mc
let _jsonEatWhitespace: String -> Int -> (String, Int) =
    lam s. lam pos.
    match s with [' ' | '\n' | '\r' | '\t'] ++ ws then
      _jsonEatWhitespace ws (addi pos 1)
    else
      (s, pos)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonEatInt" kind="let">

```mc
let _jsonEatInt acc s pos : String -> String -> Int -> (String, String, Int)
```



<ToggleWrapper text="Code..">
```mc
let _jsonEatInt: [Char] -> String -> Int -> (String, String, Int) =
    lam acc. lam s. lam pos.
    match s with [c] ++ ws then
      if and (geqChar c '0') (leqChar c '9') then
        _jsonEatInt (snoc acc c) ws (addi pos 1)
      else
        (acc, s, pos)
    else
      (acc, s, pos)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParse" kind="let">

```mc
let _jsonParse s pos : String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParse: String -> Int -> Either (JsonValue, String, Int) String =
    lam s. lam pos.
    match _jsonEatWhitespace s pos with (s, pos) in
    switch s
    case ['{'] ++ ws then
      _jsonParseObject ws (addi pos 1)
    case ['['] ++ ws then
      _jsonParseArray ws (addi pos 1)
    case ['\"'] ++ ws then
      _jsonParseString [] ws (addi pos 1)
    case ['-'] ++ ws then
      _jsonParseNegativeNumber ws (addi pos 1)
    case ['0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'] ++ _ then
      _jsonParseNumber s pos
    case "true" ++ ws then
      Left (JsonBool true, ws, addi pos 4)
    case "false" ++ ws then
      Left (JsonBool false, ws, addi pos 5)
    case "null" ++ ws then
      Left (JsonNull (), ws, addi pos 4)
    case _ then
      _jsonError pos "Invalid start to a JSON value."
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParseObject" kind="let">

```mc
let _jsonParseObject s pos : String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParseObject: String -> Int -> Either (JsonValue, String, Int) String =
    lam s. lam pos.
    match _jsonEatWhitespace s pos with (s, pos) in
    let acc = mapEmpty cmpString in
    match s with ['}'] ++ ws then
      Left (JsonObject acc, ws, addi pos 1)
    else
      _jsonParseObjectContents acc s pos
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParseObjectContents" kind="let">

```mc
let _jsonParseObjectContents acc s pos : Map String JsonValue -> String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParseObjectContents: Map String JsonValue -> String -> Int -> Either (JsonValue, String, Int) String =
    lam acc. lam s. lam pos.
    match _jsonEatWhitespace s pos with (s, pos) in
    switch _jsonParse s pos
    case Left (JsonString key, s, pos) then
      match _jsonEatWhitespace s pos with (s, pos) in
      match s with [':'] ++ ws then
        match _jsonEatWhitespace ws (addi pos 1) with (s, pos) in
        switch _jsonParse s pos
        case Left (value, s, pos) then
          let acc = mapInsert key value acc in
          match _jsonEatWhitespace s pos with (s, pos) in
          match s with [','] ++ ws then
            _jsonParseObjectContents acc ws (addi pos 1)
          else match s with ['}'] ++ ws then
            Left (JsonObject acc, ws, addi pos 1)
          else
            _jsonError pos "Expected comma or closing bracket for JSON object."
        case Right err then
          Right err
        end
      else
        _jsonError pos "Expected colon after property key."
    case Left _ then
      _jsonError pos "Expected string as property key."
    case Right err then
      Right err
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParseArray" kind="let">

```mc
let _jsonParseArray s pos : String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParseArray: String -> Int -> Either (JsonValue, String, Int) String =
    lam s. lam pos.
    match _jsonEatWhitespace s pos with (s, pos) in
    match s with [']'] ++ ws then
      Left (JsonArray [], ws, addi pos 1)
    else
      _jsonParseArrayContents [] s pos
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParseArrayContents" kind="let">

```mc
let _jsonParseArrayContents acc s pos : [JsonValue] -> String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParseArrayContents: [JsonValue] -> String -> Int -> Either (JsonValue, String, Int) String =
    lam acc. lam s. lam pos.
    match _jsonEatWhitespace s pos with (s, pos) in
    let result = _jsonParse s pos in
    switch result
    case Left (value, s, pos) then
      let acc = snoc acc value in
      match _jsonEatWhitespace s pos with (s, pos) in
      match s with [','] ++ ws then
        _jsonParseArrayContents acc ws (addi pos 1)
      else match s with [']'] ++ ws then
        Left (JsonArray acc, ws, addi pos 1)
      else
        _jsonError pos "Expected comma or closing bracket of JSON array."
    case Right err then
      Right err
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParseString" kind="let">

```mc
let _jsonParseString acc s pos : String -> String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParseString: [Char] -> String -> Int -> Either (JsonValue, String, Int) String =
    lam acc. lam s. lam pos.
    match s with ['\\', c] ++ ws then
      -- NOTE(johnwikman, 2022-05-13): Might look wierd to match at two
      -- characters at the same time, but since we know that the following
      -- character cannot terminate a string, we will anyways get an error if s
      -- was just the singleton string ['\\']
      switch c
      case '\"' then _jsonParseString (snoc acc ('\"')) ws (addi pos 2)
      case '\\' then _jsonParseString (snoc acc ('\\')) ws (addi pos 2)
      case '/'  then _jsonParseString (snoc acc ('/')) ws (addi pos 2)
      case 'b'  then _jsonParseString (snoc acc (int2char 8)) ws (addi pos 2)
      case 'f'  then _jsonParseString (snoc acc (int2char 12)) ws (addi pos 2)
      case 'n'  then _jsonParseString (snoc acc ('\n')) ws (addi pos 2)
      case 'r'  then _jsonParseString (snoc acc ('\r')) ws (addi pos 2)
      case 't'  then _jsonParseString (snoc acc ('\t')) ws (addi pos 2)
      case 'u' then
        match ws with [h3, h2, h1, h0] ++ ws then
          let hex2int: Char -> Option Int = lam hc.
            if and (geqChar hc '0') (leqChar hc '9') then
              Some (subi (char2int hc) (char2int '0'))
            else if and (geqChar hc 'A') (leqChar hc 'F') then
              Some (addi (subi (char2int hc) (char2int 'A')) 10)
            else if and (geqChar hc 'a') (leqChar hc 'f') then
              Some (addi (subi (char2int hc) (char2int 'a')) 10)
            else
              None ()
          in
          let conv = foldl (lam acc: Option Int. lam hc.
            match acc with Some accv then
              match hex2int hc with Some hv then
                Some (addi (muli accv 16) hv)
              else None ()
            else None ()
          ) (Some 0) [h3, h2, h1, h0] in
          match conv with Some v then
            _jsonParseString (snoc acc (int2char v)) ws (addi pos 6)
          else
            _jsonError (addi pos 2) "Expected 4 hexadecimal characters"
        else
          _jsonError (addi pos 2) "Expected 4 hexadecimal characters"
      case _ then
        _jsonError (addi pos 1) (join [
          "Invalid escape char \'", [c], "\' (decimal value: ",
          int2string (char2int c), ")"
        ])
      end
    else match s with ['\"'] ++ ws then
      Left (JsonString acc, ws, addi pos 1)
    else match s with [c] ++ ws then
      _jsonParseString (snoc acc c) ws (addi pos 1)
    else
      _jsonError pos "Non-terminated string."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParseNegativeNumber" kind="let">

```mc
let _jsonParseNegativeNumber s pos : String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParseNegativeNumber: String -> Int -> Either (JsonValue, String, Int) String =
    lam s. lam pos.
    let num = _jsonParseNumber s pos in
    switch num
    case Left (JsonInt i, s, pos) then
      Left (JsonInt (negi i), s, pos)
    case Left (JsonFloat f, s, pos) then
      Left (JsonFloat (negf f), s, pos)
    case Left _ then
      _jsonError pos "Internal error, did not get a number back."
    case Right err then
      Right err
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParseNumber" kind="let">

```mc
let _jsonParseNumber s pos : String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParseNumber: String -> Int -> Either (JsonValue, String, Int) String =
    lam s. lam pos.
    match s with ['0'] ++ ws then
      _jsonParseNumberDecimals "0" ws (addi pos 1)
    else match s with [c & ('1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9')] ++ ws then
      match _jsonEatInt [c] ws (addi pos 1) with (intStr, ws, pos) in
      _jsonParseNumberDecimals intStr ws pos
    else
      _jsonError pos "Expected a number."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParseNumberDecimals" kind="let">

```mc
let _jsonParseNumberDecimals intStr s pos : String -> String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParseNumberDecimals: String -> String -> Int -> Either (JsonValue, String, Int) String =
    lam intStr. lam s. lam pos.
    match s with ['.'] ++ ws then
      match _jsonEatInt [] ws (addi pos 1) with (decimals, ws, pos) in
      if null decimals then
        _jsonError pos "Expected decimals after dot in a number."
      else
        _jsonParseNumberExponent intStr decimals ws pos
    else match s with ['e'|'E'] ++ _ then
      _jsonParseNumberExponent intStr "0" s pos
    else
      Left (JsonInt (string2int intStr), s, pos)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_jsonParseNumberExponent" kind="let">

```mc
let _jsonParseNumberExponent intStr decimals s pos : String -> String -> String -> Int -> Either (JsonValue, String, Int) String
```



<ToggleWrapper text="Code..">
```mc
let _jsonParseNumberExponent: String -> String -> String -> Int -> Either (JsonValue, String, Int) String =
    lam intStr. lam decimals. lam s. lam pos.
    match s with ['e'|'E'] ++ ws then
      match ws with [c & ('+'|'-')] ++ ws then
        match _jsonEatInt [] ws (addi pos 2) with (exponent, ws, pos) in
        if null exponent then
          _jsonError pos "Expected exponent digits."
        else
          let floatStr = join [intStr, ".", decimals, "e", [c], exponent] in
          Left (JsonFloat (string2float floatStr), ws, pos)
      else
        match _jsonEatInt [] ws (addi pos 1) with (exponent, ws, pos) in
        if null exponent then
          _jsonError pos "Expected exponent digits."
        else
          let floatStr = join [intStr, ".", decimals, "e", exponent] in
          Left (JsonFloat (string2float floatStr), ws, pos)
    else
      let floatStr = join [intStr, ".", decimals] in
      Left (JsonFloat (string2float floatStr), s, pos)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonParse" kind="let">

```mc
let jsonParse s : String -> Either JsonValue String
```

<Description>{`Parses a JSON string, returning a \`Left JsonValue\` if the parsing was  
successful. Returns a \`Right String\` with an error message if the formatting  
was incorrect.`}</Description>


<ToggleWrapper text="Code..">
```mc
let jsonParse: String -> Either JsonValue String = lam s.
  let result = _jsonParse s 0 in
  switch result
  case Left (value, s, pos) then
    match _jsonEatWhitespace s pos with (s, pos) in
    if null s then
      Left value
    else
      Right (_jsonErrorString pos "Trailing JSON content.")
  case Right err then
    Right err
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonParseExn" kind="let">

```mc
let jsonParseExn s : String -> JsonValue
```

<Description>{`Parse JSON string, but exit on error.`}</Description>


<ToggleWrapper text="Code..">
```mc
let jsonParseExn: String -> JsonValue = lam s.
  let result = jsonParse s in
  switch result
  case Left value then value
  case Right errmsg then error errmsg
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="" kind="recursive">

```mc
recursive 
```

<Description>{`Convert JSON value to its minimal string representation  
TODO\(johnwikman, 2022\-05\-13\): A pprint version with indentation and linebreaks`}</Description>


<ToggleWrapper text="Code..">
```mc
recursive let json2string: JsonValue -> String = lam value.
  switch value
  case JsonObject properties then
    let proplist = mapFoldWithKey (lam acc. lam k. lam v.
      snoc acc (join [json2string (JsonString k), ":", json2string v])
    ) [] properties in
    cons '{' (snoc (strJoin "," proplist) '}')
  case JsonArray values then
    cons '[' (snoc (strJoin "," (map json2string values)) ']')
  case JsonString s then
    let escape: [Char] -> Char -> String = lam acc. lam c.
      let cval: Int = char2int c in
      if eqi cval 8 then
        concat acc "\\b"
      else if eqi cval 12 then
        concat acc "\\f"
      else if or (lti cval 32) (eqi cval 127) then
        let tohex: Int -> Char = lam x.
          if lti x 10 then
            int2char (addi x (char2int '0'))
          else
            int2char (addi (subi x 10) (char2int 'a'))
        in
        concat acc ['\\', 'u', '0', '0', tohex (divi cval 16), tohex (modi cval 16)]
      else
        switch c
        case '\"' then concat acc "\\\""
        case '\\' then concat acc "\\\\"
        case '/' then concat acc "\\/"
        case '\n' then concat acc "\\n"
        case '\r' then concat acc "\\r"
        case '\t' then concat acc "\\t"
        case _ then
          -- NOTE(johnwikman, 2022-05-13): Ignoring the upper bound on JSON
          -- character size here.
          snoc acc c
        end
    in
    (snoc (foldl escape "\"" s) '\"')
  case JsonFloat f then
    if neqf f f then
      "{\"__float__\": \"nan\"}"
    else if eqf f inf then
      "{\"__float__\": \"inf\"}"
    else if eqf f (negf inf) then
      "{\"__float__\": \"-inf\"}"
    else
      -- NOTE(vsenderov, 2023-09-14): Need to append/prepend 0 to conform to the
      -- JSON standard.  What is the situation in locales that don't use a dot
      -- to delimit decimals?
      let str = float2string f in
      switch str
          case _ ++ "." then snoc str '0'
          case "." ++ _ then cons '0' str
          case _ then str
      end

  case JsonInt i then
    int2string i
  case JsonBool b then
    if b then "true" else "false"
  case JsonNull () then
    "null"
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonSerializeBool" kind="let">

```mc
let jsonSerializeBool b : Bool -> JsonValue
```

<Description>{`JSON Serialization and deserialization functions for builtin MExpr data  
types`}</Description>


<ToggleWrapper text="Code..">
```mc
let jsonSerializeBool: Bool -> JsonValue = lam b. JsonBool b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeBool" kind="let">

```mc
let jsonDeserializeBool jb : JsonValue -> Option Bool
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeBool: JsonValue -> Option Bool = lam jb.
  match jb with JsonBool b then Some b else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonSerializeInt" kind="let">

```mc
let jsonSerializeInt i : Int -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
let jsonSerializeInt: Int -> JsonValue = lam i. JsonInt i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeInt" kind="let">

```mc
let jsonDeserializeInt ji : JsonValue -> Option Int
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeInt: JsonValue -> Option Int = lam ji.
  match ji with JsonInt i then Some i else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonSerializeFloat" kind="let">

```mc
let jsonSerializeFloat f : Float -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
let jsonSerializeFloat: Float -> JsonValue = lam f. JsonFloat f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeFloat" kind="let">

```mc
let jsonDeserializeFloat jf : JsonValue -> Option Float
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeFloat: JsonValue -> Option Float = lam jf.
  match jf with JsonFloat f then Some f else
  match jf with JsonInt i then Some (int2float i) else
  None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonSerializeChar" kind="let">

```mc
let jsonSerializeChar c : Char -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
let jsonSerializeChar: Char -> JsonValue = lam c. JsonString [c]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeChar" kind="let">

```mc
let jsonDeserializeChar jc : JsonValue -> Option Char
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeChar: JsonValue -> Option Char = lam jc.
  match jc with JsonString [c] then Some c else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonSerializeString" kind="let">

```mc
let jsonSerializeString s : String -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
let jsonSerializeString: String -> JsonValue = lam s. JsonString s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeString" kind="let">

```mc
let jsonDeserializeString js : JsonValue -> Option String
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeString: JsonValue -> Option String = lam js.
  match js with JsonString s then Some s else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonSerializeSeq" kind="let">

```mc
let jsonSerializeSeq f seq : all a. (a -> JsonValue) -> [a] -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
let jsonSerializeSeq: all a. (a -> JsonValue) -> [a] -> JsonValue =
  lam f. lam seq. JsonArray (map f seq)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeSeq" kind="let">

```mc
let jsonDeserializeSeq f jseq : all a. (JsonValue -> Option a) -> JsonValue -> Option [a]
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeSeq: all a. (JsonValue -> Option a) -> JsonValue -> Option [a] =
  lam f. lam jseq.
    match jseq with JsonArray jv then optionMapM f jv else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="keyTensorShape" kind="let">

```mc
let keyTensorShape  : String
```



<ToggleWrapper text="Code..">
```mc
let keyTensorShape = "__tensorShape__"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="keyTensor" kind="let">

```mc
let keyTensor  : String
```



<ToggleWrapper text="Code..">
```mc
let keyTensor = "__tensor__"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonSerializeTensor" kind="let">

```mc
let jsonSerializeTensor f tensor : all a. (a -> JsonValue) -> Tensor[a] -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
let jsonSerializeTensor: all a. (a -> JsonValue) -> Tensor[a] -> JsonValue =
  lam f. lam tensor.
    let shape = tensorShape tensor in
    let jshape = jsonSerializeSeq jsonSerializeInt shape in
    let n = foldl muli 1 shape in
    let seq = create n (lam i. tensorLinearGetExn tensor i) in
    let jseq = jsonSerializeSeq f seq in
    JsonObject (mapFromSeq cmpString [
      (keyTensorShape,jshape),
      (keyTensor,jseq)
    ])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeTensor" kind="let">

```mc
let jsonDeserializeTensor tcreate f jtensor : all a. ([Int] -> ([Int] -> a) -> Tensor[a]) -> (JsonValue -> Option a) -> JsonValue -> Option Tensor[a]
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeTensor: all a.
  ([Int] -> ([Int] -> a) -> Tensor[a]) ->
  (JsonValue -> Option a) ->
  JsonValue -> Option Tensor[a] =
    lam tcreate. lam f. lam jtensor.
      match jtensor with JsonObject m then
        match mapLookup keyTensorShape m with Some jshape then
          match mapLookup keyTensor m with Some jseq then
            match jsonDeserializeSeq jsonDeserializeInt jshape with Some shape then
              match jsonDeserializeSeq f jseq with Some seq then
                Some (tensorOfSeqExn tcreate shape seq)
              else None ()
            else None ()
          else None ()
        else None ()
      else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeTensorCArrayInt" kind="let">

```mc
let jsonDeserializeTensorCArrayInt  : (JsonValue -> Option Int) -> JsonValue -> Option Tensor[Int]
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeTensorCArrayInt:
    (JsonValue -> Option Int) -> JsonValue -> Option Tensor[Int] =
  jsonDeserializeTensor tensorCreateCArrayInt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeTensorCArrayFloat" kind="let">

```mc
let jsonDeserializeTensorCArrayFloat  : (JsonValue -> Option Float) -> JsonValue -> Option Tensor[Float]
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeTensorCArrayFloat:
    (JsonValue -> Option Float) -> JsonValue -> Option Tensor[Float] =
  jsonDeserializeTensor tensorCreateCArrayFloat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jsonDeserializeTensorDense" kind="let">

```mc
let jsonDeserializeTensorDense a1 : all a. (JsonValue -> Option a) -> JsonValue -> Option Tensor[a]
```



<ToggleWrapper text="Code..">
```mc
let jsonDeserializeTensorDense:
    all a. (JsonValue -> Option a) -> JsonValue -> Option Tensor[a] =
  -- NOTE(2023-09-30,dlunde): We need an eta expansion here due to value
  -- restriction.
  lam a1. jsonDeserializeTensor tensorCreateDense a1
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

utest jsonParse "123.45" with Left (JsonFloat 123.45) using eitherEq jsonEq eqString in
utest json2string (JsonFloat 123.45) with "123.45" in

utest jsonParse "-1e-5" with Left (JsonFloat (negf 1e-5)) using eitherEq jsonEq eqString in
utest json2string (JsonFloat (negf 1e-5)) with "-1e-05" in

utest jsonParse "1.0" with Left (JsonFloat 1.) using eitherEq jsonEq eqString in
utest json2string (JsonFloat 1.) with "1.0" in

utest jsonParse "0.25" with Left (JsonFloat 0.25) using eitherEq jsonEq eqString in
utest json2string (JsonFloat 0.25) with "0.25" in

utest json2string (JsonFloat nan) with "{\"__float__\": \"nan\"}" in
utest json2string (JsonFloat inf) with "{\"__float__\": \"inf\"}" in
utest json2string (JsonFloat (negf inf)) with "{\"__float__\": \"-inf\"}" in

utest jsonParse "1233" with Left (JsonInt 1233) using eitherEq jsonEq eqString in
utest json2string (JsonInt 1233) with "1233" in

utest jsonParse "-1233" with Left (JsonInt (negi 1233)) using eitherEq jsonEq eqString in
utest json2string (JsonInt (negi 1233)) with "-1233" in

utest jsonParse "\"foo\\u0020bar\"" with Left (JsonString "foo bar") using eitherEq jsonEq eqString in
utest json2string (JsonString "foo bar") with "\"foo bar\"" in

utest jsonParse "true" with Left (JsonBool true) using eitherEq jsonEq eqString in
utest json2string (JsonBool true) with "true" in

utest jsonParse "false" with Left (JsonBool false) using eitherEq jsonEq eqString in
utest json2string (JsonBool false) with "false" in

utest jsonParse "null" with Left (JsonNull ()) using eitherEq jsonEq eqString in
utest json2string (JsonNull ()) with "null" in

utest jsonParse "{}" with Left (JsonObject (mapEmpty cmpString)) using eitherEq jsonEq eqString in
utest json2string (JsonObject (mapEmpty cmpString)) with "{}" in

utest jsonParse "[]" with Left (JsonArray []) using eitherEq jsonEq eqString  in
utest json2string (JsonArray []) with "[]" in

utest jsonParse "{ \t\n}" with Left (JsonObject (mapEmpty cmpString)) using eitherEq jsonEq eqString in
utest jsonParse "[ \n\t]" with Left (JsonArray []) using eitherEq jsonEq eqString in


utest jsonParse "{\"list\":[{},{}]}" with Left (JsonObject (mapFromSeq cmpString [("list", JsonArray [JsonObject (mapEmpty cmpString), JsonObject (mapEmpty cmpString)])])) using eitherEq jsonEq eqString in
utest json2string (JsonObject (mapFromSeq cmpString [("list", JsonArray [JsonObject (mapEmpty cmpString), JsonObject (mapEmpty cmpString)])])) with "{\"list\":[{},{}]}" in
utest jsonParse "[{\n}\n,[\n{\t}]\n]" with Left (JsonArray [JsonObject (mapEmpty cmpString), JsonArray [JsonObject (mapEmpty cmpString)]]) using eitherEq jsonEq eqString in
utest json2string (JsonArray [JsonObject (mapEmpty cmpString), JsonArray [JsonObject (mapEmpty cmpString)]]) with "[{},[{}]]" in

utest jsonParse " [5, \"a\\nb\"]\t" with Left (JsonArray [JsonInt 5, JsonString "a\nb"]) using eitherEq jsonEq eqString in

utest jsonParse "{\"mystr\" : foo}" with Right "Error at position 11: Invalid start to a JSON value." using eitherEq jsonEq eqString in

let myJsonObject =
  JsonObject (mapFromSeq cmpString
             [ ("mylist", JsonArray [JsonObject (mapEmpty cmpString), JsonInt 2, JsonFloat 3e-2])
             , ("mystr", JsonString "foo")
             , ("mybool", JsonBool true)
             , ("mynull", JsonNull ())
             ])
in

utest jsonParse "{\"mylist\" : [{},2,3e-2], \"mystr\" : \n\"foo\", \"mybool\" :\ttrue, \"mynull\":null}"
with Left myJsonObject using eitherEq jsonEq eqString in

utest json2string myJsonObject
with "{\"mystr\":\"foo\",\"mybool\":true,\"mylist\":[{},2,0.03],\"mynull\":null}" in

utest jsonParse (json2string myJsonObject) with Left myJsonObject using eitherEq jsonEq eqString in

let myOtherJsonObject =
  JsonObject (mapFromSeq cmpString
             [ ("mylist", JsonArray [JsonObject (mapFromSeq cmpString [
                                       ("f1", JsonFloat 1.0),
                                       ("f2", JsonFloat (negf 1.0))
                                     ]),
                                     JsonInt 2,
                                     JsonFloat 5e-1])
             , ("mystr", JsonString "foo")
             , ("mybool", JsonBool true)
             , ("mynull", JsonNull ())
             ])
in

utest jsonParse "    {\t\t\t
  \"mylist\":
  [   {
\"f1\": 1.0,
\"f2\": -1.0         }
    , 2 ,    5e-1     ]   , \"mystr\" : \n   \"foo\"
  , \"mybool\" \t:\ttrue,
   \"mynull\":
   null}"
with Left myOtherJsonObject using eitherEq jsonEq eqString in

-- Tests for JSON serializers and deserializers

utest jsonSerializeBool false with JsonBool false using jsonEq in
utest jsonDeserializeBool (JsonBool false) with Some false in
utest jsonDeserializeBool (JsonNull ()) with None () in

utest jsonSerializeInt 1 with JsonInt 1 using jsonEq in
utest jsonDeserializeInt (JsonInt 1) with Some 1 in
utest jsonDeserializeInt (JsonNull ()) with None () in

utest jsonSerializeFloat 1. with JsonFloat 1. using jsonEq in
utest jsonDeserializeFloat (JsonFloat 1.) with Some 1. in
utest jsonDeserializeFloat (JsonNull ()) with None () in

utest jsonSerializeChar 'c' with JsonString "c" using jsonEq in
utest jsonDeserializeChar (JsonString "c") with Some 'c' in
utest jsonDeserializeChar (JsonNull ()) with None () in

utest jsonSerializeString "str" with JsonString "str" using jsonEq in
utest jsonDeserializeString (JsonString "str") with Some "str" in
utest jsonDeserializeString (JsonNull ()) with None () in

utest jsonSerializeSeq jsonSerializeBool [false, true]
with JsonArray [JsonBool false, JsonBool true]
using jsonEq in
utest jsonDeserializeSeq jsonDeserializeBool (JsonArray [JsonBool false, JsonBool true])
with Some [false, true] in
utest jsonDeserializeSeq jsonDeserializeBool (JsonArray [JsonInt 1, JsonBool true])
with None () in

-- Int tensors
let tensor = (tensorOfSeqExn tensorCreateCArrayInt [3,3]
                [1,2,3,
                 4,5,6,
                 7,8,9]) in
let jtensor = JsonObject (mapFromSeq cmpString [
                (keyTensorShape, JsonArray [JsonInt 3, JsonInt 3]),
                (keyTensor, JsonArray [JsonInt 1, JsonInt 2, JsonInt 3,
                                       JsonInt 4, JsonInt 5, JsonInt 6,
                                       JsonInt 7, JsonInt 8, JsonInt 9])
              ]) in
utest jsonSerializeTensor jsonSerializeInt tensor with jtensor using jsonEq in
utest jsonDeserializeTensorCArrayInt jsonDeserializeInt jtensor
with Some tensor in

-- Float tensors
let tensor = (tensorOfSeqExn tensorCreateCArrayFloat [3,3]
                [1.,2.,3.,
                 4.,5.,6.,
                 7.,8.,9.]) in
let jtensor = JsonObject (mapFromSeq cmpString [
                (keyTensorShape, JsonArray [JsonInt 3, JsonInt 3]),
                (keyTensor, JsonArray [JsonFloat 1., JsonFloat 2., JsonFloat 3.,
                                       JsonFloat 4., JsonFloat 5., JsonFloat 6.,
                                       JsonFloat 7., JsonFloat 8., JsonFloat 9.])
              ]) in
utest jsonDeserializeTensorCArrayFloat jsonDeserializeFloat jtensor
with Some tensor in

-- General tensors
let tensor = (tensorOfSeqExn tensorCreateDense [3,3]
                ["1","2","3",
                 "4","5","6",
                 "7","8","9"]) in
let jtensor = JsonObject (mapFromSeq cmpString [
                (keyTensorShape, JsonArray [JsonInt 3, JsonInt 3]),
                (keyTensor, JsonArray [JsonString "1", JsonString "2", JsonString "3",
                                       JsonString "4", JsonString "5", JsonString "6",
                                       JsonString "7", JsonString "8", JsonString "9"])
              ]) in
utest jsonDeserializeTensorDense jsonDeserializeString jtensor
with Some tensor in

()
```
</ToggleWrapper>
</DocBlock>

