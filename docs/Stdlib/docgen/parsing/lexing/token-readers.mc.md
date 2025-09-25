import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# token-readers.mc  
  

\# Token Readers Library  
  
All token readers implement a common interface: \`TokenReaderInterface\`.  
The module ends by composing all token readers into one combined \`TokenReader\`.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/global/util.mc"} style={S.link}>../../global/util.mc</a>, <a href={"/docs/Stdlib/docgen/global/logger.mc"} style={S.link}>../../global/logger.mc</a>, <a href={"/docs/Stdlib/docgen/mast-gen/include-set.mc"} style={S.link}>../../mast-gen/include-set.mc</a>, <a href={"/docs/Stdlib/hashmap.mc"} style={S.link}>hashmap.mc</a>  
  
## Languages  
  

          <DocBlock title="TokenReaderInterface" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-TokenReaderInterface">

```mc
lang TokenReaderInterface
```

<Description>{`Interface definition for a generic TokenReader`}</Description>


<ToggleWrapper text="Code..">
```mc
lang TokenReaderInterface
    
    type Pos = { x: Int, y: Int }
    type NextResult = { token : Token, stream : String, pos: Pos }
    
    -- Abstract token type to be implemented by concrete readers
    syn Token =

    -- Generate the new position in the stream from the litteral of the given token
    sem actualisePos: Pos -> Token -> Pos
    sem actualisePos =
    | pos -> lam token.
        recursive let work : String -> Pos -> Pos = lam s. lam pos.
            switch s 
            case "" then pos
            case ['\n'] ++ s then work s { x = 1, y = addi pos.y 1 }
            case ['\t'] ++ s then work s { pos with x = addi pos.x 4 }
            case [_] ++ s then work s { pos with x = addi pos.x 1 }
            end
        in work (lit token) pos

    
    -- Returns the original literal text of the token
    sem lit : Token -> String

    -- Is used by the parser to get a representation of the token.
    sem content : Token -> String
    sem content =
    | t -> lit t

    
    -- Produces the next token from the input stream
    sem next : String -> Pos -> NextResult

    -- Utility function to build a NextResult
    sem buildResult : Token -> Pos -> String -> NextResult 
    sem buildResult token pos = | stream ->  { token = token, pos = actualisePos pos token, stream = stream }
    
    -- Converts the token to a human-readable string
    sem tokenToString : Token -> String
     
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MultiLineCommentTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-MultiLineCommentTokenReader">

```mc
lang MultiLineCommentTokenReader
```

<Description>{`Reader for multi lignes comments \( /\* ... \*/ style \)`}</Description>


<ToggleWrapper text="Code..">
```mc
lang MultiLineCommentTokenReader = TokenReaderInterface
    syn Token =
      | TokenMultiLineComment { content: String, lit: String }

    sem lit =
        | TokenMultiLineComment { content = content, lit = lit } -> lit

    sem tokenToString =
        | TokenMultiLineComment {} -> "MultiLineComment"
    
    sem next =
        | "/-" ++ str -> lam pos.
            recursive
            let extract =
            lam str. lam stack.
                switch (str, stack)
                case ("-/" ++ xs, 0) then ("", xs)
                case ("-/" ++ xs, stack) then
                    let extracted = extract xs (subi stack 1) in
                    (concat "-/" extracted.0, extracted.1)
                case ("/-" ++ xs, stack) then
                    let extracted = extract xs (addi stack 1) in
                    (concat "/-" extracted.0, extracted.1)
                case ([x] ++ xs, stack) then
                    let extracted = extract xs stack in
                    (cons x extracted.0, extracted.1)
                case _ then ("", "")
                end
            in
            let extracted = extract str 0 in
            buildResult (TokenMultiLineComment {
                    content = extracted.0,
                    lit = concat (concat "/-" extracted.0) "-/"
            }) pos extracted.1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CommentTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-CommentTokenReader">

```mc
lang CommentTokenReader
```

<Description>{`Reader for single\-line comments \( \-\- ... \)`}</Description>


<ToggleWrapper text="Code..">
```mc
lang CommentTokenReader = TokenReaderInterface
    syn Token =
      | TokenComment { content: String, lit: String }

    sem lit =
        | TokenComment { lit = lit } -> lit        

    sem tokenToString =
        | TokenComment {} -> "Comment"
    
    sem next =
        | "--" ++ str -> lam pos.
            recursive
            let extract =
            lam str.
                match str with "\n" ++ xs then
                    ("", str)                    
                else match str with [x] ++ xs then
                    let extracted = extract xs in
                    (cons x extracted.0, extracted.1)
                else
                    ("", "")
            in
            let extracted = extract str in
            buildResult (TokenComment { content = extracted.0, lit = concat "--" extracted.0 }) pos extracted.1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="StrTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-StrTokenReader">

```mc
lang StrTokenReader
```

