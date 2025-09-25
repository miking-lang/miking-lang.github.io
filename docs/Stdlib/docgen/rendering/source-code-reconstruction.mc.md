import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# source-code-reconstruction.mc  
  

\# Source Code Reconstruction  
  
Rebuilds a structured \`TreeSourceCode\` from a flat \`SourceCode\` stream and a list of  
pre\-rendered children \(\`RenderingData\`\). Children are interleaved at \`None\` markers.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/extracting/source-code-builder.mc"} style={S.link}>../extracting/source-code-builder.mc</a>, <a href={"/docs/Stdlib/docgen/extracting/source-code-word.mc"} style={S.link}>../extracting/source-code-word.mc</a>, <a href={"/docs/Stdlib/docgen/extracting/objects.mc"} style={S.link}>../extracting/objects.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/rendering-types.mc"} style={S.link}>./rendering-types.mc</a>  
  
## Variables  
  

          <DocBlock title="reconstructSourceCode" kind="let">

```mc
let reconstructSourceCode code sons : SourceCode -> [RenderingData] -> [TreeSourceCode]
```

<Description>{`Reconstructs code by streaming tokens and inserting child blocks at separators.  
Returns a list of \`TreeSourceCode\` nodes preserving original order and structure.`}</Description>


<ToggleWrapper text="Code..">
```mc
let reconstructSourceCode : SourceCode -> [RenderingData] -> [TreeSourceCode] = 
    lam code. lam sons. use ObjectKinds in
    
    let sons = filter (lam s. match s.obj.kind with ObjInclude {} then false else true) sons in
    type Arg = {
        tree: [TreeSourceCode],
        sons: [RenderingData],
        buffer: [SourceCodeWord]
    } in
    let tree = foldl (lam a: Arg. lam word: Option SourceCodeWord.
        switch word
        case Some w then { a with buffer = cons w a.buffer}
        case None {} then
            match a.sons with [son] ++ sons then
                match a.buffer with [] then
                    { a with tree = cons (TreeSourceCodeNode son) a.tree, sons = sons }
                else
                    { tree = concat [TreeSourceCodeNode son, TreeSourceCodeSnippet (reverse a.buffer)] a.tree, sons = sons, buffer = [] }
            else
                renderingWarn "Son array should not be empty at this point";
                a
        end) { tree = [], sons = sons, buffer = [] } code in
    (match tree.sons with [] then () else renderingWarn "Not all sons have been processed.");
    reverse (match tree.buffer with [] then tree.tree else cons (TreeSourceCodeSnippet (reverse tree.buffer)) tree.tree)
```
</ToggleWrapper>
</DocBlock>

