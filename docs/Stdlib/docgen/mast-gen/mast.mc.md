import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# mast.mc  
  

\# MAst Module  
  
This module defines the MAst structure.  
It contains the full Miking compiler expression along with the IncludeSet  
storing the file contents.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/docgen/mast-gen/include-set.mc"} style={S.link}>./include-set.mc</a>, <a href={"/docs/Stdlib/docgen/mast-gen/file-opener.mc"} style={S.link}>./file-opener.mc</a>  
  
## Types  
  

          <DocBlock title="MAst" kind="type">

```mc
type MAst : { expr: Expr, includeSet: IncludeSet ParsingFile }
```

<Description>{`Represents the Miking AST paired with its IncludeSet.`}</Description>


<ToggleWrapper text="Code..">
```mc
type MAst = use MExprAst in {
     expr: Expr,
     includeSet: IncludeSet ParsingFile
}
```
</ToggleWrapper>
</DocBlock>

