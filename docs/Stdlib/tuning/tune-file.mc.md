import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# tune-file.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/tuning/context-expansion.mc"} style={S.link}>context-expansion.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Types  
  

          <DocBlock title="TuneFileFormat" kind="type">

```mc
type TuneFileFormat
```



<ToggleWrapper text="Code..">
```mc
type TuneFileFormat
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="CSV" kind="con">

```mc
con CSV : () -> TuneFileFormat
```



<ToggleWrapper text="Code..">
```mc
con CSV : () -> TuneFileFormat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TOML" kind="con">

```mc
con TOML : () -> TuneFileFormat
```



<ToggleWrapper text="Code..">
```mc
con TOML : () -> TuneFileFormat
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_listOfStrings" kind="let">

```mc
let _listOfStrings strs : [String] -> String
```



<ToggleWrapper text="Code..">
```mc
let _listOfStrings = lam strs.
  join [strJoin ">" strs]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_delim" kind="let">

```mc
let _delim  : String
```



<ToggleWrapper text="Code..">
```mc
let _delim = "\n"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_sepLength" kind="let">

```mc
let _sepLength  : Int
```



<ToggleWrapper text="Code..">
```mc
let _sepLength = 20
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileIndexStr" kind="let">

```mc
let tuneFileIndexStr  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileIndexStr = "index"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileTypeStr" kind="let">

```mc
let tuneFileTypeStr  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileTypeStr = "type"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileValueStr" kind="let">

```mc
let tuneFileValueStr  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileValueStr = "value"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileHoleNameStr" kind="let">

```mc
let tuneFileHoleNameStr  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileHoleNameStr = "hole_name"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileHoleInfoStr" kind="let">

```mc
let tuneFileHoleInfoStr  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileHoleInfoStr = "hole_info"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileFunNameStr" kind="let">

```mc
let tuneFileFunNameStr  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileFunNameStr = "function_name"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileFunInfoStr" kind="let">

```mc
let tuneFileFunInfoStr  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileFunInfoStr = "function_info"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFilePathNameStr" kind="let">

```mc
let tuneFilePathNameStr  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFilePathNameStr = "call_path_functions"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFilePathInfoStr" kind="let">

```mc
let tuneFilePathInfoStr  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFilePathInfoStr = "call_path_infos"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileIndexIdx" kind="let">

```mc
let tuneFileIndexIdx  : Int
```



<ToggleWrapper text="Code..">
```mc
let tuneFileIndexIdx = 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileTypeIdx" kind="let">

```mc
let tuneFileTypeIdx  : Int
```



<ToggleWrapper text="Code..">
```mc
let tuneFileTypeIdx = 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileValueIdx" kind="let">

```mc
let tuneFileValueIdx  : Int
```



<ToggleWrapper text="Code..">
```mc
let tuneFileValueIdx = 2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileHoleNameIdx" kind="let">

```mc
let tuneFileHoleNameIdx  : Int
```



<ToggleWrapper text="Code..">
```mc
let tuneFileHoleNameIdx = 3
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileHoleInfoIdx" kind="let">

```mc
let tuneFileHoleInfoIdx  : Int
```



<ToggleWrapper text="Code..">
```mc
let tuneFileHoleInfoIdx = 4
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileFunNameIdx" kind="let">

```mc
let tuneFileFunNameIdx  : Int
```



<ToggleWrapper text="Code..">
```mc
let tuneFileFunNameIdx = 5
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileFunInfoIdx" kind="let">

```mc
let tuneFileFunInfoIdx  : Int
```



<ToggleWrapper text="Code..">
```mc
let tuneFileFunInfoIdx = 6
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFilePathNameIdx" kind="let">

```mc
let tuneFilePathNameIdx  : Int
```



<ToggleWrapper text="Code..">
```mc
let tuneFilePathNameIdx = 7
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFilePathInfoIdx" kind="let">

```mc
let tuneFilePathInfoIdx  : Int
```



<ToggleWrapper text="Code..">
```mc
let tuneFilePathInfoIdx = 8
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="boolTypeValue" kind="let">

```mc
let boolTypeValue  : Int
```



<ToggleWrapper text="Code..">
```mc
let boolTypeValue = 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intTypeValue" kind="let">

```mc
let intTypeValue  : Int
```



<ToggleWrapper text="Code..">
```mc
let intTypeValue = 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileExtension" kind="let">

```mc
let tuneFileExtension  : String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileExtension = ".tune"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileName" kind="let">

```mc
let tuneFileName file : String -> String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileName = lam file.
  let withoutExtension =
  match strLastIndex '.' file with Some idx then
    subsequence file 0 idx
  else file
in concat withoutExtension tuneFileExtension
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_vertexPath" kind="let">

```mc
let _vertexPath h i env : NameInfo -> Int -> CallCtxEnv -> [NameInfo]
```



