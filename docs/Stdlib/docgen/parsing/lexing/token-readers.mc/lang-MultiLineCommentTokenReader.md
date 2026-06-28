import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MultiLineCommentTokenReader  
  

Reader for multi lignes comments \( /\* ... \*/ style \)

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
      | TokenMultiLineComment { content: String, lit: String }
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
        | TokenMultiLineComment { content = content, lit = lit } -> lit
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
        | TokenMultiLineComment {} -> "MultiLineComment"
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
```
</ToggleWrapper>
</DocBlock>

