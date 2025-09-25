import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# const-dep.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>  
  
## Languages  
  

          <DocBlock title="ConstDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-ConstDep">

```mc
lang ConstDep
```



<ToggleWrapper text="Code..">
```mc
lang ConstDep
  sem constDep =
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IntDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-IntDep">

```mc
lang IntDep
```



<ToggleWrapper text="Code..">
```mc
lang IntDep = ConstDep + IntAst
  sem constDep =
  | CInt _ -> []
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ArithIntDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-ArithIntDep">

```mc
lang ArithIntDep
```



<ToggleWrapper text="Code..">
```mc
lang ArithIntDep = ConstDep + ArithIntAst
  sem constDep =
  | CAddi _ -> [_constDepData, _constDepData]
  | CSubi _ -> [_constDepData, _constDepData]
  | CMuli _ -> [_constDepData, _constDepData]
  | CDivi _ -> [_constDepData, _constDepData]
  | CNegi _ -> [_constDepData]
  | CModi _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ShiftIntDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-ShiftIntDep">

```mc
lang ShiftIntDep
```



<ToggleWrapper text="Code..">
```mc
lang ShiftIntDep = ConstDep + ShiftIntAst
  sem constDep =
  | CSlli _ -> [_constDepData]
  | CSrli _ -> [_constDepData]
  | CSrai _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-FloatDep">

```mc
lang FloatDep
```



<ToggleWrapper text="Code..">
```mc
lang FloatDep = ConstDep + FloatAst
  sem constDep =
  | CFloat _ -> []
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ArithFloatDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-ArithFloatDep">

```mc
lang ArithFloatDep
```



<ToggleWrapper text="Code..">
```mc
lang ArithFloatDep = ConstDep + ArithFloatAst
  sem constDep =
  | CAddf _ -> [_constDepData, _constDepData]
  | CSubf _ -> [_constDepData, _constDepData]
  | CMulf _ -> [_constDepData, _constDepData]
  | CDivf _ -> [_constDepData, _constDepData]
  | CNegf _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatIntConversionDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-FloatIntConversionDep">

```mc
lang FloatIntConversionDep
```



<ToggleWrapper text="Code..">
```mc
lang FloatIntConversionDep = ConstDep + FloatIntConversionAst
  sem constDep =
  | CFloorfi _ -> [_constDepData]
  | CCeilfi _ -> [_constDepData]
  | CRoundfi _ -> [_constDepData]
  | CInt2float _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BoolDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-BoolDep">

```mc
lang BoolDep
```



<ToggleWrapper text="Code..">
```mc
lang BoolDep = ConstDep + BoolAst
  sem constDep =
  | CBool _ -> []
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CmpIntDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-CmpIntDep">

```mc
lang CmpIntDep
```



