import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PreToken  
  

NOTE\(vipa, 2022\-04\-05\): A token type only ever intended for  
analysis, thus only containing a TokenRepr, no Token. This is used  
for all tokens declared with the \`token\` declaration.

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TokenRepr" kind="syn">

```mc
syn TokenRepr
```



<ToggleWrapper text="Code..">
```mc
syn TokenRepr =
  | PreRepr {constructorName : Name}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tokReprToStr" kind="sem">

```mc
sem tokReprToStr : TokenReprBase_TokenRepr -> String
```



<ToggleWrapper text="Code..">
```mc
sem tokReprToStr =
  | PreRepr x -> join ["<", nameGetStr x.constructorName, ">"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokReprCmp2" kind="sem">

```mc
sem tokReprCmp2 : (TokenReprBase_TokenRepr, TokenReprBase_TokenRepr) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem tokReprCmp2 =
  | (PreRepr l, PreRepr r) -> nameCmp l.constructorName r.constructorName
```
</ToggleWrapper>
</DocBlock>

