import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntNormPat  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SimpleCon" kind="syn">

```mc
syn SimpleCon
```



<ToggleWrapper text="Code..">
```mc
syn SimpleCon =
  | IntCon Int
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
  | NPatInt Int
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
  | (IntCon a, IntCon b) -> subi a b
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
  | IntCon a -> NPatInt a
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
  | IntCon a -> pint_ a
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
  | (NPatInt a, NPatInt b) -> subi a b
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
  | NPatInt a -> Some (IntCon a)
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
  | NPatInt a ->
    [notpatSimple (IntCon a)]
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
  | (NPatInt a & p, NPatInt b) ->
    if eqi a b
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
  | NPatInt a -> pint_ a
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
  | PatInt a ->
    [SNPat (NPatInt a.val)]
```
</ToggleWrapper>
</DocBlock>

