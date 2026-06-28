import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorOpPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CTensorCreateUninitInt _ -> "tensorCreateUninitInt"
  | CTensorCreateUninitFloat _ -> "tensorCreateUninitFloat"
  | CTensorCreateInt _ -> "tensorCreateCArrayInt"
  | CTensorCreateFloat _ -> "tensorCreateCArrayFloat"
  | CTensorCreate _ -> "tensorCreateDense"
  | CTensorGetExn _ -> "tensorGetExn"
  | CTensorSetExn _ -> "tensorSetExn"
  | CTensorLinearGetExn _ -> "tensorLinearGetExn"
  | CTensorLinearSetExn _ -> "tensorLinearSetExn"
  | CTensorRank _ -> "tensorRank"
  | CTensorShape _ -> "tensorShape"
  | CTensorReshapeExn _ -> "tensorReshapeExn"
  | CTensorCopy _ -> "tensorCopy"
  | CTensorTransposeExn _ -> "tensorTransposeExn"
  | CTensorSliceExn _ -> "tensorSliceExn"
  | CTensorSubExn _ -> "tensorSubExn"
  | CTensorIterSlice _ -> "tensorIterSlice"
  | CTensorEq _ -> "tensorEq"
  | CTensorToString _ -> "tensor2string"
```
</ToggleWrapper>
</DocBlock>

