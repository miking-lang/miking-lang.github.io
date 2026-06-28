import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# const-arity.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>  
  
## Languages  
  

          <DocBlock title="ConstArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-ConstArity">

```mc
lang ConstArity
```



<ToggleWrapper text="Code..">
```mc
lang ConstArity = ConstAst
  sem constArity : Const -> Int
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UnsafeCoerceArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-UnsafeCoerceArity">

```mc
lang UnsafeCoerceArity
```



<ToggleWrapper text="Code..">
```mc
lang UnsafeCoerceArity = ConstArity + UnsafeCoerceAst
  sem constArity =
  | CUnsafeCoerce _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IntArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-IntArity">

```mc
lang IntArity
```



<ToggleWrapper text="Code..">
```mc
lang IntArity = ConstArity + IntAst
  sem constArity =
  | CInt _ -> 0
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ArithIntArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-ArithIntArity">

```mc
lang ArithIntArity
```



<ToggleWrapper text="Code..">
```mc
lang ArithIntArity = ConstArity + ArithIntAst
  sem constArity =
  | CAddi _ -> 2
  | CSubi _ -> 2
  | CMuli _ -> 2
  | CDivi _ -> 2
  | CNegi _ -> 1
  | CModi _ -> 2
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ShiftIntArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-ShiftIntArity">

```mc
lang ShiftIntArity
```



<ToggleWrapper text="Code..">
```mc
lang ShiftIntArity = ConstArity + ShiftIntAst
  sem constArity =
  | CSlli _ -> 2
  | CSrli _ -> 2
  | CSrai _ -> 2
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-FloatArity">

```mc
lang FloatArity
```



<ToggleWrapper text="Code..">
```mc
lang FloatArity = ConstArity + FloatAst
  sem constArity =
  | CFloat _ -> 0
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ArithFloatArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-ArithFloatArity">

```mc
lang ArithFloatArity
```



<ToggleWrapper text="Code..">
```mc
lang ArithFloatArity = ConstArity + ArithFloatAst
  sem constArity =
  | CAddf _ -> 2
  | CSubf _ -> 2
  | CMulf _ -> 2
  | CDivf _ -> 2
  | CNegf _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatIntConversionArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-FloatIntConversionArity">

```mc
lang FloatIntConversionArity
```



<ToggleWrapper text="Code..">
```mc
lang FloatIntConversionArity = ConstArity + FloatIntConversionAst
  sem constArity =
  | CFloorfi _ -> 1
  | CCeilfi _ -> 1
  | CRoundfi _ -> 1
  | CInt2float _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BoolArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-BoolArity">

```mc
lang BoolArity
```



<ToggleWrapper text="Code..">
```mc
lang BoolArity = ConstArity + BoolAst
  sem constArity =
  | CBool _ -> 0
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CmpIntArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-CmpIntArity">

```mc
lang CmpIntArity
```



<ToggleWrapper text="Code..">
```mc
lang CmpIntArity = ConstArity + CmpIntAst
  sem constArity =
  | CEqi _ -> 2
  | CNeqi _ -> 2
  | CLti _ -> 2
  | CGti _ -> 2
  | CLeqi _ -> 2
  | CGeqi _ -> 2
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CmpFloatArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-CmpFloatArity">

```mc
lang CmpFloatArity
```



<ToggleWrapper text="Code..">
```mc
lang CmpFloatArity = ConstArity + CmpFloatAst
  sem constArity =
  | CEqf _ -> 2
  | CLtf _ -> 2
  | CLeqf _ -> 2
  | CGtf _ -> 2
  | CGeqf _ -> 2
  | CNeqf _ -> 2
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CharArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-CharArity">

```mc
lang CharArity
```



<ToggleWrapper text="Code..">
```mc
lang CharArity = ConstArity + CharAst
  sem constArity =
  | CChar _ -> 0
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CmpCharArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-CmpCharArity">

```mc
lang CmpCharArity
```



