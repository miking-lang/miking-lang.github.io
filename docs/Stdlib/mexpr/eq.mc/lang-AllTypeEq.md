import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllTypeEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : all b. {tyVarEnv: [(Name, Name)]} -> {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]} -> Ast_Type -> Ast_Type -> Option b
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyAll r ->
    match unwrapType lhs with TyAll l then
      optionBind (eqKind typeEnv free (l.kind, r.kind))
        (lam free.
          eqTypeH
            {typeEnv with tyVarEnv = biInsert (l.ident, r.ident) typeEnv.tyVarEnv}
            free l.ty r.ty)
    else None ()
```
</ToggleWrapper>
</DocBlock>

