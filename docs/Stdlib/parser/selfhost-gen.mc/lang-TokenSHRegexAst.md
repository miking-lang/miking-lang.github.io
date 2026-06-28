import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TokenSHRegexAst  
  

  
  
  
## Types  
  

          <DocBlock title="TokenSHRegexRecord" kind="type">

```mc
type TokenSHRegexRecord : { arg: Option SHExpr, info: Info, name: { i: Info, v: Name } }
```



<ToggleWrapper text="Code..">
```mc
type TokenSHRegexRecord =
    {arg: Option SHExpr, info: Info, name: {i: Info, v: Name}}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SHRegex" kind="syn">

```mc
syn SHRegex
```



<ToggleWrapper text="Code..">
```mc
syn SHRegex =
  | TokenSHRegex TokenSHRegexRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_SHRegex_SHExpr" kind="sem">

```mc
sem smapAccumL_SHRegex_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)) -> a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHRegex_SHExpr f acc =
  | TokenSHRegex x ->
    match
      match
        let arg = x.arg in
        optionMapAccum
          (lam acc1.
             lam x1.
               f acc1 x1)
          acc
          arg
      with
        (acc, arg)
      in
      (acc, { x with arg = arg })
    with
      (acc, x)
    in
    (acc, TokenSHRegex
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHRegex_info" kind="sem">

```mc
sem get_SHRegex_info : SelfhostBaseAst_SHRegex -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHRegex_info =
  | TokenSHRegex target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHRegex_info" kind="sem">

```mc
sem set_SHRegex_info : Info -> SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex
```



<ToggleWrapper text="Code..">
```mc
sem set_SHRegex_info val =
  | TokenSHRegex target ->
    TokenSHRegex
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

