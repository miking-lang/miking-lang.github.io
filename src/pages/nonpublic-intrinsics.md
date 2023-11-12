# Intrinsics (Not Public)
This is as of writing a not public page on intrinsic documentation.

## Integer Intrinsics

| Name       | <nobr>Brief Description</nobr> | Type Signature      | Description |
| :----------| :---------------- | :------------------ | :---------- |
| **`addi`** | Addition          | <nobr>`Int -> Int -> Int`</nobr> | `addi x y` computes x + y. |
| **`subi`** | Subtraction       | `Int -> Int -> Int` | `subi x y` computes x - y. |
| **`muli`** | Multiplication    | `Int -> Int -> Int` | `muli x y` computes x * y. |
| **`divi`** | Division          | `Int -> Int -> Int` | `divi x y` computes x / y. |
| **`modi`** | Modulus           | `Int -> Int -> Int` | `modi x y` computes x % y. |
| **`negi`** | Negation          | `Int -> Int`        | `negi x` computes -x. |
| **`slli`** | Logical Shift Left    | `Int -> Int -> Int` | `slli x y` computes x << y, disregarding any information about the sign of x. Example: `slli 5 2` returns `20`. |
| **`srli`** | Logical Shift Right   | `Int -> Int -> Int` | `srli x y` computes x >> y, disregarding any information about the sign of x. Example: `srli 5 2` returns `1`. |
| **`srai`** | Arithmetic Shift Right   | `Int -> Int -> Int` | `srai x y` computes x >> y, retaining information about the sign of x. Example: `srli (negi 5) 2` returns `-2`. |
| **`lti`** | Less-Than (<) | <nobr>`Int -> Int -> Bool`</nobr> | `lti x y` returns `true` if x < y, otherwise `false`. |
| **`leqi`** | Less or Equal (<=) | `Int -> Int -> Bool` | `leqi x y` returns `true` if x <= y, otherwise `false`. |
| **`gti`** | Greater-Than (>) | `Int -> Int -> Bool` | `gti x y` returns `true` if x > y, otherwise `false`. |
| **`geqi`** | <nobr>Greater or Equal (>=)</nobr> | `Int -> Int -> Bool` | `geqi x y` returns `true` if x >= y, otherwise `false`. |
| **`eqi`** | Equal (==) | `Int -> Int -> Bool` | `eqi x y` returns `true` if x == y, otherwise `false`. |
| **`neqi`** | Not Equal (!=) | `Int -> Int -> Bool` | `neqi x y` returns `true` if x != y, otherwise `false`. |

## Float Intrinsics

| Name       | <nobr>Brief Description</nobr> | Type Signature      | Description |
| :----------| :---------------- | :------------------ | :---------- |
| **`addf`** | Addition          | <nobr>`Float -> Float -> Float`</nobr> | `addf x y` computes x + y. |
| **`subf`** | Subtraction       | `Float -> Float -> Float` | `subf x y` computes x - y. |
| **`mulf`** | Multiplication    | `Float -> Float -> Float` | `mulf x y` computes x * y. |
| **`divf`** | Division          | `Float -> Float -> Float` | `divf x y` computes x / y. |
| **`negf`** | Negation          | `Float -> Float -> Float` | `negf x y` computes -x. |
| **`ltf`** | Less-Than (<) | <nobr>`Float -> Float -> Bool`</nobr> | `ltf x y` returns `true` if x < y, otherwise `false`. |
| **`leqf`** | Less or Equal (<=) | `Float -> Float -> Bool` | `leqf x y` returns `true` if x <= y, otherwise `false`. |
| **`gtf`** | Greater-Than (>) | `Float -> Float -> Bool` | `gtf x y` returns `true` if x > y, otherwise `false`. |
| **`geqf`** | <nobr>Greater or Equal (>=)</nobr> | `Float -> Float -> Bool` | `geqf x y` returns `true` if x >= y, otherwise `false`. |
| **`eqf`** | Equal (==) | `Float -> Float -> Bool` | `eqf x y` returns `true` if x == y, otherwise `false`. |
| **`neqf`** | Not Equal (!=) | `Float -> Float -> Bool` | `neqf x y` returns `true` if x != y, otherwise `false`. |

## Float-Integer Conversion Intrinsics

| Name       | <nobr>Brief Description</nobr> | Type Signature      | Description |
| :----------| :---------------- | :------------------ | :---------- |
| **`floorfi`** | Floor          | <nobr>`Float -> Int`</nobr> | `floorfi x` rounds x down the to the nearest integer. Example: `floorfi 2.7` returns `2`. |
| **`ceilfi`** | Ceil       | `Float -> Int` | `ceilfi x` rounds x up the to the nearest integer. Example: `ceilfi 2.1` returns `3`. |
| **`roundfi`** | Rounding    | `Float -> Int` | `roundfi x` rounds x up the to the nearest integer. Example: `roundfi 2.1` returns `2`, and `roundfi 2.7` returns `3`. |
| **`int2float`** | To Float Type | `Int -> Float` | `int2float x` converts x to a Float type, potentially losing precision for very large integers. |

