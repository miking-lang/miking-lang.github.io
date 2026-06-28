import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharNormPat  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SimpleCon" kind="syn">

```mc
syn SimpleCon
```



<ToggleWrapper text="Code..">
```mc
syn SimpleCon =
  | CharCon Char
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
  | NPatChar Char
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
  | (CharCon a, CharCon b) -> subi (char2int a) (char2int b)
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
  | CharCon a -> NPatChar a
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
  | CharCon a -> pchar_ a
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
  | (NPatChar a, NPatChar b) -> subi (char2int a) (char2int b)
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
  | NPatChar a -> Some (CharCon a)
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
  | NPatChar a ->
    [notpatSimple (CharCon a)]
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
  | (NPatChar a & p, NPatChar b) ->
    if eqc a b
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
  | NPatChar a -> pchar_ a
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
  | PatChar a ->
    [SNPat (NPatChar a.val)]
```
</ToggleWrapper>
</DocBlock>