<ToggleWrapper text="Code..">
```mc
let _vertexPath : NameInfo -> Int -> CallCtxEnv -> [NameInfo] = lam h : NameInfo. lam i : Int. lam env : CallCtxEnv.
  match env with {verbosePath = verbosePath, hole2fun = hole2fun} then
    let edgePath = mapFindExn i verbosePath in
    match edgePath with [] then
      [mapFindExn h hole2fun]
    else
      let lastEdge : (NameInfo, NameInfo, NameInfo) = last edgePath in
      let destination = lastEdge.1 in
      snoc (map (lam e : (NameInfo, NameInfo, NameInfo). e.0) edgePath)
      destination
  else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tuneTable2str" kind="let">

```mc
let _tuneTable2str env table : CallCtxEnv -> LookupTable -> String
```



<ToggleWrapper text="Code..">
```mc
let _tuneTable2str = lam env: CallCtxEnv. lam table : LookupTable.
  use HoleAst in
  let rows = mapi (lam i. lam expr.
    join [int2string i, ": ", int2string (toInt expr (get env.idx2hole i))]) table in
  strJoin _delim rows
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileDump" kind="let">

```mc
let tuneFileDump env table format : CallCtxEnv -> LookupTable -> TuneFileFormat -> String
```



<ToggleWrapper text="Code..">
```mc
let tuneFileDump = lam env : CallCtxEnv. lam table : LookupTable. lam format : TuneFileFormat.
  let hole2idx = env.hole2idx in
  let hole2fun = env.hole2fun in
  let verbosePath = env.verbosePath in
  let callGraph = env.callGraph in

  let entry2str = lam holeInfo : NameInfo. lam path : [NameInfo]. lam i : Int.
    let funInfo : NameInfo = mapFindExn holeInfo hole2fun in
    let path = _vertexPath holeInfo i env in
    let value = get table i in
    let tyAndVal : (Int, String) = use MExprAst in
      match value with TmConst {val = CBool {val = b}} then (boolTypeValue, if b then "true" else "false")
      else match value with TmConst {val = CInt {val = i}} then (intTypeValue, int2string i)
      else error "unknown value type"
    in
    let values =
    [ int2string i
    , int2string tyAndVal.0
    , tyAndVal.1
    , nameInfoGetStr holeInfo
    , info2str holeInfo.1
    , nameInfoGetStr funInfo
    , info2str funInfo.1
    , _listOfStrings (map nameInfoGetStr path)
    , _listOfStrings (map (lam x : NameInfo. info2str x.1) path)
    ] in
    match format with CSV _ then
      strJoin "," values
    else match format with TOML _ then
      strJoin "\n" (zipWith (lam x. lam y. join [x, " = ", y])
        [ tuneFileIndexStr
        , tuneFileTypeStr
        , tuneFileValueStr
        , tuneFileHoleNameStr
        , tuneFileHoleInfoStr
        , tuneFileFunNameStr
        , tuneFileFunInfoStr
        , tuneFilePathNameStr
        , tuneFilePathInfoStr
        ]
        values)
    else never
  in
  let taggedEntries =
    mapFoldWithKey
      (lam acc : [(Int, String)]. lam h : NameInfo. lam pathMap : Map [NameInfo] Int.
         concat acc (map (lam b : ([NameInfo], Int). (b.1, entry2str h b.0 b.1)) (mapBindings pathMap)))
      [] hole2idx
  in
  let sortedTagged =
    sort (lam e1 : (Int, String). lam e2 : (Int, String). subi e1.0 e2.0)
      taggedEntries
  in
  let entries = map (lam e : (Int, String). e.1) sortedTagged in
  match format with CSV _ then
    strJoin "\n" entries
  else match format with TOML _ then
    concat "[[hole]]\n" (strJoin (join ["\n", "[[hole]]", "\n"]) entries)
  else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileDumpTable" kind="let">

```mc
let tuneFileDumpTable file env table verbose : String -> CallCtxEnv -> LookupTable -> Bool -> ()
```



<ToggleWrapper text="Code..">
```mc
let tuneFileDumpTable
= lam file: String. lam env: CallCtxEnv. lam table: LookupTable. lam verbose: Bool.
  let str =
  join
  [ int2string (length table)
  , "\n"
  , _tuneTable2str env table
  , "\n"
  , make _sepLength '='
  , "\n"
  , if verbose then tuneFileDump env table (CSV ()) else ""
  , "\n"
  ] in writeFile file str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneFileReadTable" kind="let">

```mc
let tuneFileReadTable file : String -> LookupTable
```



<ToggleWrapper text="Code..">
```mc
let tuneFileReadTable : String -> LookupTable = lam file.
  use BootParser in
  let fileContent = readFile file in
  let rows = strSplit "\n" fileContent in
  let n = string2int (head rows) in
  let strVals = subsequence rows 1 n in
  let strVals = map (lam x. get (strSplit ": " x) 1) strVals in
  map (parseMExprStringKeywordsExn []) strVals
```
</ToggleWrapper>
</DocBlock>

