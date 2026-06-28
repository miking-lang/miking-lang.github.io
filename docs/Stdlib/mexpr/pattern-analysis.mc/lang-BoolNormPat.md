import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BoolNormPat  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SimpleCon" kind="syn">

```mc
syn SimpleCon
```



<ToggleWrapper text="Code..">
```mc
syn SimpleCon =
  | BoolCon Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SNPat" kind="syn">

```mc
syn SNPat
```



<ToggleWrapper text="Code..">
```mc
syn SNPat =
  | NPatBool Bool
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="simpleConCmpH" kind="sem">

```mc
sem simpleConCmpH : (NormPat_SimpleCon, NormPat_SimpleCon) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem simpleConCmpH =
  | (BoolCon a, BoolCon b) ->
    subi (if a then 1 else 0) (if b then 1 else 0)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="simpleConComplement" kind="sem">

```mc
sem simpleConComplement : NormPat_SimpleCon -> NormPat_SNPat
```



<ToggleWrapper text="Code..">
```mc
sem simpleConComplement =
  | BoolCon a -> NPatBool a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="simpleConToPat" kind="sem">

```mc
sem simpleConToPat : NormPat_SimpleCon -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem simpleConToPat =
  | BoolCon a -> pbool_ a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatCmp" kind="sem">

```mc
sem snpatCmp : (NormPat_SNPat, NormPat_SNPat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem snpatCmp =
  | (NPatBool a, NPatBool b) ->
    subi (if a then 1 else 0) (if b then 1 else 0)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatToSimpleCon" kind="sem">

```mc
sem snpatToSimpleCon : NormPat_SNPat -> Option NormPat_SimpleCon
```



<ToggleWrapper text="Code..">
```mc
sem snpatToSimpleCon =
  | NPatBool a -> Some (BoolCon a)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatComplement" kind="sem">

```mc
sem snpatComplement : NormPat_SNPat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem snpatComplement =
  | NPatBool a ->
    [notpatSimple (BoolCon a)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatIntersect" kind="sem">

```mc
sem snpatIntersect : (NormPat_SNPat, NormPat_SNPat) -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem snpatIntersect =
  | (NPatBool a & p, NPatBool b) ->
    if eqi (if a then 1 else 0) (if b then 1 else 0)
    then [SNPat p]
    else []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatToPat" kind="sem">

```mc
sem snpatToPat : NormPat_SNPat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem snpatToPat =
  | NPatBool a -> pbool_ a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patToNormpat" kind="sem">

```mc
sem patToNormpat : Ast_Pat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem patToNormpat =
  | PatBool a ->
    [SNPat (NPatBool a.val)]
```
</ToggleWrapper>
</DocBlock>

