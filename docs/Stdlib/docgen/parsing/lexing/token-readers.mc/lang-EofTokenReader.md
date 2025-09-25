import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# EofTokenReader  
  

Reader for End\-of\-File

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
      | TokenEof {}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tokenToString" kind="sem">

```mc
sem tokenToString : TokenReaderInterface_Token -> String
```



<ToggleWrapper text="Code..">
```mc
sem tokenToString =
        | TokenEof {} -> "Eof"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lit" kind="sem">

```mc
sem lit : TokenReaderInterface_Token -> String
```



<ToggleWrapper text="Code..">
```mc
sem lit =
        | TokenEof {} -> ""
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
        | ""  -> lam pos.
            {
                token =TokenEof {},
                stream = "",
                pos = pos
            }
```
</ToggleWrapper>
</DocBlock>

