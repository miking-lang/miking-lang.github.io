import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Const" kind="syn">

```mc
syn Const
```



<ToggleWrapper text="Code..">
```mc
syn Const =
  | CSet {}
  | CGet {}
  | CCons {}
  | CSnoc {}
  | CConcat {}
  | CLength {}
  | CReverse {}
  | CHead {}
  | CTail {}
  | CNull {}
  | CMap {}
  | CMapi {}
  | CIter {}
  | CIteri {}
  | CFoldl {}
  | CFoldr {}
  | CCreate {}
  | CCreateList {}
  | CCreateRope {}
  | CIsList {}
  | CIsRope {}
  | CSplitAt {}
  | CSubsequence {}
```
</ToggleWrapper>
</DocBlock>

