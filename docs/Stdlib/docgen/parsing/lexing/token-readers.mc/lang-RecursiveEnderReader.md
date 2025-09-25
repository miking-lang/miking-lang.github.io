import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecursiveEnderReader  
  

Reader for synthetic tokens marking the end of recursive blocks

  
  
  
## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
        | TokenRecursiveEnder { ender: String }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="content" kind="sem">

```mc
sem content : TokenReaderInterface_Token -> String
```



<ToggleWrapper text="Code..">
```mc
sem content =
        | TokenRecursiveEnder { ender = ender } -> cons '#' ender
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
        | TokenRecursiveEnder { ender = ender } -> ender
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
        | TokenRecursiveEnder {} -> "RecursiveEnder"
```
</ToggleWrapper>
</DocBlock>

