import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchIndex  
  

  
  
  
## Semantics  
  

          <DocBlock title="indexAdd" kind="sem">

```mc
sem indexAdd : Index_IndexAcc -> Ast_Expr -> Index_IndexAcc
```



<ToggleWrapper text="Code..">
```mc
sem indexAdd (acc: IndexAcc) =
  | TmMatch { pat = pat } -> patIndexAdd acc pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patIndexAdd" kind="sem">

```mc
sem patIndexAdd : Index_IndexAcc -> Ast_Pat -> Index_IndexAcc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patIndexAdd (acc: IndexAcc) =
  | p -> sfold_Pat_Pat patIndexAdd acc p
```
</ToggleWrapper>
</DocBlock>

