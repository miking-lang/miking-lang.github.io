import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FunArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="arityFunType" kind="sem">

```mc
sem arityFunType : Ast_Type -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem arityFunType =
  | TyArrow t -> addi 1 (arityFunType t.to)
  | TyAll t -> arityFunType t.ty
  | ty -> (rappAccumL_Type_Type (lam. lam ty. (arityFunType ty, ty)) 0 ty).0
```
</ToggleWrapper>
</DocBlock>

