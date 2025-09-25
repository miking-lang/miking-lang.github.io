import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MetaVarTypeEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : {tyVarEnv: [(Name, Name)]} -> {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]} -> Ast_Type -> Ast_Type -> Option EqTypeFreeEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyMetaVar _ & rhs ->
    switch (unwrapType lhs, unwrapType rhs)
    case (TyMetaVar l, TyMetaVar r) then
      match (deref l.contents, deref r.contents) with (Unbound n1, Unbound n2) then
        optionBind
          (_eqCheck n1.ident n2.ident biEmpty free.freeTyFlex)
          (lam freeTyFlex.
            eqKind typeEnv {free with freeTyFlex = freeTyFlex} (n1.kind, n2.kind))
      else error "Unwrapped MetaVar was not Unbound!"
    case (! TyMetaVar _, ! TyMetaVar _) then
      eqTypeH typeEnv free lhs rhs
    case _ then None ()
    end
```
</ToggleWrapper>
</DocBlock>

