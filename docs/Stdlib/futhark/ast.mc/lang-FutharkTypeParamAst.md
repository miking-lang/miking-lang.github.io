import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkTypeParamAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="FutTypeParam" kind="syn">

```mc
syn FutTypeParam
```



<ToggleWrapper text="Code..">
```mc
syn FutTypeParam =
  | FPSize {val : Name}
  | FPType {val : Name}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="futTypeParamIdent" kind="sem">

```mc
sem futTypeParamIdent : FutharkTypeParamAst_FutTypeParam -> Name
```



<ToggleWrapper text="Code..">
```mc
sem futTypeParamIdent =
  | FPSize t -> t.val
  | FPType t -> t.val
```
</ToggleWrapper>
</DocBlock>

