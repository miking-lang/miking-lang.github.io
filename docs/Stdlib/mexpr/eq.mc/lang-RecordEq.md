import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option {conEnv: [(Name, Name)], varEnv: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmRecord r ->
    match lhs with TmRecord l then
      if eqi (mapLength l.bindings) (mapLength r.bindings) then
        mapFoldlOption
          (lam free. lam k1. lam v1.
            match mapLookup k1 r.bindings with Some v2 then
              eqExprH env free v1 v2
            else None ())
          free l.bindings
      else None ()
    else None ()

  | TmRecordUpdate r ->
    match lhs with TmRecordUpdate l then
      if eqSID l.key r.key then
        match eqExprH env free l.rec r.rec with Some free then
          eqExprH env free l.value r.value
        else None ()
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

