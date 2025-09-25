import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# source-code.mc  
  

\# Source code  
  
We need a way to represent source code so that each node has its own slice of code,  
while avoiding duplicating text in memory or introducing a heavyweight recursive structure.  
We rely on the fact that child nodes appear in order among a node’s \`sons\`.  
Therefore, we represent the source as an array of optional \`SourceCodeWord\`.  
Each \`None\` marks \*\*the next child\*\*, letting us assemble the full text later  
by interleaving parent words with the children’s rendered code.  
This yields efficient, recursive reconstruction without a recursive data type.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/extracting/source-code-word.mc"} style={S.link}>./source-code-word.mc</a>  
  
## Types  
  

          <DocBlock title="SourceCode" kind="type">

```mc
type SourceCode : [Option SourceCodeWord]
```

<Description>{`A linear buffer of words where \`None\` denotes a child\-boundary placeholder.`}</Description>


<ToggleWrapper text="Code..">
```mc
type SourceCode = [Option SourceCodeWord]
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="wordBufferToSourceCode" kind="let">

```mc
let wordBufferToSourceCode code : [SourceCodeWord] -> SourceCode
```

<Description>{`Packs a flat word buffer into a \`SourceCode\` by wrapping each word in \`Some\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let wordBufferToSourceCode : [SourceCodeWord] -> SourceCode = lam code.
    map (lam c. Some c) code
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sourceCodeTrim" kind="let">

```mc
let sourceCodeTrim code : SourceCode -> {left: SourceCode, right: SourceCode}
```

<Description>{`Trims leading/trailing words:  
  left  = content before the first \`None\` from the right \(prefix section\)  
  right = content after the last  \`Some\` from the left \(suffix section\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let sourceCodeTrim : SourceCode -> { left: SourceCode, right: SourceCode } = lam code.
    { left = (splitOnR optionIsNone code).left, right = reverse (splitOnR optionIsSome (reverse code)).left }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strToSourceCode" kind="let">

```mc
let strToSourceCode s : String -> SourceCode
```



<ToggleWrapper text="Code..">
```mc
let strToSourceCode : String -> SourceCode = use TokenReader in lam s.
    match s with "" then [] else
    match next s pos0 with { token = token, stream = stream } in
    let word = Some (sourceCodeWordFormat token) in
    cons word (strToSourceCode stream)
```
</ToggleWrapper>
</DocBlock>

