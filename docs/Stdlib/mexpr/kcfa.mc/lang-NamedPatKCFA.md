import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedPatKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : KCFA_CFAGraph -> (IName, KCFA_Ctx) -> (Ast_Pat, CFABase_AbsVal) -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint graph (id: (IName,Ctx)) =
  | (PatNamed { ident = PName n, info = info }, av) ->
    -- OPT(Linnea,2022-06-29): Can we avoid doing name2int every time here?
    propagateDirectConstraint (name2int graph.im info n, id.1) graph av
  | (PatNamed { ident = PWildcard _ }, _) -> graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patNames" kind="sem">

```mc
sem patNames : [Name] -> Ast_Pat -> [Name]
```



<ToggleWrapper text="Code..">
```mc
sem patNames acc =
  | PatNamed { ident = PName n } -> cons n acc
```
</ToggleWrapper>
</DocBlock>

