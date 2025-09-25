import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BaseKindUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyKinds" kind="sem">

```mc
sem unifyKinds : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Kind, Ast_Kind) -> u
```



<ToggleWrapper text="Code..">
```mc
sem unifyKinds u env =
  | (_, Mono () | Poly ()) -> u.empty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addKinds" kind="sem">

```mc
sem addKinds : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Kind, Ast_Kind) -> (u, Ast_Kind)
```



<ToggleWrapper text="Code..">
```mc
sem addKinds u env =
  | (Mono _ | Poly _, !(Mono _ | Poly _) & k)
  | (!(Mono _ | Poly _) & k, Mono _ | Poly _)
  | (Poly _, (Poly _ | Mono _) & k) ->
    (u.empty, k)
  | (Mono _, Poly _ | Mono _) ->
    (u.empty, Mono ())
```
</ToggleWrapper>
</DocBlock>

