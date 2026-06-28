import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TokenReaderInterface  
  

Interface definition for a generic TokenReader

  
  
  
## Types  
  

          <DocBlock title="Pos" kind="type">

```mc
type Pos : { x: Int, y: Int }
```



<ToggleWrapper text="Code..">
```mc
type Pos = { x: Int, y: Int }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NextResult" kind="type">

```mc
type NextResult : { token: Token, stream: String, pos: Pos }
```



<ToggleWrapper text="Code..">
```mc
type NextResult = { token : Token, stream : String, pos: Pos }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```

<Description>{`Abstract token type to be implemented by concrete readers`}</Description>


<ToggleWrapper text="Code..">
```mc
syn Token =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="actualisePos" kind="sem">

```mc
sem actualisePos : TokenReaderInterface_Pos -> TokenReaderInterface_Token -> TokenReaderInterface_Pos
```

<Description>{`Generate the new position in the stream from the litteral of the given tokenNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lit" kind="sem">

```mc
sem lit : TokenReaderInterface_Token -> String
```

<Description>{`Returns the original literal text of the token`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lit : Token -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="content" kind="sem">

```mc
sem content : TokenReaderInterface_Token -> String
```

<Description>{`Is used by the parser to get a representation of the token.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem content =
    | t -> lit t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="next" kind="sem">

```mc
sem next : String -> TokenReaderInterface_Pos -> TokenReaderInterface_NextResult
```

<Description>{`Produces the next token from the input stream`}</Description>


<ToggleWrapper text="Code..">
```mc
sem next : String -> Pos -> NextResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="buildResult" kind="sem">

```mc
sem buildResult : TokenReaderInterface_Token -> TokenReaderInterface_Pos -> String -> TokenReaderInterface_NextResult
```

<Description>{`Utility function to build a NextResultNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem buildResult token pos = | stream ->  { token = token, pos = actualisePos pos token, stream = stream }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokenToString" kind="sem">

```mc
sem tokenToString : TokenReaderInterface_Token -> String
```

<Description>{`Converts the token to a human\-readable string`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tokenToString : Token -> String
```
</ToggleWrapper>
</DocBlock>

