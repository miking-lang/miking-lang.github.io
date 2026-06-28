import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# basic-types.mc  
  

  
  
  
## Types  
  

          <DocBlock title="Option" kind="type">

```mc
type Option
```



<ToggleWrapper text="Code..">
```mc
type Option a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="These" kind="type">

```mc
type These
```



<ToggleWrapper text="Code..">
```mc
type These a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Either" kind="type">

```mc
type Either
```



<ToggleWrapper text="Code..">
```mc
type Either a b
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="Some" kind="con">

```mc
con Some : all a . a -> Option a
```



<ToggleWrapper text="Code..">
```mc
con Some : all a. a -> Option a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="None" kind="con">

```mc
con None : all a . () -> Option a
```



<ToggleWrapper text="Code..">
```mc
con None : all a. () -> Option a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="This" kind="con">

```mc
con This : all a . all b . a -> These a b
```



<ToggleWrapper text="Code..">
```mc
con This : all a. all b. a -> These a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="That" kind="con">

```mc
con That : all a . all b . b -> These a b
```



<ToggleWrapper text="Code..">
```mc
con That : all a. all b. b -> These a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="These" kind="con">

```mc
con These : all a . all b . (a, b) -> These a b
```



<ToggleWrapper text="Code..">
```mc
con These : all a. all b. (a, b) -> These a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Left" kind="con">

```mc
con Left : all a . all b . a -> Either a b
```



<ToggleWrapper text="Code..">
```mc
con Left: all a. all b. a -> Either a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Right" kind="con">

```mc
con Right : all a . all b . b -> Either a b
```



<ToggleWrapper text="Code..">
```mc
con Right: all a. all b. b -> Either a b
```
</ToggleWrapper>
</DocBlock>

