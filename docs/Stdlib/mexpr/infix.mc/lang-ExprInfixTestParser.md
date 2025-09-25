import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExprInfixTestParser  
  

Test fragment for testing infix operations

  
  
  
## Semantics  
  

          <DocBlock title="parseInfixImp" kind="sem">

```mc
sem parseInfixImp : ?
```



<ToggleWrapper text="Code..">
```mc
sem parseInfixImp (p: Pos) =
  | "il1" ++ xs -> makeTestBinOp "-il1-" p xs (LeftAssoc ()) 1 
  | "il2" ++ xs -> makeTestBinOp "-il2-" p xs (LeftAssoc ()) 2 
  | "il3" ++ xs -> makeTestBinOp "-il3-" p xs (LeftAssoc ()) 3 
  | "il4" ++ xs -> makeTestBinOp "-il4-" p xs (LeftAssoc ()) 4 
  | "ir1" ++ xs -> makeTestBinOp "-ir1-" p xs (RightAssoc ()) 1 
  | "ir2" ++ xs -> makeTestBinOp "-ir2-" p xs (RightAssoc ()) 2 
  | "ir3" ++ xs -> makeTestBinOp "-ir3-" p xs (RightAssoc ()) 3 
```
</ToggleWrapper>
</DocBlock>

