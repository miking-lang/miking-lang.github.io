import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FileOpArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CFileRead _ -> 1
  | CFileWrite _ -> 2
  | CFileExists _ -> 1
  | CFileDelete _ -> 1
```
</ToggleWrapper>
</DocBlock>

