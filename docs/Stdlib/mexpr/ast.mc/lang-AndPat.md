import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AndPat  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Pat" kind="syn">

```mc
syn Pat
```



<ToggleWrapper text="Code..">
```mc
syn Pat =
  | PatAnd {lpat : Pat,
            rpat : Pat,
            info : Info,
            ty : Type}
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
  | PatAnd r -> r.info
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
  | PatAnd r -> PatAnd {r with info = info}
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
  | PatAnd r -> r.ty
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
  | PatAnd r -> PatAnd {r with ty = ty}
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
  | PatAnd p ->
    match f acc p.lpat with (acc, lpat) then
      match f acc p.rpat with (acc, rpat) then
        (acc, PatAnd {{p with lpat = lpat} with rpat = rpat})
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

