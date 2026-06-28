import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CommentTokenReader  
  

Reader for single\-line comments \( \-\- ... \)

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
      | TokenComment { content: String, lit: String }
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
        | TokenComment { lit = lit } -> lit        
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
        | TokenComment {} -> "Comment"
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
```
</ToggleWrapper>
</DocBlock>

