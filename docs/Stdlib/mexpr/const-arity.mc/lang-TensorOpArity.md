import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorOpArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

