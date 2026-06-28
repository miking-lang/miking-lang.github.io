import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEquality  
  

  
  
  
## Semantics  
  

          <DocBlock title="equalityIdH" kind="sem">

```mc
sem equalityIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```



<ToggleWrapper text="Code..">
```mc
sem equalityIdH info env =
  | TySeq _ -> _eqSeqName
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateEqualityBodyH" kind="sem">

```mc
sem generateEqualityBodyH : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generateEqualityBodyH info env =
  | TySeq t ->
    let eqElem = nameSym "eqElem" in
    let larg = nameSym "l" in
    let rarg = nameSym "r" in
    let elemTy = _varTy _eqSeqTyVarName in
    let ty = TySeq {t with ty = elemTy} in
    let eqSeq = _var (eqSeqName ()) (_eqTy (_seqTy elemTy)) in
    _lam eqElem (_eqTy elemTy) (_lam larg ty (_lam rarg ty
      (_apps eqSeq [_var eqElem (_eqTy elemTy), _var larg ty, _var rarg ty])))
```
</ToggleWrapper>
</DocBlock>

