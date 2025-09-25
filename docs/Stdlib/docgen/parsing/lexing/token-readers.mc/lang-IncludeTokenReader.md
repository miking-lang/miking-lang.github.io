import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IncludeTokenReader  
  

Reader for include directives \( include "file" \)

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
        | TokenInclude { content: String, lit: String, skiped: [Token] }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="lit" kind="sem">

```mc
sem lit : TokenReaderInterface_Token -> String
```



<ToggleWrapper text="Code..">
```mc
sem lit =
        | TokenInclude { content = content, lit = lit } -> lit
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokenToString" kind="sem">

```mc
sem tokenToString : TokenReaderInterface_Token -> String
```



<ToggleWrapper text="Code..">
```mc
sem tokenToString =
        | TokenInclude {} -> "Include"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="includeNext" kind="sem">

```mc
sem includeNext : String -> TokenReaderInterface_Pos -> String -> {pos: TokenReaderInterface_Pos, token: TokenReaderInterface_Token, stream: String}
```



<ToggleWrapper text="Code..">
```mc
sem includeNext =
        | str -> lam pos. lam firstSep.
            match skip str firstSep with { newToken = TokenStr { content = str }, stream = stream, skiped = skiped } then
                let token = TokenInclude { content = subsequence str 1 (subi (length str) 2), lit = join ["include", join (map lit skiped), str], skiped = skiped } in
                buildResult token pos stream
            else
                parsingWarn "During lexing, was waiting for an Str after \\`include \\`.";
                buildResult (TokenWord { content = concat "include" firstSep }) pos str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="next" kind="sem">

```mc
sem next : String -> TokenReaderInterface_Pos -> TokenReaderInterface_NextResult
```



<ToggleWrapper text="Code..">
```mc
sem next =
        | "include " ++ str -> lam pos. includeNext str pos " "
        | "include\n" ++ str -> lam pos. includeNext str pos "\n"
        | "include\t" ++ str -> lam pos. includeNext str pos "\t"
        | "include\"" ++ str -> lam pos. includeNext (cons '\"' str) pos ""
        | "include--" ++ str -> lam pos. includeNext (cons '\"' str) pos ""
        | "include/-" ++ str -> lam pos. includeNext (cons '\"' str) pos ""            
```
</ToggleWrapper>
</DocBlock>

