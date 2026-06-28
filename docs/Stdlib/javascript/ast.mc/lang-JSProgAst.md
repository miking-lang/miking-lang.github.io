import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# JSProgAst  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
JS PROGRAM in COMBINED FRAGMENTS \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="JSProg" kind="syn">

```mc
syn JSProg
```

<Description>{`We support importing a set of modules at the top of the program.  
TODO: Add support for "from" keyword.  
https://tc39.es/ecma262/\#sec\-imports`}</Description>


<ToggleWrapper text="Code..">
```mc
syn JSProg =
  | JSPProg { imports: [String], exprs: [JSExpr] }
```
</ToggleWrapper>
</DocBlock>

