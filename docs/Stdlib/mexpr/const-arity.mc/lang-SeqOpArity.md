import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

