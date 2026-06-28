import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PprintUnifyErrorNumArguments  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintUnifyError" kind="sem">

```mc
sem pprintUnifyError : PprintEnv -> Unify_UnifyError -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintUnifyError env =
  | NumArguments (l, r) ->
    (env, join ["different number of arguments, ", int2string l, " != ", int2string r])
```
</ToggleWrapper>
</DocBlock>

