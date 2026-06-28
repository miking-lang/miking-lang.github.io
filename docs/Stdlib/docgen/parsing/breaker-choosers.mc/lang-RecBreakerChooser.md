import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecBreakerChooser  
  

This is the language for Rec blocks, including both TopRec and ambiguous inner Rec.

  
  
  
## Semantics  
  

          <DocBlock title="choose" kind="sem">

```mc
sem choose : (BreakerChooserInterface_State, String, TokenReaderInterface_Pos) -> BreakerChooserInterface_Breaker
```

<Description>{`Recursive blocks can only open on let, so we know it is a RecLet.  
A TopRec does not need to include "\#in" in its breakers,  
since we know it ends with "\#end".`}</Description>


<ToggleWrapper text="Code..">
```mc
sem choose =
        | (StateTopRec {}, "let", pos) -> build recOuter (StateRecLet {})
        | (StateRec {}, "let", pos) -> build recBreak (StateRecLet {})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absorbIt" kind="sem">

```mc
sem absorbIt : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`Rec blocks end with \#end or \#in, which are part of the block, so they are absorbed.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem absorbIt =
        | (StateRec {} | StateTopRec {}, _) -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reStructureTree" kind="sem">

```mc
sem reStructureTree : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`If a Rec block ends with \#end, it was actually a TopRec,  
so we must trigger a reconstruction.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem reStructureTree =
        | (StateRec {}, "#end") -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="continue" kind="sem">

```mc
sem continue : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`If we encounter \#end, it means our current parent is not the real parent.  
We must stop execution and restructure the tree correctly.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem continue =
        | (StateRec {}, "#end") -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="switchVersion" kind="sem">

```mc
sem switchVersion : (BreakerChooserInterface_State, String) -> BreakerChooserInterface_State
```

<Description>{`If the Rec ends with \#end, cast it into TopRec.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem switchVersion =
        | (StateRec {}, "#end") -> StateTopRec {}
```
</ToggleWrapper>
</DocBlock>

