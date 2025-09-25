import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NormPat  
  

  
  
  
## Types  
  

          <DocBlock title="NormPat" kind="type">

```mc
type NormPat : [NPat]
```



<ToggleWrapper text="Code..">
```mc
type NormPat = [NPat]
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SimpleCon" kind="syn">

```mc
syn SimpleCon
```



<ToggleWrapper text="Code..">
```mc
syn SimpleCon =
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NPat" kind="syn">

```mc
syn NPat
```



<ToggleWrapper text="Code..">
```mc
syn NPat =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="simpleConCmp" kind="sem">

```mc
sem simpleConCmp : NormPat_SimpleCon -> NormPat_SimpleCon -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem simpleConCmp sc1 = | sc2 -> simpleConCmpH (sc1, sc2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="simpleConCmpH" kind="sem">

```mc
sem simpleConCmpH : (NormPat_SimpleCon, NormPat_SimpleCon) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem simpleConCmpH =
  | (lhs, rhs) ->
    subi (constructorTag lhs) (constructorTag rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="simpleConComplement" kind="sem">

```mc
sem simpleConComplement : NormPat_SimpleCon -> NormPat_SNPat
```



<ToggleWrapper text="Code..">
```mc
sem simpleConComplement : SimpleCon -> SNPat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="simpleConToPat" kind="sem">

```mc
sem simpleConToPat : NormPat_SimpleCon -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem simpleConToPat : SimpleCon -> Pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatCmp" kind="sem">

```mc
sem snpatCmp : (NormPat_SNPat, NormPat_SNPat) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem snpatCmp =
  | (lhs, rhs) ->
    subi (constructorTag lhs) (constructorTag rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatToSimpleCon" kind="sem">

```mc
sem snpatToSimpleCon : NormPat_SNPat -> Option NormPat_SimpleCon
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem snpatToSimpleCon =
  | _ -> None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatComplement" kind="sem">

```mc
sem snpatComplement : NormPat_SNPat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem snpatComplement  : SNPat -> NormPat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatIntersect" kind="sem">

```mc
sem snpatIntersect : (NormPat_SNPat, NormPat_SNPat) -> NormPat_NormPat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem snpatIntersect =
  | _ -> []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="snpatToPat" kind="sem">

```mc
sem snpatToPat : NormPat_SNPat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem snpatToPat : SNPat -> Pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npatCmp" kind="sem">

```mc
sem npatCmp : NormPat_NPat -> NormPat_NPat -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem npatCmp np1 = | np2 -> npatCmpH (np1, np2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npatCmpH" kind="sem">

```mc
sem npatCmpH : (NormPat_NPat, NormPat_NPat) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem npatCmpH =
  | (lhs, rhs) ->
    subi (constructorTag lhs) (constructorTag rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npatComplement" kind="sem">

```mc
sem npatComplement : NormPat_NPat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem npatComplement : NPat -> NormPat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npatIntersect" kind="sem">

```mc
sem npatIntersect : (NormPat_NPat, NormPat_NPat) -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem npatIntersect  : (NPat, NPat) -> NormPat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="npatToPat" kind="sem">

```mc
sem npatToPat : NormPat_NPat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem npatToPat : NPat -> Pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normpatComplement" kind="sem">

```mc
sem normpatComplement : NormPat_NormPat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem normpatComplement : NormPat -> NormPat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normpatIntersect" kind="sem">

```mc
sem normpatIntersect : NormPat_NormPat -> NormPat_NormPat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem normpatIntersect  : NormPat -> NormPat -> NormPat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patToNormpat" kind="sem">

```mc
sem patToNormpat : Ast_Pat -> NormPat_NormPat
```



<ToggleWrapper text="Code..">
```mc
sem patToNormpat : Pat -> NormPat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normpatToPat" kind="sem">

```mc
sem normpatToPat : NormPat_NormPat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem normpatToPat : NormPat -> Pat
```
</ToggleWrapper>
</DocBlock>