<Description>{`Reader for string literals \( "..." \)`}</Description>


<ToggleWrapper text="Code..">
```mc
lang StrTokenReader = TokenReaderInterface
    syn Token =
      | TokenStr { content: String, between: String }

    sem lit =
        | TokenStr { content = content } -> content

    sem tokenToString =
        | TokenStr {} -> "Str"
    
    sem next /- : String -> NextResult -/ =
        | "\"" ++ str -> lam pos.
            recursive
            let extract =
                lam str. 
                    switch str
                    case ['\\', x] ++ xs then
                        let extracted = extract xs in
                        (concat ['\\', x] extracted.0, extracted.1)
                    case ['\"'] ++ xs then
                        ("", xs)
                    case [x] ++ xs then
                        let extracted = extract xs in
                        (cons x extracted.0, extracted.1)
                    case _ then ("", "")
                    end
                in
            let extracted =  extract str in
            buildResult (TokenStr { content = join ["\"", extracted.0, "\""], between = extracted.0 }) pos extracted.1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="WordTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-WordTokenReader">

```mc
lang WordTokenReader
```

<Description>{`Reader for words \(non\-separator sequences\)`}</Description>


<ToggleWrapper text="Code..">
```mc
lang WordTokenReader = TokenReaderInterface
    syn Token =
      | TokenWord { content: String }

    sem lit =
        | TokenWord { content = content } -> content

    sem tokenToString =
        | TokenWord {} -> "Word"
    
    sem next =
         | str -> lam pos.
            match str with [x] then
                let token = TokenWord { content = [x] } in
                { token = token, stream = "", pos = actualisePos pos token } else
            if isSep [head str] then
                let token = TokenWord { content = [head str] } in
                { token = token, stream = tail str, pos = actualisePos pos token }
            else let arr = [head str, head (tail str)] in if isSep arr then
                let token = TokenWord { content = arr } in
                { token = token, stream = tail (tail str), pos = actualisePos pos token }
            else
                recursive
                let extract =
                lam str. lam previous.
                    switch str 
                    case (("--" ++ x) | ("++" ++ x))
                        then ("", str)
                    case [x] ++ xs then
                        if isSep [x] then
                            ("", str)
                        else if and (eqc x '\"') (not (eqc previous '\\')) then
                            ("", str)
                        else
                            let extracted = extract xs x in
                            (cons x extracted.0, extracted.1)
                    case _ then ("", "")
                    end
                in
                let extracted =  extract str '-' in
                buildResult (TokenWord { content = extracted.0 }) pos extracted.1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeparatorTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-SeparatorTokenReader">

```mc
lang SeparatorTokenReader
```

<Description>{`Reader for separators \(spaces, newlines, tabs, etc.\)`}</Description>


<ToggleWrapper text="Code..">
```mc
lang SeparatorTokenReader = TokenReaderInterface
    syn Token =
      | TokenSeparator { content: String }

    sem lit =
        | TokenSeparator { content = content } -> content

    sem tokenToString =
        | TokenSeparator {} -> "Separator"
    
    sem next =
        | [(' ' | '\t' | '\n' ) & c] ++ str -> lam pos.
            recursive
            let extract =
            lam str.
                match str with [(' ' | '\t' | '\n' ) & x] ++ xs then
                   let extracted = extract xs in
                   (cons x extracted.0, extracted.1)
                else ("", str)
            in
            let extracted =  extract str in
            buildResult (TokenSeparator { content = cons c extracted.0 }) pos extracted.1
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="EofTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-EofTokenReader">

```mc
lang EofTokenReader
```

<Description>{`Reader for End\-of\-File`}</Description>


<ToggleWrapper text="Code..">
```mc
lang EofTokenReader = TokenReaderInterface
    syn Token =
      | TokenEof {}

    sem tokenToString =
        | TokenEof {} -> "Eof"
    
    sem lit =
        | TokenEof {} -> ""
    
    sem next =
        | ""  -> lam pos.
            {
                token =TokenEof {},
                stream = "",
                pos = pos
            }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SimpleWordTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-SimpleWordTokenReader">

```mc
lang SimpleWordTokenReader
```

