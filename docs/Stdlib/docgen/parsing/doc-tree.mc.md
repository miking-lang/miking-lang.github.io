import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# doc-tree.mc  
  

\# DocTree Utilities  
  
This module defines:  
\- a \`DocTree\` structure to represent a document as a tree of tokens and formatting state.  
\- a \`displayTree\` function to print this tree with indentation.  
  
The \`DocTree\` represents the raw source code in a structured way. The idea is  
to "beacon" the code: for example, when encountering a \`let\`, we create a new  
node and compute its subtree until we reach the associated \`in\`.  
This data structure is convenient since we do not need a full parse of the  
code, only its block structure.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/parsing/breaker-choosers.mc"} style={S.link}>./breaker-choosers.mc</a>, <a href={"/docs/Stdlib/docgen/global/logger.mc"} style={S.link}>../global/logger.mc</a>  
  
## Types  
  

          <DocBlock title="DocTree" kind="type">

```mc
type DocTree
```

<Description>{`Main DocTree type, can contain Leafs, Nodes, and IncludeNodes`}</Description>


<ToggleWrapper text="Code..">
```mc
type DocTree
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="DocTreeLeaf" kind="con">

```mc
con DocTreeLeaf : { token: Token, state: State, pos: Pos } -> DocTree
```

<Description>{`A single token with its formatting state`}</Description>


<ToggleWrapper text="Code..">
```mc
con DocTreeLeaf : use TokenReader in use BreakerChooser in { token: Token, state: State, pos: Pos } -> DocTree
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DocTreeNode" kind="con">

```mc
con DocTreeNode : { sons: [DocTree], token: Token, state: State, pos: Pos } -> DocTree
```

<Description>{`A code block node, representing a structural block \(e.g., a \`let ... in\`\)`}</Description>


<ToggleWrapper text="Code..">
```mc
con DocTreeNode : use TokenReader in use BreakerChooser in {
    sons: [DocTree], -- Subtree of this node
    token: Token,    -- Token that started the block (e.g. a \\`Word "let"\\`)
    state: State,    -- State after encountering this node
    pos: Pos         -- Position of the node (x, y)
} -> DocTree
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DocTreeIncludeNode" kind="con">

```mc
con DocTreeIncludeNode : { token: Token, tree: Option DocTree, state: State, path: String, isStdlib: Bool, pos: Pos } -> DocTree
```

<Description>{`A node representing an \`include\`, may hold the included file’s tree`}</Description>


<ToggleWrapper text="Code..">
```mc
con DocTreeIncludeNode : use TokenReader in use BreakerChooser in {
    token: Token,         -- The include token
    tree: Option DocTree, -- Tree of the included file, or None if already visited
    state: State,         -- Always StateProgram
    path : String,        -- Path resolved by IncludeSet
    isStdlib : Bool,      -- True if the include was from stdLib
    pos: Pos              -- Position of the include
} -> DocTree
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="displayTree" kind="let">

```mc
let displayTree tree : DocTree -> ()
```

<Description>{`Pretty\-prints a DocTree with indentation`}</Description>


<ToggleWrapper text="Code..">
```mc
let displayTree : (DocTree -> ()) = use TokenReader in use BreakerChooser in lam tree.
    -- Helper to repeat a string n times
    recursive let replicate = lam n. lam str.
        if eqi n 0 then [] else cons str (replicate (subi n 1) str) in
    
    -- Build indentation string
    let indentString = lam n.
        if eqi n 0 then "" else
            join (replicate n "  ")
    in
    
    -- Recursive printer with depth tracking
    recursive let displayTreeIndented = lam tree. lam depth.
        switch tree
        case DocTreeNode { sons = sons, token = token, state = state } then
            printLn (join [indentString depth, "Node (", toString state, ")"]);
            iter (lam child. displayTreeIndented child (addi depth 1)) sons
        case DocTreeLeaf { token = token, state = state } then
            -- Skip separators and EOF for cleaner output
            match token with TokenSeparator {} | TokenEof {} then () else 
                printLn (join [indentString depth, "Leaf (", tokenToString token, "):", lit token])
        case DocTreeIncludeNode { tree = tree, token = token, state = state, path = path } then
            printLn (join [indentString depth, "Include \"", path, "\" (", toString state, ")"]);
            match tree with Some tree then displayTreeIndented tree (addi depth 1) else ()
        case _ then parsingWarn "Non-covered variant in DocTree reached during displayTree execution."
        end
    in
    
    displayTreeIndented tree 0
```
</ToggleWrapper>
</DocBlock>

