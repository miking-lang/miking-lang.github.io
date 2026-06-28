import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkConstGenerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConst" kind="sem">

```mc
sem generateConst : Info -> ConstAst_Const -> FutharkConstAst_FutConst
```



<ToggleWrapper text="Code..">
```mc
sem generateConst (info : Info) =
  | CInt n -> FCInt {val = n.val, sz = Some (I64 ())}
  | CFloat f -> FCFloat {val = f.val, sz = Some (F64 ())}
  | CBool b -> FCBool {val = b.val}
  | CChar c -> FCInt {val = char2int c.val, sz = Some (I64 ())}
  | CAddi _ | CAddf _ -> FCAdd ()
  | CSubi _ | CSubf _ -> FCSub ()
  | CMuli _ | CMulf _ -> FCMul ()
  | CDivi _ | CDivf _ -> FCDiv ()
  | CNegi _ -> FCNegi ()
  | CNegf _ -> FCNegf ()
  | CModi _ -> FCRem ()
  | CInt2float _ -> FCInt2Float ()
  | CEqi _ | CEqf _ | CEqc _ -> FCEq ()
  | CNeqi _ | CNeqf _ -> FCNeq ()
  | CGti _ | CGtf _ -> FCGt ()
  | CLti _ | CLtf _ -> FCLt ()
  | CGeqi _ | CGeqf _ -> FCGeq ()
  | CLeqi _ | CLeqf _ -> FCLeq ()
  | CCreate _ -> FCTabulate ()
  | CLength _ -> FCLength ()
  | CReverse _ -> FCReverse ()
  | CConcat _ -> FCConcat ()
  | CHead _ -> FCHead ()
  | CTail _ -> FCTail ()
  | CNull _ -> FCNull ()
  | CMap _ -> FCMap ()
  | CFoldl _ -> FCFoldl ()
  | c -> errorSingle [info] "Constant is not supported by the Futhark backend"
```
</ToggleWrapper>
</DocBlock>

