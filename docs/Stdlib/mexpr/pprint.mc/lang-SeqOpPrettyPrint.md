import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CGet _ -> "get"
  | CSet _ -> "set"
  | CCons _ -> "cons"
  | CSnoc _ -> "snoc"
  | CConcat _ -> "concat"
  | CLength _ -> "length"
  | CReverse _ -> "reverse"
  | CHead _ -> "head"
  | CTail _ -> "tail"
  | CNull _ -> "null"
  | CMap _ -> "map"
  | CMapi _ -> "mapi"
  | CIter _ -> "iter"
  | CIteri _ -> "iteri"
  | CFoldl _ -> "foldl"
  | CFoldr _ -> "foldr"
  | CCreate _ -> "create"
  | CCreateList _ -> "createList"
  | CCreateRope _ -> "createRope"
  | CIsList _ -> "isList"
  | CIsRope _ -> "isRope"
  | CSplitAt _ -> "splitAt"
  | CSubsequence _ -> "subsequence"
```
</ToggleWrapper>
</DocBlock>

