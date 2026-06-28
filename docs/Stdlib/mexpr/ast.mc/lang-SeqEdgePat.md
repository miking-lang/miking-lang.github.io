import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePat  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Pat" kind="syn">

```mc
syn Pat
```



<ToggleWrapper text="Code..">
```mc
syn Pat =
  | PatSeqEdge {prefix : [Pat],
                middle: PatName,
                postfix : [Pat],
                info: Info,
                ty: Type}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoPat" kind="sem">

```mc
sem infoPat : Ast_Pat -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoPat =
  | PatSeqEdge r -> r.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfoPat" kind="sem">

```mc
sem withInfoPat : Info -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem withInfoPat info =
  | PatSeqEdge r -> PatSeqEdge {r with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyPat" kind="sem">

```mc
sem tyPat : Ast_Pat -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyPat =
  | PatSeqEdge r -> r.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withTypePat" kind="sem">

```mc
sem withTypePat : Ast_Type -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem withTypePat (ty : Type) =
  | PatSeqEdge r -> PatSeqEdge {r with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Pat_Pat" kind="sem">

```mc
sem smapAccumL_Pat_Pat : all acc. (acc -> Ast_Pat -> (acc, Ast_Pat)) -> acc -> Ast_Pat -> (acc, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Pat_Pat f acc =
  | PatSeqEdge p ->
    match mapAccumL f acc p.prefix with (acc, prefix) then
      match mapAccumL f acc p.postfix with (acc, postfix) then
        (acc, PatSeqEdge {{p with prefix = prefix} with postfix = postfix})
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

