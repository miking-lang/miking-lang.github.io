import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TestLang  
  

  
  
  
## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmMap2 _ -> false
  | TmParallelReduce _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env : PprintEnv) =
  | TmMap2 t ->
    match printParen indent env t.f with (env, f) in
    match pprintCode indent env t.as with (env, as) in
    match pprintCode indent env t.bs with (env, bs) in
    (env, join ["parallelMap2 (", f, ") (", as, ") (", bs, ")"])
  | TmParallelReduce t ->
    match printParen indent env t.f with (env, f) in
    match pprintCode indent env t.ne with (env, ne) in
    match pprintCode indent env t.as with (env, as) in
    (env, join ["parallelReduce (", f, ") (", ne, ") (", as, ")"])
```
</ToggleWrapper>
</DocBlock>

