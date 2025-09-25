import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PreLitToken  
  

NOTE\(vipa, 2022\-04\-25\): Similar to PreToken, these are only  
intended for analysis. We cannot use normal LitSpec constructed  
through \`litSym\` since it will check that the literal lexes as a  
single token, which it only would if we have the appropriate  
language fragments included, which we don't have in the  
\*generating\* code, we only have that in the \*generated\* code.

  
  
  
## Syntaxes  
  

          <DocBlock title="TokenRepr" kind="syn">

```mc
syn TokenRepr
```



<ToggleWrapper text="Code..">
```mc
syn TokenRepr =
  | PreLitRepr {lit : String}
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
  | PreLitRepr x -> snoc (cons '\'' x.lit) '\''
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
  | (PreLitRepr l, PreLitRepr r) -> cmpString l.lit r.lit
```
</ToggleWrapper>
</DocBlock>

