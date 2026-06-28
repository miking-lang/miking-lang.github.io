import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ParserBase  
  

NOTE\(vipa, 2021\-02\-05\): I want to create types that refer to  
\`Token\`, which lives in a language fragment. There is no top\-level  
\`use\` \(for fairly good reasons\), and there is no type\-level \`use\`  
\(just because it hasn't been done yet\), so for the moment I create  
a new language fragment to declare the types

  
  
  
## Types  
  

          <DocBlock title="SymSet" kind="type">

```mc
type SymSet
```

<Description>{`NOTE\(vipa, 2022\-03\-02\): \`SpecSymbol\` should only have the  
\`TokSpec\` and \`LitSpec\` constructors, but \`TokenRepr\` should be  
complete according to what's in scope.`}</Description>


<ToggleWrapper text="Code..">
```mc
type SymSet state prodLabel = {eps: Bool, syms: Map (SpecSymbol Token TokenRepr state prodLabel) ()}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="eqSpecSymbol" kind="sem">

```mc
sem eqSpecSymbol : all state. all prodLabel. SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel -> SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqSpecSymbol l =
  | r -> eqi 0 (_compareSpecSymbol (l, r))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compareSpecSymbol" kind="sem">

```mc
sem compareSpecSymbol : all state. all prodLabel. SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel -> SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compareSpecSymbol l =
  | r -> _compareSpecSymbol (l, r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_compareSpecSymbol" kind="sem">

```mc
sem _compareSpecSymbol : all state. all prodLabel. (SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel, SpecSymbol TokenParser_Token TokenReprBase_TokenRepr state prodLabel) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _compareSpecSymbol =
  | (TokSpec l, TokSpec r) -> tokReprCmp l r
  | (LitSpec l, LitSpec r) -> cmpString l.lit r.lit
  | (NtSpec l, NtSpec r) -> nameCmp l r
  | (l, r) -> subi (constructorTag l) (constructorTag r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symSpecToStr" kind="sem">

```mc
sem symSpecToStr : all tok. all state. all prodLabel. SpecSymbol tok TokenReprBase_TokenRepr state prodLabel -> String
```



<ToggleWrapper text="Code..">
```mc
sem symSpecToStr =
  | TokSpec t -> tokReprToStr t
  | LitSpec t -> snoc (cons '\'' t.lit) '\''
  | NtSpec n -> nameGetStr n
```
</ToggleWrapper>
</DocBlock>

