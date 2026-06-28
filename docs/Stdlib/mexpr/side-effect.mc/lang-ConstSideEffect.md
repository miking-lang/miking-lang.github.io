import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstSideEffect  
  

  
  
  
## Semantics  
  

          <DocBlock title="constHasSideEffect" kind="sem">

```mc
sem constHasSideEffect : ConstAst_Const -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem constHasSideEffect =
  | CTypeOf _ -> false
  | CInt _ | CFloat _ | CBool _ | CChar _ -> false
  | CAddi _ | CSubi _ | CMuli _ | CDivi _ | CNegi _ | CModi _ -> false
  | CSlli _ | CSrli _ | CSrai _ -> false
  | CAddf _ | CSubf _ | CMulf _ | CDivf _ | CNegf _ -> false
  | CFloorfi _ | CCeilfi _ | CRoundfi _ | CInt2float _ -> false
  | CEqi _ | CNeqi _ | CLti _ | CGti _ | CLeqi _ | CGeqi _ -> false
  | CEqf _ | CLtf _ | CLeqf _ | CGtf _ | CGeqf _ | CNeqf _ -> false
  | CEqc _ -> false
  | CInt2Char _ | CChar2Int _ -> false
  | CStringIsFloat _ | CString2float _ | CFloat2string _ -> false
  | CSymb _ | CGensym _ | CSym2hash _ -> true
  | CEqsym _ -> true
  | CSet _ | CGet _ | CCons _ | CSnoc _ | CConcat _ | CLength _ | CReverse _
  | CHead _ | CTail _ | CNull _ | CMap _ | CMapi _ | CIter _ | CIteri _
  | CFoldl _ | CFoldr _ | CCreate _ | CCreateList _ | CCreateRope _
  | CSplitAt _ | CSubsequence _ -> false
  | CFileRead _ | CFileWrite _ | CFileExists _ | CFileDelete _ -> true
  | CPrint _ | CPrintError _ | CDPrint _ | CFlushStdout _ | CFlushStderr _
  | CReadLine _ | CReadBytesAsString _ -> true
  | CRandIntU _ | CRandSetSeed _ -> true
  | CExit _ | CError _ | CArgv _ | CCommand _ -> true
  | CWallTimeMs _ | CSleepMs _ -> true
  | CConstructorTag _ -> true
  | CRef _ | CModRef _ | CDeRef _ -> true
  | CTensorCreateInt _ | CTensorCreateFloat _ | CTensorCreate _
  | CTensorGetExn _ | CTensorSetExn _
  | CTensorLinearGetExn _ | CTensorLinearSetExn _
  | CTensorRank _ | CTensorShape _
  | CTensorReshapeExn _ | CTensorCopy _ | CTensorTransposeExn _
  | CTensorSliceExn _ | CTensorSubExn _ | CTensorIterSlice _ |  CTensorEq _
  | CTensorToString _ -> true
  | CBootParserParseMExprString _ | CBootParserParseMCoreFile _ | CBootParserParseMLangFile _
  | CBootParserParseMLangString _ | CBootParserGetTop _ | CBootParserGetDecl _
  | CBootParserGetId _ | CBootParserGetTerm _ | CBootParserGetType _
  | CBootParserGetString _ | CBootParserGetInt _ | CBootParserGetFloat _
  | CBootParserGetListLength _ | CBootParserGetConst _ | CBootParserGetPat _
  | CBootParserGetCopat _
  | CBootParserGetInfo _ -> true
```
</ToggleWrapper>
</DocBlock>

