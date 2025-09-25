import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BreakerChooserInterface  
  

Interface for a BreakerChooser; all choosers implement this contract.  
Each function has a default implementation so that not all sems need to be defined explicitly.

  
  
  
## Types  
  

          <DocBlock title="Breaker" kind="type">

```mc
type Breaker : { breakers: [String], state: State }
```

<Description>{`A breaker is a set of Strings representing all possible breakers  
for a block, along with the state of this block.`}</Description>


<ToggleWrapper text="Code..">
```mc
type Breaker = { breakers: [String], state: State }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="State" kind="syn">

```mc
syn State
```

<Description>{`Parser automaton states.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn State = 
        | StateProgram {}
        | StateTopLet {}
        | StateRecLet {}        
        | StateLet {}
        | StateTopRec {}
        | StateRec {}
        | StateLang {}
        | StateTopType {}
        | StateType {}
        | StateTopUse {}
        | StateUse {}
        | StateSem {}
        | StateSyn {}
        | StateCon {}
        | StateTopCon {}
        | StateMexpr {}
        | StateUtest {}
        | StateTopUtest {}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="toString" kind="sem">

```mc
sem toString : BreakerChooserInterface_State -> String
```

<Description>{`Human\-readable name for a State.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem toString =
        | StateProgram {} -> "Program"
        | StateTopLet {} -> "TopLet"
        | StateRecLet {} -> "RecLet"        
        | StateLet {} -> "Let"
        | StateLang {} -> "Lang"
        | StateTopRec {} -> "TopRec"
        | StateRec {} -> "Rec"
        | StateTopType {} -> "TopType"
        | StateType {} -> "Type"
        | StateSem {} -> "Sem"
        | StateSyn {} -> "Syn"
        | StateCon {} -> "Con"
        | StateTopCon {} -> "TopCon"
        | StateMexpr {} -> "Mexpr"
        | StateUse {} -> "Use"
        | StateUtest {} -> "Utest"
        | StateTopUtest {} -> "TopUtest"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="choose" kind="sem">

```mc
sem choose : (BreakerChooserInterface_State, String, TokenReaderInterface_Pos) -> BreakerChooserInterface_Breaker
```

<Description>{`Determine the new state and the breakers after encountering a block opener.  
The default behavior is to crash since this would mean the automaton is wrong.  
For a valid automaton, all cases must be handled.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem choose =
      | (state, word, pos) -> error (join ["Parsing Failed, x: ", int2string pos.x, ", y: ", int2string pos.y, ": ", "You cannot have the word ", word, " inside a ", (toString state), " block."])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="continue" kind="sem">

```mc
sem continue : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`Determine if, for a given breaker, tokenization should continue for the parent state.  
The default behavior is to continue.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem continue =
        | (state, word) -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reStructureTree" kind="sem">

```mc
sem reStructureTree : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`Determine if the block becomes hard in a given context.  
The default behavior is to not restructure the tree.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem reStructureTree =
        | (_, _) -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absorbIt" kind="sem">

```mc
sem absorbIt : (BreakerChooserInterface_State, String) -> Bool
```

<Description>{`Determine whether the breaker should be part of the current block or part of the parent block.  
The default behavior is to reject the breaker.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem absorbIt  =
        | (state, word) -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="switchVersion" kind="sem">

```mc
sem switchVersion : (BreakerChooserInterface_State, String) -> BreakerChooserInterface_State
```

<Description>{`Takes a state and its breaker and returns the correct version of the state if it must change.  
The default behavior is to keep the same state.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem switchVersion =
        | (state, _) -> state
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="build" kind="sem">

```mc
sem build : [String] -> BreakerChooserInterface_State -> BreakerChooserInterface_Breaker
```

<Description>{`Helper to build a Breaker from a breaker list and a state.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem build =
    | breakers -> lam state. { breakers = breakers, state = state }
```
</ToggleWrapper>
</DocBlock>

