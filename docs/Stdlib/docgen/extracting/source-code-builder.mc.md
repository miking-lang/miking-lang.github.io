import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# source-code-builder.mc  
  

\# Code Source Reconstruction Utilities  
  
This module implements a minimalist system to reconstruct the source code  
associated with each \`Object\` in the documentation tree.  
  
To see the logic of source\-code representation, see source\-code.mc

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/parsing/doc-tree.mc"} style={S.link}>../parsing/doc-tree.mc</a>, <a href={"/docs/Stdlib/docgen/extracting/source-code.mc"} style={S.link}>./source-code.mc</a>, <a href={"/docs/Stdlib/docgen/global/logger.mc"} style={S.link}>../global/logger.mc</a>  
  
## Types  
  

          <DocBlock title="SourceCodeBuilder" kind="type">

```mc
type SourceCodeBuilder
```

<Description>{`\#\# SourceCodeBuilder  
  
Accumulates source code tokens while traversing the \`DocTree\`.  
When entering a \`DocTreeNode\`, a new builder context is pushed.  
When finishing a node, the buffer is returned and the parent context is restored.`}</Description>


<ToggleWrapper text="Code..">
```mc
type SourceCodeBuilder
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="SourceCodeNode" kind="con">

```mc
con SourceCodeNode : { parent: Option SourceCodeBuilder, buffer: SourceCode } -> SourceCodeBuilder
```



<ToggleWrapper text="Code..">
```mc
con SourceCodeNode : { parent: Option SourceCodeBuilder, buffer: SourceCode } -> SourceCodeBuilder
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="sourceCodeEmpty" kind="let">

```mc
let sourceCodeEmpty _ : () -> SourceCode
```

<Description>{`An empty source code`}</Description>


<ToggleWrapper text="Code..">
```mc
let sourceCodeEmpty : () -> SourceCode = lam . []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absorbWord" kind="let">

```mc
let absorbWord builder word : SourceCodeBuilder -> DocTree -> SourceCodeBuilder
```

<Description>{`\#\# absorbWord  
  
Adds a token from the \`DocTree\` to the current builder.  
\- If the word is a \`Leaf\`, it's added as \`Some word\`.  
\- If the word is a \`Node\`, we inject a \`None \{\}\` into the parent  
  and start a fresh buffer for the child node.`}</Description>


<ToggleWrapper text="Code..">
```mc
let absorbWord : SourceCodeBuilder -> DocTree -> SourceCodeBuilder =
    use TokenReader in lam builder. lam word.
    match builder with SourceCodeNode { buffer = buffer, parent = parent } in
    let token = (match word with DocTreeNode { token = token } | DocTreeLeaf { token = token } | DocTreeIncludeNode { token = token } in token) in
    let token = sourceCodeWordFormat token in
    switch word
    case DocTreeNode {} then
        let buffer = cons (None {}) buffer in
        let parent = SourceCodeNode { parent = parent, buffer = buffer } in
        SourceCodeNode { parent = Some parent, buffer = [Some token] }
    case DocTreeLeaf {} | DocTreeIncludeNode {} then
        let buffer = cons (Some token) buffer in
        SourceCodeNode { parent = parent, buffer = buffer }
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="finish" kind="let">

```mc
let finish builder : SourceCodeBuilder -> {builder: SourceCodeBuilder, sourceCode: SourceCode}
```

<Description>{`\#\# finish  
  
Completes the current builder scope and returns:  
\- the restored parent builder  
\- the reversed buffer containing the current block's source`}</Description>


<ToggleWrapper text="Code..">
```mc
let finish : SourceCodeBuilder -> { builder: SourceCodeBuilder, sourceCode: SourceCode } = lam builder.
    match builder with SourceCodeNode { parent = Some parent, buffer = buffer } then
        match parent with SourceCodeNode { parent = parent, buffer = parentBuffer  } in
        { builder = SourceCodeNode { parent = parent, buffer = parentBuffer }, sourceCode = reverse buffer }
    else match builder with SourceCodeNode { buffer = buffer } in
        extractingWarn "finish: Builder parent should never be empty at this point";
        { builder = builder, sourceCode = reverse buffer }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="newSourceCodeBuilder" kind="let">

```mc
let newSourceCodeBuilder _ : () -> SourceCodeBuilder
```

<Description>{`Returns a new SourceCodeBuilder`}</Description>


<ToggleWrapper text="Code..">
```mc
let newSourceCodeBuilder : () -> SourceCodeBuilder = lam . SourceCodeNode { buffer = [], parent = None {} }
```
</ToggleWrapper>
</DocBlock>

