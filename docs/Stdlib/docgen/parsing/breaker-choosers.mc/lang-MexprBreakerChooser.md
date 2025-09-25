import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MexprBreakerChooser  
  

Handles the mexpr case. This is simple since all its components  
are guaranteed to be inner blocks and nothing can break it.

  
  
  
## Semantics  
  

          <DocBlock title="choose" kind="sem">

```mc
sem choose : (BreakerChooserInterface_State, String, TokenReaderInterface_Pos) -> BreakerChooserInterface_Breaker
```

<Description>{`All blocks are inner blocks, so we assume they close with "in".  
Only recursive is closed with \#in, the literal form of RecursiveEnder.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem choose =
    | (StateMexpr {}, "let", pos) -> build innerBloc (StateLet {})
    | (StateMexpr {}, "utest", pos) -> build innerBloc (StateUtest {})
    | (StateMexpr {}, "type", pos) -> build ["in"] (StateType {})
    | (StateMexpr {}, "con", pos) -> build ["in"] (StateCon {})
    | (StateMexpr {}, "use", pos) -> build ["in"] (StateUse {})

    | (StateMexpr {}, "recursive", pos) -> build recInner (StateRec {})
```
</ToggleWrapper>
</DocBlock>

