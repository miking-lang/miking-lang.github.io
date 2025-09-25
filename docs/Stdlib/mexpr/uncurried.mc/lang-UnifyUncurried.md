import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UnifyUncurried  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="UnifyError" kind="syn">

```mc
syn UnifyError
```



<ToggleWrapper text="Code..">
```mc
syn UnifyError =
  | NumArguments (Int, Int)
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="unifyBase" kind="sem">

```mc
sem unifyBase : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> u
```



<ToggleWrapper text="Code..">
```mc
sem unifyBase u env =
  | (TyUncurriedArrow a, TyUncurriedArrow b) ->
    let aLen = length a.positional in
    let bLen = length b.positional in
    let lengths = if neqi aLen bLen
      then u.err (NumArguments (aLen, bLen))
      else u.empty in
    let positional =
      let f = lam res. lam l. lam r. u.combine res (unifyTypes u env (l, r)) in
      foldl2 f u.empty a.positional b.positional in
    u.combine lengths (u.combine positional (unifyTypes u env (a.ret, b.ret)))
```
</ToggleWrapper>
</DocBlock>