<Description>{`This lexer only support fundamental words.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang SimpleWordTokenReader = StrTokenReader + CommentTokenReader + MultiLineCommentTokenReader + WordTokenReader + SeparatorTokenReader + EofTokenReader end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CommAndSepSkiper" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-CommAndSepSkiper">

```mc
lang CommAndSepSkiper
```

<Description>{`Contains skip utility function allowing to jump all the comments and separator until the next important token`}</Description>


<ToggleWrapper text="Code..">
```mc
lang CommAndSepSkiper = SimpleWordTokenReader
    
    sem skip : String -> String -> { skiped: [Token], stream: String, newToken: Token }
    sem skip =
    | str -> lam first.
        let pos = { x = 1, y = 1 } in
        let firstSkiped = match first with "" then [] else [TokenSeparator { content = first }] in
        switch next str pos 
            case { token = (TokenSeparator {} | TokenComment {} | TokenMultiLineComment {}) & token, stream = stream } then
                let res = skip stream "" in
                let skiped = concat firstSkiped (cons token res.skiped) in
                { res with skiped = skiped }
            case { token = token, stream = stream } then { stream = stream, skiped = firstSkiped, newToken = token }
            end
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IncludeTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-IncludeTokenReader">

```mc
lang IncludeTokenReader
```

<Description>{`Reader for include directives \( include "file" \)`}</Description>


<ToggleWrapper text="Code..">
```mc
lang IncludeTokenReader = CommAndSepSkiper
    syn Token =
        | TokenInclude { content: String, lit: String, skiped: [Token] }

    sem lit =
        | TokenInclude { content = content, lit = lit } -> lit

    sem tokenToString =
        | TokenInclude {} -> "Include"

    sem includeNext =
        | str -> lam pos. lam firstSep.
            match skip str firstSep with { newToken = TokenStr { content = str }, stream = stream, skiped = skiped } then
                let token = TokenInclude { content = subsequence str 1 (subi (length str) 2), lit = join ["include", join (map lit skiped), str], skiped = skiped } in
                buildResult token pos stream
            else
                parsingWarn "During lexing, was waiting for an Str after \\`include \\`.";
                buildResult (TokenWord { content = concat "include" firstSep }) pos str

    sem next =
        | "include " ++ str -> lam pos. includeNext str pos " "
        | "include\n" ++ str -> lam pos. includeNext str pos "\n"
        | "include\t" ++ str -> lam pos. includeNext str pos "\t"
        | "include\"" ++ str -> lam pos. includeNext (cons '\"' str) pos ""
        | "include--" ++ str -> lam pos. includeNext (cons '\"' str) pos ""
        | "include/-" ++ str -> lam pos. includeNext (cons '\"' str) pos ""            
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ProgramTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-ProgramTokenReader">

```mc
lang ProgramTokenReader
```

<Description>{`This token is not readable but is at the root of a DocTree, the content is the name of the file and the includeSet a set will all the files.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang ProgramTokenReader = TokenReaderInterface
    syn Token =
        | TokenProgram { content: String, includeSet: IncludeSet () }

    sem lit =
        | TokenProgram {} -> ""

    sem tokenToString =
        | TokenProgram {} -> "Program"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ComposedWordTokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-ComposedWordTokenReader">

```mc
lang ComposedWordTokenReader
```

<Description>{`Reader combining recursive, include, and program tokens`}</Description>


<ToggleWrapper text="Code..">
```mc
lang ComposedWordTokenReader = IncludeTokenReader + ProgramTokenReader end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecursiveEnderReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-RecursiveEnderReader">

```mc
lang RecursiveEnderReader
```

<Description>{`Reader for synthetic tokens marking the end of recursive blocks`}</Description>


<ToggleWrapper text="Code..">
```mc
lang RecursiveEnderReader = TokenReaderInterface
     syn Token =
        | TokenRecursiveEnder { ender: String }

     sem content =
        | TokenRecursiveEnder { ender = ender } -> cons '#' ender

     sem lit =
        | TokenRecursiveEnder { ender = ender } -> ender

    sem tokenToString =
        | TokenRecursiveEnder {} -> "RecursiveEnder"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TokenReader" kind="lang" link="/docs/Stdlib/docgen/parsing/lexing/token-readers.mc/lang-TokenReader">

```mc
lang TokenReader
```

<Description>{`Combine all token readers into a single TokenReader`}</Description>


<ToggleWrapper text="Code..">
```mc
lang TokenReader = ComposedWordTokenReader + RecursiveEnderReader end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="separatorMap" kind="let">

```mc
let separatorMap  : HashMap String ()
```

<Description>{`Define set of separator characters / operators as a hashmap for fast lookup`}</Description>


<ToggleWrapper text="Code..">
```mc
let separatorMap =
    let traits = hashmapStrTraits in
    let insert = lam x. hashmapInsert traits x in
    let mem = lam x. hashmapMem traits x in
    foldl
        (lam m. lam k. hmInsert k () m)
        (hashmapEmpty ())
        ["=", "++", "|", "{", "}", "[", "]", ":", ";", ".", ",", "(", ")", "->", " ", "\n", "\t"] 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isSep" kind="let">

```mc
let isSep s : String -> Bool
```

<Description>{`Predicate to check if a string is a separator`}</Description>


<ToggleWrapper text="Code..">
```mc
let isSep = lam s. hmMem s separatorMap
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pos0" kind="let">

```mc
let pos0  : {x: Int, y: Int}
```



<ToggleWrapper text="Code..">
```mc
let pos0 = { x = 0, y = 0 }
```
</ToggleWrapper>
</DocBlock>

