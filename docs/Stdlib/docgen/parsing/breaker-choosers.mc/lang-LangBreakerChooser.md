import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LangBreakerChooser  
  

In this language we handle "lang" blocks.  
Reminder: top\-level keywords in lang blocks can only be:  
sem, syn, con, type, and end \(which closes the lang\).

  
  
  
## Semantics  
  

          <DocBlock title="choose" kind="sem">

```mc
sem choose : (BreakerChooserInterface_State, String, TokenReaderInterface_Pos) -> BreakerChooserInterface_Breaker
```

<Description>{`type, con, and syn have no nested blocks,  
so we can simply break on any top\-level lang keyword.  
Sem is more complex, as it can contain nested blocks,  
and importantly, can contain type and con definitions.  
Therefore, we cannot immediately break on type/con,  
and must make assumptions.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem choose =
        | (StateLang {}, "type", pos) -> build langFullBreak (StateTopType {})
        | (StateLang {}, "con", pos) -> build langFullBreak (StateTopCon {})
        | (StateLang {}, "syn", pos) -> build langFullBreak (StateSyn {})
        
        | (StateLang {}, "sem", pos) -> build langBreak (StateSem {})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absorbIt" kind="sem">

```mc
sem absorbIt : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`lang only breaks on "end", which must be absorbed.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem absorbIt =
        | (StateLang {}, _) -> true
```
</ToggleWrapper>
</DocBlock>