<ToggleWrapper text="Code..">
```mc
lang CmpCharArity = ConstArity + CmpCharAst
  sem constArity =
  | CEqc _ -> 2
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IntCharConversionArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-IntCharConversionArity">

```mc
lang IntCharConversionArity
```



<ToggleWrapper text="Code..">
```mc
lang IntCharConversionArity = ConstArity + IntCharConversionAst
  sem constArity =
  | CInt2Char _ -> 1
  | CChar2Int _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatStringConversionArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-FloatStringConversionArity">

```mc
lang FloatStringConversionArity
```



<ToggleWrapper text="Code..">
```mc
lang FloatStringConversionArity = ConstArity+ FloatStringConversionAst
  sem constArity =
  | CStringIsFloat _ -> 1
  | CString2float _ -> 1
  | CFloat2string _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SymbArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-SymbArity">

```mc
lang SymbArity
```



<ToggleWrapper text="Code..">
```mc
lang SymbArity = ConstArity + SymbAst
  sem constArity =
  | CSymb _ -> 0
  | CGensym _ -> 1
  | CSym2hash _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CmpSymbArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-CmpSymbArity">

```mc
lang CmpSymbArity
```



<ToggleWrapper text="Code..">
```mc
lang CmpSymbArity = ConstArity + CmpSymbAst
  sem constArity =
  | CEqsym _ -> 2
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqOpArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-SeqOpArity">

```mc
lang SeqOpArity
```



<ToggleWrapper text="Code..">
```mc
lang SeqOpArity = ConstArity + SeqOpAst
  sem constArity =
  | CSet _ -> 3
  | CGet _ -> 2
  | CCons _ -> 2
  | CSnoc _ -> 2
  | CConcat _ -> 2
  | CLength _ -> 1
  | CReverse _ -> 1
  | CHead _ -> 1
  | CTail _ -> 1
  | CNull _ -> 1
  | CMap _ -> 2
  | CMapi _ -> 2
  | CIter _ -> 2
  | CIteri _ -> 2
  | CFoldl _ -> 3
  | CFoldr _ -> 3
  | CCreate _ -> 2
  | CCreateList _ -> 2
  | CCreateRope _ -> 2
  | CIsList _ -> 1
  | CIsRope _ -> 1
  | CSplitAt _ -> 2
  | CSubsequence _ -> 3
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FileOpArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-FileOpArity">

```mc
lang FileOpArity
```



<ToggleWrapper text="Code..">
```mc
lang FileOpArity = ConstArity + FileOpAst
  sem constArity =
  | CFileRead _ -> 1
  | CFileWrite _ -> 2
  | CFileExists _ -> 1
  | CFileDelete _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IOArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-IOArity">

```mc
lang IOArity
```



<ToggleWrapper text="Code..">
```mc
lang IOArity = ConstArity + IOAst
  sem constArity =
  | CPrint _ -> 1
  | CPrintError _ -> 1
  | CDPrint _ -> 1
  | CFlushStdout _ -> 1
  | CFlushStderr _ -> 1
  | CReadLine _ -> 1
  | CReadBytesAsString _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RandomNumberGeneratorArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-RandomNumberGeneratorArity">

```mc
lang RandomNumberGeneratorArity
```



<ToggleWrapper text="Code..">
```mc
lang RandomNumberGeneratorArity = ConstArity + RandomNumberGeneratorAst
  sem constArity =
  | CRandIntU _ -> 2
  | CRandSetSeed _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SysArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-SysArity">

```mc
lang SysArity
```



<ToggleWrapper text="Code..">
```mc
lang SysArity = ConstArity + SysAst
  sem constArity =
  | CExit _ -> 1
  | CError _ -> 1
  | CArgv _ -> 0
  | CCommand _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TimeArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-TimeArity">

```mc
lang TimeArity
```



