import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShallowCon  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SPat" kind="syn">

```mc
syn SPat
```



<ToggleWrapper text="Code..">
```mc
syn SPat =
  | SPatCon {conName : Name, subName : Name, ty : Type, info : Info}
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
  | (SPatCon shallow, pat & PatCon x) ->
    if nameEq shallow.conName x.ident then
      ([(_singleton shallow.subName x.subpat, _empty ())], None ())
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
  | PatCon x -> _ssingleton (SPatCon {conName = x.ident, subName = nameSym "carried", ty = x.ty, info = x.info})
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
  | SPatCon x -> match_ (nvar_ scrutinee)
    (withTypePat x.ty (withInfoPat x.info (npcon_ x.conName (npvar_ x.subName))))
    t e
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
  | (SPatCon l, SPatCon r) -> nameCmp l.conName r.conName
```
</ToggleWrapper>
</DocBlock>

