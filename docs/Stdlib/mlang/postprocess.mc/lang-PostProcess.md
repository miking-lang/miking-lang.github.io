import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PostProcess  
  

  
  
  
## Semantics  
  

          <DocBlock title="buildMap" kind="sem">

```mc
sem buildMap : Map (String, String) Name -> Map Name Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem buildMap =
  | m ->
    let pairs = mapToSeq m in
    let pairs = map (lam p. 
      match p with ((langStr, semStr), n) in (n, join [langStr, "_", semStr]))
      pairs in
    let pairs = map (lam p. match p with (n, str) in (n, nameSetStr n str)) pairs in
    mapFromSeq nameCmp pairs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="postprocess" kind="sem">

```mc
sem postprocess : Map (String, String) Name -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem postprocess m =| e ->
    let m = buildMap m in 
    substituteIdentifiersExpr m e
```
</ToggleWrapper>
</DocBlock>

