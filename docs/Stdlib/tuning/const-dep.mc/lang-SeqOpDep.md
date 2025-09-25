import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```

<Description>{`TODO\(Linnea,2021\-11\-22\): Does not handle different behaviors for Rope and  
List. E.g., concat is linear for list but not for Rope. Moreover,  
operations that are O\(1\) for both might have different constants. E.g.,  
perhaps 'cons' should have execution dep. and not just data.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

