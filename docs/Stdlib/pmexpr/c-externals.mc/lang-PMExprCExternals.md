import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprCExternals  
  

  
  
  
## Semantics  
  

          <DocBlock title="getExternalCDeclarations" kind="sem">

```mc
sem getExternalCDeclarations : Map Name PMExprExtractAccelerate_AccelerateData -> [OCamlTopAst_Top]
```



<ToggleWrapper text="Code..">
```mc
sem getExternalCDeclarations =
  | accelerated /- : Map Name AcceleratedData -> [Top] -/ ->
    mapValues
      (mapMapWithKey
        (lam k : Name. lam v : AccelerateData.
          let ty =
            foldr
              (lam param : (Name, Type). lam acc : Type.
                TyArrow {from = param.1, to = acc, info = infoTy acc})
              v.returnType v.params in
          OTopCExternalDecl {
            ident = k, ty = ty, bytecodeIdent = v.bytecodeWrapperId,
            nativeIdent = k})
        accelerated)
```
</ToggleWrapper>
</DocBlock>

