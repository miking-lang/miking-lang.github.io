import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# QualifiedNameSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeType" kind="sem">

```mc
sem symbolizeType : SymEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeType env =
  | TyQualifiedName t ->
      let lhs = getSymbol {kind = "language",
                           info = [t.info],
                           allowFree = false}
                          env.namespaceEnv
                          t.lhs in

      let langEnv = match mapLookup (nameGetStr lhs) env.langEnv with Some langEnv then langEnv else env.currentEnv in
      let rhs = match mapLookup (nameGetStr t.rhs) langEnv.tyConEnv with Some symbRhs
                then symbRhs
                else t.rhs in

      -- TODO(28/11/2024), voorberg): Add support for using fields on the
      -- right hand side of a qualified name.
      let symbolizePair = lam p.
        match p with (lhs, rhs) in
        let lhs = getSymbol
          {kind = "type", info = [t.info], allowFree = false}
          env.currentEnv.tyConEnv lhs in
        let rhs = getSymbol
          {kind = "constructor", info = [t.info], allowFree = false}
          env.currentEnv.conEnv rhs in
        (lhs, rhs) in

      TyQualifiedName {t with lhs = lhs,
                              rhs = rhs,
                              plus = map symbolizePair t.plus,
                              minus = map symbolizePair t.minus}
```
</ToggleWrapper>
</DocBlock>

