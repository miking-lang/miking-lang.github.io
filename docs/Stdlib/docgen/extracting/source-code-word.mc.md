import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# source-code-word.mc  
  

\# SourceCodeWord Module  
  
This module defines the data structure used by the colorizer to represent a  
highlighted token from the source code. Each token is paired with a  
\`SourceCodeWordKind\` indicating how it should be rendered \(keyword, name,  
type, number, or default\).

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/parsing/lexing/token-readers.mc"} style={S.link}>../parsing/lexing/token-readers.mc</a>  
  
## Types  
  

          <DocBlock title="SourceCodeWord" kind="type">

```mc
type SourceCodeWord : { word: Token, kind: SourceCodeWordKind }
```

<Description>{`\#\# SourceCodeWord  
  
Represents a single token from the source code with its display category.`}</Description>


<ToggleWrapper text="Code..">
```mc
type SourceCodeWord = use SourceCodeWordKinds in use TokenReader in  {
    word: Token,
    kind: SourceCodeWordKind
}
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="SourceCodeWordKinds" kind="lang" link="/docs/Stdlib/docgen/extracting/source-code-word.mc/lang-SourceCodeWordKinds">

```mc
lang SourceCodeWordKinds
```

<Description>{`\#\# SourceCodeWordKinds  
  
Visual categories used by the colorizer.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang SourceCodeWordKinds

    syn SourceCodeWordKind =
    | CodeKeyword {}
    | CodeName {}
    | CodeDefault {}
    | CodeType {}
    | CodeNumber {}
    
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="buildCodeWord" kind="let">

```mc
let buildCodeWord word kind : TokenReaderInterface_Token -> SourceCodeWordKinds_SourceCodeWordKind -> SourceCodeWord
```

<Description>{`Builds a \`SourceCodeWord\` from a \`Token\` and a \`SourceCodeWordKind\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let buildCodeWord : use SourceCodeWordKinds in use TokenReader in Token -> SourceCodeWordKind -> SourceCodeWord =
    use SourceCodeWordKinds in lam word. lam kind. {
        word = word,
        kind = kind    
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sourceCodeWordFormat" kind="let">

```mc
let sourceCodeWordFormat token : TokenReaderInterface_Token -> SourceCodeWord
```

<Description>{`Classifies a token without context:  
1. Literal keyword → CodeKeyword  
2. Integer literal → CodeNumber  
3. Starts with capital letter → CodeType  
4. Starts with letter or underscore → CodeName  
5. Otherwise → CodeDefault  
These rules match Miking syntax \(e.g., types start with a capital letter\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let sourceCodeWordFormat : use TokenReader in Token -> SourceCodeWord =
    use TokenReader in use SourceCodeWordKinds in lam token.
    let build = buildCodeWord token in
    switch token
    case TokenWord { content = content } then
        let kind = match content with "" then
            extractingWarn "Detected an empty word in formatterNext";
            CodeDefault {}
        else match content with "mexpr" | "utest" | "with" | "recursive" | "match" | "end" |
             "switch" | "in" | "case" | "if" | "else" | "type" | "con" |
             "lang" | "syn" | "use" | "let" | "lam" | "sem" | "then" then CodeKeyword {}
        else if stringIsInt content then CodeNumber {}
        else if isUpperAlpha (head content) then CodeType {}
        else if isAlphaOrUnderscore (head content) then CodeName {}
        else CodeDefault {}
        in
        build kind
    case TokenRecursiveEnder {} then build (CodeKeyword {})
    case _ then build (CodeDefault {})
    end
```
</ToggleWrapper>
</DocBlock>

