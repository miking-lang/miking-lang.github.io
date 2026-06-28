import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VariantTypeEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : {tyVarEnv: [(Name, Name)]} -> {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]} -> Ast_Type -> Ast_Type -> Option {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyVariant r ->
    match unwrapType lhs with TyVariant l then
      if eqi (mapLength l.constrs) (mapLength r.constrs) then
        mapFoldlOption
          (lam free. lam k1. lam v1.
            match mapLookup k1 r.constrs with Some v2 then
              eqTypeH typeEnv free v1 v2
            else None ())
          free l.constrs
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

