import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RefOpDep  
  

NOTE\(Linnea, 2021\-11\-22\): This is not sufficient for tracking data flow of  
references. For example:  
  let r = ref \<data1\> in  
  let r2 = r in  
  modref r2 \<data2\> in  
  let x = deref r in  \<\-\- \{data1\} ⊆ x, \{data2\} ⊈ x

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CRef _ -> [_constDepData]
  | CModRef _ -> [_constDepNone,_constDepNone]
  | CDeRef _ -> [_constDepData]
```
</ToggleWrapper>
</DocBlock>