<ToggleWrapper text="Code..">
```mc
lang CmpIntDep = ConstDep + CmpIntAst
  sem constDep =
  | CEqi _ -> [_constDepData, _constDepData]
  | CNeqi _ -> [_constDepData, _constDepData]
  | CLti _ -> [_constDepData, _constDepData]
  | CGti _ -> [_constDepData, _constDepData]
  | CLeqi _ -> [_constDepData, _constDepData]
  | CGeqi _ -> [_constDepData, _constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CmpFloatDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-CmpFloatDep">

```mc
lang CmpFloatDep
```



<ToggleWrapper text="Code..">
```mc
lang CmpFloatDep = ConstDep + CmpFloatAst
  sem constDep =
  | CEqf _ -> [_constDepData, _constDepData]
  | CLtf _ -> [_constDepData, _constDepData]
  | CLeqf _ -> [_constDepData, _constDepData]
  | CGtf _ -> [_constDepData, _constDepData]
  | CGeqf _ -> [_constDepData, _constDepData]
  | CNeqf _ -> [_constDepData, _constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CharDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-CharDep">

```mc
lang CharDep
```



<ToggleWrapper text="Code..">
```mc
lang CharDep = ConstDep + CharAst
  sem constDep =
  | CChar _ -> []
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CmpCharDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-CmpCharDep">

```mc
lang CmpCharDep
```



<ToggleWrapper text="Code..">
```mc
lang CmpCharDep = ConstDep + CmpCharAst
  sem constDep =
  | CEqc _ -> [_constDepData, _constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IntCharConversionDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-IntCharConversionDep">

```mc
lang IntCharConversionDep
```



<ToggleWrapper text="Code..">
```mc
lang IntCharConversionDep = ConstDep + IntCharConversionAst
  sem constDep =
  | CInt2Char _ -> [_constDepData]
  | CChar2Int _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatStringConversionDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-FloatStringConversionDep">

```mc
lang FloatStringConversionDep
```



<ToggleWrapper text="Code..">
```mc
lang FloatStringConversionDep = ConstDep + FloatStringConversionAst
  sem constDep =
  -- NOTE(Linnea,2021-11-19): technically, the execution times of these
  -- conversions depend on the length of the strings, but we ignore that for
  -- now.
  | CStringIsFloat _ -> [_constDepData]
  | CString2float _ -> [_constDepData]
  | CFloat2string _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SymbDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-SymbDep">

```mc
lang SymbDep
```



<ToggleWrapper text="Code..">
```mc
lang SymbDep = ConstDep + SymbAst
  sem constDep =
  | CSymb _ -> []
  | CGensym _ -> [_constDepNone]
  | CSym2hash _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CmpSymbDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-CmpSymbDep">

```mc
lang CmpSymbDep
```



<ToggleWrapper text="Code..">
```mc
lang CmpSymbDep = ConstDep + CmpSymbAst
  sem constDep =
  | CEqsym _ -> [_constDepData, _constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqOpDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-SeqOpDep">

```mc
lang SeqOpDep
```



<ToggleWrapper text="Code..">
```mc
lang SeqOpDep = ConstDep + SeqOpAst
  -- TODO(Linnea,2021-11-22): Does not handle different behaviors for Rope and
  -- List. E.g., concat is linear for list but not for Rope. Moreover,
  -- operations that are O(1) for both might have different constants. E.g.,
  -- perhaps 'cons' should have execution dep. and not just data.
  sem constDep =
  -- NOTE(Linnea,2021-11-19): Assumes that the execution time of set and get
  -- depends on the index.
  | CSet _ -> [_constDepBoth, _constDepData, _constDepBoth]
  | CGet _ -> [_constDepBoth, _constDepBoth]
  | CCons _ -> [_constDepData, _constDepData] -- NOTE(Linnea,2021-11-22): Assumes O(1)
  | CSnoc _ -> [_constDepData, _constDepData] -- NOTE(Linnea,2021-11-22): Assumes O(1)
  | CConcat _ -> [_constDepData, _constDepData] -- NOTE(Linnea,2021-11-22): Assumes O(1)
  | CLength _ -> [_constDepData] -- NOTE(Linnea,2021-11-22): Assumes O(1)
  | CReverse _ -> [_constDepBoth] -- NOTE(Linnea,2021-11-22): Assumes > O(1)
  | CHead _ -> [_constDepData] -- NOTE(Linnea,2021-11-22): Assumes O(1)
  | CTail _ -> [_constDepData] -- NOTE(Linnea,2021-11-22): Assumes O(1)
  | CNull _ -> [_constDepData] -- NOTE(Linnea,2021-11-22): Assumes O(1)
  | CMap _ -> [_constDepBoth, _constDepBoth]
  | CMapi _ -> [_constDepBoth, _constDepBoth]
  | CIter _ -> [_constDepExe, _constDepExe]
  | CIteri _ -> [_constDepExe, _constDepExe]
  | CFoldl _ -> [_constDepBoth, _constDepBoth, _constDepBoth]
  | CFoldr _ -> [_constDepBoth, _constDepBoth, _constDepBoth]
  | CCreate _ -> [_constDepBoth, _constDepBoth]
  | CCreateList _ -> [_constDepBoth, _constDepBoth]
  | CCreateRope _ -> [_constDepData, _constDepBoth]  -- NOTE(Linnea,2021-11-22): Assumes length does not affect creation time of Rope
  | CIsList _ -> [_constDepData]
  | CIsRope _ -> [_constDepData]
  | CSplitAt _ -> [_constDepBoth, _constDepBoth]
  | CSubsequence _ -> [_constDepBoth, _constDepBoth, _constDepBoth]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FileOpDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-FileOpDep">

```mc
lang FileOpDep
```



<ToggleWrapper text="Code..">
```mc
lang FileOpDep = ConstDep + FileOpAst
  sem constDep =
  | CFileRead _ -> [_constDepBoth]
  | CFileWrite _ -> [_constDepNone, _constDepExe]
  | CFileExists _ -> [_constDepData]
  | CFileDelete _ -> [_constDepNone]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IODep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-IODep">

```mc
lang IODep
```



<ToggleWrapper text="Code..">
```mc
lang IODep = ConstDep + IOAst
  sem constDep =
  | CPrint _ -> [_constDepNone]
  | CPrintError _ -> [_constDepNone]
  | CDPrint _ -> [_constDepNone]
  | CFlushStdout _ -> [_constDepNone]
  | CFlushStderr _ -> [_constDepNone]
  | CReadLine _ -> [_constDepNone]
  | CReadBytesAsString _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RandomNumberGeneratorDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-RandomNumberGeneratorDep">

```mc
lang RandomNumberGeneratorDep
```



<ToggleWrapper text="Code..">
```mc
lang RandomNumberGeneratorDep = ConstDep + RandomNumberGeneratorAst
  sem constDep =
  | CRandIntU _ -> [_constDepData,_constDepData]
  | CRandSetSeed _ -> [_constDepNone]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SysDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-SysDep">

```mc
lang SysDep
```



<ToggleWrapper text="Code..">
```mc
lang SysDep = ConstDep + SysAst
  sem constDep =
  | CExit _ -> [_constDepNone]
  | CError _ -> [_constDepNone]
  | CArgv _ -> []
  | CCommand _ -> [_constDepBoth]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TimeDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-TimeDep">

```mc
lang TimeDep
```



<ToggleWrapper text="Code..">
```mc
lang TimeDep = ConstDep + TimeAst
  sem constDep =
  | CWallTimeMs _ -> [_constDepNone]
  | CSleepMs _ -> [_constDepExe]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ConTagDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-ConTagDep">

```mc
lang ConTagDep
```



<ToggleWrapper text="Code..">
```mc
lang ConTagDep = ConstDep + ConTagAst
  sem constDep =
  | CConstructorTag _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RefOpDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-RefOpDep">

```mc
lang RefOpDep
```

<Description>{`NOTE\(Linnea, 2021\-11\-22\): This is not sufficient for tracking data flow of  
references. For example:  
  let r = ref \<data1\> in  
  let r2 = r in  
  modref r2 \<data2\> in  
  let x = deref r in  \<\-\- \{data1\} ⊆ x, \{data2\} ⊈ x`}</Description>


<ToggleWrapper text="Code..">
```mc
lang RefOpDep = ConstDep + RefOpAst
  sem constDep =
  | CRef _ -> [_constDepData]
  | CModRef _ -> [_constDepNone,_constDepNone]
  | CDeRef _ -> [_constDepData]
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TensorOpDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-TensorOpDep">

```mc
lang TensorOpDep
```



<ToggleWrapper text="Code..">
```mc
lang TensorOpDep = ConstDep + TensorOpAst
  sem constDep =
  | CTensorCreateInt _ -> error "TensorOpDep not implemented yet"
  | CTensorCreateFloat _ -> error "TensorOpDep not implemented yet"
  | CTensorCreate _ -> error "TensorOpDep not implemented yet"
  | CTensorGetExn _ -> error "TensorOpDep not implemented yet"
  | CTensorSetExn _ -> error "TensorOpDep not implemented yet"
  | CTensorLinearGetExn _ -> error "TensorOpDep not implemented yet"
  | CTensorLinearSetExn _ -> error "TensorOpDep not implemented yet"
  | CTensorRank _ -> error "TensorOpDep not implemented yet"
  | CTensorShape _ -> error "TensorOpDep not implemented yet"
  | CTensorReshapeExn _ -> error "TensorOpDep not implemented yet"
  | CTensorCopy _ -> error "TensorOpDep not implemented yet"
  | CTensorTransposeExn _ -> error "TensorOpDep not implemented yet"
  | CTensorSliceExn _ -> error "TensorOpDep not implemented yet"
  | CTensorSubExn _ -> error "TensorOpDep not implemented yet"
  | CTensorIterSlice _ -> error "TensorOpDep not implemented yet"
  | CTensorEq _ -> error "TensorOpDep not implemented yet"
  | CTensorToString _ -> error "TensorOpDep not implemented yet"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BootParserDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-BootParserDep">

```mc
lang BootParserDep
```



<ToggleWrapper text="Code..">
```mc
lang BootParserDep = ConstDep + BootParserAst
  sem constDep =
  | CBootParserParseMExprString _ -> []
  | CBootParserParseMLangString _ -> []
  | CBootParserParseMLangFile _ -> []
  | CBootParserParseMCoreFile _ -> []
  | CBootParserGetId _ -> []
  | CBootParserGetTerm _ -> []
  | CBootParserGetTop _ -> []
  | CBootParserGetDecl _ -> []
  | CBootParserGetType _ -> []
  | CBootParserGetString _ -> []
  | CBootParserGetInt _ -> []
  | CBootParserGetFloat _ -> []
  | CBootParserGetListLength _ -> []
  | CBootParserGetConst _ -> []
  | CBootParserGetPat _ -> []
  | CBootParserGetCopat _ -> []
  | CBootParserGetInfo _ -> []
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprConstDep" kind="lang" link="/docs/Stdlib/tuning/const-dep.mc/lang-MExprConstDep">

```mc
lang MExprConstDep
```



<ToggleWrapper text="Code..">
```mc
lang MExprConstDep =
  IntDep + ArithIntDep + ShiftIntDep + FloatDep + ArithFloatDep +
  FloatIntConversionDep + BoolDep + CmpIntDep + CmpFloatDep +
  CharDep + CmpCharDep + IntCharConversionDep +
  FloatStringConversionDep + SymbDep + CmpSymbDep + SeqOpDep +
  FileOpDep + IODep + RandomNumberGeneratorDep + SysDep + TimeDep +
  ConTagDep + RefOpDep + TensorOpDep + BootParserDep
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_constDepData" kind="let">

```mc
let _constDepData  : (Bool, Bool)
```



<ToggleWrapper text="Code..">
```mc
let _constDepData = (true,false)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_constDepExe" kind="let">

```mc
let _constDepExe  : (Bool, Bool)
```



<ToggleWrapper text="Code..">
```mc
let _constDepExe = (false,true)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_constDepBoth" kind="let">

```mc
let _constDepBoth  : (Bool, Bool)
```



<ToggleWrapper text="Code..">
```mc
let _constDepBoth = (true,true)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_constDepNone" kind="let">

```mc
let _constDepNone  : (Bool, Bool)
```



<ToggleWrapper text="Code..">
```mc
let _constDepNone = (false,false)
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

use MExprConstDep in

utest constDep (CInt {val = 0}) with [] in
utest constDep (CAddi {}) with [_constDepData,_constDepData] in

()
```
</ToggleWrapper>
</DocBlock>

