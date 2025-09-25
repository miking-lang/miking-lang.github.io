import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PhaseStats  
  

  
  
  
## Types  
  

          <DocBlock title="StatState" kind="type">

```mc
type StatState : { lastPhaseEnd: Ref Float, log: Bool, jsonDumpPhases: Set String }
```



<ToggleWrapper text="Code..">
```mc
type StatState =
    { lastPhaseEnd : Ref Float
    , log : Bool
    , jsonDumpPhases : Set String
    }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="endPhaseStatsExpr" kind="sem">

```mc
sem endPhaseStatsExpr : PhaseStats_StatState -> String -> Ast_Expr -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem endPhaseStatsExpr state phaseLabel =
  | e -> endPhaseStats state phaseLabel (Left e)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="endPhaseStatsProg" kind="sem">

```mc
sem endPhaseStatsProg : PhaseStats_StatState -> String -> MLangTopLevel_MLangProgram -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem endPhaseStatsProg state phaseLabel =
  | p -> endPhaseStats state phaseLabel (Right p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="endPhaseStats" kind="sem">

```mc
sem endPhaseStats : PhaseStats_StatState -> String -> Either Ast_Expr MLangTopLevel_MLangProgram -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem endPhaseStats state phaseLabel = | e ->
    let before = deref state.lastPhaseEnd in
    let now = wallTimeMs () in

    (if state.log then
      printLn phaseLabel;
      printLn (join ["  Phase duration: ", float2string (subf now before), "ms"]);
      let preTraverse = wallTimeMs () in
      let size = (switch e
        case Left expr then countExprNodes 0 expr
        case Right prog then countProgNodes prog
      end) in
      let postTraverse = wallTimeMs () in
      printLn (join ["  Ast size: ", int2string size, " (Traversal takes ~", float2string (subf postTraverse preTraverse), "ms)"])
     else ());

    (if setMem phaseLabel state.jsonDumpPhases then
      printJsonLn (JsonString (concat "Computing AST after " phaseLabel));
      let e = eitherEither exprToJson progToJson e in
      printJsonLn (JsonString (concat "Printing AST after " phaseLabel));
      printJsonLn e
     else ());

    let newNow = wallTimeMs () in
    modref state.lastPhaseEnd newNow
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkPhaseLogState" kind="sem">

```mc
sem mkPhaseLogState : Set String -> Bool -> PhaseStats_StatState
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mkPhaseLogState jsonDumpPhases = | log ->
    { lastPhaseEnd = ref (wallTimeMs ())
    , jsonDumpPhases = jsonDumpPhases
    , log = log
    }
```
</ToggleWrapper>
</DocBlock>

