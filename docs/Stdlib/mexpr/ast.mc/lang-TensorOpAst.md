import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorOpAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Const" kind="syn">

```mc
syn Const
```



<ToggleWrapper text="Code..">
```mc
syn Const =
  | CTensorCreateUninitInt {}
  | CTensorCreateUninitFloat {}
  | CTensorCreateInt {}
  | CTensorCreateFloat {}
  | CTensorCreate {}
  | CTensorGetExn {}
  | CTensorSetExn {}
  | CTensorLinearGetExn {}
  | CTensorLinearSetExn {}
  | CTensorRank {}
  | CTensorShape {}
  | CTensorReshapeExn {}
  | CTensorCopy {}
  | CTensorTransposeExn {}
  | CTensorSliceExn {}
  | CTensorSubExn {}
  | CTensorIterSlice {}
  | CTensorEq {}
  | CTensorToString {}
```
</ToggleWrapper>
</DocBlock>

