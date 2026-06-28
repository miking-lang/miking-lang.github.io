import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ParserSpec  
  

  
  
  
## Semantics  
  

          <DocBlock title="ntSym" kind="sem">

```mc
sem ntSym : all tok. all repr. all state. all prodLabel. Name -> SpecSymbol tok repr state prodLabel
```



<ToggleWrapper text="Code..">
```mc
sem ntSym =
  | nt -> NtSpec nt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="litSym" kind="sem">

```mc
sem litSym : all tok. all repr. all state. all prodLabel. String -> SpecSymbol tok repr state prodLabel
```



<ToggleWrapper text="Code..">
```mc
sem litSym =
  | str ->
    let res: NextTokenResult = nextToken {str = str, pos = posVal (concat "lit: " str) 1 1} in
    match (res.stream.str, res.lit) with ("", !"") then LitSpec {lit = str}
    else error (join ["A literal token does not lex as a single token: \"", str,"\" leaves \"", res.stream.str, "\""])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokSym" kind="sem">

```mc
sem tokSym : all repr. all tok. all state. all prodLabel. repr -> SpecSymbol tok repr state prodLabel
```



<ToggleWrapper text="Code..">
```mc
sem tokSym =
  | repr -> TokSpec repr
```
</ToggleWrapper>
</DocBlock>

