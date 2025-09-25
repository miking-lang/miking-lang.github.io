import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# rendering-types.mc  
  

\# Rendering Types and Utilities  
  
This module defines the core types and utilities used to represent and render source code for display purposes  
  
It abstracts the notion of source code into a tree structure and enables rendering with or  
without previews \(e.g., collapsible code sections\).

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/extracting/objects.mc"} style={S.link}>../extracting/objects.mc</a>  
  
## Types  
  

          <DocBlock title="RenderingData" kind="type">

```mc
type RenderingData : { left: String, right: String, trimmed: String, row: String, obj: Object, tests: String, rowTests: String }
```

<Description>{`This structure holds all the formatted code data related to a single source object.  
  
\- \`left\`: the code segment before the split point \(e.g., \`let x\`\)  
\- \`right\`: the code segment after the split \(e.g., \`= 42\`\)  
\- \`trimmed\`: extra comments and separators of the code.  
\- \`obj\`: the original object the code comes from`}</Description>


<ToggleWrapper text="Code..">
```mc
type RenderingData = {
    left : String,
    right : String,
    trimmed : String,
    row: String,
    obj: Object,
    tests: String,
    rowTests: String
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TreeSourceCode" kind="type">

```mc
type TreeSourceCode
```

<Description>{`An abstract tree representation of source code. It supports:`}</Description>


<ToggleWrapper text="Code..">
```mc
type TreeSourceCode
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="TreeSourceCodeNode" kind="con">

```mc
con TreeSourceCodeNode : RenderingData -> TreeSourceCode
```

<Description>{`A formatted code node, created from a \`RenderingData\` record.  
Typically used for child objects that were already rendered.    `}</Description>


<ToggleWrapper text="Code..">
```mc
con TreeSourceCodeNode : RenderingData -> TreeSourceCode -- Formated code
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TreeSourceCodeSnippet" kind="con">

```mc
con TreeSourceCodeSnippet : [SourceCodeWord] -> TreeSourceCode
```

<Description>{`A raw snippet of \`SourceCodeWord\`s that has not yet been rendered.  
Typically represents a sequence of tokens like \`let x =\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
con TreeSourceCodeSnippet : [SourceCodeWord] -> TreeSourceCode -- Array of not formated word
```
</ToggleWrapper>
</DocBlock>

