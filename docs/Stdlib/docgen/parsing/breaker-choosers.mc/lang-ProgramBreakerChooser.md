import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ProgramBreakerChooser  
  

At the root of the program, we can find any top\-level block,  
and we can assume with certainty that each block is top\-level.

  
  
  
## Semantics  
  

          <DocBlock title="choose" kind="sem">

```mc
sem choose : (BreakerChooserInterface_State, String, TokenReaderInterface_Pos) -> BreakerChooserInterface_Breaker
```

<Description>{`The choose implementation has 4 main cases:  
1. type and con are very simple blocks without nested blocks, so anything breaks them without ambiguity.  
2. lang and recursive are also simple since they are closed with only one keyword. Note that \#end is the literal form of RecursiveEnder.  
3. let and utest are more restricted: we cannot treat let as a breaker since it may be nested. Therefore,  
   the only breakers are words that can only exist at the top level.  
4. mexpr is the easiest case, as it cannot break—it is always the last top\-level block.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem choose =        
        | (StateProgram {}, "type", pos) -> build topLvlAnyBreak (StateTopType {})
        | (StateProgram {}, "con", pos) -> build topLvlAnyBreak (StateTopCon {})

        | (StateProgram {}, "lang", pos) -> build ["end"] (StateLang {})
        | (StateProgram {}, "recursive", pos) -> build recOuter (StateTopRec {})

        | (StateProgram {}, "let", pos) -> build topLvlBreak (StateTopLet {})
        | (StateProgram {}, "utest", pos) -> build topLvlBreak (StateTopUtest {})

        | (StateProgram {}, "mexpr", pos) -> build [] (StateMexpr {})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absorbIt" kind="sem">

```mc
sem absorbIt : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`At the top level, every breaker is absorbed.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem absorbIt =
        | (StateProgram {}, word) -> true
```
</ToggleWrapper>
</DocBlock>

