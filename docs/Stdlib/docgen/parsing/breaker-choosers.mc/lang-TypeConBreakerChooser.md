import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeConBreakerChooser  
  

This language handles both con and type, which behave identically.  
A top\-level con/type is easy to handle, as it can only contain use blocks,  
which only break on "in".  
The inner version is slightly harder—not because it can contain sub\-blocks \(it cannot\),  
but because we must handle possible restructuring.

  
  
  
## Semantics  
  

          <DocBlock title="choose" kind="sem">

```mc
sem choose : (BreakerChooserInterface_State, String, TokenReaderInterface_Pos) -> BreakerChooserInterface_Breaker
```



<ToggleWrapper text="Code..">
```mc
sem choose =
        | (StateType {} | StateCon {} | StateTopType {} | StateTopCon {}, "use", pos) -> build innerBloc (StateUse {})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="continue" kind="sem">

```mc
sem continue : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`If it does not break on "in", then it was actually a top\-level type/con,  
and it must break the parent node.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem continue =
        | (StateType {} | StateCon {}, !"in") -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reStructureTree" kind="sem">

```mc
sem reStructureTree : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`If we find a breaker other than "in",  
we must trigger restructuring, as the inner assumption was false.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem reStructureTree =
        | (StateType {} | StateCon {}, !"in") -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absorbIt" kind="sem">

```mc
sem absorbIt : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`We only absorb "in"; other breakers are not part of the block.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem absorbIt =
        | (StateType {} | StateCon {}, "in") -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="switchVersion" kind="sem">

```mc
sem switchVersion : (BreakerChooserInterface_State, String) -> BreakerChooserInterface_State
```

<Description>{`If we break on anything other than "in",  
we cast the block as top\-level.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem switchVersion =
        | (StateType {}, !"in") -> StateTopType {}
        | (StateCon {}, !"in") -> StateTopCon {}
```
</ToggleWrapper>
</DocBlock>