<ToggleWrapper text="Code..">
```mc
lang TimeArity = ConstArity + TimeAst
  sem constArity =
  | CWallTimeMs _ -> 1
  | CSleepMs _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ConTagArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-ConTagArity">

```mc
lang ConTagArity
```



<ToggleWrapper text="Code..">
```mc
lang ConTagArity = ConstArity + ConTagAst
  sem constArity =
  | CConstructorTag _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TypeOpArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-TypeOpArity">

```mc
lang TypeOpArity
```



<ToggleWrapper text="Code..">
```mc
lang TypeOpArity = ConstArity + TypeOpAst
  sem constArity =
  | CTypeOf _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RefOpArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-RefOpArity">

```mc
lang RefOpArity
```



<ToggleWrapper text="Code..">
```mc
lang RefOpArity = ConstArity + RefOpAst
  sem constArity =
  | CRef _ -> 1
  | CModRef _ -> 2
  | CDeRef _ -> 1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TensorOpArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-TensorOpArity">

```mc
lang TensorOpArity
```



<ToggleWrapper text="Code..">
```mc
lang TensorOpArity = ConstArity + TensorOpAst
  sem constArity =
  | CTensorCreateUninitInt _ -> 1
  | CTensorCreateUninitFloat _ -> 1
  | CTensorCreateInt _ -> 2
  | CTensorCreateFloat _ -> 2
  | CTensorCreate _ -> 2
  | CTensorGetExn _ -> 2
  | CTensorSetExn _ -> 3
  | CTensorLinearGetExn _ -> 2
  | CTensorLinearSetExn _ -> 3
  | CTensorRank _ -> 1
  | CTensorShape _ -> 1
  | CTensorReshapeExn _ -> 2
  | CTensorCopy _ -> 1
  | CTensorTransposeExn _ -> 3
  | CTensorSliceExn _ -> 2
  | CTensorSubExn _ -> 3
  | CTensorIterSlice _ -> 2
  | CTensorEq _ -> 3
  | CTensorToString _ -> 2
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BootParserArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-BootParserArity">

```mc
lang BootParserArity
```



<ToggleWrapper text="Code..">
```mc
lang BootParserArity = ConstArity + BootParserAst
  sem constArity =
  | CBootParserParseMExprString _ -> 3
  | CBootParserParseMLangString _ -> 1
  | CBootParserParseMLangFile _ -> 1
  | CBootParserParseMCoreFile _ -> 3
  | CBootParserGetId _ -> 1
  | CBootParserGetTerm _ -> 2
  | CBootParserGetTop _ -> 2
  | CBootParserGetDecl _ -> 2
  | CBootParserGetType _ -> 2
  | CBootParserGetString _ -> 2
  | CBootParserGetInt _ -> 2
  | CBootParserGetFloat _ -> 2
  | CBootParserGetListLength _ -> 2
  | CBootParserGetConst _ -> 2
  | CBootParserGetPat _ -> 2
  | CBootParserGetCopat _ -> 2
  | CBootParserGetInfo _ -> 2
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprArity" kind="lang" link="/docs/Stdlib/mexpr/const-arity.mc/lang-MExprArity">

```mc
lang MExprArity
```



<ToggleWrapper text="Code..">
```mc
lang MExprArity =
  IntArity + ArithIntArity + ShiftIntArity + FloatArity + ArithFloatArity +
  FloatIntConversionArity + BoolArity + CmpIntArity + CmpFloatArity +
  CharArity + CmpCharArity + IntCharConversionArity +
  FloatStringConversionArity + SymbArity + CmpSymbArity + SeqOpArity +
  FileOpArity + IOArity + RandomNumberGeneratorArity + SysArity + TimeArity +
  ConTagArity + RefOpArity + TensorOpArity + BootParserArity +
  UnsafeCoerceArity + TypeOpArity
end
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

use MExprArity in

utest constArity (CInt {val = 0}) with 0 in
utest constArity (CAddi {}) with 2 in
utest constArity (CLength {}) with 1 in

()
```
</ToggleWrapper>
</DocBlock>

