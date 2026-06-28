import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# toml-ext.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>  
  
## Types  
  

          <DocBlock title="TomlTable" kind="type">

```mc
type TomlTable
```



<ToggleWrapper text="Code..">
```mc
type TomlTable
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TomlValue" kind="type">

```mc
type TomlValue
```



<ToggleWrapper text="Code..">
```mc
type TomlValue

------------------
-- READING TOML --
------------------

-- 'tomlFromString str' parses 'str' into a toml table.
external externalTomlFromStringExn ! : String -> TomlTable
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="tomlFromStringExn" kind="let">

```mc
let tomlFromStringExn str : String -> TomlTable
```



<ToggleWrapper text="Code..">
```mc
let tomlFromStringExn = lam str. externalTomlFromStringExn str
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlFromStringExn "key=1"; () with ()

-- 'tomlFindExn key table' returns the value bound to 'key' in 'table'.
external externalTomlFindExn ! : String -> TomlTable -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlFindExn" kind="let">

```mc
let tomlFindExn str table : String -> TomlTable -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlFindExn = lam str. lam table. externalTomlFindExn str table
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlFindExn "key" (tomlFromStringExn "key=1"); () with ()

-- 'tomlBindings table' returns the bindings of 'table'.
external externalTomlBindings ! : TomlTable -> [(String, TomlValue)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlBindings" kind="let">

```mc
let tomlBindings table : TomlTable -> [(String, TomlValue)]
```



<ToggleWrapper text="Code..">
```mc
let tomlBindings = lam table. externalTomlBindings table
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let binds = tomlBindings (tomlFromStringExn "intval=1\nstringval=\"abc\"") in
  let keys = map (lam b : (String, TomlValue). b.0) binds in
  keys
with ["intval", "stringval"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlTableToMap" kind="let">

```mc
let tomlTableToMap table : TomlTable -> Map String TomlValue
```

<Description>{`'tomlBindings table' converts 'table' into a map.`}</Description>


<ToggleWrapper text="Code..">
```mc
let tomlTableToMap : TomlTable -> Map String TomlValue = lam table.
  mapFromSeq cmpString (tomlBindings table)

-- 'tomlValueToString v' converts a toml value to a string, regardless of the
-- type of the value.
external externalTomlValueToString ! : TomlValue -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToString" kind="let">

```mc
let tomlValueToString v : TomlValue -> String
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToString = lam v. externalTomlValueToString v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let t = tomlFromStringExn
  "
  key1=1
  key2=3.14
  key3=[3.14,4.1]
  key4=\"value\"
  key5=[[]]
  "
  in
  map (lam b : (String, TomlValue). tomlValueToString b.1) (tomlBindings t)
with ["1", "3.14", "[3.14, 4.1]", "\"value\"","[[]]"]

-- 'tomlValueToIntExn v' converts a toml value to an integer.
external externalTomlValueToIntExn ! : TomlValue -> Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToIntExn" kind="let">

```mc
let tomlValueToIntExn v : TomlValue -> Int
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToIntExn = lam v. externalTomlValueToIntExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlValueToIntExn (tomlFindExn "key" (tomlFromStringExn "key=1")) with 1

-- 'tomlValueToStringExn v' converts a toml value to a string.
external externalTomlValueToStringExn ! : TomlValue -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToStringExn" kind="let">

```mc
let tomlValueToStringExn v : TomlValue -> String
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToStringExn = lam v. externalTomlValueToStringExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlValueToStringExn (tomlFindExn "key" (tomlFromStringExn "key=\"value\"")) with "value"

-- 'tomlValueToFloatExn v' converts a toml value to a float.
external externalTomlValueToFloatExn ! : TomlValue -> Float
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToFloatExn" kind="let">

```mc
let tomlValueToFloatExn v : TomlValue -> Float
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToFloatExn = lam v. externalTomlValueToFloatExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlValueToFloatExn (tomlFindExn "key" (tomlFromStringExn "key=3.14")) with 3.14

-- 'tomlValueToBoolExn v' converts a toml value to a bool.
external externalTomlValueToBoolExn ! : TomlValue -> Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToBoolExn" kind="let">

```mc
let tomlValueToBoolExn v : TomlValue -> Bool
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToBoolExn = lam v. externalTomlValueToBoolExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlValueToBoolExn (tomlFindExn "key" (tomlFromStringExn "key=true")) with true

-- 'tomlValueToTableExn v' converts a toml value to a toml table.
external externalTomlValueToTableExn ! : TomlValue -> TomlTable
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToTableExn" kind="let">

```mc
let tomlValueToTableExn v : TomlValue -> TomlTable
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToTableExn = lam v. externalTomlValueToTableExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let t1 = tomlFromStringExn
  "
  [key]
  subkey=1
  "
  in
  let t2 = tomlValueToTableExn (tomlFindExn "key" t1) in
  tomlValueToIntExn (tomlFindExn "subkey" t2)
with 1

-- 'tomlValueToIntSeqExn v' converts a toml value to an integer sequence.
external externalTomlValueToIntSeqExn ! : TomlValue -> [Int]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToIntSeqExn" kind="let">

```mc
let tomlValueToIntSeqExn v : TomlValue -> [Int]
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToIntSeqExn = lam v. externalTomlValueToIntSeqExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlValueToIntSeqExn (tomlFindExn "key" (tomlFromStringExn "key=[1,2,3]")) with [1,2,3]
utest tomlValueToIntSeqExn (tomlFindExn "key" (tomlFromStringExn "key=[]")) with []

-- 'tomlValueToStringSeqExn v' converts a toml value to a string sequence.
external externalTomlValueToStringSeqExn ! : TomlValue -> [String]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToStringSeqExn" kind="let">

```mc
let tomlValueToStringSeqExn v : TomlValue -> [String]
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToStringSeqExn = lam v. externalTomlValueToStringSeqExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlValueToStringSeqExn (tomlFindExn "key" (tomlFromStringExn "key=[\"foo\", \"bar\"]")) with ["foo", "bar"]
utest tomlValueToStringSeqExn (tomlFindExn "key" (tomlFromStringExn "key=[]")) with []

-- 'tomlValueToFloatSeqExn v' converts a toml value to a float sequence.
external externalTomlValueToFloatSeqExn ! : TomlValue -> [Float]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToFloatSeqExn" kind="let">

```mc
let tomlValueToFloatSeqExn v : TomlValue -> [Float]
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToFloatSeqExn = lam v. externalTomlValueToFloatSeqExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlValueToFloatSeqExn (tomlFindExn "key" (tomlFromStringExn "key=[3.14,1e1]")) with [3.14,1e1]
utest tomlValueToFloatSeqExn (tomlFindExn "key" (tomlFromStringExn "key=[]")) with []

-- 'tomlValueToTableSeqExn v' converts a toml value to a sequence of toml
-- tables.
external externalTomlValueToTableSeqExn ! : TomlValue -> [TomlTable]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToTableSeqExn" kind="let">

```mc
let tomlValueToTableSeqExn v : TomlValue -> [TomlTable]
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToTableSeqExn = lam v. externalTomlValueToTableSeqExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let t1 = tomlFromStringExn
  "
  [[fruit]]
  name = \"apple\"

  [[fruit]]
  name = \"orange\"
  "
  in
  let t2 : [TomlTable] = tomlValueToTableSeqExn (tomlFindExn "fruit" t1) in
  let vals = map (lam t. tomlFindExn "name" t) t2 in
  map tomlValueToStringExn vals
with ["apple", "orange"]

utest
  let t = tomlFromStringExn "[[fruit]]" in
  tomlValueToTableSeqExn (tomlFindExn "fruit" t)
with []

-- 'tomlValueToSeqSeqExn v' converts a toml value to a sequence of sequence of
-- toml values.
external externalTomlValueToSeqSeqExn ! : TomlValue -> [TomlValue]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlValueToSeqSeqExn" kind="let">

```mc
let tomlValueToSeqSeqExn v : TomlValue -> [TomlValue]
```



<ToggleWrapper text="Code..">
```mc
let tomlValueToSeqSeqExn = lam v. externalTomlValueToSeqSeqExn v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let t1 = tomlFromStringExn
  "
  seq_of_seq = [[1,2],[3]]
  "
  in
  let t2 : [TomlValue] = tomlValueToSeqSeqExn (tomlFindExn "seq_of_seq" t1) in
  map tomlValueToIntSeqExn t2
with [[1,2],[3]]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_strEqNoWhitespace" kind="let">

```mc
let _strEqNoWhitespace s1 s2 : String -> String -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _strEqNoWhitespace = lam s1. lam s2.
  let s1 = filter (lam c. not (isWhitespace c)) s1 in
  let s2 = filter (lam c. not (isWhitespace c)) s2 in
  eqString s1 s2

-- 'tomlToString table' converts 'table' into a string.
external externalTomlToString ! : TomlTable -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlToString" kind="let">

```mc
let tomlToString table : TomlTable -> String
```



<ToggleWrapper text="Code..">
```mc
let tomlToString = lam table. externalTomlToString table
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlToString (tomlFromStringExn "key=1") with "key=1" using _strEqNoWhitespace

-- 'tomlFromBindings binds' converts 'binds' to a table.
external externalTomlFromBindings ! : [(String, TomlValue)] -> TomlTable
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlFromBindings" kind="let">

```mc
let tomlFromBindings binds : [(String, TomlValue)] -> TomlTable
```



<ToggleWrapper text="Code..">
```mc
let tomlFromBindings = lam binds. externalTomlFromBindings binds

-- 'tomlIntToValue v' converts an integer to a toml value.
external externalTomlIntToValue ! : Int -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlIntToValue" kind="let">

```mc
let tomlIntToValue v : Int -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlIntToValue = lam v. externalTomlIntToValue v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlToString (tomlFromBindings [("key", tomlIntToValue 1)]) with "key=1" using _strEqNoWhitespace

-- 'tomlStringToValue v' converts a string to a toml value.
external externalTomlStringToValue ! : String -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlStringToValue" kind="let">

```mc
let tomlStringToValue s : String -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlStringToValue = lam s. externalTomlStringToValue s
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlToString (tomlFromBindings [("key", tomlStringToValue "42")]) with "key=\"42\"" using _strEqNoWhitespace

-- 'tomlFloatToValue v' converts a float to a toml value.
external externalTomlFloatToValue ! : Float -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlFloatToValue" kind="let">

```mc
let tomlFloatToValue v : Float -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlFloatToValue = lam v. externalTomlFloatToValue v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlToString (tomlFromBindings [("key", tomlFloatToValue 3.14)]) with "key=3.14" using _strEqNoWhitespace

-- 'tomlTableToValue v' converts a toml table to a toml value.
external externalTomlTableToValue ! : TomlTable -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlTableToValue" kind="let">

```mc
let tomlTableToValue v : TomlTable -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlTableToValue = lam v. externalTomlTableToValue v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let t1 = tomlFromBindings [("subkey", tomlIntToValue 1)] in
  let t2 = tomlFromBindings [("key", tomlTableToValue t1)] in
  tomlToString t2
with
"
[key]
subkey=1
"
using _strEqNoWhitespace

-- 'tomlIntSeqToValue v' converts an integer to a toml value.
external externalTomlIntSeqToValue ! : [Int] -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlIntSeqToValue" kind="let">

```mc
let tomlIntSeqToValue v : [Int] -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlIntSeqToValue = lam v. externalTomlIntSeqToValue v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlToString (tomlFromBindings [("key", tomlIntSeqToValue [1,2,3])]) with "key=[1,2,3]" using _strEqNoWhitespace
utest tomlToString (tomlFromBindings [("key", tomlIntSeqToValue [])]) with "key=[]" using _strEqNoWhitespace

-- 'tomlStringSeqToValue v' converts a string to a toml value.
external externalTomlStringSeqToValue ! : [String] -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlStringSeqToValue" kind="let">

```mc
let tomlStringSeqToValue s : [String] -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlStringSeqToValue = lam s. externalTomlStringSeqToValue s
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlToString (tomlFromBindings [("key", tomlStringSeqToValue ["42","43"])]) with "key=[\"42\", \"43\"]" using _strEqNoWhitespace

-- 'tomlFloatSeqToValue v' converts a float to a toml value.
external externalTomlFloatSeqToValue ! : [Float] -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlFloatSeqToValue" kind="let">

```mc
let tomlFloatSeqToValue v : [Float] -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlFloatSeqToValue = lam v. externalTomlFloatSeqToValue v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest tomlToString (tomlFromBindings [("key", tomlFloatSeqToValue [3.14])]) with "key=[3.14]" using _strEqNoWhitespace

-- 'tomlTableSeqToValue v' converts a sequence of toml tables to a toml value.
external externalTomlTableSeqToValue ! : [TomlTable] -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlTableSeqToValue" kind="let">

```mc
let tomlTableSeqToValue v : [TomlTable] -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlTableSeqToValue = lam v. externalTomlTableSeqToValue v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
 let t1 = tomlFromBindings [("name", tomlStringToValue "apple")] in
 let t2 = tomlFromBindings [("name", tomlStringToValue "orange")] in
 let t3 = tomlFromBindings [("fruit", tomlTableSeqToValue [t1, t2])] in
 tomlToString t3
with
"
[[fruit]]
name = \"apple\"

[[fruit]]
name = \"orange\"
"
using _strEqNoWhitespace

-- 'tomlSeqSeqToValue v' converts a sequence of toml values to a toml value
external externalTomlSeqSeqToValue ! : [TomlValue] -> TomlValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tomlSeqSeqToValue" kind="let">

```mc
let tomlSeqSeqToValue v : [TomlValue] -> TomlValue
```



<ToggleWrapper text="Code..">
```mc
let tomlSeqSeqToValue = lam v. externalTomlSeqSeqToValue v
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let t = tomlFromBindings
    [("key", tomlSeqSeqToValue [tomlIntSeqToValue [1,2], tomlIntSeqToValue [3]])] in
  tomlToString t
with "key=[[1,2],[3]]" using _strEqNoWhitespace
```
</ToggleWrapper>
</DocBlock>

