import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CosynDeclAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Decl" kind="syn">

```mc
syn Decl
```



<ToggleWrapper text="Code..">
```mc
syn Decl =
  | DeclCosyn {info : Info,
               ident : Name,
               params : [Name],
               isBase : Bool,
               ty : Type,
               includes : [(String, String)]}
```
</ToggleWrapper>
</DocBlock>

