import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TestLangImpl  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Ctx" kind="syn">

```mc
syn Ctx
```



<ToggleWrapper text="Code..">
```mc
syn Ctx = | ICtx Int
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInt" kind="sem">

```mc
sem getInt : Reader_Ctx -> Int
```



<ToggleWrapper text="Code..">
```mc
sem getInt = | ICtx i -> i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addInt" kind="sem">

```mc
sem addInt : Int -> Reader_Ctx -> Reader_Ctx
```



<ToggleWrapper text="Code..">
```mc
sem addInt j = | ICtx i -> ICtx (addi j i)
```
</ToggleWrapper>
</DocBlock>

