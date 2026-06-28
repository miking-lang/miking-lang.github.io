import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkConstAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="FutConst" kind="syn">

```mc
syn FutConst
```



<ToggleWrapper text="Code..">
```mc
syn FutConst =
  | FCInt { val : Int, sz : Option FutIntSize }
  | FCFloat { val : Float, sz : Option FutFloatSize }
  | FCBool { val : Bool }
  | FCAdd ()
  | FCSub ()
  | FCMul ()
  | FCDiv ()
  | FCNegi ()
  | FCNegf ()
  | FCRem ()
  | FCFloatFloor ()
  | FCFloat2Int ()
  | FCInt2Float ()
  | FCEq ()
  | FCNeq ()
  | FCGt ()
  | FCLt ()
  | FCGeq ()
  | FCLeq ()
  | FCAnd ()
  | FCOr ()
  | FCBitAnd ()
  | FCBitOr ()
  | FCBitXor ()
  | FCSrl ()
  | FCSll ()
  | FCMap ()
  | FCMap2 ()
  | FCReduce ()
  | FCFlatten ()
  | FCIndices ()
  | FCIota ()
  | FCLength ()
  | FCReverse ()
  | FCConcat ()
  | FCHead ()
  | FCTail ()
  | FCNull ()
  | FCFoldl ()
  | FCReplicate ()
  | FCTabulate ()
  | FCCopy ()
```
</ToggleWrapper>
</DocBlock>

