import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TokenParser  
  

Base language for parsing tokens preceeded by WSAC

  
  
  
## Types  
  

          <DocBlock title="Stream" kind="type">

```mc
type Stream : { pos: Pos, str: String }
```



<ToggleWrapper text="Code..">
```mc
type Stream = {pos : Pos, str : String}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NextTokenResult" kind="type">

```mc
type NextTokenResult : { token: Token, lit: String, info: Info, stream: Stream }
```



<ToggleWrapper text="Code..">
```mc
type NextTokenResult = {token : Token, lit : String, info : Info, stream : Stream}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Token" kind="syn">

```mc
syn Token
```



<ToggleWrapper text="Code..">
```mc
syn Token =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="nextToken" kind="sem">

```mc
sem nextToken : all a. TokenParser_Stream -> a
```



<ToggleWrapper text="Code..">
```mc
sem nextToken /- : Stream -> NextTokenResult -/ =
  | stream ->
    let stream: Stream = stream in
    let stream: Stream = eatWSAC stream.pos stream.str in
    parseToken stream.pos stream.str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseToken" kind="sem">

```mc
sem parseToken : all a. Pos -> String -> a
```



<ToggleWrapper text="Code..">
```mc
sem parseToken (pos : Pos) /- : String -> NextTokenResult -/ =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokKindEq" kind="sem">

```mc
sem tokKindEq : all a. all a1. a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem tokKindEq (tokRepr : TokenRepr) /- : Token -> Bool -/ =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokInfo" kind="sem">

```mc
sem tokInfo : all a. all a1. a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem tokInfo /- : Token -> Info -/ =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokToStr" kind="sem">

```mc
sem tokToStr : all a. all a1. a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem tokToStr /- : Token -> String -/ =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tokToRepr" kind="sem">

```mc
sem tokToRepr : all a. all a1. a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem tokToRepr /- : Token -> TokenRepr -/ =
```
</ToggleWrapper>
</DocBlock>

