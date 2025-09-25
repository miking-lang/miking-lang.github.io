import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="prettyPrintIdH" kind="sem">

```mc
sem prettyPrintIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```



<ToggleWrapper text="Code..">
```mc
sem prettyPrintIdH info env =
  | TyTensor _ -> _ppTensorName
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
  | TyTensor t ->
    let ppElem = nameSym "ppElem" in
    let target = nameSym "t" in
    let elemTy = _varTy _ppTensorTyVarName in
    let ty = TyTensor {t with ty = elemTy} in
    let tensorPp = _const (CTensorToString ()) (_pprintTy (_tensorTy elemTy)) in
    _lam ppElem (_pprintTy elemTy) (_lam target ty
      (_apps tensorPp [_var ppElem (_pprintTy elemTy), _var target ty]))
```
</ToggleWrapper>
</DocBlock>

