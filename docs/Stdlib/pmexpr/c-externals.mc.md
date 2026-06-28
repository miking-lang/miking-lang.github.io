import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# c-externals.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>, <a href={"/docs/Stdlib/pmexpr/extract.mc"} style={S.link}>pmexpr/extract.mc</a>  
  
## Languages  
  

          <DocBlock title="PMExprCExternals" kind="lang" link="/docs/Stdlib/pmexpr/c-externals.mc/lang-PMExprCExternals">

```mc
lang PMExprCExternals
```



<ToggleWrapper text="Code..">
```mc
lang PMExprCExternals = MExprAst + OCamlAst + PMExprExtractAccelerate
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
end
```
</ToggleWrapper>
</DocBlock>