## Not yet documented

```mc
let builtin = use MExprAst in
  [ ("unsafeCoerce", CUnsafeCoerce ())
  -- Floating-point numbers
  , ("stringIsFloat", CStringIsFloat ())
  , ("string2float", CString2float ())
  , ("float2string", CFloat2string ())
  -- Characters
  , ("eqc", CEqc ())
  , ("char2int", CChar2Int ())
  , ("int2char", CInt2Char ())
  -- Sequences
  , ("create", CCreate ())
  , ("createList", CCreateList ())
  , ("createRope", CCreateRope ())
  , ("isList", CIsList ())
  , ("isRope", CIsRope ())
  , ("length", CLength ())
  , ("concat", CConcat ())
  , ("get", CGet ())
  , ("set", CSet ())
  , ("cons", CCons ())
  , ("snoc", CSnoc ())
  , ("splitAt", CSplitAt ())
  , ("reverse", CReverse ())
  , ("head", CHead ())
  , ("tail", CTail ())
  , ("null", CNull ())
  , ("map", CMap ())
  , ("mapi", CMapi ())
  , ("iter", CIter ())
  , ("iteri", CIteri ())
  , ("foldl", CFoldl ())
  , ("foldr", CFoldr ())
  , ("subsequence", CSubsequence ())
  -- Random numbers
  , ("randIntU", CRandIntU ())
  , ("randSetSeed", CRandSetSeed ())
  -- MCore intrinsics: Time
  , ("wallTimeMs", CWallTimeMs ())
  , ("sleepMs", CSleepMs ())
  -- MCore intrinsics: Debug and I/O
  , ("print", CPrint ())
  , ("printError", CPrintError ())
  , ("dprint", CDPrint ())
  , ("flushStdout", CFlushStdout ())
  , ("flushStderr", CFlushStderr ())
  , ("readLine", CReadLine ())
  , ("readBytesAsString", CReadBytesAsString ())
  , ("argv", CArgv ())
  , ("readFile", CFileRead ())
  , ("writeFile", CFileWrite ())
  , ("fileExists", CFileExists ())
  , ("deleteFile", CFileDelete ())
  , ("command", CCommand ())
  , ("error", CError ())
  , ("exit", CExit ())
  -- Constructor tags
  , ("constructorTag", CConstructorTag ())
  -- Symbols
  , ("eqsym", CEqsym ())
  , ("gensym", CGensym ())
  , ("sym2hash", CSym2hash ())
  -- References
  , ("ref", CRef ())
  , ("deref", CDeRef ())
  , ("modref", CModRef ())
  -- Tensors
  , ("tensorCreateUninitInt", CTensorCreateUninitInt ())
  , ("tensorCreateUninitFloat", CTensorCreateUninitFloat ())
  , ("tensorCreateCArrayInt", CTensorCreateInt ())
  , ("tensorCreateCArrayFloat", CTensorCreateFloat ())
  , ("tensorCreateDense", CTensorCreate ())
  , ("tensorGetExn", CTensorGetExn ())
  , ("tensorSetExn", CTensorSetExn ())
  , ("tensorLinearGetExn", CTensorLinearGetExn ())
  , ("tensorLinearSetExn", CTensorLinearSetExn ())
  , ("tensorRank", CTensorRank ())
  , ("tensorShape", CTensorShape ())
  , ("tensorReshapeExn", CTensorReshapeExn ())
  , ("tensorCopy", CTensorCopy ())
  , ("tensorTransposeExn", CTensorTransposeExn ())
  , ("tensorSliceExn", CTensorSliceExn ())
  , ("tensorSubExn", CTensorSubExn ())
  , ("tensorIterSlice", CTensorIterSlice ())
  , ("tensorEq", CTensorEq ())
  , ("tensor2string", CTensorToString ())
  -- Boot parser
  , ("bootParserParseMExprString", CBootParserParseMExprString ())
  , ("bootParserParseMCoreFile", CBootParserParseMCoreFile ())
  , ("bootParserGetId", CBootParserGetId ())
  , ("bootParserGetTerm", CBootParserGetTerm ())
  , ("bootParserGetType", CBootParserGetType ())
  , ("bootParserGetString", CBootParserGetString ())
  , ("bootParserGetInt", CBootParserGetInt ())
  , ("bootParserGetFloat", CBootParserGetFloat ())
  , ("bootParserGetListLength", CBootParserGetListLength ())
  , ("bootParserGetConst", CBootParserGetConst ())
  , ("bootParserGetPat", CBootParserGetPat ())
  , ("bootParserGetInfo", CBootParserGetInfo ())
  ]
```