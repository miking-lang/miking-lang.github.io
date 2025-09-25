import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# file-opener.mc  
  

\# file\-opener Module  
  
In the Miking syntax, \`include\` statements must remain at the beginning of a  
file. To implement a Miking lexer/parser, it is therefore possible to start  
by parsing a header containing all the includes.  
  
This file provides a function that takes a file name and returns a data  
structure representing the file and its includes.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/parsing/lexing/token-readers.mc"} style={S.link}>../parsing/lexing/token-readers.mc</a>, <a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>  
  
## Types  
  

          <DocBlock title="ParsingFile" kind="type">

```mc
type ParsingFile : { includes: [String], headerTokens: [{ token: Token, pos: Pos }], fileText: String }
```

<Description>{`Represents a parsed file header, including its \`include\`s, header tokens, and full text.`}</Description>


<ToggleWrapper text="Code..">
```mc
type ParsingFile = use TokenReader in { includes: [String], headerTokens: [{ token: Token, pos: Pos }], fileText: String }
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="parsingFileEmpty" kind="let">

```mc
let parsingFileEmpty  : all a. all a1. all a2. {fileText: [a], includes: [a1], headerTokens: [a2]}
```



<ToggleWrapper text="Code..">
```mc
let parsingFileEmpty = { includes = [], fileText = "", headerTokens = [] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parsingOpenFile" kind="let">

```mc
let parsingOpenFile file : String -> Option ParsingFile
```

<Description>{`Processes a file and returns its header as a \`ParsingFile\`, or None if the path is invalid.  
Tokens are read until a non\-header token is found.`}</Description>


<ToggleWrapper text="Code..">
```mc
let parsingOpenFile : String -> Option ParsingFile = use TokenReader in lam file.
    
    recursive let work : String -> Pos -> ParsingFile -> ParsingFile = lam s. lam pos. lam acc.
        match next s pos0 with { stream = stream, token = token, pos = pos } in
        let go = lam acc. work stream pos { acc with headerTokens = cons { token = token, pos = pos } acc.headerTokens } in
        switch token
        case TokenComment {} | TokenMultiLineComment {} | TokenSeparator {} then go acc
        case TokenInclude { content = content} then go { acc with includes = cons content acc.includes }
        case _ then { includes = reverse acc.includes, headerTokens = reverse acc.headerTokens, fileText = s }
        end
    in
    
    match fileReadOpen file with Some rc then
        let s = fileReadString rc in
        fileReadClose rc;
        Some (work (readOrNever file) pos0 { includes = [], headerTokens = [], fileText = "" })
    else
        None {}
```
</ToggleWrapper>
</DocBlock>

