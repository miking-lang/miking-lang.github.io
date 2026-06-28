import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# WordTokenReader  
  

Reader for words \(non\-separator sequences\)

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
      | TokenWord { content: String }
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
        | TokenWord { content = content } -> content
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
        | TokenWord {} -> "Word"
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
```
</ToggleWrapper>
</DocBlock>

