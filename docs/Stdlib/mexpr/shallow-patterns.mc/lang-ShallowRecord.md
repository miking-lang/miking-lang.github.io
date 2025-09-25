import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShallowRecord  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SPat" kind="syn">

```mc
syn SPat
```



<ToggleWrapper text="Code..">
```mc
syn SPat =
  | SPatRecord { bindings : Map SID Name, ty : Type, info : Info }
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
  | (SPatRecord sx, PatRecord x) ->
    -- NOTE(vipa, 2022-05-20): This can only break if there's a
    -- missing name in SPatRecord, but we should have all the fields
    -- based on typechecking earlier
    let fields = map (lam pair. (mapFindExn pair.0 sx.bindings, pair.1)) (mapBindings x.bindings)
    in ([(mapFromSeq nameCmp fields, _empty ())], None ())
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
  | PatRecord px ->
    match inspectType px.ty with TyRecord x then
      _ssingleton (SPatRecord { bindings = mapMap (lam. nameSym "field") x.fields, ty = px.ty, info = px.info })
    else errorSingle [px.info]
      (join ["I can't immediately see the record type of this pattern, it's a ", type2str px.ty])
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
  | SPatRecord x ->
    let pat = PatRecord
      { bindings = mapMap npvar_ x.bindings
      , ty = x.ty
      , info = x.info
      } in
    withInfo x.info (match_ (nvar_ scrutinee) pat t never_)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="shallowIsInfallible" kind="sem">

```mc
sem shallowIsInfallible : ShallowBase_SPat -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem shallowIsInfallible =
  | SPatRecord _ -> true
```
</ToggleWrapper>
</DocBlock>

