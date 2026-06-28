import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SemSynBreakerChooser  
  

This language handles both syn and sem.

  
  
  
## Semantics  
  

          <DocBlock title="choose" kind="sem">

```mc
sem choose : (BreakerChooserInterface_State, String, TokenReaderInterface_Pos) -> BreakerChooserInterface_Breaker
```

<Description>{`This implementation of choose may look confusing:  
\- syn does not have any choose cases except use,  
  because every opener syn could encounter is also a breaker of syn.  
\- sem has 3 cases:  
  1. let and utest are always inner blocks, so we treat them as inner.  
     use also always closes with "in".  
  2. type and con are ambiguous: we cannot know if they are top\-level,  
     so we assume they are not and allow them to break on "in".  
  3. recursive is always an inner block, so it breaks on \#in.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem choose =
        | (StateSem {}, "let", pos) -> build innerBloc (StateLet {})
        | (StateSem {}, "utest", pos) -> build innerBloc (StateUtest {})
        | (StateSem {} | StateSyn {}, "use", pos) -> build innerBloc (StateUse {})
        
        
        | (StateSem {}, "type", pos) -> build langFullBreakIn (StateType {})
        | (StateSem {}, "con", pos) -> build langFullBreakIn (StateCon {})

        | (StateSem {}, "recursive", pos) -> build recInner (StateRec {})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="continue" kind="sem">

```mc
sem continue : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`We always continue the parent block \(the lang\),  
except if we break on "end", which is the breaker of lang.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem continue =
        | (StateSem {} | StateSyn {}, "end") -> false
```
</ToggleWrapper>
</DocBlock>

