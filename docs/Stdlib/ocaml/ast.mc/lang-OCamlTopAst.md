import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlTopAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Top" kind="syn">

```mc
syn Top
```



<ToggleWrapper text="Code..">
```mc
syn Top =
  | OTopTypeDecl { ident : Name, ty : Type }
  | OTopVariantTypeDecl { ident : Name, constrs : Map Name Type }
  | OTopCExternalDecl { ident : Name, ty : Type, bytecodeIdent : Name,
                        nativeIdent : Name }
  | OTopLet { ident : Name, tyBody: Type, body : Expr }
  | OTopRecLets { bindings : [OCamlTopBinding] }
  | OTopExpr { expr : Expr }
  | OTopTryWith { try : Expr, arms : [(Pat, Expr)] }
```
</ToggleWrapper>
</DocBlock>

