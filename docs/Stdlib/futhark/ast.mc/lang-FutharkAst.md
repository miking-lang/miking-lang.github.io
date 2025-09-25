import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="FutDecl" kind="syn">

```mc
syn FutDecl
```



<ToggleWrapper text="Code..">
```mc
syn FutDecl =
  | FDeclFun { ident : Name, entry : Bool, typeParams : [FutTypeParam],
               params : [(Name, FutType)], ret : FutType, body : FutExpr,
               info : Info }
  | FDeclConst { ident : Name, ty : FutType, val : FutExpr, info : Info }
  | FDeclType { ident : Name, typeParams : [FutTypeParam], ty : FutType,
                info : Info }
  | FDeclModuleAlias { ident : Name, moduleId : String, info : Info }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FutProg" kind="syn">

```mc
syn FutProg
```



<ToggleWrapper text="Code..">
```mc
syn FutProg =
  | FProg { decls : [FutDecl] }
```
</ToggleWrapper>
</DocBlock>

