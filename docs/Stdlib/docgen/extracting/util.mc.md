import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# util.mc  
  

\# Path and Syntax Utilities  
This module provides a collection of utility functions used for: path manipulation and syntax tree processing, many functions operate on \`DocTree\` nodes  
These functions are essentialy used in the extracting.mc file.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/parsing/doc-tree.mc"} style={S.link}>../parsing/doc-tree.mc</a>, <a href={"/docs/Stdlib/docgen/parsing/lexing/token-readers.mc"} style={S.link}>../parsing/lexing/token-readers.mc</a>, <a href={"/docs/Stdlib/docgen/global/util.mc"} style={S.link}>../global/util.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/stdlib.mc"} style={S.link}>stdlib.mc</a>, <a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>, <a href={"/docs/Stdlib/docgen/global/logger.mc"} style={S.link}>../global/logger.mc</a>  
  
## Variables  
  

          <DocBlock title="getNamespace" kind="let">

```mc
let getNamespace path name ext : String -> String -> String -> String
```

<Description>{`Compute the namespace of an object based on path name and ext.`}</Description>


<ToggleWrapper text="Code..">
```mc
let getNamespace = lam path. lam name. lam ext.
    let ext = match ext with "" then "" else concat ext "-" in
    join [path, "/", ext, name]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractLastNamespaceElement" kind="let">

```mc
let extractLastNamespaceElement namespace : String -> String
```

<Description>{`Extracts the last segment of a namespace \(split by '/'\).  
Example: extractLastNamespaceElement "foo/bar/baz" returns "baz"`}</Description>


<ToggleWrapper text="Code..">
```mc
let extractLastNamespaceElement = lam namespace.
    let namespace = match strSplit "/" namespace with ([_] ++ _) & namespace then head (reverse namespace) else "" in
    match strSplit "-" namespace with ([_] ++ _) & namespace then head (reverse namespace) else namespace
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest extractLastNamespaceElement "a/b/c" with "c"
utest extractLastNamespaceElement "onlyone" with "onlyone"
utest extractLastNamespaceElement "" with ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeComments" kind="let">

```mc
let removeComments sons : [DocTree] -> [DocTree]
```

<Description>{`Removes all comment tokens from a list of syntax tree nodes.`}</Description>


<ToggleWrapper text="Code..">
```mc
let removeComments : [DocTree] -> [DocTree] = use TokenReader in
    lam sons. filter (lam s. match s with DocTreeLeaf { token = TokenComment {} } then false else true) sons
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strExtractType" kind="let">

```mc
let strExtractType typedef : [String] -> String
```

<Description>{`Extracts the type signature from a reversed list of string tokens.`}</Description>


<ToggleWrapper text="Code..">
```mc
let strExtractType = use TokenReader in lam typedef.
    recursive let strExtractType = lam typedef.
     switch typedef
        case [] | ["in"] then ""
        case [x, "in"] | [x] then x
        case [current] ++ rest then
            let res = strExtractType rest in
            switch (current, res)
            case (_, "," ++ _) | ("{", "}" ++ _) | ("[", _) | (_, "]" ++ _) | ("(", _) | (_, ")" ++ _) | (_, ":" ++ _) then
                concat current res
            case (current, _) then join [current, " ", res]
            end
        end in strExtractType (reverse typedef)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractType" kind="let">

```mc
let extractType typedef : [DocTree] -> String
```

<Description>{`Extracts the type signature from a list of syntax tree nodes.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extractType = use TokenReader in lam typedef.
    strExtractType (foldl
        (lam a. lam w.
            match w with DocTreeLeaf { token = TokenWord { content = content } } then cons content a
            else a
         ) [] typedef)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractVariants" kind="let">

```mc
let extractVariants stream : [DocTree] -> [String]
```

<Description>{`Extracts variant names from a stream of syntax tree nodes starting with '|'.  
Returns a list of the variants as strings.`}</Description>


<ToggleWrapper text="Code..">
```mc
let extractVariants : [DocTree] -> [String] = lam stream.
    recursive let extractVariants : [DocTree] -> Option [String] -> [String] = lam stream. lam typeAcc.
        switch (nthWord stream 0, typeAcc)
        case (Some { word = "|", rest = stream }, Some typeAcc) then cons (strExtractType typeAcc) (extractVariants stream (Some []))
        case (Some { word = "|", rest = stream }, None {}) then extractVariants stream (Some [])
        case (Some { word = "->", rest = stream }, Some typeAcc) then cons (strExtractType typeAcc) (extractVariants stream (None {}))
        case (Some { word = word, rest = stream }, Some typeAcc) then extractVariants stream (Some (cons word typeAcc))
        case (Some { rest = stream }, None {}) then extractVariants stream (None {})
        case (None {}, Some typeAcc) then [strExtractType typeAcc]
        case (None {}, None {}) then []
        end
        
    in extractVariants stream (None {})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nthWord" kind="let">

```mc
let nthWord sons n : [DocTree] -> Int -> Option {rest: [DocTree], word: String}
```



<ToggleWrapper text="Code..">
```mc
let nthWord = use TokenReader in lam sons. lam n.
    switch sons
    case [DocTreeLeaf { token = (TokenWord { content = word } | TokenStr { content = word }) }] ++ rest then
        if eqi n 0 then Some { word = word, rest = rest }
        else nthWord rest (subi n 1)
    case [_] ++ rest then nthWord rest n
    case [] then None {}
    end
```
</ToggleWrapper>
</DocBlock>

