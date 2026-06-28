import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchTypeLift  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeLiftExpr" kind="sem">

```mc
sem typeLiftExpr : TypeLiftBase_TypeLiftEnv -> Ast_Expr -> (TypeLiftBase_TypeLiftEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftExpr (env : TypeLiftEnv) =
  | TmMatch t ->
    match typeLiftExpr env t.target with (env, target) in
    match typeLiftPat env t.pat with (env, pat) in
    match typeLiftExpr env t.thn with (env, thn) in
    match typeLiftExpr env t.els with (env, els) in
    match typeLiftType env t.ty with (env, ty) in
    (env, TmMatch {{{{{t with target = target}
                         with pat = pat}
                         with thn = thn}
                         with els = els}
                         with ty = ty})
```
</ToggleWrapper>
</DocBlock>

