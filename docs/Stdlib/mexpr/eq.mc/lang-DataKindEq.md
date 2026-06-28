import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataKindEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqKind" kind="sem">

```mc
sem eqKind : EqTypeEnv -> EqTypeFreeEnv -> _a -> Option EqTypeFreeEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqKind (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) =
  | (Data l, Data r) ->
    let recEq = lam r1. lam r2.
      if setEq r1.lower r2.lower then optionEq setEq r1.upper r2.upper
      else false
    in
    if mapEq recEq l.types r.types then Some free
    else None ()
```
</ToggleWrapper>
</DocBlock>

