import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorOpDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : all a. ConstAst_Const -> a
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CTensorCreateInt _ -> error "TensorOpDep not implemented yet"
  | CTensorCreateFloat _ -> error "TensorOpDep not implemented yet"
  | CTensorCreate _ -> error "TensorOpDep not implemented yet"
  | CTensorGetExn _ -> error "TensorOpDep not implemented yet"
  | CTensorSetExn _ -> error "TensorOpDep not implemented yet"
  | CTensorLinearGetExn _ -> error "TensorOpDep not implemented yet"
  | CTensorLinearSetExn _ -> error "TensorOpDep not implemented yet"
  | CTensorRank _ -> error "TensorOpDep not implemented yet"
  | CTensorShape _ -> error "TensorOpDep not implemented yet"
  | CTensorReshapeExn _ -> error "TensorOpDep not implemented yet"
  | CTensorCopy _ -> error "TensorOpDep not implemented yet"
  | CTensorTransposeExn _ -> error "TensorOpDep not implemented yet"
  | CTensorSliceExn _ -> error "TensorOpDep not implemented yet"
  | CTensorSubExn _ -> error "TensorOpDep not implemented yet"
  | CTensorIterSlice _ -> error "TensorOpDep not implemented yet"
  | CTensorEq _ -> error "TensorOpDep not implemented yet"
  | CTensorToString _ -> error "TensorOpDep not implemented yet"
```
</ToggleWrapper>
</DocBlock>

