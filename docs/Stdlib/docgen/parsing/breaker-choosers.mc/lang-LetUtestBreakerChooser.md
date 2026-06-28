import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetUtestBreakerChooser  
  

In this language we handle both top\-level and inner let/utest blocks.  
The main idea is that when a TopLet encounters a \`let\`, it cannot know beforehand  
whether it is an inner let or not. So it assumes it is, and gives it the possibility  
to break on "in". If later the \`let\` breaks on a top\-level keyword such as \`lang\` or \`mexpr\`,  
this triggers a reconstruction.  
In other words, any \`Let\` can potentially be a \`TopLet\`, so we must apply the same rules  
when encountering "let" inside a Let. Utests behave in exactly the same way.

  
  
  
## Semantics  
  

          <DocBlock title="choose" kind="sem">

```mc
sem choose : (BreakerChooserInterface_State, String, TokenReaderInterface_Pos) -> BreakerChooserInterface_Breaker
```

<Description>{`Similar to Program blocks, we have 4 cases:  
1. let and utest are ambiguous, but they can now also break on "in".  
2. For type and con, the same logic applies, but they can also break on "in".  
3. Recursive can now break on both "\#end" and "\#in", since we cannot know beforehand if it is top\-level.  
4. use always ends with "in".`}</Description>


<ToggleWrapper text="Code..">
```mc
sem choose =
        | (StateLet {} | StateUtest {} | StateTopLet {} | StateTopUtest {}, "let", pos) -> build innerCandidateBreak (StateLet {})
        | (StateLet {} | StateUtest {} | StateTopLet {} | StateTopUtest {}, "utest", pos) -> build innerCandidateBreak (StateUtest {})

        | (StateLet {} | StateUtest {} | StateTopLet {} | StateTopUtest {}, "type", pos) -> build innerCandidateAnyBreak (StateType {})
        | (StateLet {} | StateUtest {} | StateTopLet {} | StateTopUtest {}, "con", pos) -> build innerCandidateAnyBreak (StateCon {})
        
        | (StateLet {} | StateUtest {} | StateTopLet {} | StateTopUtest {}, "recursive", pos) -> build recBreak (StateRec {})
        
        | (StateLet {} | StateUtest {} | StateTopLet {} | StateTopUtest {}, "use", pos) -> build innerBloc (StateUse {})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="continue" kind="sem">

```mc
sem continue : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`For an inner block, we only continue parsing the parent  
if the breaker is "in".  
For top\-level blocks, we always continue, since their parent is always Program.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem continue =
        | (StateLet {} | StateUtest {}, !"in") -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reStructureTree" kind="sem">

```mc
sem reStructureTree : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`If we close an inner block with anything other than "in",  
it means it was not inner, so we trigger a restructuring.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem reStructureTree =
        | (StateLet {} | StateUtest {}, !"in") -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absorbIt" kind="sem">

```mc
sem absorbIt : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`Let/utest will only absorb "in"; other breakers usually  
start new blocks such as lang.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem absorbIt =
        | (StateLet {} | StateUtest {}, "in") -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="switchVersion" kind="sem">

```mc
sem switchVersion : (BreakerChooserInterface_State, String) -> BreakerChooserInterface_State
```

<Description>{`If the block does not end with "in", we cast inner let/utest  
to their top\-level versions.   
The special case is if we break on a recursive ender like "\#in":  
this means the let was actually a RecLet.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem switchVersion =
        | (StateUtest {}, !"in") -> StateTopUtest {}
        | (StateLet {}, "#in" | "#end") -> StateRecLet {}        
        | (StateLet {}, !"in") -> StateTopLet {}
```
</ToggleWrapper>
</DocBlock>

