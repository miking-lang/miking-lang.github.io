import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParserAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Const" kind="syn">

```mc
syn Const
```



<ToggleWrapper text="Code..">
```mc
syn Const =
  | CBootParserParseMExprString {}
  | CBootParserParseMLangString {}
  | CBootParserParseMLangFile {}
  | CBootParserParseMCoreFile {}
  | CBootParserGetId {}
  | CBootParserGetTerm {}
  | CBootParserGetTop {}
  | CBootParserGetDecl {}
  | CBootParserGetType {}
  | CBootParserGetString {}
  | CBootParserGetInt {}
  | CBootParserGetFloat {}
  | CBootParserGetListLength {}
  | CBootParserGetConst {}
  | CBootParserGetPat {}
  | CBootParserGetCopat {}
  | CBootParserGetInfo {}
```
</ToggleWrapper>
</DocBlock>

