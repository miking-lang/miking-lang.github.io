import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# builtin.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/stringid.mc"} style={S.link}>stringid.mc</a>  
  
## Variables  
  

          <DocBlock title="builtin" kind="let">

```mc
let builtin  : [(String, ConstAst_Const)]
```



<ToggleWrapper text="Code..">
```mc
let builtin = use MExprAst in
  [ ("unsafeCoerce", CUnsafeCoerce ())
  , ("addi", CAddi ())
  , ("subi", CSubi ())
  , ("muli", CMuli ())
  , ("divi", CDivi ())
  , ("modi", CModi ())
  , ("negi", CNegi ())
  , ("lti", CLti ())
  , ("leqi", CLeqi ())
  , ("gti", CGti ())
  , ("geqi", CGeqi ())
  , ("eqi", CEqi ())
  , ("neqi", CNeqi ())
  , ("slli", CSlli ())
  , ("srli", CSrli ())
  , ("srai", CSrai ())
  -- , ("arity", Carity ())   -- Arity is not yet implemented
  -- Floating-point numbers
  , ("addf", CAddf ())
  , ("subf", CSubf ())
  , ("mulf", CMulf ())
  , ("divf", CDivf ())
  , ("negf", CNegf ())
  , ("ltf", CLtf ())
  , ("leqf", CLeqf ())
  , ("gtf", CGtf ())
  , ("geqf", CGeqf ())
  , ("eqf", CEqf ())
  , ("neqf", CNeqf ())
  , ("floorfi", CFloorfi ())
  , ("ceilfi", CCeilfi ())
  , ("roundfi", CRoundfi ())
  , ("int2float", CInt2float ())
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
  -- Type operations
  , ("debug_typeof", CTypeOf ())
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
  , ("bootParserParseMLangString", CBootParserParseMLangString ())
  , ("bootParserParseMLangFile", CBootParserParseMLangFile ())
  , ("bootParserParseMCoreFile", CBootParserParseMCoreFile ())
  , ("bootParserGetId", CBootParserGetId ())
  , ("bootParserGetTerm", CBootParserGetTerm ())
  , ("bootParserGetTop", CBootParserGetTop ())
  , ("bootParserGetDecl", CBootParserGetDecl ())
  , ("bootParserGetType", CBootParserGetType ())
  , ("bootParserGetString", CBootParserGetString ())
  , ("bootParserGetInt", CBootParserGetInt ())
  , ("bootParserGetFloat", CBootParserGetFloat ())
  , ("bootParserGetListLength", CBootParserGetListLength ())
  , ("bootParserGetConst", CBootParserGetConst ())
  , ("bootParserGetPat", CBootParserGetPat ())
  , ("bootParserGetCopat", CBootParserGetCopat ())
  , ("bootParserGetInfo", CBootParserGetInfo ())
  ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="builtinTypes" kind="let">

```mc
let builtinTypes  : [(String, Name, [String])]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
let builtinTypes : [(String, Name, [String])] =
  map (lam pair. (pair.0, nameSym pair.0, pair.1)) builtinTypes
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="builtinTypeNames" kind="let">

```mc
let builtinTypeNames  : Map String Name
```



<ToggleWrapper text="Code..">
```mc
let builtinTypeNames : Map String Name =
  foldl (lam env. lam t. mapInsert t.0 t.1 env) (mapEmpty cmpString) builtinTypes
```
</ToggleWrapper>
</DocBlock>

