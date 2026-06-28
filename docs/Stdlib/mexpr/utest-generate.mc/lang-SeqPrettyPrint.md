import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="prettyPrintIdH" kind="sem">

```mc
sem prettyPrintIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```



<ToggleWrapper text="Code..">
```mc
sem prettyPrintIdH info env =
  | TySeq _ -> _ppSeqName
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generatePrettyPrintBodyH" kind="sem">

```mc
sem generatePrettyPrintBodyH : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generatePrettyPrintBodyH info env =
  | TySeq t ->
    let ppElem = nameSym "ppElem" in
    let target = nameSym "s" in
    let elemTy = _varTy _ppSeqTyVarName in
    let ty = TySeq {t with ty = elemTy} in
    let ppSeq = _var (ppSeqName ()) (_pprintTy (_seqTy elemTy)) in
    _lam ppElem (_pprintTy elemTy) (_lam target ty
      (_apps ppSeq [_var ppElem (_pprintTy elemTy), _var target ty]))
```
</ToggleWrapper>
</DocBlock>

