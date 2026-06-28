import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParserArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CBootParserParseMExprString _ -> 3
  | CBootParserParseMLangString _ -> 1
  | CBootParserParseMLangFile _ -> 1
  | CBootParserParseMCoreFile _ -> 3
  | CBootParserGetId _ -> 1
  | CBootParserGetTerm _ -> 2
  | CBootParserGetTop _ -> 2
  | CBootParserGetDecl _ -> 2
  | CBootParserGetType _ -> 2
  | CBootParserGetString _ -> 2
  | CBootParserGetInt _ -> 2
  | CBootParserGetFloat _ -> 2
  | CBootParserGetListLength _ -> 2
  | CBootParserGetConst _ -> 2
  | CBootParserGetPat _ -> 2
  | CBootParserGetCopat _ -> 2
  | CBootParserGetInfo _ -> 2
```
</ToggleWrapper>
</DocBlock>

