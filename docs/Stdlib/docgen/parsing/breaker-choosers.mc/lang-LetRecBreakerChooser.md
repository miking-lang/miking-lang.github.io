import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetRecBreakerChooser  
  

Here we handle the LetRec case, which is quite similar to the TopBreakerChooser,  
but simpler since only let blocks are ambiguous.

  
  
  
## Semantics  
  

          <DocBlock title="choose" kind="sem">

```mc
sem choose : (BreakerChooserInterface_State, String, TokenReaderInterface_Pos) -> BreakerChooserInterface_Breaker
```

<Description>{`We have 3 cases:  
1. let is still ambiguous—we cannot know if it is a RecLet or a nested Let.  
   So we include both "in" and RecursiveEnder \(\#in/\#end\) and assume nested,  
   then fix later if it is not.  
2. utest, type, con, and use are straightforward: inside a recursive,  
   they can only be inner blocks.  
3. recursive can also only be an inner block, so it has a single breaker.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem choose =
        | (StateRecLet {}, "let", pos) -> build ["in", "#end", "#in"] (StateLet {})
        
        | (StateRecLet {}, "utest", pos) -> build innerBloc (StateUtest {})
        | (StateRecLet {}, "type", pos) -> build innerBloc (StateType {})
        | (StateRecLet {}, "con", pos) -> build innerBloc (StateCon {})
        | (StateRecLet {}, "use", pos) -> build innerBloc (StateUse {})
        
        | (StateRecLet {}, "recursive", pos) -> build recInner (StateRec {})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="continue" kind="sem">

```mc
sem continue : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`We never continue a RecLet that has broken,  
since its breakers \(\#end and \#in\) also break the recursive parent block.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem continue =
        | (StateRecLet {}, _) -> false
```
</ToggleWrapper>
</DocBlock>

