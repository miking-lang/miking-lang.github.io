import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TokenReprBase  
  

Base language for tokens

  
  
  
## Syntaxes  
  

          <DocBlock title="TokenRepr" kind="syn">

```mc
syn TokenRepr
```



<ToggleWrapper text="Code..">
```mc
syn TokenRepr =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tokReprCmp2" kind="sem">

```mc
sem tokReprCmp2 : (TokenReprBase_TokenRepr, TokenReprBase_TokenRepr) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tokReprCmp2 =
  | (l, r) -> subi (constructorTag l) (constructorTag r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokReprCmp" kind="sem">

```mc
sem tokReprCmp : TokenReprBase_TokenRepr -> TokenReprBase_TokenRepr -> Int
```



<ToggleWrapper text="Code..">
```mc
sem tokReprCmp l =
  | r -> tokReprCmp2 (l, r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokReprEq" kind="sem">

```mc
sem tokReprEq : TokenReprBase_TokenRepr -> TokenReprBase_TokenRepr -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tokReprEq l =
  | r -> eqi 0 (tokReprCmp l r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokReprToStr" kind="sem">

```mc
sem tokReprToStr : TokenReprBase_TokenRepr -> String
```



<ToggleWrapper text="Code..">
```mc
sem tokReprToStr : TokenRepr -> String
```
</ToggleWrapper>
</DocBlock>

