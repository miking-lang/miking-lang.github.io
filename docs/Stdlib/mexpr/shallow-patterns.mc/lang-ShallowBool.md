import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShallowBool  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SPat" kind="syn">

```mc
syn SPat
```



<ToggleWrapper text="Code..">
```mc
syn SPat =
  | SPatBool {val : Bool, info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="decompose" kind="sem">

```mc
sem decompose : Name -> (ShallowBase_SPat, Ast_Pat) -> (ShallowBase_PatUpdate, Option Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem decompose name =
  | (SPatBool i, pat & PatBool x) ->
    -- TODO(vipa, 2022-05-20): Ideally we'd have a guard instead here
    if not (xor i.val x.val)
    then ([(_empty (), _empty ())], None ())
    else defaultDecomposition pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectShallows" kind="sem">

```mc
sem collectShallows : Ast_Pat -> Set ShallowBase_SPat
```



<ToggleWrapper text="Code..">
```mc
sem collectShallows =
  | PatBool x -> _ssingleton (SPatBool {val = x.val, info = x.info})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkMatch" kind="sem">

```mc
sem mkMatch : Name -> Ast_Expr -> Ast_Expr -> ShallowBase_SPat -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem mkMatch scrutinee t e =
  | SPatBool v -> match_ (nvar_ scrutinee) (withTypePat tybool_ (withInfoPat v.info (pbool_ v.val))) t e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowCmp" kind="sem">

```mc
sem shallowCmp : (ShallowBase_SPat, ShallowBase_SPat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem shallowCmp =
  | (SPatBool {val = true}, SPatBool {val = true}) -> 0
  | (SPatBool {val = true}, SPatBool {val = false}) -> negi 1
  | (SPatBool {val = false}, SPatBool {val = true}) -> 1
  | (SPatBool {val = false}, SPatBool {val = false}) -> 0
```
</ToggleWrapper>
</DocBlock>

